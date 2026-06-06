export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/30">
        <div className="flex items-center gap-2">
          <span className="gradient-text font-display font-semibold">DolphinsIntuition</span>
          <span>— Listening at the edge of language.</span>
        </div>
        <div className="flex gap-6">
          <a href="https://huggingface.co/dolphinsintuition" target="_blank" rel="noopener" className="hover:text-teal-bio transition-colors">HuggingFace</a>
          <a href="https://github.com/dolphinsintuition" target="_blank" rel="noopener" className="hover:text-teal-bio transition-colors">GitHub</a>
        </div>
        <span>© 2026 Dolphins Intuition</span>
      </div>
    </footer>
  )
}
