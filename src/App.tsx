
function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-text-primary selection:bg-signal selection:text-background">
      {/* Navigation / Header */}
      <header className="sticky top-0 z-50 p-6 md:px-12 flex justify-between items-center border-b border-border bg-background">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rotate-45 bg-signal"></div>
          <div className="text-xl font-bold tracking-tight text-signal uppercase">Firefly</div>
        </div>
        <nav className="flex gap-6 text-sm font-mono tracking-wide text-text-muted">
          <a href="#architecture" className="hover:text-signal transition-colors">ARCHITECTURE</a>
          <a href="#benchmarks" className="hover:text-signal transition-colors">BENCHMARKS</a>
          <a href="#download" className="hover:text-signal transition-colors">DOWNLOAD</a>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 md:px-12 flex flex-col items-center text-center border-b border-border overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
          </div>
          
          <div className="relative z-10 w-full max-w-5xl">
            <div className="inline-block px-3 py-1 border border-border text-text-muted font-mono text-xs mb-8">
              SYSTEM STATUS: ONLINE / CUDA sm_89 READY
            </div>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 text-text-primary tracking-tighter uppercase">
              <span className="text-signal">Firefly</span> Solver
            </h1>
            <p className="text-2xl md:text-4xl text-text-muted mb-10 max-w-4xl mx-auto font-light">
              Indigenous GPU-Accelerated Optimization Solver
            </p>
            <div className="flex justify-center">
              <p className="text-lg md:text-xl text-text-muted max-w-3xl border-l-2 border-signal pl-6 text-left leading-relaxed">
                A sovereign, inspectable alternative to commercial solvers—built entirely from mathematical first principles and accelerated on the GPU. Covering LP, MILP, and QP without external black-box dependencies.
              </p>
            </div>
            
            <div className="mt-16 flex flex-col sm:flex-row justify-center gap-4">
              <a href="#download" className="px-8 py-4 bg-signal text-background font-bold text-lg hover:bg-opacity-90 transition-opacity uppercase tracking-wider">
                Deploy Now
              </a>
              <a href="#architecture" className="px-8 py-4 bg-transparent border border-border text-text-primary font-bold text-lg hover:border-signal transition-colors uppercase tracking-wider">
                View System Specs
              </a>
            </div>
          </div>
        </section>

        {/* Console / Terminal Section */}
        <section className="py-24 px-6 md:px-12 bg-panel border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="border border-border bg-background p-1 text-text-muted font-mono text-sm flex gap-2 border-b-0">
              <div className="w-3 h-3 bg-border"></div>
              <div className="w-3 h-3 bg-border"></div>
              <div className="w-3 h-3 bg-border"></div>
              <span className="ml-4 tracking-widest text-xs uppercase">firefly-cli</span>
            </div>
            <pre className="border border-border p-6 overflow-x-auto text-sm font-mono leading-loose text-text-muted">
              <span className="text-signal">$ firefly solve</span> model.mps --method auto --gpu<br/><br/>
              [SYSTEM] Parsing MPS input... Vars: 4096, Constrs: 12288<br/>
              [SYSTEM] Presolve applied. 142 rows removed, 89 bounds tightened.<br/>
              [ENGINE] Dispatching to PDLP CUDA kernel (sm_89)...<br/>
              [UPDATE] Iteration 1000 | Primal: -420.5 | Dual: -480.1 | Gap: 0.12<br/>
              [UPDATE] Iteration 2000 | Primal: -464.2 | Dual: -465.1 | Gap: 0.002<br/>
              [UPDATE] Iteration 3000 | Primal: -464.753 | Dual: -464.753 | Gap: &lt; 1e-6<br/>
              [STATUS] <span className="text-signal">OPTIMAL</span> | Wall time: 120.5ms<br/>
            </pre>
          </div>
        </section>

        {/* Philosophy & Features */}
        <section className="py-24 px-6 md:px-12 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-text-primary uppercase tracking-wider border-l-4 border-signal pl-4">Design Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-6 border border-border bg-panel hover:border-signal transition-colors duration-300">
                <div className="w-8 h-8 border border-signal mb-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-signal"></div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Transparent</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Every stage is traceable, narrated, and testable. Zero black-box implementations.
                </p>
              </div>
              <div className="p-6 border border-border bg-panel hover:border-signal transition-colors duration-300">
                <div className="w-8 h-8 border border-signal mb-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-signal"></div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Honest</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  No mock results returned without an explicit flag. We report wins and losses plainly.
                </p>
              </div>
              <div className="p-6 border border-border bg-panel hover:border-signal transition-colors duration-300">
                <div className="w-8 h-8 border border-signal mb-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-signal"></div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Verifiable</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Every solve produces a self-check against constraints before returning optimal status.
                </p>
              </div>
              <div className="p-6 border border-border bg-panel hover:border-signal transition-colors duration-300">
                <div className="w-8 h-8 border border-signal mb-6 flex items-center justify-center">
                  <div className="w-2 h-2 bg-signal"></div>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">Extensible</h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  Three-tier separation allows seamless algorithm improvements spanning LP, MILP, and QP.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture & Math */}
        <section id="architecture" className="py-24 px-6 md:px-12 bg-panel border-b border-border">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-text-primary uppercase tracking-wider border-l-4 border-signal pl-4">GPU-Native Architecture</h2>
              <div className="space-y-6">
                <div className="border border-border bg-background p-6">
                  <h3 className="text-lg font-bold text-signal mb-2 uppercase">Tier 1: Core Engine (C++20 & CUDA)</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    MPS parsing, presolve reductions, CPU Simplex fallback, and the highly parallel PDLP CUDA solver executing on sm_89 hardware.
                  </p>
                </div>
                <div className="border border-border bg-background p-6">
                  <h3 className="text-lg font-bold text-signal mb-2 uppercase">Tier 2: API Gateway (Python & FastAPI)</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    Bridging the core via pybind11. Exposes REST endpoints, WebSocket streaming for telemetry, and the step-by-step narration system.
                  </p>
                </div>
                <div className="border border-border bg-background p-6">
                  <h3 className="text-lg font-bold text-signal mb-2 uppercase">Tier 3: Control Interface (React & Tauri)</h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    A scientific instrumentation UI presenting live convergence tracing, hardware telemetry, and architectural analysis locally.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 border border-border">
              <div className="flex justify-between items-center mb-8 border-b border-border pb-4">
                <h3 className="text-xl font-bold text-text-primary uppercase">The Math: PDHG</h3>
                <div className="font-mono text-xs text-text-muted">Primal-Dual Hybrid Gradient</div>
              </div>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Traditional solvers rely on sequential matrix factorizations that bottleneck on a single CPU core. 
              </p>
              <p className="text-text-muted text-lg leading-relaxed mb-6">
                Firefly implements a first-order method that replaces complex factorizations with massively parallel sparse matrix-vector multiplications, utilizing <span className="text-signal">cuSPARSE</span> and <span className="text-signal">cuBLAS</span>.
              </p>
              <p className="text-text-muted text-lg leading-relaxed border-l-2 border-trace-secondary pl-4">
                This architecture is perfectly suited for the thousands of concurrent threads available on modern GPUs, enabling rapid convergence on massive problem instances.
              </p>
            </div>
          </div>
        </section>

        {/* Benchmarks */}
        <section id="benchmarks" className="py-24 px-6 md:px-12 border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary uppercase tracking-wider border-l-4 border-signal pl-4">Performance Audit</h2>
              <p className="text-text-muted font-mono text-sm uppercase">Baseline: GPU (CUDA sm_89) vs CPU (Simplex/B&B)</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-border bg-panel relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-signal opacity-10 group-hover:opacity-20 transition-opacity" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-text-primary font-bold text-xl uppercase tracking-wide">afiro.mps</div>
                    <div className="px-2 py-1 bg-background border border-border text-xs font-mono text-text-muted">Netlib LP</div>
                  </div>
                  <div className="flex items-end gap-4 mb-4">
                    <div className="text-5xl font-mono text-signal">0.12s</div>
                    <div className="text-text-muted font-mono text-sm pb-1 uppercase">GPU Time</div>
                  </div>
                  <div className="text-text-muted font-mono text-sm border-t border-border pt-4">
                    CPU Reference: 0.45s
                  </div>
                </div>
              </div>
              
              <div className="border border-border bg-panel relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-signal opacity-10 group-hover:opacity-20 transition-opacity" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-text-primary font-bold text-xl uppercase tracking-wide">egout.mps</div>
                    <div className="px-2 py-1 bg-background border border-border text-xs font-mono text-text-muted">Netlib LP</div>
                  </div>
                  <div className="flex items-end gap-4 mb-4">
                    <div className="text-5xl font-mono text-signal">0.8s</div>
                    <div className="text-text-muted font-mono text-sm pb-1 uppercase">GPU Time</div>
                  </div>
                  <div className="text-text-muted font-mono text-sm border-t border-border pt-4">
                    CPU Reference: 3.2s
                  </div>
                </div>
              </div>

              <div className="border border-border bg-panel relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-16 h-16 bg-trace-secondary opacity-10 group-hover:opacity-20 transition-opacity" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}></div>
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-text-primary font-bold text-xl uppercase tracking-wide">flugpl.mps</div>
                    <div className="px-2 py-1 bg-background border border-border text-xs font-mono text-text-muted">MIPLIB</div>
                  </div>
                  <div className="flex items-end gap-4 mb-4">
                    <div className="text-5xl font-mono text-trace-secondary">4.5s</div>
                    <div className="text-text-muted font-mono text-sm pb-1 uppercase">GPU Time</div>
                  </div>
                  <div className="text-text-muted font-mono text-sm border-t border-border pt-4">
                    CPU Reference: 28.3s
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section id="download" className="py-32 px-6 md:px-12 bg-panel text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary uppercase tracking-tight">Deploy Firefly</h2>
            <p className="text-text-muted text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Available as a standalone Windows executable, a Python package via pip, or a full Tauri desktop telemetry client.
            </p>
            
            <div className="inline-block bg-background border border-border p-6 mb-12 text-left max-w-2xl w-full">
              <div className="text-xs font-mono text-text-muted mb-2 uppercase">Quick Install (Windows PowerShell)</div>
              <code className="text-signal font-mono text-lg break-all">
                irm https://bit.ly/install-firefly | iex
              </code>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="px-8 py-4 bg-signal text-background font-bold text-lg hover:bg-opacity-90 transition-opacity uppercase tracking-wider">
                Download Binaries
              </button>
              <button className="px-8 py-4 bg-transparent border border-border text-text-primary font-bold text-lg hover:border-signal transition-colors uppercase tracking-wider">
                View Documentation
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rotate-45 bg-signal opacity-50"></div>
            <div className="text-sm font-bold tracking-tight text-text-muted uppercase">Firefly</div>
          </div>
          <p className="text-text-muted text-sm font-mono uppercase tracking-widest">
            Developed by The Fireflies
          </p>
          <div className="text-text-muted text-xs font-mono">
            V0.1.0 // INTERNAL ENGINEERING REFERENCE
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
