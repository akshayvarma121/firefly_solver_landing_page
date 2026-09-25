import { useState, useEffect } from 'react';

function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-background text-text-primary selection:bg-signal selection:text-background">
      {/* Navigation / Header */}
      <header className="fixed top-0 w-full z-50 p-6 md:px-12 flex justify-between items-center border-b border-border bg-background/95 backdrop-blur-sm transition-all duration-300">
        <div className="flex items-center gap-4 group cursor-pointer">
          <div className="w-8 h-8 bg-signal group-hover:bg-text-primary transition-colors duration-300" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}></div>
          <div className="text-xl font-bold tracking-[0.2em] text-signal group-hover:text-text-primary transition-colors duration-300 uppercase">Firefly</div>
        </div>
        <nav className="hidden md:flex gap-10 text-xs font-mono tracking-widest text-text-muted">
          <a href="#architecture" className="hover:text-signal hover:-translate-y-0.5 transition-all duration-300">ARCHITECTURE</a>
          <a href="#benchmarks" className="hover:text-signal hover:-translate-y-0.5 transition-all duration-300">BENCHMARKS</a>
          <a href="#download" className="hover:text-signal hover:-translate-y-0.5 transition-all duration-300">DEPLOY</a>
        </nav>
        <div className="md:hidden">
          <div className="w-6 h-px bg-signal mb-1.5"></div>
          <div className="w-4 h-px bg-signal mb-1.5"></div>
          <div className="w-6 h-px bg-signal"></div>
        </div>
      </header>

      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex flex-col justify-center items-start border-b border-border bg-background">
          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between h-full py-20">
            
            <div className="animate-fade-in-up animation-delay-100 flex items-center gap-4 mb-20">
               <div className="w-12 h-12 bg-signal" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
               <div className="text-sm font-mono tracking-widest text-text-muted border-l border-border pl-4">v0.1.0 // CORE ENGINE</div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center mb-20">
              <h1 className="animate-fade-in-up animation-delay-200 text-7xl md:text-[12rem] font-bold mb-6 text-text-primary tracking-tighter uppercase leading-[0.85]">
                FIREFLY
                <br/>
                <span className="text-signal">SOLVER</span>
              </h1>
            </div>
            
            <div className="animate-fade-in-up animation-delay-300 grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-border w-full items-end">
              <div className="md:col-span-8">
                <h3 className="text-xl font-mono text-text-primary mb-4 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-2 h-2 bg-signal"></span>
                  The Premise
                </h3>
                <p className="text-xl md:text-3xl text-text-muted leading-snug font-light max-w-3xl">
                  A sovereign, inspectable alternative to commercial solvers. Built entirely from mathematical first principles and strictly engineered for GPU acceleration.
                </p>
              </div>
              <div className="md:col-span-4 flex justify-start md:justify-end">
                 <a href="#download" className="px-10 py-5 bg-signal text-background font-bold text-sm hover:bg-text-primary transition-colors uppercase tracking-[0.2em] w-full md:w-auto text-center">
                   INITIALIZE SYSTEM
                 </a>
              </div>
            </div>
            
          </div>
        </section>



        {/* Live Console Terminal */}
        <section className="py-32 px-6 md:px-12 bg-background border-b border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <h2 className="text-sm font-mono tracking-widest text-text-muted uppercase">Live Telemetry</h2>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-border"></div>
                <div className="w-2 h-2 bg-signal animate-pulse-slow"></div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-0.5 border border-border opacity-50 group-hover:border-signal/50 transition-colors duration-1000"></div>
              <div className="relative bg-panel border border-border">
                <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background/50">
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 bg-border/50 rounded-none"></div>
                    <div className="w-2.5 h-2.5 bg-border/50 rounded-none"></div>
                    <div className="w-2.5 h-2.5 bg-border/50 rounded-none"></div>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">firefly-core.exe</span>
                </div>
                <pre className="p-8 overflow-x-auto text-sm md:text-base font-mono leading-[2.5] text-text-muted">
                  <span className="text-signal font-bold">$ firefly solve</span> data/model.mps --method auto --gpu<br/>
                  <br/>
                  <span className="text-text-primary">[SYSTEM]</span> Allocating device memory... [OK]<br/>
                  <span className="text-text-primary">[SYSTEM]</span> Parsing MPS input... Vars: <span className="text-text-primary">4096</span>, Constrs: <span className="text-text-primary">12288</span><br/>
                  <span className="text-text-primary">[SYSTEM]</span> Presolve applied. <span className="text-text-primary">142</span> rows removed, <span className="text-text-primary">89</span> bounds tightened.<br/>
                  <br/>
                  <span className="text-trace-secondary">[ENGINE]</span> Dispatching to PDLP CUDA kernel (sm_89)...<br/>
                  <span className="text-text-muted opacity-50">----------------------------------------------------------------------</span><br/>
                  <span className="text-text-primary">[ITER]</span> 1000 | Primal: -420.500 | Dual: -480.100 | Gap: 1.2e-01<br/>
                  <span className="text-text-primary">[ITER]</span> 2000 | Primal: -464.200 | Dual: -465.100 | Gap: 2.1e-03<br/>
                  <span className="text-text-primary">[ITER]</span> 3000 | Primal: -464.753 | Dual: -464.753 | Gap: &lt; 1e-06<br/>
                  <span className="text-text-muted opacity-50">----------------------------------------------------------------------</span><br/>
                  <br/>
                  <span className="text-signal font-bold">[STATUS] OPTIMAL</span> | Obj: -464.753192 | Wall time: <span className="text-text-primary">120.5ms</span><br/>
                  <span className="text-signal">$ <span className="animate-blink inline-block w-2.5 h-4 bg-signal translate-y-1"></span></span>
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Grid */}
        <section className="py-32 px-6 md:px-12 border-b border-border bg-background">
          
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-20 text-text-primary uppercase tracking-tighter">
              Zero Black Boxes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
              {/* Card 1 */}
              <div className="bg-background p-12 md:p-16 group hover:bg-panel transition-colors duration-500">
                <div className="w-12 h-12 border border-signal/30 mb-8 flex items-center justify-center relative overflow-hidden group-hover:border-signal transition-colors duration-500">
                  <div className="absolute inset-0 bg-signal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="w-2 h-2 bg-signal group-hover:bg-background relative z-10 transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight uppercase">Transparent</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  Every stage is traceable, narrated, and testable. No hidden proprietary logic, just pure math translated to C++.
                </p>
              </div>
              
              {/* Card 2 */}
              <div className="bg-background p-12 md:p-16 group hover:bg-panel transition-colors duration-500">
                <div className="w-12 h-12 border border-signal/30 mb-8 flex items-center justify-center relative overflow-hidden group-hover:border-signal transition-colors duration-500">
                  <div className="absolute inset-0 bg-signal transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="w-2 h-2 bg-signal group-hover:bg-background relative z-10 transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight uppercase">Honest</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  No mock results returned without an explicit flag. We report benchmarking wins and losses plainly and openly.
                </p>
              </div>
              
              {/* Card 3 */}
              <div className="bg-background p-12 md:p-16 group hover:bg-panel transition-colors duration-500">
                <div className="w-12 h-12 border border-signal/30 mb-8 flex items-center justify-center relative overflow-hidden group-hover:border-signal transition-colors duration-500">
                  <div className="absolute inset-0 bg-signal transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <div className="w-2 h-2 rotate-45 bg-signal group-hover:bg-background relative z-10 transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight uppercase">Verifiable</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  Every solve produces a rigorous self-check against primal and dual constraints before returning an optimal status.
                </p>
              </div>
              
              {/* Card 4 */}
              <div className="bg-background p-12 md:p-16 group hover:bg-panel transition-colors duration-500">
                <div className="w-12 h-12 border border-signal/30 mb-8 flex items-center justify-center relative overflow-hidden group-hover:border-signal transition-colors duration-500">
                  <div className="absolute inset-0 bg-signal transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div className="w-2 h-2 rounded-none bg-signal group-hover:bg-background relative z-10 transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight uppercase">Extensible</h3>
                <p className="text-text-muted text-lg leading-relaxed">
                  Three-tier separation cleanly abstracts logic, allowing algorithm improvements seamlessly spanning LP, MILP, and QP.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Architecture & Math */}
        <section id="architecture" className="py-32 px-6 md:px-12 bg-panel border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-20">
              
              {/* Left Column */}
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary uppercase tracking-tighter">
                  System<br/><span className="text-signal">Architecture</span>
                </h2>
                <div className="h-1 w-20 bg-signal mb-12"></div>
                
                <p className="text-text-muted text-xl leading-relaxed mb-10 font-light">
                  Traditional solvers rely on sequential matrix factorizations that bottleneck on a single CPU core. 
                </p>
                <p className="text-text-primary text-xl leading-relaxed mb-10 border-l-2 border-signal pl-6 font-medium">
                  Firefly implements Primal-Dual Hybrid Gradient (PDHG)—replacing complex factorizations with massively parallel sparse matrix-vector multiplications.
                </p>
                <p className="text-text-muted text-xl leading-relaxed mb-12 font-light">
                  Utilizing <span className="text-signal font-mono text-base">cuSPARSE</span> and <span className="text-signal font-mono text-base">cuBLAS</span>, this architecture maps perfectly to the thousands of concurrent threads available on modern GPUs.
                </p>
              </div>
              
              {/* Right Column / Tiers */}
              <div className="lg:w-1/2 space-y-6">
                <div className="bg-background border border-border p-8 hover:border-signal/50 transition-colors duration-300 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-signal transition-colors duration-300"></div>
                  <div className="text-xs font-mono tracking-widest text-signal mb-3">TIER 01</div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight">Core Engine</h3>
                  <div className="text-sm font-mono text-text-muted mb-4 pb-4 border-b border-border/50">C++20 & CUDA SM_89</div>
                  <p className="text-text-muted leading-relaxed">
                    MPS parsing, presolve reductions, CPU Simplex fallback, and the highly parallel PDLP CUDA solver executing on GPU hardware.
                  </p>
                </div>
                
                <div className="bg-background border border-border p-8 hover:border-trace-secondary/50 transition-colors duration-300 relative group overflow-hidden ml-0 md:ml-8">
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-trace-secondary transition-colors duration-300"></div>
                  <div className="text-xs font-mono tracking-widest text-trace-secondary mb-3">TIER 02</div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight">API Gateway</h3>
                  <div className="text-sm font-mono text-text-muted mb-4 pb-4 border-b border-border/50">Python & FastAPI</div>
                  <p className="text-text-muted leading-relaxed">
                    Bridging the core via pybind11. Exposes REST endpoints, WebSocket streaming for telemetry, and the step-by-step narration system.
                  </p>
                </div>
                
                <div className="bg-background border border-border p-8 hover:border-text-primary/50 transition-colors duration-300 relative group overflow-hidden ml-0 md:ml-16">
                  <div className="absolute top-0 left-0 w-1 h-full bg-border group-hover:bg-text-primary transition-colors duration-300"></div>
                  <div className="text-xs font-mono tracking-widest text-text-primary mb-3">TIER 03</div>
                  <h3 className="text-2xl font-bold text-text-primary mb-3 uppercase tracking-tight">Control Interface</h3>
                  <div className="text-sm font-mono text-text-muted mb-4 pb-4 border-b border-border/50">React & Tauri</div>
                  <p className="text-text-muted leading-relaxed">
                    A scientific instrumentation UI presenting live convergence tracing, hardware telemetry, and architectural analysis locally.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* Benchmarks (Bar Chart style) */}
        <section id="benchmarks" className="py-32 px-6 md:px-12 border-b border-border bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary uppercase tracking-tighter">Performance Audit</h2>
              <p className="text-text-muted font-mono tracking-widest uppercase text-sm">Execution Time: GPU (PDHG) vs CPU Reference</p>
            </div>
            
            <div className="space-y-16">
              {/* Benchmark Item 1 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight">afiro.mps</h3>
                    <p className="font-mono text-xs text-text-muted mt-1">NETLIB LP TIER 1</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[10%] h-8 bg-signal relative flex items-center group-hover:brightness-110 transition-all">
                      <span className="absolute right-[-70px] font-mono text-sm font-bold text-signal">0.12s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[30%] h-8 bg-panel border border-border relative flex items-center">
                      <span className="absolute right-[-70px] font-mono text-sm text-text-muted">0.45s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">CPU</span>
                  </div>
                </div>
              </div>

              {/* Benchmark Item 2 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight">egout.mps</h3>
                    <p className="font-mono text-xs text-text-muted mt-1">NETLIB LP TIER 1</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[20%] h-8 bg-signal relative flex items-center group-hover:brightness-110 transition-all">
                      <span className="absolute right-[-70px] font-mono text-sm font-bold text-signal">0.80s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[70%] h-8 bg-panel border border-border relative flex items-center">
                      <span className="absolute right-[-70px] font-mono text-sm text-text-muted">3.20s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">CPU</span>
                  </div>
                </div>
              </div>

              {/* Benchmark Item 3 */}
              <div className="group">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary uppercase tracking-tight">flugpl.mps</h3>
                    <p className="font-mono text-xs text-text-muted mt-1">MIPLIB</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-[15%] h-8 bg-trace-secondary relative flex items-center group-hover:brightness-110 transition-all">
                      <span className="absolute right-[-70px] font-mono text-sm font-bold text-trace-secondary">4.50s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">GPU</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-[90%] h-8 bg-panel border border-border relative flex items-center">
                      <span className="absolute right-[-80px] font-mono text-sm text-text-muted">28.30s</span>
                    </div>
                    <span className="w-20 text-right font-mono text-xs text-text-muted uppercase">CPU</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Deploy Section */}
        <section id="download" className="py-40 px-6 md:px-12 bg-panel border-b border-border">
          
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 text-text-primary uppercase tracking-tighter">Deploy <span className="text-signal">Firefly</span></h2>
              <p className="text-text-muted text-xl max-w-2xl mx-auto font-light leading-relaxed">
                Choose your environment. Run Firefly directly in your terminal as a lightweight CLI, or visualize convergence in real-time with the full Desktop Dashboard.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Option 1: CLI */}
              <div className="bg-background border border-border p-8 md:p-12 group hover:border-signal/50 transition-colors duration-500 relative flex flex-col h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-signal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="text-xs font-mono text-signal mb-4 uppercase tracking-widest">Option 1 // Engineer</div>
                <h3 className="text-3xl font-bold text-text-primary mb-6 uppercase tracking-tight">The CLI Engine</h3>
                
                <div className="flex-grow">
                  <div className="mb-6">
                    <div className="text-xs font-mono text-text-muted mb-2 uppercase">1. One-Line Install (Windows PowerShell)</div>
                    <div className="bg-panel border border-border p-4 flex justify-between items-center group/copy cursor-pointer hover:border-signal/50 transition-colors"
                         onClick={() => navigator.clipboard.writeText('irm https://bit.ly/install-firefly | iex')}
                         title="Click to copy">
                      <code className="text-signal font-mono text-sm break-all">
                        irm https://bit.ly/install-firefly | iex
                      </code>
                      <svg className="w-5 h-5 text-text-muted group-hover/copy:text-signal transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-mono text-text-muted mb-2 uppercase">2. Command Reference</div>
                    <pre className="bg-panel border border-border p-6 overflow-x-auto text-[11px] md:text-xs font-mono leading-[2.5] text-text-muted">
                      <span className="text-text-primary font-bold">▶ CORE COMMANDS</span><br/>
                      <span className="text-signal">firefly solve</span> &lt;file.mps&gt;      <span className="opacity-50">Solve a single LP/MILP/QP</span><br/>
                      <span className="text-signal">firefly solve-batch</span> &lt;dir&gt;       <span className="opacity-50">Solve all .mps files in a dir</span><br/>
                      <br/>
                      <span className="text-text-primary font-bold">▶ TESTING & BENCHMARKING</span><br/>
                      <span className="text-signal">firefly benchmark</span> &lt;dir&gt;         <span className="opacity-50">Compare vs known optimums</span><br/>
                      <span className="text-signal">firefly test-standard</span>           <span className="opacity-50">Run Netlib standard problems</span><br/>
                      <span className="text-signal">firefly test</span>                    <span className="opacity-50">Run C++ core test suite</span><br/>
                      <br/>
                      <span className="text-text-primary font-bold">▶ UTILITIES</span><br/>
                      <span className="text-signal">firefly update</span>                  <span className="opacity-50">Auto-update executable</span><br/>
                      <span className="text-signal">firefly home</span>                    <span className="opacity-50">Open this beautiful homepage</span><br/>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Option 2: Desktop App */}
              <div className="bg-background border border-border p-8 md:p-12 group hover:border-trace-secondary/50 transition-colors duration-500 relative flex flex-col h-full">
                <div className="absolute top-0 left-0 w-full h-1 bg-trace-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="text-xs font-mono text-trace-secondary mb-4 uppercase tracking-widest">Option 2 // Executive</div>
                <h3 className="text-3xl font-bold text-text-primary mb-6 uppercase tracking-tight">The Desktop Dashboard</h3>
                
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <p className="text-text-muted text-lg leading-relaxed mb-6">
                      A standalone Tauri executable providing a highly polished, instrument-panel-styled interface. Perfect for demonstrations and deep-dive architectural analysis.
                    </p>
                    
                    <ul className="space-y-4 mb-8">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-trace-secondary mt-2"></div>
                        <span className="text-text-muted">Live convergence telemetry and dual objective tracing.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-trace-secondary mt-2"></div>
                        <span className="text-text-muted">Automated benchmarking tables directly in the UI.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-trace-secondary mt-2"></div>
                        <span className="text-text-muted">Interactive step-through narrative explaining the math.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-8">
                    <a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full px-8 py-5 bg-trace-secondary text-background font-bold text-sm hover:bg-opacity-90 transition-opacity uppercase tracking-[0.2em]">
                      Download Executable
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </div>

            {/* Removed Links Block */}
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-24 pb-12 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6 group cursor-pointer w-fit">
                <div className="w-10 h-10 bg-signal group-hover:bg-text-primary transition-colors duration-300" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', WebkitMaskRepeat: 'no-repeat', maskPosition: 'left' }}></div>
                <div className="text-2xl font-bold tracking-[0.2em] text-text-primary uppercase group-hover:text-signal transition-colors duration-300">Firefly</div>
              </div>
              <p className="text-text-muted max-w-sm leading-relaxed">
                A sovereign, inspectable alternative to commercial solvers—built entirely from mathematical first principles and accelerated on the GPU.
              </p>
            </div>
            
            <div>
              <h4 className="text-text-primary font-bold tracking-widest uppercase mb-6 text-sm">Quick Links</h4>
              <ul className="space-y-4 text-text-muted text-sm tracking-wide">
                <li><a href="#architecture" className="hover:text-signal transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-border rounded-full"></span> Architecture</a></li>
                <li><a href="#benchmarks" className="hover:text-signal transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-border rounded-full"></span> Performance Audit</a></li>
                <li><a href="#download" className="hover:text-signal transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-border rounded-full"></span> Deploy Application</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-text-primary font-bold tracking-widest uppercase mb-6 text-sm">Resources</h4>
              <ul className="space-y-4 text-text-muted text-sm tracking-wide">
                <li><a href="https://github.com/akshayvarma121/Firefly_solver" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-border rounded-full"></span> GitHub Repository</a></li>
                <li><a href="https://github.com/akshayvarma121/Firefly_solver/releases" target="_blank" rel="noreferrer" className="hover:text-signal transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-border rounded-full"></span> Release Notes</a></li>
                <li><a href="#" className="hover:text-signal transition-colors flex items-center gap-2 opacity-50"><span className="w-1 h-1 bg-border rounded-full"></span> Documentation (WIP)</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-text-muted uppercase tracking-widest">
            <div>&copy; 2026 The Fireflies // SIH 26119</div>
            <div className="text-signal font-bold">V0.1.0</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
