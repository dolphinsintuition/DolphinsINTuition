"""
Audio Preprocessing Pipeline for NatureLM-audio Fine-Tuning
============================================================

Purpose: Segment, normalize, and prepare audio-text pairs from
Watkins MMSD dolphin subset for NatureLM-audio training.

Phase: DIC-7320 Phase 1
"""

import logging
from pathlib import Path
from typing import List, Tuple, Optional, Iterator
import json
from dataclasses import dataclass, asdict

import numpy as np

# Phase 2 dependencies
try:
    import librosa
    import soundfile
except ImportError:
    librosa = None
    soundfile = None

logger = logging.getLogger(__name__)


@dataclass
class AudioWindow:
    """Single training window (4-16 seconds of audio + text)."""
    window_id: str
    recording_id: str
    audio_array: np.ndarray
    sample_rate_hz: int
    text_annotation: str
    duration_seconds: float
    source_start_seconds: float  # Position in original clip
    vocalization_type: str


class AudioPreprocessor:
    """Preprocess dolphin recordings into training windows."""
    
    TARGET_SAMPLE_RATE = 16000  # 16 kHz for NatureLM-audio
    WINDOW_DURATION_SECONDS = 8.0  # 8-second windows
    OVERLAP_RATIO = 0.5  # 50% overlap for context
    
    def __init__(self):
        if librosa is None or soundfile is None:
            raise ImportError("librosa and soundfile required. Install with: pip install librosa soundfile")
    
    @staticmethod
    def normalize_audio(audio: np.ndarray, target_rms: float = -20.0) -> np.ndarray:
        """
        Normalize audio level using RMS.
        
        Args:
            audio: Audio waveform (1D array)
            target_rms: Target RMS in dB (typical: -20 to -23)
        
        Returns:
            Normalized audio
        """
        # Calculate current RMS
        rms = np.sqrt(np.mean(audio ** 2))
        if rms == 0:
            return audio
        
        # Convert target from dB to linear
        target_linear = 10 ** (target_rms / 20.0)
        
        # Scale
        normalized = audio * (target_linear / rms)
        
        # Clip to [-1, 1] to avoid clipping artifacts
        normalized = np.clip(normalized, -1.0, 1.0)
        
        return normalized
    
    @staticmethod
    def resample_to_16k(audio: np.ndarray, orig_sr: int) -> np.ndarray:
        """Resample to 16 kHz if needed."""
        if orig_sr == AudioPreprocessor.TARGET_SAMPLE_RATE:
            return audio
        
        return librosa.resample(audio, orig_sr=orig_sr, target_sr=AudioPreprocessor.TARGET_SAMPLE_RATE)
    
    @classmethod
    def create_windows(
        cls,
        audio: np.ndarray,
        sample_rate_hz: int,
        text_annotation: str,
        recording_id: str,
        vocalization_type: str,
        window_duration_sec: float = WINDOW_DURATION_SECONDS,
        overlap_ratio: float = OVERLAP_RATIO,
    ) -> List[AudioWindow]:
        """
        Segment audio into overlapping windows for training.
        
        Args:
            audio: Input waveform
            sample_rate_hz: Sample rate
            text_annotation: Text description
            recording_id: Source recording ID
            vocalization_type: e.g. 'whistle', 'burst_pulse'
            window_duration_sec: Window length in seconds
            overlap_ratio: Overlap fraction (0.5 = 50%)
        
        Returns:
            List of AudioWindow objects
        """
        # Resample if needed
        audio = cls.resample_to_16k(audio, sample_rate_hz)
        
        # Normalize
        audio = cls.normalize_audio(audio)
        
        # Window parameters
        window_samples = int(cls.TARGET_SAMPLE_RATE * window_duration_sec)
        stride_samples = int(window_samples * (1 - overlap_ratio))
        
        windows = []
        num_windows = (len(audio) - window_samples) // stride_samples + 1
        
        for i in range(max(1, num_windows)):
            start = i * stride_samples
            end = start + window_samples
            
            # Pad if at end of clip
            if end > len(audio):
                window_audio = np.zeros(window_samples, dtype=np.float32)
                window_audio[:len(audio) - start] = audio[start:]
            else:
                window_audio = audio[start:end]
            
            window = AudioWindow(
                window_id=f"{recording_id}_w{i:03d}",
                recording_id=recording_id,
                audio_array=window_audio.astype(np.float32),
                sample_rate_hz=cls.TARGET_SAMPLE_RATE,
                text_annotation=text_annotation,
                duration_seconds=window_duration_sec,
                source_start_seconds=start / cls.TARGET_SAMPLE_RATE,
                vocalization_type=vocalization_type,
            )
            
            windows.append(window)
        
        logger.debug(f"Created {len(windows)} windows from {recording_id}")
        return windows


class TrainingDatasetBuilder:
    """Assemble windows into train/val/test splits."""
    
    TRAIN_SPLIT = 0.80
    VAL_SPLIT = 0.10
    TEST_SPLIT = 0.10
    
    def __init__(self, output_dir: Path):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.train_windows = []
        self.val_windows = []
        self.test_windows = []
    
    def add_windows(self, windows: List[AudioWindow], test_location: Optional[str] = None):
        """
        Add windows to dataset with stratified split.
        
        Args:
            windows: List of AudioWindow objects
            test_location: If provided, reserve this location for test set (e.g. 'Shark Bay')
        """
        for window in windows:
            rand = np.random.random()
            
            # Stratify by location (test locations reserved)
            if test_location and test_location in window.recording_id.lower():
                self.test_windows.append(window)
            elif rand < self.TRAIN_SPLIT:
                self.train_windows.append(window)
            elif rand < self.TRAIN_SPLIT + self.VAL_SPLIT:
                self.val_windows.append(window)
            else:
                self.test_windows.append(window)
    
    def save_splits(self, format: str = 'jsonl'):
        """
        Save train/val/test splits to disk.
        
        Args:
            format: 'jsonl' (one window per line) or 'hdf5' (binary)
        """
        if format == 'jsonl':
            self._save_jsonl()
        elif format == 'hdf5':
            self._save_hdf5()
        else:
            raise ValueError(f"Unknown format: {format}")
        
        logger.info(f"""
Training Dataset Summary
========================
Train:  {len(self.train_windows):,} windows
Val:    {len(self.val_windows):,} windows
Test:   {len(self.test_windows):,} windows
Total:  {len(self.train_windows) + len(self.val_windows) + len(self.test_windows):,}

Output dir: {self.output_dir}
        """)
    
    def _save_jsonl(self):
        """Save as JSONL (text-based, easily inspectable)."""
        for split_name, windows in [
            ('train', self.train_windows),
            ('val', self.val_windows),
            ('test', self.test_windows),
        ]:
            out_file = self.output_dir / f'{split_name}.jsonl'
            
            with open(out_file, 'w') as f:
                for window in windows:
                    record = asdict(window)
                    # Convert numpy array to list
                    record['audio_array'] = window.audio_array.tolist()
                    f.write(json.dumps(record) + '\n')
            
            logger.info(f"✓ Saved {len(windows)} windows to {out_file}")
    
    def _save_hdf5(self):
        """Save as HDF5 (binary, efficient for large datasets)."""
        try:
            import h5py
        except ImportError:
            logger.warning("h5py not installed. Using JSONL format instead.")
            self._save_jsonl()
            return
        
        for split_name, windows in [
            ('train', self.train_windows),
            ('val', self.val_windows),
            ('test', self.test_windows),
        ]:
            if not windows:
                continue
            
            out_file = self.output_dir / f'{split_name}.hdf5'
            
            with h5py.File(out_file, 'w') as f:
                # Create datasets
                n_samples = len(windows)
                window_len = windows[0].audio_array.shape[0]
                
                audio_ds = f.create_dataset('audio', (n_samples, window_len), dtype=np.float32)
                text_ds = f.create_dataset('text', (n_samples,), dtype=h5py.string_dtype(encoding='utf-8'))
                metadata_ds = f.create_dataset('metadata', (n_samples,), dtype=h5py.string_dtype(encoding='utf-8'))
                
                # Write data
                for i, window in enumerate(windows):
                    audio_ds[i] = window.audio_array
                    text_ds[i] = window.text_annotation
                    metadata_ds[i] = json.dumps({
                        'window_id': window.window_id,
                        'recording_id': window.recording_id,
                        'vocalization_type': window.vocalization_type,
                        'source_start_seconds': float(window.source_start_seconds),
                    })
                
                logger.info(f"✓ Saved {n_samples} windows to {out_file}")


def main():
    """Quick test of preprocessing pipeline."""
    logging.basicConfig(level=logging.INFO)
    
    # Synthetic test: create a dummy audio clip
    dummy_audio = np.random.randn(160000).astype(np.float32)  # 10 seconds @ 16 kHz
    
    preprocessor = AudioPreprocessor()
    windows = preprocessor.create_windows(
        audio=dummy_audio,
        sample_rate_hz=16000,
        text_annotation="Test dolphin whistle",
        recording_id="test_001",
        vocalization_type="whistle",
    )
    
    logger.info(f"✓ Created {len(windows)} test windows")
    logger.info(f"  Each window: {windows[0].duration_seconds}s @ {windows[0].sample_rate_hz} Hz")


if __name__ == '__main__':
    main()
