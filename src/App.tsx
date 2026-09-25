import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-text-primary selection:bg-signal selection:text-background uppercase">
      {/* Navigation - Ultra minimal */}
      <header className="fixed top-0 w-full z-50 flex border-b border-border bg-background">
        <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0 flex items-center justify-center border-r border-border bg-signal group cursor-pointer transition-colors hover:bg-text-primary">
          <div className="w-8 h-8 bg-background" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
        </div>
        <div className="flex-grow flex justify-between items-center px-6">
          <div className="font-bold tracking-widest text-sm">FIREFLY // V0.1.0</div>
          <nav className="hidden md:flex gap-12 text-xs font-mono tracking-[0.2em] text-text-muted">
            <a href="#architecture" className="hover:text-signal transition-colors">ARCHITECTURE</a>
            <a href="#benchmarks" className="hover:text-signal transition-colors">BENCHMARKS</a>
            <a href="#download" className="hover:text-signal transition-colors">DOWNLOAD</a>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-16 md:pt-20">
        
        {/* HERO - Asymmetrical split */}
        <section className="relative min-h-[85vh] flex flex-col md:flex-row border-b border-border overflow-hidden">
          {/* Flat Watermark Logo */}
          <div className="absolute right-[-10vw] top-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] bg-border opacity-20 pointer-events-none" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>

          <div className="w-full md:w-3/5 border-r border-border flex flex-col justify-end p-6 md:p-12 md:pb-24 z-10">
            <h1 className="text-7xl md:text-[11vw] font-bold tracking-tighter leading-[0.8] mb-6">
              FIREFLY
              <br />
              <span className="text-signal">SOLVER</span>
            </h1>
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col z-10">
            <div className="flex-grow p-6 md:p-12 border-b border-border flex items-end">
              <div>
                <div className="w-3 h-3 bg-signal mb-6"></div>
                <p className="font-mono text-sm leading-relaxed tracking-widest text-text-muted normal-case">
                  A sovereign, inspectable alternative to commercial solvers. Built entirely from mathematical first principles and strictly engineered for GPU acceleration.
                </p>
              </div>
            </div>
            <a href="#download" className="block w-full p-8 md:p-12 bg-signal text-background font-bold text-xl hover:bg-text-primary transition-colors tracking-widest flex justify-between items-center group">
              DOWNLOAD FIREFLY
              <span className="font-mono transform group-hover:translate-x-4 transition-transform">---&gt;</span>
            </a>
          </div>
        </section>

        {/* TELEMETRY & PHILOSOPHY - Split Screen */}
        <section className="flex flex-col lg:flex-row border-b border-border">
          {/* Telemetry Window */}
          <div className="w-full lg:w-1/2 border-r border-border flex flex-col">
            <div className="p-4 border-b border-border flex justify-between items-center bg-panel">
              <span className="font-mono text-xs tracking-widest text-text-muted">TERMINAL OUTPUT</span>
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-signal animate-pulse-slow"></div>
              </div>
            </div>
            <div className="flex-grow p-6 md:p-12 bg-background overflow-x-auto">
              <pre className="font-mono text-xs md:text-sm leading-[2.5] text-text-muted normal-case">
                <span className="text-signal font-bold">$ firefly solve</span> data/model.mps --method auto --gpu<br/>
                <br/>
                <span className="text-text-primary">[SYSTEM]</span> Allocating device memory... [OK]<br/>
                <span className="text-text-primary">[SYSTEM]</span> Parsing MPS input... Vars: <span className="text-text-primary">4096</span>, Constrs: <span className="text-text-primary">12288</span><br/>
                <span className="text-text-primary">[SYSTEM]</span> Presolve applied. <span className="text-text-primary">142</span> rows removed.<br/>
                <br/>
                <span className="text-trace-secondary">[ENGINE]</span> Dispatching to PDLP CUDA kernel (sm_89)...<br/>
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
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">ZERO BLACK BOXES</h2>
            </div>
            
            <div className="flex-grow flex flex-col">
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal">01</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">TRANSPARENT</h3>
                  <p className="font-mono text-xs text-text-muted normal-case leading-relaxed">Every stage is traceable, narrated, and testable. No hidden proprietary logic.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal">02</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">HONEST</h3>
                  <p className="font-mono text-xs text-text-muted normal-case leading-relaxed">No mock results returned without explicit flags. We report benchmarking wins and losses plainly.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 border-b border-border flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal">03</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">VERIFIABLE</h3>
                  <p className="font-mono text-xs text-text-muted normal-case leading-relaxed">Every solve produces a rigorous self-check against primal and dual constraints.</p>
                </div>
              </div>
              <div className="flex-1 p-6 md:p-10 flex items-start gap-6 hover:bg-background transition-colors group">
                <div className="font-mono text-signal">04</div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-2">EXTENSIBLE</h3>
                  <p className="font-mono text-xs text-text-muted normal-case leading-relaxed">Three-tier separation cleanly abstracts logic spanning LP, MILP, and QP.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="border-b border-border flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 p-6 md:p-12 border-r border-border bg-signal text-background flex flex-col justify-between">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.85] mb-12">
              GPU NATIVE ARCHITECTURE
            </h2>
            <div className="font-mono text-sm font-bold normal-case leading-relaxed">
              Replacing sequential matrix factorizations with massively parallel sparse matrix-vector multiplications via Primal-Dual Hybrid Gradient (PDHG).
            </div>
          </div>
          <div className="w-full lg:w-2/3 flex flex-col">
            <div className="p-8 md:p-12 border-b border-border flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">01</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">CORE ENGINE</h3>
                <div className="font-mono text-xs text-signal mb-4">C++20 & CUDA SM_89</div>
                <p className="font-mono text-xs text-text-muted normal-case leading-relaxed max-w-xl">MPS parsing, presolve reductions, CPU Simplex fallback, and the highly parallel PDLP CUDA solver executing on GPU hardware.</p>
              </div>
            </div>
            <div className="p-8 md:p-12 border-b border-border flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">02</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">API GATEWAY</h3>
                <div className="font-mono text-xs text-trace-secondary mb-4">PYTHON & FASTAPI</div>
                <p className="font-mono text-xs text-text-muted normal-case leading-relaxed max-w-xl">Bridging the core via pybind11. Exposes REST endpoints, WebSocket streaming for telemetry, and the step-by-step narration system.</p>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start">
              <div className="font-mono text-4xl text-border font-bold">03</div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight mb-2">CONTROL INTERFACE</h3>
                <div className="font-mono text-xs text-text-primary mb-4">REACT & TAURI</div>
                <p className="font-mono text-xs text-text-muted normal-case leading-relaxed max-w-xl">A scientific instrumentation UI presenting live convergence tracing, hardware telemetry, and architectural analysis locally.</p>
              </div>
            </div>
          </div>
        </section>

        {/* BENCHMARKS */}
        <section id="benchmarks" className="p-6 md:p-12 border-b border-border">
          <div className="max-w-7xl mx-auto py-12 md:py-24">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-border pb-6">
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">BENCHMARKS</h2>
              <p className="font-mono text-xs text-text-muted tracking-widest">GPU (PDHG) VS CPU (SIMPLEX/B&B)</p>
            </div>
            
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/4">
                  <h3 className="text-2xl font-bold">AFIRO.MPS</h3>
                  <p className="font-mono text-xs text-text-muted">NETLIB LP</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs">
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
                  <h3 className="text-2xl font-bold">EGOUT.MPS</h3>
                  <p className="font-mono text-xs text-text-muted">NETLIB LP</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs">
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
                  <h3 className="text-2xl font-bold">FLUGPL.MPS</h3>
                  <p className="font-mono text-xs text-text-muted">MIPLIB</p>
                </div>
                <div className="w-full md:w-3/4 space-y-2 font-mono text-xs">
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
            <div className="font-mono text-xs text-signal tracking-widest mb-4">COMMAND LINE INTERFACE</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">CLI TOOL</h2>
            
            <div className="mb-12">
              <p className="font-mono text-xs tracking-widest text-text-muted mb-4">POWERSHELL INSTALL</p>
              <div className="bg-background border border-border p-4 flex justify-between items-center cursor-pointer hover:border-signal transition-colors"
                   onClick={() => navigator.clipboard.writeText('irm https://bit.ly/install-firefly | iex')}>
                <code className="text-signal font-mono text-sm normal-case">irm https://bit.ly/install-firefly | iex</code>
                <span className="font-mono text-xs text-text-muted">COPY</span>
              </div>
            </div>

            <div className="flex-grow">
              <p className="font-mono text-xs tracking-widest text-text-muted mb-4">COMMAND REF</p>
              <pre className="bg-background border border-border p-6 overflow-x-auto text-[10px] md:text-xs font-mono leading-[2.5] text-text-muted normal-case">
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
            <div className="font-mono text-xs text-trace-secondary tracking-widest mb-4">DESKTOP APPLICATION</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-12">DESKTOP APP</h2>
            
            <p className="font-mono text-sm text-text-muted normal-case leading-relaxed mb-12">
              A standalone Tauri executable providing a highly polished, instrument-panel-styled interface. Perfect for demonstrations and deep-dive architectural analysis.
            </p>
            
            <div className="space-y-4 mb-12 flex-grow">
              <div className="p-4 border border-border bg-background flex gap-4 items-center font-mono text-xs normal-case text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary"></div>
                Live convergence telemetry & tracing
              </div>
              <div className="p-4 border border-border bg-background flex gap-4 items-center font-mono text-xs normal-case text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary"></div>
                Automated benchmarking tables
              </div>
              <div className="p-4 border border-border bg-background flex gap-4 items-center font-mono text-xs normal-case text-text-muted">
                <div className="w-2 h-2 bg-trace-secondary"></div>
                Interactive step-through narrative
              </div>
            </div>
            
            <a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="block text-center w-full px-8 py-5 border border-trace-secondary text-trace-secondary hover:bg-trace-secondary hover:text-background font-bold text-sm transition-colors tracking-widest">
              DOWNLOAD EXECUTABLE
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-background flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-12 lg:p-24 border-r border-b md:border-b-0 border-border flex flex-col justify-between">
          <div>
            <div className="w-16 h-16 bg-signal mb-8" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'left' }}></div>
            <h2 className="text-4xl font-bold tracking-tighter mb-4">FIREFLY</h2>
            <p className="font-mono text-xs text-text-muted normal-case max-w-sm leading-relaxed">A sovereign, inspectable alternative to commercial solvers—built entirely from mathematical first principles.</p>
          </div>
          <div className="mt-12 font-mono text-xs tracking-widest text-border">
            &copy; 2026 THE FIREFLIES // SIH 26119
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex-1 flex border-b border-border">
            <div className="w-1/2 p-12 border-r border-border">
              <div className="font-mono text-xs tracking-widest text-text-primary mb-8 border-b border-border pb-4">QUICK LINKS</div>
              <div className="flex flex-col gap-4 font-bold text-sm tracking-widest">
                <a href="#architecture" className="hover:text-signal transition-colors">ARCHITECTURE</a>
                <a href="#benchmarks" className="hover:text-signal transition-colors">BENCHMARKS</a>
                <a href="#download" className="hover:text-signal transition-colors">DOWNLOAD</a>
              </div>
            </div>
            <div className="w-1/2 p-12">
              <div className="font-mono text-xs tracking-widest text-text-primary mb-8 border-b border-border pb-4">RESOURCES</div>
              <div className="flex flex-col gap-4 font-bold text-sm tracking-widest">
                <a href="https://github.com/akshayvarma121/Firefly_solver" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">GITHUB</a>
                <a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors">RELEASES</a>
                <span className="text-border cursor-not-allowed">DOCS</span>
              </div>
            </div>
          </div>
          <div className="p-6 bg-signal text-background font-bold flex justify-between items-center text-sm tracking-widest">
            <span>SYSTEM OPERATIONAL</span>
            <span>VERSION 0.1.0</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
