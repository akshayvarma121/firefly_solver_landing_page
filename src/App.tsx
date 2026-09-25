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
        <section className="relative min-h-[85vh] flex flex-col justify-center items-center text-center border-b border-border overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '64px 64px' }}>
          </div>
          
          <div className="relative z-10 w-full max-w-6xl px-6 md:px-12">
            <div className="animate-fade-in-up animation-delay-100 mb-12">
              <span className="inline-flex items-center gap-3 px-4 py-1.5 border border-border text-text-muted font-mono text-xs tracking-widest bg-panel">
                <span className="w-1.5 h-1.5 bg-signal animate-pulse-slow"></span>
                SYSTEM ONLINE // CUDA SM_89 READY
              </span>
            </div>
            
            <h1 className="animate-fade-in-up animation-delay-200 text-6xl md:text-[9rem] font-bold mb-6 text-text-primary tracking-tighter uppercase leading-none">
              <span className="text-signal relative inline-block group">
                FIREFLY
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-signal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
              </span>
              <br/>SOLVER
            </h1>
            
            <p className="animate-fade-in-up animation-delay-300 text-2xl md:text-3xl text-text-muted mb-16 max-w-4xl mx-auto font-light tracking-wide">
              Indigenous GPU-Accelerated Optimization
            </p>
            
            <div className="animate-fade-in-up animation-delay-400 flex justify-center mb-20">
              <p className="text-lg md:text-xl text-text-muted max-w-2xl border-l-2 border-signal pl-8 text-left leading-relaxed relative before:absolute before:left-[-2px] before:top-0 before:w-0.5 before:h-8 before:bg-signal">
                A sovereign, inspectable alternative to commercial solvers—built entirely from mathematical first principles and accelerated on the GPU.
              </p>
            </div>
            
            <div className="animate-fade-in-up animation-delay-500 flex flex-col sm:flex-row justify-center gap-6">
              <a href="#download" className="px-10 py-5 bg-signal text-background font-bold text-sm hover:bg-opacity-90 transition-all hover:shadow-[0_0_20px_rgba(232,163,61,0.2)] uppercase tracking-[0.2em]">
                Initialize System
              </a>
              <a href="#architecture" className="px-10 py-5 bg-transparent border border-border text-text-primary font-bold text-sm hover:border-signal transition-colors uppercase tracking-[0.2em] flex items-center gap-3 group">
                View Specs
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="border-b border-border bg-signal text-background py-4 overflow-hidden flex whitespace-nowrap">
          <div className="animate-marquee inline-flex items-center gap-8 font-mono text-sm tracking-widest font-bold">
            <span>LINEAR PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>MIXED-INTEGER PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>QUADRATIC PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>GPU-NATIVE</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>PRIMAL-DUAL HYBRID GRADIENT</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            
            {/* Duplicated for seamless loop */}
            <span>LINEAR PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>MIXED-INTEGER PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>QUADRATIC PROGRAMMING</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>GPU-NATIVE</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
            <span>PRIMAL-DUAL HYBRID GRADIENT</span><span className="w-1.5 h-1.5 rotate-45 bg-background"></span>
          </div>
        </div>

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
        <section className="py-32 px-6 md:px-12 border-b border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-signal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
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
          <div className="max-w-6xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
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
        <section id="download" className="py-40 px-6 md:px-12 bg-panel relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-signal to-transparent opacity-20"></div>
          
          <div className="max-w-6xl mx-auto relative z-10">
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

            {/* Links Block */}
            <div className="mt-20 pt-10 border-t border-border flex flex-col sm:flex-row justify-center items-center gap-6 text-sm font-mono tracking-widest uppercase">
              <a href="https://github.com/akshayvarma121/Firefly_solver" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-muted hover:text-signal transition-colors">
                <div className="w-1.5 h-1.5 bg-border"></div>
                GitHub Repository
              </a>
              <span className="hidden sm:inline text-border">|</span>
              <a href="https://firefly-solver.vercel.app" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-text-muted hover:text-signal transition-colors">
                <div className="w-1.5 h-1.5 bg-border"></div>
                Official Website
              </a>
            </div>
            
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 bg-background border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity group cursor-pointer">
            <div className="w-6 h-6 bg-signal group-hover:bg-text-primary transition-colors duration-300" style={{ maskImage: 'url(/logo.png)', WebkitMaskImage: 'url(/logo.png)', maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center', WebkitMaskPosition: 'center' }}></div>
            <div className="text-sm font-bold tracking-[0.2em] text-text-primary uppercase group-hover:text-signal transition-colors duration-300">Firefly</div>
          </div>
          
          <div className="text-text-muted text-sm font-mono uppercase tracking-widest flex items-center gap-6">
            <span>The Fireflies</span>
            <span className="w-1 h-1 rounded-full bg-border"></span>
            <span>SIH 2026</span>
          </div>
          
          <div className="text-signal font-mono text-sm tracking-widest font-bold">
            V0.1.0
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App;
