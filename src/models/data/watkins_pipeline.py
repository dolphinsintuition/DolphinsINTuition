"""
Watkins Marine Mammal Sound Database → NatureLM-audio Pipeline
================================================================

Purpose: Load Watkins MMSD via alp-data, filter for dolphin recordings,
and prepare audio-text pairs for NatureLM-audio fine-tuning.

Phase: DIC-7320 Phase 1 (data pipeline specification)
Status: Implementation scaffold
"""

import logging
from pathlib import Path
from typing import List, Tuple, Dict, Optional
import json
from dataclasses import dataclass, asdict

import numpy as np

# Will be installed in Phase 2 environment
try:
    import alp_data
except ImportError:
    alp_data = None

logger = logging.getLogger(__name__)


@dataclass
class DolphinRecording:
    """Single dolphin recording with metadata."""
    recording_id: str
    species: str
    location: str
    date: str
    duration_seconds: float
    sample_rate_hz: int
    audio_path: str
    vocalization_type: Optional[str] = None
    annotation: Optional[str] = None
    quality_score: Optional[float] = None


class WatkinsMMSDLoader:
    """Load Watkins Marine Mammal Sound Database via alp-data."""
    
    DOLPHIN_SPECIES = {
        'bottlenose': ['Tursiops truncatus', 'bottlenose'],
        'spinner': ['Stenella longirostris', 'spinner'],
        'spotted': ['Stenella attenuata', 'spotted'],
    }
    
    MIN_QUALITY_SNR = -5.0  # dB (very permissive)
    MIN_DURATION_SECONDS = 0.5
    MAX_DURATION_SECONDS = 600.0  # 10 minutes
    
    def __init__(self, cache_dir: Optional[Path] = None):
        """
        Initialize Watkins loader.
        
        Args:
            cache_dir: Where to cache Watkins MMSD (default: ~/.alp_data/watkins_mmsd)
        """
        if alp_data is None:
            raise ImportError("alp-data not installed. Install with: pip install alp-data")
        
        self.cache_dir = cache_dir or Path.home() / '.alp_data' / 'watkins_mmsd'
        self.cache_dir.mkdir(parents=True, exist_ok=True)
        self.mmsd = None
    
    def load_dataset(self, force_redownload: bool = False) -> None:
        """
        Load Watkins MMSD via alp-data.
        
        Args:
            force_redownload: Re-download even if cached
        """
        logger.info("Loading Watkins Marine Mammal Sound Database...")
        try:
            self.mmsd = alp_data.load('watkins_mmsd', cache_dir=self.cache_dir)
            logger.info(f"✓ Loaded Watkins MMSD: {len(self.mmsd)} clips")
        except Exception as e:
            logger.error(f"Failed to load Watkins via alp-data: {e}")
            raise
    
    def is_dolphin_species(self, species_label: str) -> Tuple[bool, Optional[str]]:
        """
        Check if species label matches dolphin species.
        
        Returns:
            (is_dolphin, canonical_species_name)
        """
        species_label_lower = str(species_label).lower().strip()
        
        for canonical, aliases in self.DOLPHIN_SPECIES.items():
            for alias in aliases:
                if alias.lower() in species_label_lower:
                    return True, canonical
        
        return False, None
    
    def filter_dolphins(self, quality_threshold: float = 0.7) -> List[DolphinRecording]:
        """
        Filter Watkins for dolphin recordings and prepare metadata.
        
        Args:
            quality_threshold: Minimum quality_score (0-1) to include
        
        Returns:
            List of DolphinRecording objects
        """
        if self.mmsd is None:
            raise RuntimeError("Dataset not loaded. Call load_dataset() first.")
        
        dolphin_recordings = []
        skipped_reasons = {
            'not_dolphin': 0,
            'duration_out_of_range': 0,
            'low_quality': 0,
            'missing_metadata': 0,
            'processing_error': 0,
        }
        
        for idx, clip in enumerate(self.mmsd):
            try:
                # Extract metadata
                species = clip.get('species') or clip.get('species_label') or ''
                is_dolphin, canonical_species = self.is_dolphin_species(species)
                
                if not is_dolphin:
                    skipped_reasons['not_dolphin'] += 1
                    continue
                
                # Check duration
                duration_sec = float(clip.get('duration_seconds', 0))
                if not (self.MIN_DURATION_SECONDS <= duration_sec <= self.MAX_DURATION_SECONDS):
                    skipped_reasons['duration_out_of_range'] += 1
                    continue
                
                # Extract quality (if available; alp-data may not provide this)
                quality = float(clip.get('quality_score', 0.5))
                if quality < quality_threshold:
                    skipped_reasons['low_quality'] += 1
                    continue
                
                # Extract other metadata (with defaults for missing fields)
                recording_id = clip.get('clip_id') or f'watkins_{idx}'
                location = clip.get('location') or 'Unknown'
                date = clip.get('date') or clip.get('year', 'Unknown')
                sample_rate = int(clip.get('sample_rate_hz', 16000))
                audio_path = clip.get('audio_path') or str(idx)  # Will be resolved during preprocessing
                
                # Validate minimal metadata
                if not recording_id or not canonical_species:
                    skipped_reasons['missing_metadata'] += 1
                    continue
                
                # Create DolphinRecording
                recording = DolphinRecording(
                    recording_id=recording_id,
                    species=canonical_species,
                    location=location,
                    date=str(date),
                    duration_seconds=duration_sec,
                    sample_rate_hz=sample_rate,
                    audio_path=audio_path,
                    quality_score=quality,
                )
                
                dolphin_recordings.append(recording)
                
                if idx % 1000 == 0:
                    logger.info(f"Processed {idx}/{len(self.mmsd)} clips...")
            
            except Exception as e:
                logger.warning(f"Error processing clip {idx}: {e}")
                skipped_reasons['processing_error'] += 1
                continue
        
        # Log filtering summary
        logger.info(f"""
Watkins MMSD Filtering Summary
==============================
Total clips:                  {len(self.mmsd):,}
Dolphin recordings:           {len(dolphin_recordings):,}
Skipped (not dolphin):        {skipped_reasons['not_dolphin']:,}
Skipped (duration):           {skipped_reasons['duration_out_of_range']:,}
Skipped (low quality):        {skipped_reasons['low_quality']:,}
Skipped (missing metadata):   {skipped_reasons['missing_metadata']:,}
Skipped (processing error):   {skipped_reasons['processing_error']:,}

Species breakdown:
  - Bottlenose: {sum(1 for r in dolphin_recordings if r.species == 'bottlenose'):,}
  - Spinner:    {sum(1 for r in dolphin_recordings if r.species == 'spinner'):,}
  - Spotted:    {sum(1 for r in dolphin_recordings if r.species == 'spotted'):,}

Estimated audio duration: {sum(r.duration_seconds for r in dolphin_recordings) / 3600:.1f} hours
        """)
        
        return dolphin_recordings


class DolphinVocalizationHeuristic:
    """Heuristic labeling of dolphin vocalization types from audio properties."""
    
    # Vocalization type detection based on spectral characteristics
    # (These are frequency ranges; alp-data may provide spectral info or we'll compute it)
    VOCALIZATION_RANGES = {
        'whistle': {
            'freq_min': 4000,
            'freq_max': 25000,
            'description': 'Narrow-band signature/contact whistle',
        },
        'burst_pulse': {
            'freq_min': 40000,
            'freq_max': 130000,
            'description': 'Rapid click train (social/emotional context)',
        },
        'echolocation': {
            'freq_min': 40000,
            'freq_max': 150000,
            'description': 'Regular click pattern (foraging/navigation)',
        },
    }
    
    @staticmethod
    def label_vocalization(recording: DolphinRecording) -> Tuple[Optional[str], str]:
        """
        Heuristically label vocalization type.
        
        In Phase 2, this will be enhanced with actual spectral analysis.
        For now, returns a default based on species + context.
        
        Returns:
            (vocalization_type, description)
        """
        # Default heuristic: use species as proxy
        # Bottlenose: mixed (whistles + burst-pulses)
        # Spinner: primarily whistles
        # Spotted: mixed
        
        species = recording.species.lower()
        
        if 'spinner' in species:
            vtype = 'whistle'
        elif 'bottlenose' in species:
            vtype = 'burst_pulse'  # Bottlenose known for high burst-pulse usage
        else:
            vtype = 'whistle'  # Default
        
        return vtype, DolphinVocalizationHeuristic.VOCALIZATION_RANGES[vtype]['description']
    
    @staticmethod
    def generate_annotation(recording: DolphinRecording, vocalization_type: str) -> str:
        """
        Generate natural-language annotation for audio-text pair.
        
        Args:
            recording: DolphinRecording
            vocalization_type: 'whistle', 'burst_pulse', or 'echolocation'
        
        Returns:
            Natural-language description
        """
        species_name = {
            'bottlenose': 'bottlenose dolphin',
            'spinner': 'spinner dolphin',
            'spotted': 'spotted dolphin',
        }.get(recording.species, 'dolphin')
        
        location_context = f"from {recording.location}" if recording.location != 'Unknown' else ""
        
        templates = {
            'whistle': f"{species_name.title()} signature whistle {location_context}",
            'burst_pulse': f"{species_name.title()} burst-pulse call (social context) {location_context}",
            'echolocation': f"{species_name.title()} echolocation clicks (foraging behavior) {location_context}",
        }
        
        return templates.get(vocalization_type, f"{species_name} vocalization").strip()


def main():
    """Quick test of the pipeline scaffold."""
    logger.basicConfig(level=logging.INFO)
    
    # This will fail until alp-data is installed, which is fine for Phase 1 review
    try:
        loader = WatkinsMMSDLoader()
        logger.info("✓ WatkinsMMSDLoader initialized (ready for Phase 2)")
    except ImportError as e:
        logger.warning(f"alp-data not installed (expected in Phase 1): {e}")
        logger.info("Install with: pip install alp-data")


if __name__ == '__main__':
    main()
