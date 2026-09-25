import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation / Header */}
      <header className="p-6 md:p-12 flex justify-between items-center border-b border-border">
        <div className="text-xl font-bold tracking-tight text-signal">Firefly</div>
        <nav>
          <a href="#download" className="text-text-primary hover:text-signal transition-colors">Download</a>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 md:py-32 px-6 md:px-12 flex flex-col items-center text-center border-b border-border">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary tracking-tighter">
            <span className="text-signal">Firefly</span> Solver
          </h1>
          <p className="text-2xl md:text-3xl text-text-muted mb-8 max-w-3xl">
            [Tagline goes here]
          </p>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl border-l-2 border-signal pl-4 text-left">
            [One-line problem statement goes here]
          </p>
        </section>

        {/* How it works */}
        <section className="py-24 px-6 md:px-12 bg-panel border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary">How it works</h2>
            <div className="bg-background p-8 border border-border">
              <h3 className="text-xl font-bold text-signal mb-4">PDHG & GPU-Native Design</h3>
              <p className="text-text-muted text-lg leading-relaxed">
                [Placeholder for the pitch script's analogy explaining the PDHG/GPU-native differentiator]
              </p>
            </div>
          </div>
        </section>

        {/* Benchmark Teaser */}
        <section className="py-24 px-6 md:px-12 border-b border-border">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary">Netlib Benchmarks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Placeholders for actual Netlib results */}
              <div className="p-6 border border-border bg-panel">
                <div className="text-text-muted text-sm mb-2">Metric 1</div>
                <div className="text-4xl font-mono text-signal">[Data]</div>
              </div>
              <div className="p-6 border border-border bg-panel">
                <div className="text-text-muted text-sm mb-2">Metric 2</div>
                <div className="text-4xl font-mono text-signal">[Data]</div>
              </div>
              <div className="p-6 border border-border bg-panel">
                <div className="text-text-muted text-sm mb-2">Metric 3</div>
                <div className="text-4xl font-mono text-signal">[Data]</div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section (Phase 3.2) */}
        <section id="download" className="py-32 px-6 md:px-12 bg-panel text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary">Ready to get started?</h2>
          <p className="text-text-muted text-xl mb-10 max-w-2xl mx-auto">
            Download the latest version of Firefly for your platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-signal text-background font-bold text-lg hover:bg-opacity-90 transition-opacity">
              Download for Windows
            </button>
            <button className="px-8 py-4 bg-background border border-border text-text-primary font-bold text-lg hover:border-signal transition-colors">
              View Source
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border bg-background text-center">
        <p className="text-text-muted">
          Created with <span className="text-signal">♥</span> by <strong>The Fireflies</strong>.
        </p>
      </footer>
    </div>
  )
}

export default App
