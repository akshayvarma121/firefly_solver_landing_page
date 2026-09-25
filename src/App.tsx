import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-text-primary selection:bg-signal selection:text-background">
      
      {/* Navigation - Elegant, readable, but still structured */}
      <header className="fixed top-0 w-full z-50 flex justify-center border-b border-border bg-background/95 backdrop-blur-sm uppercase">
        <div className="w-full max-w-7xl px-6 md:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group">
            <div className="w-8 h-8 bg-signal group-hover:bg-text-primary transition-colors" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
            <span className="font-bold tracking-widest text-lg">FIREFLY</span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-xs font-bold tracking-[0.15em] text-text-muted">
            <a href="#architecture" className="hover:text-signal transition-colors">Architecture</a>
            <a href="#benchmarks" className="hover:text-signal transition-colors">Benchmarks</a>
            <a href="#download" className="hover:text-signal transition-colors">Download</a>
          </nav>
          
          <div className="hidden md:flex">
             <span className="px-4 py-2 border border-border text-xs font-mono tracking-widest text-text-muted">v0.1.0</span>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        
        {/* HERO - Asymmetrical split */}
        <section className="relative min-h-[85vh] flex flex-col md:flex-row border-b border-border overflow-hidden">
          {/* Flat Watermark Logo */}
          <div className="absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] bg-border opacity-20 pointer-events-none" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>

          <div className="w-full md:w-3/5 border-r border-border flex flex-col justify-end p-6 md:p-12 md:pb-24 z-10">
            <h1 className="text-7xl md:text-[11vw] font-bold tracking-tighter leading-[0.85] mb-6 uppercase">
              FIREFLY
              <br />
              <span className="text-signal">SOLVER</span>
            </h1>
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col z-10 bg-background/50 backdrop-blur-sm">
            <div className="flex-grow p-6 md:p-12 border-b border-border flex items-end">
              <div>
                <div className="w-3 h-3 bg-signal mb-6"></div>
                <p className="text-lg md:text-xl leading-relaxed text-text-muted font-light">
                  A fast, open-source alternative to expensive commercial solvers. Designed from the ground up to be completely transparent and heavily accelerated by modern GPUs.
                </p>
              </div>
            </div>
            <a href="#download" className="block w-full p-8 md:p-12 bg-signal text-background font-bold text-xl hover:bg-text-primary transition-colors tracking-widest flex justify-between items-center group uppercase">
              GET STARTED
              <span className="font-mono transform group-hover:translate-x-4 transition-transform">---&gt;</span>
            </a>
          </div>
        </section>

        {/* TELEMETRY & PHILOSOPHY - Split Screen */}
        <section className="flex flex-col lg:flex-row border-b border-border">
          {/* Telemetry Window */}
          <div className="w-full lg:w-1/2 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center bg-panel">
              <span className="font-mono text-xs tracking-widest text-text-muted uppercase">Terminal Output</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-signal animate-pulse-slow"></div>
              </div>
            </div>
            <div className="flex-grow p-6 md:p-12 bg-background overflow-x-auto">
              <pre className="font-mono text-xs md:text-sm leading-[2.5] text-text-muted">
                <span className="text-signal font-bold">$ firefly solve</span> data/model.mps --method auto --gpu<br/>
                <br/>
                <span className="text-text-primary">[SYSTEM]</span> Allocating device memory... [OK]<br/>
                <span className="text-text-primary">[SYSTEM]</span> Parsing input... Vars: <span className="text-text-primary">4096</span>, Constrs: <span className="text-text-primary">12288</span><br/>
                <span className="text-text-primary">[SYSTEM]</span> Presolve applied. <span className="text-text-primary">142</span> rows removed.<br/>
                <br/>
                <span className="text-trace-secondary">[ENGINE]</span> Dispatching to CUDA kernel (sm_89)...<br/>
                <span className="text-border">------------------------------------------------</span><br/>
                <span className="text-text-primary">[ITER]</span> 1000 | Pr: -420.50 | Du: -480.10 | Gap: 1.2e-01<br/>
                <span className="text-text-primary">[ITER]</span> 2000 | Pr: -464.20 | Du: -465.10 | Gap: 2.1e-03<br/>
                <span className="text-text-primary">[ITER]</span> 3000 | Pr: -464.75 | Du: -464.75 | Gap: &lt; 1e-06<br/>
                <span className="text-border">------------------------------------------------</span><br/>
                <br/>
                <span className="text-signal font-bold">[STATUS] OPTIMAL</span> | Wall time: <span className="text-text-primary">120.5ms</span><br/>
                <span className="text-signal">$ <span className="animate-blink inline-block w-2.5 h-4 bg-signal translate-y-1"></span></span>
              </pre>
            </div>
          </div>

          {/* Philosophy list */}
          <div className="w-full lg:w-1/2 flex flex-col bg-panel">
            <div className="p-6 md:p-12 border-b border-border">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Transparent by Design</h2>
            </div>
            
            <div className="flex-grow flex flex-col">
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal font-bold">01</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 uppercase">Clear Logic</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-light">Every step is clear and testable. There is no hidden logic or secret algorithms—you can see exactly how your problem is being solved.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal font-bold">02</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 uppercase">Honest Results</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-light">We don't hide our results. Our benchmarks clearly show where Firefly excels and where traditional CPU solvers still win.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal font-bold">03</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 uppercase">Self-Verifying</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-light">Every single run checks its own work. We rigorously verify the math against your primal and dual constraints to guarantee accuracy.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal font-bold">04</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-3 uppercase">Easy to Extend</h3>
                  <p className="text-sm text-text-muted leading-relaxed font-light">Built with a clean three-tier architecture, making it incredibly easy to add new features or integrate with your existing tools.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="border-b border-border flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 p-6 md:p-12 border-r border-border bg-signal text-background flex flex-col justify-between">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] mb-12 uppercase">
              Built for Graphics Cards
            </h2>
            <div className="text-lg leading-relaxed font-medium">
              We designed Firefly specifically for GPUs. By replacing traditional, slow sequential math with modern parallel algorithms, we can solve massive problems significantly faster.
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="p-8 md:p-12 border-b border-border flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">01</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">Core Engine</h3>
                <div className="font-mono text-xs tracking-widest uppercase text-signal mb-4">C++20 & CUDA</div>
                <p className="text-text-muted leading-relaxed max-w-xl font-light">The absolute heart of Firefly. It reads your files, simplifies the math, and runs our high-speed parallel solver directly on your graphics card.</p>
              </div>
            </div>
            <div className="p-8 md:p-12 border-b border-border flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">02</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">API Gateway</h3>
                <div className="font-mono text-xs tracking-widest uppercase text-trace-secondary mb-4">PYTHON & FASTAPI</div>
                <p className="text-text-muted leading-relaxed max-w-xl font-light">The bridge that connects the engine to the outside world. It provides clean endpoints and live streaming data so you can monitor the solver in real-time.</p>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">03</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2 uppercase">Desktop App</h3>
                <div className="font-mono text-xs tracking-widest uppercase text-text-primary mb-4">REACT & TAURI</div>
                <p className="text-text-muted leading-relaxed max-w-xl font-light">A beautiful, easy-to-use application that runs on your computer. It gives you live charts, performance stats, and a clear breakdown of exactly what the solver is doing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENCHMARKS */}
        <section id="benchmarks" className="p-6 md:p-12 border-b border-border">
          <div className="max-w-7xl mx-auto py-12 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase">Benchmarks</h2>
              <p className="font-mono text-xs text-text-muted tracking-widest uppercase">GPU vs CPU Performance</p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/4">
                  <h3 className="text-2xl font-bold uppercase">AFIRO.MPS</h3>
                  <p className="font-mono text-xs text-text-muted uppercase">NETLIB LP</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs uppercase">
                  <div className="flex items-center gap-4">
                    <div className="w-[10%] h-12 bg-signal flex items-center px-4 text-background font-bold">0.12s</div>
                    <span className="text-signal tracking-widest">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[35%] h-12 bg-panel border border-border flex items-center px-4">0.45s</div>
                    <span className="text-text-muted tracking-widest">CPU</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center pt-12 border-t border-border/50">
                <div className="w-full md:w-1/4">
                  <h3 className="text-2xl font-bold uppercase">EGOUT.MPS</h3>
                  <p className="font-mono text-xs text-text-muted uppercase">NETLIB LP</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs uppercase">
                  <div className="flex items-center gap-4">
                    <div className="w-[20%] h-12 bg-signal flex items-center px-4 text-background font-bold">0.80s</div>
                    <span className="text-signal tracking-widest">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[80%] h-12 bg-panel border border-border flex items-center px-4">3.20s</div>
                    <span className="text-text-muted tracking-widest">CPU</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center pt-12 border-t border-border/50">
                <div className="w-full md:w-1/4">
                  <h3 className="text-2xl font-bold uppercase">FLUGPL.MPS</h3>
                  <p className="font-mono text-xs text-text-muted uppercase">MIPLIB</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs uppercase">
                  <div className="flex items-center gap-4">
                    <div className="w-[15%] h-12 bg-trace-secondary flex items-center px-4 text-background font-bold">4.50s</div>
                    <span className="text-trace-secondary tracking-widest">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-full h-12 bg-panel border border-border flex items-center px-4">28.30s</div>
                    <span className="text-text-muted tracking-widest">CPU</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEPLOY */}
        <section id="download" className="flex flex-col lg:flex-row border-b border-border bg-panel">
          
          {/* CLI */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 border-r border-border flex flex-col">
            <div className="font-mono text-xs text-signal tracking-widest mb-4 uppercase">Command Line Interface</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 uppercase">CLI Tool</h2>
            
            <div className="mb-12">
              <p className="font-mono text-xs tracking-widest text-text-muted mb-4 uppercase">Quick Install</p>
              <div className="bg-background border border-border p-4 flex justify-between items-center cursor-pointer hover:border-signal transition-colors"
                   onClick={() => navigator.clipboard.writeText('irm https://bit.ly/install-firefly | iex')}>
                <code className="text-signal font-mono text-sm">irm https://bit.ly/install-firefly | iex</code>
                <span className="font-mono text-xs text-text-muted uppercase">COPY</span>
              </div>
            </div>

            <div className="flex-grow">
              <p className="font-mono text-xs tracking-widest text-text-muted mb-4 uppercase">Command Reference</p>
              <pre className="bg-background border border-border p-6 overflow-x-auto text-[10px] md:text-xs font-mono leading-[2.5] text-text-muted">
                <span className="text-text-primary font-bold">▶ CORE COMMANDS</span><br/>
                <span className="text-signal">firefly solve</span> &lt;file.mps&gt;      <span className="opacity-50">Solve single problem</span><br/>
                <span className="text-signal">firefly solve-batch</span> &lt;dir&gt;       <span className="opacity-50">Solve directory</span><br/>
                <br/>
                <span className="text-text-primary font-bold">▶ TESTING</span><br/>
                <span className="text-signal">firefly benchmark</span> &lt;dir&gt;         <span className="opacity-50">Compare vs optimums</span><br/>
                <span className="text-signal">firefly test-standard</span>           <span className="opacity-50">Run Netlib</span><br/>
                <span className="text-signal">firefly test</span>                    <span className="opacity-50">Run core tests</span><br/>
                <br/>
                <span className="text-text-primary font-bold">▶ UTILITIES</span><br/>
                <span className="text-signal">firefly update</span>                  <span className="opacity-50">Auto-update</span><br/>
              </pre>
            </div>
          </div>

          {/* APP */}
          <div className="w-full lg:w-1/2 p-6 md:p-12 lg:p-20 flex flex-col">
            <div className="font-mono text-xs text-trace-secondary tracking-widest mb-4 uppercase">Desktop Interface</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12 uppercase">Desktop App</h2>
            
            <p className="text-lg text-text-muted leading-relaxed mb-12 font-light">
              A beautiful, standalone application that gives you a complete visual dashboard. Perfect for testing, learning, and deeply analyzing how your models are solved.
            </p>
            
            <div className="space-y-4 mb-12 flex-grow">
              <div className="p-5 border border-border bg-background flex gap-4 items-center text-sm font-light text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary rounded-full"></div>
                Live convergence telemetry & tracing
              </div>
              <div className="p-5 border border-border bg-background flex gap-4 items-center text-sm font-light text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary rounded-full"></div>
                Automated benchmarking tables
              </div>
              <div className="p-5 border border-border bg-background flex gap-4 items-center text-sm font-light text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary rounded-full"></div>
                Interactive step-through narrative
              </div>
            </div>
            
            <a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="block text-center w-full px-8 py-5 border border-trace-secondary text-trace-secondary hover:bg-trace-secondary hover:text-background font-bold text-sm transition-colors tracking-widest uppercase">
              Download Executable
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 lg:p-24 border-r border-b md:border-b-0 border-border flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-signal mb-8" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'left' }}></div>
            <h2 className="text-4xl font-bold tracking-tighter mb-4 uppercase">FIREFLY</h2>
            <p className="text-sm text-text-muted max-w-sm leading-relaxed font-light">A powerful, open-source alternative to commercial solvers. Built from the ground up for speed, transparency, and modern GPUs.</p>
          </div>
          <div className="mt-12 font-mono text-xs tracking-widest text-border uppercase">
            &copy; 2026 THE FIREFLIES // SIH 26119
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex-1 flex border-b border-border">
            <div className="w-1/2 p-12 border-r border-border">
              <div className="font-mono text-xs tracking-widest text-text-primary mb-8 border-b border-border pb-4 uppercase">Quick Links</div>
              <div className="flex flex-col gap-4 font-bold text-sm tracking-widest uppercase">
                <a href="#architecture" className="hover:text-signal transition-colors">Architecture</a>
                <a href="#benchmarks" className="hover:text-signal transition-colors">Benchmarks</a>
                <a href="#download" className="hover:text-signal transition-colors">Download</a>
              </div>
            </div>
            <div className="w-1/2 p-12">
              <div className="font-mono text-xs tracking-widest text-text-primary mb-8 border-b border-border pb-4 uppercase">Resources</div>
              <div className="flex flex-col gap-4 font-bold text-sm tracking-widest uppercase">
                <a href="https://github.com/akshayvarma121/Firefly_solver" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">GitHub</a>
                <a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">Releases</a>
                <span className="text-border cursor-not-allowed">Docs</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-signal text-background font-bold flex justify-between items-center text-sm tracking-widest uppercase">
            <span>System Operational</span>
            <span>Version 0.1.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
