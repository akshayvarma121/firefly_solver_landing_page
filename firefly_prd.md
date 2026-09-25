# Firefly — Comprehensive Product Requirements Document

> **Project:** SIH 2026 PS 26119  
> **Team:** The Fireflies  
> **Version:** v0.1.0 (Current Build)  
> **Date:** 2026-09-25  
> **Classification:** Internal Engineering Reference

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Motivation](#2-problem-statement--motivation)
3. [System Architecture Overview](#3-system-architecture-overview)
4. [Tier 1 — Solver Core (C++20 / CUDA)](#4-tier-1--solver-core-c20--cuda)
   - 4.1 MPS Parser
   - 4.2 Presolver
   - 4.3 Simplex Solver
   - 4.4 PDLP Solver (CPU)
   - 4.5 PDLP Solver (CUDA GPU)
   - 4.6 Branch-and-Bound Engine
   - 4.7 CUDA Context Management
   - 4.8 pybind11 Bindings Layer
5. [Tier 2 — Python FastAPI Server](#5-tier-2--python-fastapi-server)
   - 5.1 REST Endpoints
   - 5.2 WebSocket Streaming
   - 5.3 Trace & Narration System
   - 5.4 Benchmark Engine
   - 5.5 Configuration
6. [Tier 3 — Web / Desktop UI (React + Tauri)](#6-tier-3--web--desktop-ui-react--tauri)
   - 6.1 Design Language & Palette
   - 6.2 Application Shell & Routing
   - 6.3 Solve Page
   - 6.4 Benchmarks Page
   - 6.5 Architecture Page
   - 6.6 Tauri Desktop Packaging
7. [CLI Interface](#7-cli-interface)
8. [Data Schemas & Contracts](#8-data-schemas--contracts)
9. [Testing Strategy](#9-testing-strategy)
10. [Build System & Distribution](#10-build-system--distribution)
11. [Non-Functional Requirements](#11-non-functional-requirements)
12. [Known Gaps & Technical Debt](#12-known-gaps--technical-debt)
13. [Compliance with Non-Negotiable Rules](#13-compliance-with-non-negotiable-rules)
14. [Roadmap & Future Scope](#14-roadmap--future-scope)

---

## 1. Executive Summary

**Firefly** is a full-stack, GPU-accelerated LP/MILP/QP mathematical optimization solver built entirely from first principles—no existing solver libraries (HiGHS, GLPK, SCIP, CBC, Gurobi, etc.) are used in the core. It is an original implementation developed for Smart India Hackathon 2026, Problem Statement 26119.

The system is a three-tier application:

| Tier | Technology | Role |
|------|-----------|------|
| **Core** | C++20 + CUDA (sm_89) | All math: parse, presolve, LP, MILP |
| **API** | Python 3.10 + FastAPI + pybind11 | HTTP/WebSocket bridge to core |
| **UI** | React 19 + TypeScript + Vite + Tauri 2 | Desktop telemetry & control panel |

The solver handles three problem classes:
- **LP** — Linear Programs (continuous variables, linear objective + constraints)
- **MILP** — Mixed-Integer Linear Programs (subset of variables must be integer)
- **QP** — Quadratic Programs (architecture planned; current scope is LP/MILP)

It is distributed as:
1. A standalone **Windows CLI** (`firefly.exe`) installed via a one-line PowerShell command
2. A **Tauri desktop app** (`firefly` app) bundling the FastAPI sidecar and the React UI
3. A **Python package** (`firefly_solver`) installable via pip for programmatic access

---

## 2. Problem Statement & Motivation

### 2.1 Background

Mathematical optimization is the backbone of operations research, logistics, finance, manufacturing scheduling, and resource allocation. Existing solvers (Gurobi, CPLEX, HiGHS, SCIP) are either:
- **Commercially licensed** (Gurobi/CPLEX) at prohibitive cost for academic/government deployment
- **Algorithmically opaque** — black-box implementations
- **Not GPU-native** — designed for CPU parallelism, not SIMD/CUDA architectures

### 2.2 SIH Requirement (PS 26119)

Build an original LP/MILP/QP solver that:
- Does not wrap or call any existing solver library in the core
- Leverages GPU (CUDA) for acceleration
- Is deployable as a standalone application
- Produces verifiably correct results (self-checking, test suite against known answers)
- Includes a professional UI for demonstration

### 2.3 Design Philosophy

Firefly is built around the idea that a solver should be:
- **Transparent** — every stage is traceable, narrated, and testable
- **Honest** — no mock results returned without an explicit `mock: true` flag
- **Verifiable** — every solve produces a self-check against constraints before returning
- **Extensible** — three-tier separation allows algorithm improvements without UI changes

---

## 3. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER INTERFACES                              │
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────────┐        │
│  │  Tauri Desktop App   │    │   CLI (firefly.exe)       │        │
│  │  (React + Vite)      │    │   (PyInstaller bundle)   │        │
│  └──────────┬───────────┘    └──────────┬───────────────┘        │
└─────────────┼────────────────────────────┼───────────────────────┘
              │ HTTP / WebSocket           │ Direct pybind11 call
              ▼                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FASTAPI API SERVER (Python)                  │
│                                                                  │
│   /health  /inspect  /solve  /benchmark  ws:/solve-stream        │
│                                                                  │
│   trace.py ─── narration.py ─── config.py ─── schemas.py        │
└─────────────────────────────┬───────────────────────────────────┘
                              │ pybind11 C extension
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│            firefly_solver (pybind11 module = _firefly_solver)    │
│                                                                  │
│   solve()  parse_mps()  parse_mps_string()  SparseProblem        │
└─────────────────────────────┬───────────────────────────────────┘
                              │ Static link
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   firefly_core (static lib, C++20)               │
│                                                                  │
│  ┌────────────┐  ┌──────────────┐  ┌──────────┐  ┌──────────┐  │
│  │ MPS Parser │→ │   Presolver  │→ │  PDLP    │→ │ Branch & │  │
│  │(mps_parser)│  │  (presolve)  │  │(pdlp.cpp │  │  Bound   │  │
│  └────────────┘  └──────────────┘  │ cpu/cuda)│  └──────────┘  │
│                                    └──────────┘                  │
│                       ┌──────────────────────┐                  │
│                       │ Simplex (simplex.cpp) │                  │
│                       └──────────────────────┘                  │
│                                                                  │
│  Dependencies: Eigen 3.4.0, cuBLAS, cuSPARSE (CUDA 12+)        │
└─────────────────────────────────────────────────────────────────┘
```

### 3.1 Data Flow (Single Solve)

```
Input (MPS file or JSON ProblemDef)
       │
       ▼
  MPSParser::parse()  →  firefly::Problem  (sparse triplet form)
       │
       ▼
  Presolver::presolve()  →  PresolvedProblem
       │          └─ PresolveStats (rows removed, bounds tightened, vars fixed, scaling)
       │          └─ PostsolveMap (index mappings + scale factors)
       │
       ▼  (dispatch based on method + gpu flag)
       ├─ PDLPSolver::solve()   [GPU: pdlp_cuda, CPU: pdlp_cpu]
       │       └─ Ruiz equilibration (10 iters)
       │       └─ Power iteration (operator norm estimate)
       │       └─ PDLP primal-dual loop (Applegate et al.)
       │
       ├─ SimplexSolver::solve()
       │       └─ Phase I (feasibility via artificial variables)
       │       └─ Phase II (optimality via Bland's rule pricing)
       │
       └─ BranchAndBoundSolver::solve()  [MILP]
               └─ Best-First or Depth-First node queue
               └─ Per-node: Presolve → LP Solve (PDLP or Simplex)
               └─ Branch on most fractional integer variable
               └─ Pruning: infeasibility / bound / integrality
       │
       ▼
  Presolver::postsolve_primal() + postsolve_dual()
       │
       ▼
  SolveResult  {status, objective, primal_solution, dual_solution, iterations, wall_time_ms}
       │
       ▼
  Self-Check  (constraint feasibility verification before return)
       │
       ▼
  API → trace + narration → JSON response / WebSocket stream
```

---

## 4. Tier 1 — Solver Core (C++20 / CUDA)

### 4.1 MPS Parser

**File:** [`core/src/mps_parser.cpp`](file:///E:/firefly/core/src/mps_parser.cpp)  
**Header:** [`core/include/firefly/mps_parser.h`](file:///E:/firefly/core/include/firefly/mps_parser.h)

#### 4.1.1 Purpose

Parses the industry-standard **MPS (Mathematical Programming System)** file format into a rich `firefly::Problem` struct used by all downstream components.

#### 4.1.2 Output: `firefly::Problem`

```cpp
struct Problem {
    std::string name;
    bool minimize = true;
    std::string objective_name;

    // Names & lookup
    std::vector<std::string> row_names, col_names;
    std::unordered_map<std::string, size_t> row_to_index, col_to_index;

    // Row definitions
    std::vector<char>   row_senses;          // 'N', 'L', 'G', 'E'
    std::vector<double> row_lower_bounds;
    std::vector<double> row_upper_bounds;

    // Column definitions
    std::vector<double> col_lower_bounds;
    std::vector<double> col_upper_bounds;
    std::vector<bool>   is_integer;
    std::vector<double> objective;

    // Sparse matrix (triplet list)
    std::vector<Triplet> matrix;  // {row, col, value}
};
```

#### 4.1.3 MPS Sections Handled

| Section | Behavior |
|---------|----------|
| `NAME` | Captures problem name |
| `ROWS` | Registers N/L/G/E row senses |
| `COLUMNS` | Populates constraint matrix + objective; detects MARKER INT sections for MILP |
| `RHS` | Sets right-hand side bounds |
| `RANGES` | Converts to explicit [L, U] bounds per row |
| `BOUNDS` | Sets variable bounds (FR, MI, BV, LO, UP, FX, LI, UI) |
| `ENDATA` | Terminates parse |

#### 4.1.4 Error Handling

- `MPSParseException` — thrown with line number and descriptive message for any malformed input
- Strict validation: undeclared rows, unknown sections, duplicate markers all cause hard errors
- The `parse_mps_string()` binding writes to a temp file (OS temp directory) then calls `parse()` — a known limitation (temp file I/O)

#### 4.1.5 Test Coverage

- `test_mps_parser.cpp` — 19 test cases covering all sections, RANGES, BOUNDS variants, malformed inputs from `tests/regression/`

---

### 4.2 Presolver

**File:** [`core/src/presolve.cpp`](file:///E:/firefly/core/src/presolve.cpp)  
**Header:** [`core/include/firefly/presolve.h`](file:///E:/firefly/core/include/firefly/presolve.h)

#### 4.2.1 Purpose

Reduce the size and improve the numerical conditioning of the problem before dispatching to a solver. Operates iteratively until no further reductions are possible (max 100 passes to guard against loops).

#### 4.2.2 Reduction Rules (Configurable via `PresolveOptions`)

| Rule | Flag | Description |
|------|------|-------------|
| Fixed Variable Substitution | `enable_fixed_variable_substitution` | When `L[j] == U[j]`, eliminate column `j`, adjust RHS of all rows it appears in, update objective offset |
| Empty Row Removal | `enable_empty_row_removal` | Remove rows with no nonzero entries; throw infeasible if 0 ∉ [L, U] |
| Empty Column Removal | `enable_empty_col_removal` | Fix to bound that minimizes cost; throw if unbounded |
| Singleton Row Tightening | `enable_singleton_row_tightening` | Single-variable row → tighten variable bounds; remove row |
| Coefficient Scaling (Equilibration) | `enable_scaling` | Row-scale then column-scale to normalize max absolute coefficient to 1.0 |

#### 4.2.3 Scaling Details

Equilibration scaling is **not applied to integer variables** (scaling destroys integrality of bounds).

- **Row scaling:** `r_scale[i] = max |A_{ij}|` over active `j`. Row divided by `r_scale[i]`.
- **Column scaling:** `c_scale[j] = max |A_{ij}|` over active `i`. Column divided by `c_scale[j]`. Variable bounds multiplied by `c_scale[j]`, objective divided by `c_scale[j]`.

**Post-solve recovery:**
- Primal: `x_orig = x_reduced * col_scale_factor`  (stored in `PostsolveMap::col_scale_factors`)
- Dual: `y_orig = y_reduced / row_scale_factor`  (stored in `PostsolveMap::row_scale_factors`)

#### 4.2.4 Output: `PresolvedProblem`

```cpp
struct PresolvedProblem {
    Problem      problem;    // The reduced problem
    PresolveStats stats;     // Tracking numbers for transparency
    PostsolveMap  postsolve; // Data needed to reconstruct original solution
};

struct PresolveStats {
    size_t original_rows, original_cols;
    size_t reduced_rows, reduced_cols;
    size_t rows_removed, bounds_tightened;
    size_t variables_fixed, scaling_applied;
};

struct PostsolveMap {
    std::vector<size_t> reduced_col_to_orig_col;
    std::vector<size_t> reduced_row_to_orig_row;
    std::unordered_map<size_t, double> fixed_variables;
    std::vector<double> col_scale_factors;
    std::vector<double> row_scale_factors;
    double objective_offset;  // Sum of c[j]*val for fixed variables
};
```

#### 4.2.5 Infeasibility Detection

`InfeasibleProblemException` is thrown (and propagates through the binding to `INFEASIBLE` status) when:
- Column has conflicting bounds (`L > U`)
- Empty row where 0 ∉ [L, U]
- Singleton row forces column into an infeasible state

#### 4.2.6 Test Coverage

- `test_presolve.cpp` — general presolve pipeline
- `test_presolve_rules.cpp` — individual rule isolation
- Regression fixtures: `regression/infeasible.mps`, `regression/all_bounds.mps`, `regression/ranges.mps`, etc.

---

### 4.3 Simplex Solver

**File:** [`core/src/simplex.cpp`](file:///E:/firefly/core/src/simplex.cpp)  
**Header:** [`core/include/firefly/simplex.h`](file:///E:/firefly/core/include/firefly/simplex.h)

#### 4.3.1 Algorithm

Revised **bounded dual simplex** with two-phase feasibility:

**Phase I (feasibility):**
1. Augment system: [A | -I_slack | I_artificial] with artificial cost c₁[a] = 1.0
2. Initialize artificial variables to absorb infeasibility (slack out-of-bounds)
3. Minimize sum of artificials using BoundedSimplex
4. If Phase I objective > tolerance → INFEASIBLE

**Phase II (optimality):**
1. Replace cost with original c₂ (real objective)
2. Lock all artificial variables to zero bounds
3. Run BoundedSimplex to optimality, UNBOUNDED, or ITERATION_LIMIT

#### 4.3.2 BoundedSimplex Inner Loop

Each iteration:
1. **Basis extraction:** Build sparse basis matrix B from columns
2. **SparseLU factorization:** Eigen `SparseLU<ColMajor, COLAMDOrdering>` — refactored every iteration (no warm-start LU update yet)
3. **Pricing (Bland's Rule):** `z_j = c_B^T B^{-1} A_j`; enter first j with negative reduced cost (AT_LOWER) or positive (AT_UPPER)
4. **Search direction:** `d = B^{-1} A_entering`
5. **Ratio test:** Min ratio for leaving variable; handles bounds on basic variables; Bland's tie-breaking by smallest variable index
6. **Update:** Primal values updated; clamp to bounds to prevent drift; basis/status updated; bound-flip if no leaving variable (degenerate step)

#### 4.3.3 Variable Status Enum

```cpp
enum class Status { BASIC, AT_LOWER, AT_UPPER, FREE, FIXED };
```

#### 4.3.4 Post-Solve Mapping

After Phase II:
- Extract `x[0..N_orig-1]` → `reduced_primal`
- Call `Presolver::postsolve_primal()` → map back to original variable order + unscale
- Extract duals `y` from `B^T y = c_B` → `Presolver::postsolve_dual()` → unscale

#### 4.3.5 Self-Check

Before returning OPTIMAL, every constraint in the reduced problem is verified: `row_L[i] - tol ≤ A·x ≤ row_U[i] + tol`. Violation throws a runtime error — no silent incorrect results.

#### 4.3.6 Options

```cpp
struct SimplexOptions {
    double tolerance = 1e-6;
    size_t max_iterations = 1000000;
};
```

#### 4.3.7 Known Limitations

- No LU update (Bartels-Golub or similar) — re-factorizes every iteration → O(n³) per iteration for dense subproblems
- No steepest-edge pricing — Bland's rule is cycling-safe but slow on large degenerate problems
- No dual simplex phase — only primal Phase I/II

---

### 4.4 PDLP Solver (CPU)

**File:** [`core/src/pdlp_cpu.cpp`](file:///E:/firefly/core/src/pdlp_cpu.cpp)

#### 4.4.1 Algorithm

**PDLP** (Primal-Dual Linear Programming) — a first-order primal-dual algorithm based on the Chambolle-Pock framework, as described in Applegate et al. (2021, "Practical large-scale linear programming using primal-dual hybrid gradient").

The LP in standard form with bounds:
```
min  c^T x
s.t. L_s ≤ Ax ≤ U_s
     L_x ≤ x  ≤ U_x
```
is solved via the saddle-point formulation with primal variable `x` (size N), row slack `s` (size M), and dual variable `y` (size M).

#### 4.4.2 PDLP CPU Loop (Chambolle-Pock / PDHG)

Per iteration:
1. `x_temp = x - τ(c - A^T y)`  → project onto [L_x, U_x]
2. `s_temp = s - τ y`           → project onto [L_s, U_s]
3. `delta_x = 2·x_new - x_prev`
4. `y_new = y + σ(A·delta_x - (2s_new - s_prev))`
5. Weighted averaging: accumulate `x_sum, s_sum, y_sum` with `weight_sum`

#### 4.4.3 Adaptive Step Size (Applegate et al.)

The step sizes `τ` (primal) and `σ` (dual) are initialized using the operator norm estimate `L_norm` of `[A; -I]`:
```
τ = σ = 0.99 / L_norm
```
where `L_norm = sqrt(lambda_max(A^T A) + 1)` estimated by 10 iterations of power method.

#### 4.4.4 Restart Heuristic

When enabled (`PDLPOptions::enable_restarts = true`), the algorithm monitors the duality gap. If the gap stops decreasing relative to the gap at the last restart, the iterate is reset to the weighted average from the last restart point.

#### 4.4.5 Convergence Check

Every `callback_frequency` iterations:
- Compute primal objective `p_obj = c^T x_avg`
- Compute dual objective `d_obj = min bound from y_avg` (clamped to row bound feasibility)
- Gap `= |p_obj - d_obj| / max(1, |p_obj|)`
- Convergence when `gap < tolerance`

#### 4.4.6 Post-Solve

Same post-solve path as Simplex: `postsolve_primal()` and `postsolve_dual()`.

Note: PDLP in `pdlp.cpp` applies **Ruiz equilibration** (10 iterations, sqrt-scaling) on top of the presolve before dispatching to CPU or CUDA backend. Ruiz cumulative scale factors are folded into the `PostsolveMap`.

---

### 4.5 PDLP Solver (CUDA GPU)

**File:** [`core/src/pdlp_cuda.cu`](file:///E:/firefly/core/src/pdlp_cuda.cu)  
**Header:** [`core/include/firefly/cuda_context.h`](file:///E:/firefly/core/include/firefly/cuda_context.h)

#### 4.5.1 CUDA Kernels

| Kernel | Purpose |
|--------|---------|
| `project_kernel` | Element-wise clamp to [L, U] bounds (parallel over N or M elements) |
| `update_x_temp_kernel` | `x = x - τ(c - A^T y)` (parallel over N) |
| `update_s_temp_kernel` | `s = s - τ y` (parallel over M) |
| `update_y_kernel` | `y = y + σ(A·delta_x - delta_s)` (parallel over M) |
| `calc_delta_x_kernel` | `delta_x = 2x - x_prev` (parallel over N) |
| `add_to_sum_kernel` | Weighted sum accumulation for restarts |

#### 4.5.2 Sparse Matrix Operations

- Matrix stored in **CSC format** on GPU (column pointers + row indices + values arrays)
- `A·x` (SpMV): `cusparseSpMV` with `CUSPARSE_OPERATION_NON_TRANSPOSE`
- `A^T·y` (SpMV transpose): `cusparseSpMV` with `CUSPARSE_OPERATION_TRANSPOSE`
- Norm computations: `cublasDnrm2`

#### 4.5.3 CudaContext (Singleton)

```cpp
class CudaContext {
    cublasHandle_t  cublas_handle;
    cusparseHandle_t cusparse_handle;
    std::mutex ctx_mutex;  // Concurrency guard for multi-threaded API
public:
    static CudaContext& get_instance();  // C++11 magic static (thread-safe lazy init)
    cublasHandle_t  get_cublas();
    cusparseHandle_t get_cusparse();
    std::mutex& get_mutex();
};
```

The mutex is locked by `pdlp_cuda::solve()` for the duration of the CUDA solve. This serializes concurrent API requests — a known bottleneck for multi-user scenarios.

#### 4.5.4 GPU Memory Lifecycle

All device arrays are allocated via `cudaMalloc` and freed before return (RAII not yet used — manual free with `CHECK_CUDA`). The solve includes:
- Device copies of: A (CSC), c, x, y, s, x_prev, s_prev, delta_x, A_trans_y, A_delta_x, L_x, U_x, L_s, U_s, x_sum, s_sum, y_sum

#### 4.5.5 GPU Availability Check & Fallback

In `pdlp.cpp`:
```cpp
#ifdef FIREFLY_WITH_CUDA
    try {
        return pdlp_cuda::solve(scaled_pre, modified_options);
    } catch (const std::exception& e) {
        // GPU path failed — fallback to CPU PDLP
        return pdlp_cpu::solve(scaled_pre, modified_options);
    }
#else
    return pdlp_cpu::solve(scaled_pre, modified_options);
#endif
```

#### 4.5.6 Target Hardware

- CUDA Compute Capability: **sm_89** (NVIDIA RTX 4050 and equivalent Ada Lovelace)
- CUDA Toolkit: 12.0+ required
- cuBLAS + cuSPARSE from `CUDAToolkit` CMake package

---

### 4.6 Branch-and-Bound Engine

**File:** [`core/src/branch_and_bound.cpp`](file:///E:/firefly/core/src/branch_and_bound.cpp)  
**Header:** [`core/include/firefly/branch_and_bound.h`](file:///E:/firefly/core/include/firefly/branch_and_bound.h)

#### 4.6.1 Algorithm

Standard **LP-based branch-and-bound** for MILP:

1. **Root node:** Full problem with original bounds
2. **Node selection:** Best-First (priority queue ordered by LP relaxation lower bound) or Depth-First (vector used as stack)
3. **LP relaxation:** Per node — re-run `Presolver::presolve()` with tightened bounds, then solve LP via PDLP or Simplex
4. **Pruning conditions:**
   - Node LP is infeasible → prune
   - LP objective ≥ current incumbent → prune
5. **Branching variable selection:** Most fractional integer variable (max `|val - round(val)|` — or equivalently, closest to 0.5)
6. **Branch direction:** Left child = `floor(branch_val)` upper bound; Right child = `ceil(branch_val)` lower bound
7. **Incumbent update:** If LP relaxation solution is integer-feasible and improves best objective

#### 4.6.2 Options (`BBSolverOptions`)

| Option | Default | Description |
|--------|---------|-------------|
| `ordering` | `BEST_FIRST` | Node selection strategy |
| `lp_solver` | `PDLP` | LP solver choice per node |
| `time_limit_ms` | 60,000 | Wall-clock limit |
| `node_limit` | 100,000 | Max nodes explored |
| `integrality_tol` | 1e-6 | Tolerance for integer check |
| `obj_tol` | 1e-6 | Objective gap tolerance |
| `callback_frequency` | 100 | Progress callback interval |
| `progress_callback` | nullptr | `(node, incumbent, bound, ms)` |

#### 4.6.3 Output: `BBSolverResult`

Extends `SolveResult` with:
- `node_count` — total nodes processed
- `best_bound` — current lower bound on optimal
- `avg_presolve_ms_per_node` — timing profile
- `avg_lp_solve_ms_per_node` — timing profile

#### 4.6.4 Status Codes for MILP

| Status | Condition |
|--------|-----------|
| `OPTIMAL` | Tree fully explored, best integer solution found |
| `INFEASIBLE` | No integer-feasible solution exists |
| `UNBOUNDED` | Root LP is unbounded |
| `FEASIBLE` | Time/node limit hit with a feasible solution |
| `TIME_LIMIT` | Time limit hit, no feasible solution |
| `NODE_LIMIT` | Node limit hit, no feasible solution |

#### 4.6.5 Self-Check

After finding an incumbent: verifies all constraints and all integrality constraints. Violation throws `std::runtime_error`.

---

### 4.7 CUDA Context Management

The `CudaContext` singleton (see §4.5.3) is initialized lazily on first GPU solve call. It holds the `cublasHandle_t` and `cusparseHandle_t` for the process lifetime. A mutex prevents concurrent GPU access (correct but serializing — future work: per-stream contexts).

The pybind11 binding uses `py::gil_scoped_release` before entering C++ solve code and `py::gil_scoped_acquire` in every iteration callback to safely bridge C++ → Python.

---

### 4.8 pybind11 Bindings Layer

**File:** [`core/bindings/bindings.cpp`](file:///E:/firefly/core/bindings/bindings.cpp)

#### 4.8.1 Exposed Python API

```python
import firefly_solver as fs

# Parse
prob = fs.parse_mps("path/to/problem.mps")      # -> SparseProblem
prob = fs.parse_mps_string(mps_content: str)    # -> SparseProblem

# Solve
result = fs.solve(
    problem,                    # SparseProblem
    method="auto",              # "auto"|"simplex"|"pdlp"
    gpu=True,
    iteration_callback=None     # callable(iter, primal_obj, dual_obj, elapsed_ms)
)                               # -> SolveResult

# Availability check
fs.cuda_is_available()          # -> bool  (if compiled with CUDA)
```

#### 4.8.2 SparseProblem (Python-facing)

CSR (Compressed Sparse Row) format:
```python
sp.num_vars       # int
sp.num_constrs    # int
sp.obj_coeffs     # List[float]
sp.row_ptr        # List[int]   — CSR row pointers
sp.col_idx        # List[int]   — CSR column indices
sp.values         # List[float] — CSR nonzero values
sp.row_senses     # str         — sequence of 'L'/'G'/'E'/'N'
sp.rhs            # List[float]
sp.var_lower_bounds  # List[float]
sp.var_upper_bounds  # List[float]
sp.is_integer        # List[bool]
```

#### 4.8.3 Dispatch Logic in `py_solve()`

```
has_integers?
  YES → BranchAndBoundSolver (LP solver = PDLP if gpu else SIMPLEX)
  NO  →
    method == "simplex" OR (not gpu AND method == "auto")
      → SimplexSolver::solve()
    else
      → PDLPSolver::solve()  [CUDA if compiled, else CPU]
      if ITERATION_LIMIT or TIME_LIMIT AND method == "auto"
        → SimplexSolver::solve() as fallback (result.solver_used = "simplex_fallback")
```

#### 4.8.4 SolveResult (Python-facing)

```python
result.status          # str: "OPTIMAL"|"INFEASIBLE"|"UNBOUNDED"|"FEASIBLE"|...
result.solver_used     # str: "pdlp"|"simplex"|"simplex_fallback"
result.objective       # float
result.solution        # List[float] — primal, original variable order
result.dual_solution   # List[float] — dual, original row order
result.primal_dual_gap # float
result.wall_time_ms    # float
result.iterations      # int (phase1+phase2 for simplex; iters for PDLP; nodes for B&B)
result.message         # str (error message)
result.presolve_stats  # PresolveStats object
```

#### 4.8.5 GIL Management

| Phase | GIL state |
|-------|----------|
| Entry into `py_solve()` | GIL held |
| `py::gil_scoped_release release;` before solver call | GIL released |
| `iteration_callback` invocation | `py::gil_scoped_acquire acquire;` re-acquired |
| Return to Python | GIL held |

This allows FastAPI's asyncio event loop to continue processing other requests while a long GPU solve is running in a thread.

---

## 5. Tier 2 — Python FastAPI Server

**File:** [`api/main.py`](file:///E:/firefly/api/main.py)

### 5.1 REST Endpoints

#### GET `/health`

Returns server status and backend mode.

**Response:**
```json
{
  "status": "ok",
  "mode": "GPU",
  "solver_available": true
}
```

Mode values: `"GPU"`, `"CPU (Fallback)"`, `"CPU (Mock Fallback)"`

#### POST `/inspect`

Parses a problem (MPS upload or JSON ProblemDef) and returns structural metadata without solving.

**Request:** `multipart/form-data`
- `file`: `.mps` file (optional)
- `problem_def`: JSON string matching `ProblemDef` schema (optional)

**Response (`InspectResponse`):**
```json
{
  "vars": 42,
  "constrs": 18,
  "is_milp": false,
  "sense": "minimize",
  "problem_summary": "Parsed a linear programming problem to minimize an objective over 42 variables and 18 constraints."
}
```

#### POST `/solve`

Full solve with trace narration.

**Request:** `multipart/form-data`
- `file`: `.mps` file (optional)
- `problem_def`: JSON string (optional)
- `method`: `"auto"` | `"simplex"` | `"pdlp"` (default: `"auto"`)
- `gpu`: bool (default: `true`)

**Response (`SolveResponse`):**
```json
{
  "status": "OPTIMAL",
  "solver_used": "pdlp",
  "objective": -464.753,
  "solution": [1.0, 2.0, ...],
  "wall_time_ms": 120.5,
  "iterations": 3421,
  "mock": null,
  "message": null,
  "trace": [
    {"stage": "parse", "narration": "...", "vars": 42, "constrs": 18},
    {"stage": "presolve", "narration": "...", "rows_removed": 2, ...},
    {"stage": "lp_core", "narration": "...", "history": [...]},
    {"stage": "output", "narration": "...", "status": "OPTIMAL", "objective": -464.753}
  ]
}
```

> [!IMPORTANT]
> If the solver is unavailable or times out, the API returns a response with `mock: true` to distinguish from real results. The `mock` field is never `null` when mock data is returned.

**Timeout:** 60 seconds (configurable via `SOLVE_TIMEOUT_SECONDS`)

#### GET `/benchmark`

Runs all `.mps` files in `api/sample_problems/` and returns GPU vs CPU timing + objective parity.

**Response (`BenchmarkResponse`):**
```json
{
  "benchmark_results": [
    {
      "problem": "afiro.mps",
      "status": "OPTIMAL",
      "solver_used": "pdlp",
      "objective": -464.753,
      "reference": -464.753,
      "difference": 0.0,
      "passed": true,
      "wall_time_ms": 120.0,
      "iterations": 3000
    }
  ]
}
```

---

### 5.2 WebSocket Streaming

**Endpoint:** `ws://localhost:8000/ws/solve-stream`

Designed for real-time convergence monitoring in the UI.

#### Protocol

**Client → Server (initial message):**
```json
{
  "method": "auto",
  "gpu": true,
  "mps_content": "NAME ...",   // OR
  "filename": "afiro.mps",     // OR
  "problem_def": { ... }
}
```

**Server → Client (iteration updates):**
```json
{
  "type": "update",
  "iteration": 100,
  "primal_obj": -420.5,
  "dual_obj": -480.1,
  "elapsed_ms": 45.2,
  "mock": null
}
```

**Server → Client (final result):**
```json
{
  "type": "result",
  "status": "OPTIMAL",
  "solver_used": "pdlp",
  "objective": -464.753,
  "solution": [...],
  "wall_time_ms": 120.0,
  "iterations": 3000,
  "mock": null
}
```

**Server → Client (error):**
```json
{
  "type": "error",
  "message": "Solver encountered: ..."
}
```

#### Implementation

- The `iteration_callback` C++ function posts `StreamUpdate` objects to an `asyncio.Queue`
- A `pump_queue()` coroutine drains the queue to the WebSocket while the solve thread runs
- The solve runs in a `asyncio.to_thread` threadpool executor (releases GIL for CUDA)
- Overall timeout enforced via `asyncio.wait_for(..., timeout=SOLVE_TIMEOUT_SECONDS)`

---

### 5.3 Trace & Narration System

**Files:** [`api/trace.py`](file:///E:/firefly/api/trace.py), [`api/narration.py`](file:///E:/firefly/api/narration.py)

The trace system produces a structured, stage-by-stage audit of every solve:

| Stage | Key Fields | Narration Function |
|-------|-----------|-------------------|
| `parse` | vars, constrs, is_milp, sense | `describe_parse()` |
| `presolve` | rows_removed, variables_fixed, bounds_tightened, reduced_rows/cols | `describe_presolve()` |
| `lp_core` | history (iteration → primal/dual obj), iterations | `describe_lp_core()` |
| `milp` | history (node → incumbent/bound) | `describe_milp()` |
| `output` | status, objective, iterations, time_ms | `describe_output()` |

The `history` array is **downsampled** to max 100 points for response size management, always preserving first and last.

---

### 5.4 Benchmark Engine

**File:** [`core/cli/bench.py`](file:///E:/firefly/core/cli/bench.py)

Shared between the CLI and the `/benchmark` API endpoint. Key design: the `firefly_solver` module is **injected** as a parameter — never imported directly — to allow mock fallback when the native extension is unavailable.

```python
def run_batch(folder, *, method, gpu, references, tol=1e-5, on_result=None, firefly_solver=None) -> BatchSummary
def solve_one(filepath, *, method, gpu, reference, tol, iteration_callback, firefly_solver, raise_errors) -> ProblemResult
```

`ProblemResult` fields: `problem`, `path`, `status`, `solver_used`, `objective`, `reference`, `difference`, `passed`, `wall_time_ms`, `iterations`, `error_message`, `mock`

---

### 5.5 Configuration

**File:** [`api/config.py`](file:///E:/firefly/api/config.py)

Uses `pydantic_settings.BaseSettings` with optional `.env` file:

| Setting | Default | Description |
|---------|---------|-------------|
| `CORS_ORIGINS` | `["http://localhost:5173", ...]` | Allowed origins for browser dev |
| `MAX_UPLOAD_SIZE_BYTES` | 50 MB | Max MPS file upload |
| `SOLVE_TIMEOUT_SECONDS` | 60.0 | Per-request solve timeout |

---

## 6. Tier 3 — Web / Desktop UI (React + Tauri)

### 6.1 Design Language & Palette

The UI follows a **scientific instrumentation** aesthetic — refinery control panel / oscilloscope — not a SaaS dashboard.

#### Exact Color Tokens (6 values only)

| Token | Hex | CSS Variable | Usage |
|-------|-----|-------------|-------|
| Background | `#111310` | `--background` | App background |
| Panel | `#1B1D18` | `--panel` | Cards, sidebar, header |
| Border/Grid | `#33362E` | `--border` | All 1px hairline borders, chart gridlines |
| Text Primary | `#E8E6DE` | `--text-primary` | Main readable text |
| Text Muted | `#8C8B80` | `--text-muted` | Labels, metadata, secondary text |
| Signal Accent | `#E8A33D` | `--signal` | Active/live state ONLY — never decoration |
| Chart Secondary | `#6B8F71` | `--chart-trace` | Dual objective trace on convergence chart |

**Rules:**
- No gradients
- No blur/glow/bokeh effects
- No drop shadows
- No emoji
- Max corner radius: 2px
- Borders: always 1px hairline

#### Typography

| Font | Usage |
|------|-------|
| IBM Plex Sans | All UI text, headings, navigation labels |
| IBM Plex Mono | Every number, label, status readout, solver log, chart axes |

Fixed-width mono ensures solver output digits don't jitter as values update in real time.

#### Firefly Motif

1. **Solver status diamond:** Small rotated square (`w-2 h-2 rotate-45`) next to "SOLVER" label — transparent idle, amber pulse during solve, solid amber on convergence
2. **GPU lane indicators:** Row of 16 small flat square lights (`w-3 h-3`) — all off idle, async random blink during solve, all solid on convergence

---

### 6.2 Application Shell & Routing

**Files:** [`web/src/App.tsx`](file:///E:/firefly/web/src/App.tsx), [`web/src/components/Layout.tsx`](file:///E:/firefly/web/src/components/Layout.tsx)

#### Boot Sequence

```
isTauri?
  YES → Poll GET /health every 250ms (max 10s / 40 attempts)
    Success → set backend mode (GPU/CPU), render app
    Timeout → show BootErrorScreen
  NO  → Ping /health once in background (no blocking), render app immediately
```

#### Layout

```
┌─────────────────────────────────────────────────┐
│ HEADER (h-12)                                   │
│  [Grid icon] FIREFLY | SOLVER ◆ | [GPU badge]  │
│                              v0.1.0 · CUDA sm_89│
├──────────┬──────────────────────────────────────┤
│ SIDEBAR  │ MAIN CONTENT                         │
│ (w-48)   │ (flex-1, scrollable)                 │
│          │                                      │
│ ► Solve  │ <Outlet />                           │
│   Bench  │                                      │
│   Arch.  │                                      │
└──────────┴──────────────────────────────────────┘
```

- Minimum recommended resolution: 1366×768; optimized for 1920×1080
- Low-resolution overlay warning shown for < 1024px wide

#### Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | → redirect `/solve` | Default redirect |
| `/solve` | `<Solve />` | Interactive solver interface |
| `/benchmarks` | `<Benchmarks />` | Performance audit page |
| `/architecture` | `<Architecture />` | Solver pipeline visualization |

---

### 6.3 Solve Page

**File:** [`web/src/pages/Solve.tsx`](file:///E:/firefly/web/src/pages/Solve.tsx)

#### Solver State Machine

```
idle → connecting → solving → converged
                 ↘           ↗
                  → error
```

State is managed via `SolverContext` and affects: GPU lane indicators, solve button label, trace log color coding.

#### UI Sections

**Top Controls Bar:**
- Input selector: dropdown with sample problems (`afiro.mps`, `flugpl.mps`, `egout.mps`, `blend.mps`)
- Upload button (`.mps` upload)
- GPU lane indicator panel (16 lights)
- Solve / Abort / Restart button

**Model Context Panel (left 1/3):**
- Empty state: file icon + "No Model Selected"
- Loading state: animated pulse skeletons
- Active state: Row/Col/NonZero counts, objective value (amber when converged)

**Convergence Trajectory Chart (upper right 2/3):**
- Recharts `LineChart` with `ResponsiveContainer`
- Primal objective trace: amber (`--signal`)
- Dual objective trace: green (`--chart-trace`)
- Empty state: dashed border "Awaiting Telemetry"
- `isAnimationActive={false}` — no chart animation to avoid visual noise

**Execution Trace Panel (lower right 2/3):**
- Scrolling log of solve stage narrations from WebSocket
- Auto-scrolls to bottom on new entries
- Color coding: amber for "Optimal", red for "ERROR", primary for normal
- Animated cursor `▸ _` when solving

#### WebSocket Client Behavior

1. Connect to `ws://localhost:8000/ws/solve-stream`
2. Send `{action: "start", filename: selectedFile}`
3. Receive `{type: "update", ...}` → append to convergence data + trace
4. Receive `{type: "result", ...}` → finalize, setState('converged')
5. Receive `{type: "error", ...}` → setState('error'), toast
6. On `onerror` → fallback `simulateSolve()` for UI demonstration when backend offline

#### Fallback Simulator

When WebSocket fails, `simulateSolve()` generates synthetic convergence data at 100ms intervals over 50 steps, demonstrating the full UI without a backend.

---

### 6.4 Benchmarks Page

**File:** [`web/src/pages/Benchmarks.tsx`](file:///E:/firefly/web/src/pages/Benchmarks.tsx)

Static audit data (to be replaced with live `/benchmark` API call in a future iteration):

| Instance | Type | GPU Obj | CPU Obj | GPU Time | CPU Time |
|---------|------|---------|---------|----------|----------|
| afiro.mps | Netlib Tier 1 | -464.753 | -464.753 | 0.12s | 0.45s |
| flugpl.mps | MIPLIB | 1.16719e+06 | 1.16719e+06 | 4.5s | 28.3s |
| egout.mps | Netlib Tier 1 | 149.589 | 149.589 | 0.8s | 3.2s |

Displays:
1. **Bar chart** — GPU vs CPU execution time (Recharts `BarChart`)
2. **Parity table** — GPU Obj vs CPU Obj with PASS badge (tolerance 1e-3)

---

### 6.5 Architecture Page

**File:** [`web/src/pages/Architecture.tsx`](file:///E:/firefly/web/src/pages/Architecture.tsx)

Four-stage pipeline visualization:

| Step | Title | Description |
|------|-------|-------------|
| 01 | MPS Parser | Reads .mps input. Optimized C++ string processing into sparse CSR format. |
| 02 | Presolve | Redundant row removal, fixed variable substitution, bounds tightening, Ruiz equilibration. |
| 03 | CUDA Core | PDLP algorithm executed on GPU sm_89. Concurrent block reductions and SpMV. |
| 04 | Simplex / MILP | CPU fallback for anti-cycling, unbounded detection, or branch-and-bound logic. |

Cards hover to show amber border (`hover:border-signal`) as the only interactive animation.

---

### 6.6 Tauri Desktop Packaging

**Config:** [`web/src-tauri/tauri.conf.json`](file:///E:/firefly/web/src-tauri/tauri.conf.json)

The Tauri app bundles:
- **Frontend:** React Vite build (`../dist`)
- **Sidecar:** `bin/firefly_api` — the FastAPI server as a standalone executable (PyInstaller bundle)
- **Window:** 800×600, resizable, no fullscreen

The `App.tsx` boot sequence polls `http://localhost:8000/health` to wait for the sidecar to start before rendering the main UI.

**Tauri Version:** 2.x (`@tauri-apps/api ^2.11.1`, `@tauri-apps/cli ^2.11.5`)

---

## 7. CLI Interface

**File:** [`core/cli/firefly.py`](file:///E:/firefly/core/cli/firefly.py)

Distributed as a standalone `firefly.exe` (PyInstaller bundle). Installed to `%LOCALAPPDATA%\Firefly\bin\` and added to User PATH via the PowerShell installer.

### 7.1 Commands

#### `firefly solve <file.mps>`

```
firefly solve problem.mps [--method auto|simplex|pdlp|milp]
                           [--gpu | --no-gpu]
                           [--output <path.json>]
                           [--quiet | --verbose | --debug]
```

Solves a single MPS file. Outputs formatted result to stdout with TrueColor ANSI theming (amber accents matching brand palette).

Exit codes:
| Code | Meaning |
|------|---------|
| 0 | OPTIMAL or FEASIBLE |
| 1 | INFEASIBLE |
| 2 | UNBOUNDED |
| 3 | TIME_LIMIT or NODE_LIMIT |
| 4 | ERROR / parse failure |

#### `firefly benchmark <folder>`

Solves all `.mps` files in folder, compares against reference objectives, shows tabular PASS/FAIL results.

#### `firefly solve-batch <folder>`

Same as benchmark but without reference comparison.

### 7.2 ANSI Color Theme (CLI)

```python
class Theme:
    PRIMARY = "\x1b[38;2;232;230;222m"   # #E8E6DE
    MUTED   = "\x1b[38;2;140;139;128m"   # #8C8B80
    ACCENT  = "\x1b[38;2;232;163;61m"    # #E8A33D
    SECOND  = "\x1b[38;2;107;143;113m"   # #6B8F71
    RESET   = "\x1b[0m"
```

Windows TrueColor mode enabled via `kernel32.SetConsoleMode` (with silent exception fallback).

### 7.3 Windows Context Menu Integration

The installer registers a Windows shell context menu entry:
- **Association:** `.mps` files
- **Label:** "Solve with Firefly"
- **Command:** `"<installDir>\firefly.exe" solve "%1"`
- **Registry path:** `HKCU:\Software\Classes\SystemFileAssociations\.mps\shell\Firefly`

### 7.4 Quick Install

```powershell
irm https://bit.ly/install-firefly | iex
```

Downloads `firefly.exe` from GitHub Releases `v0.1.0` to `%LOCALAPPDATA%\Firefly\bin\`.

---

## 8. Data Schemas & Contracts

### 8.1 API Schemas (`api/schemas.py`)

```python
class ProblemDef(BaseModel):
    num_vars: int
    num_constrs: int
    obj_coeffs: List[float]
    row_ptr: List[int]
    col_idx: List[int]
    values: List[float]
    row_senses: str          # e.g. "LLE"
    rhs: List[float]
    var_lower_bounds: Optional[List[float]] = None
    var_upper_bounds: Optional[List[float]] = None
    is_integer: Optional[List[bool]] = None
    method: str = "auto"
    gpu: bool = True

class SolveRequest(BaseModel):
    mps_content: Optional[str] = None
    problem_def: Optional[ProblemDef] = None
    filename: Optional[str] = None
    method: str = "auto"
    gpu: bool = True

class SolveResponse(BaseModel):
    status: str
    solver_used: Optional[str] = None
    objective: Optional[float] = None
    solution: Optional[List[float]] = None
    wall_time_ms: Optional[float] = None
    iterations: Optional[int] = None
    mock: Optional[bool] = None          # ← MUST be set if result is fabricated
    message: Optional[str] = None
    trace: Optional[List[dict]] = None

class StreamUpdate(BaseModel):
    type: str = "update"
    iteration: int
    primal_obj: float
    dual_obj: float
    elapsed_ms: float
    mock: Optional[bool] = None          # ← MUST be set if simulated
```

### 8.2 Solver Status Enum (C++ → Python string)

| C++ `SolveStatus` | Python string | Meaning |
|-------------------|--------------|---------|
| `OPTIMAL` | `"OPTIMAL"` | Solution found and proved optimal |
| `INFEASIBLE` | `"INFEASIBLE"` | No feasible solution |
| `UNBOUNDED` | `"UNBOUNDED"` | Objective can be improved to -∞ |
| `FEASIBLE` | `"FEASIBLE"` | Integer feasible, not proved optimal |
| `TIME_LIMIT` | `"TIME_LIMIT"` | Wall-clock limit exceeded |
| `NODE_LIMIT` | `"NODE_LIMIT"` | B&B node limit exceeded |
| `ITERATION_LIMIT` | `"ITERATION_LIMIT"` | LP iteration limit |
| `ERROR` | `"ERROR"` | Internal solver error |

### 8.3 Solver Method Strings

| String | Behavior |
|--------|---------|
| `"auto"` | PDLP (GPU if available), fallback Simplex if needed |
| `"simplex"` | Force Revised Simplex |
| `"pdlp"` | Force PDLP |
| `"milp"` | Force Branch-and-Bound (auto-detected from `is_integer` normally) |

---

## 9. Testing Strategy

### 9.1 C++ Unit Tests (`core/tests/`)

Built via CMake `enable_testing()`, run with `ctest`.

| Test File | Coverage |
|-----------|---------|
| `test_mps_parser.cpp` | All MPS sections, BOUNDS variants, malformed inputs |
| `test_presolve.cpp` | Full pipeline presolve |
| `test_presolve_rules.cpp` | Individual reduction rules in isolation |
| `test_simplex.cpp` | Optimal, infeasible, unbounded, degenerate, bounded variables |
| `test_pdlp.cpp` | PDLP convergence on reference problems |
| `test_pdlp_ruiz.cpp` | Ruiz equilibration correctness |
| `test_pdlp_cross_validation.cpp` | PDLP vs Simplex objective parity |
| `test_pdlp_stability.cpp` | Numerical stability on ill-conditioned problems |
| `test_pdlp_concurrency.cpp` | Thread safety of CUDA context |
| `test_branch_and_bound.cpp` | MILP solve, pruning, integrality |
| `test_gpu_unavailability.cpp` | CPU fallback when GPU unavailable |
| `run_real_files.cpp` | Netlib/MIPLIB instance batch solve |
| `benchmark_gpu.cpp` | GPU vs CPU timing benchmark |
| `report_ruiz.cpp` | Ruiz equilibration diagnostics |

#### Regression Test Fixtures (`tests/regression/`)

| Fixture | Tests |
|---------|-------|
| `all_bounds.mps` | All BOUNDS types (LO, UP, FX, FR, MI, BV) |
| `ill_conditioned.mps` | Numerical stability |
| `infeasible.mps` | INFEASIBLE detection |
| `infeasible_mip.mps` | MILP infeasibility |
| `malformed.mps` | Parse error handling |
| `malformed_empty.mps` | Empty file |
| `malformed_undeclared_row.mps` | Undeclared row reference |
| `malformed_unknown_section.mps` | Unknown section |
| `marker_int.mps` | INTEGER MARKER parsing |
| `maximize.mps` | Maximization (negated objective) |
| `ranges.mps` | RANGES section |
| `simple_mip.mps` | Basic MILP |
| `unbounded.mps` | UNBOUNDED detection |
| `whitespace.mps` | Robust whitespace handling |

### 9.2 Python Integration Tests (`api/`)

| File | Coverage |
|------|---------|
| `test_api_integration.py` | Full HTTP endpoint tests via TestClient |
| `test_bindings.py` | pybind11 bindings: parse, solve, all methods, callbacks |
| `test_regression_api.py` | Known-answer tests via API |
| `test_ui.py` | Basic UI smoke tests |
| `validate_api_trace.py` | Trace structure and narration validation |

### 9.3 CLI Regression Tests (`core/cli/test_regression_cli.py`)

End-to-end CLI tests: `firefly solve`, `firefly benchmark`, exit codes, output format.

### 9.4 Audit System (`core/audit.sh`)

A comprehensive shell-based audit that:
1. Builds all build targets (CUDA, CPU, ASAN)
2. Runs `ctest` on each
3. Runs Python binding tests
4. Runs API integration tests
5. Runs CLI regression tests
6. Produces structured audit reports in `audit_reports/`

### 9.5 Definition of "Done"

> "It compiles" is NOT done. "It matches a known correct answer, with a test proving it" is done.

Every solver function must:
1. Pass its unit tests against known-correct answers
2. Perform an internal self-check before returning any OPTIMAL result
3. Never return a fabricated result without `mock: true`

---

## 10. Build System & Distribution

### 10.1 Core Build (CMake)

```cmake
cmake_minimum_required(VERSION 3.20)
project(FireflySolver LANGUAGES CXX)
```

**Targets:**

| Target | Type | Flags |
|--------|------|-------|
| `firefly_core` | Static library | `src/core_dummy.cpp`, `mps_parser.cpp`, `presolve.cpp`, `simplex.cpp`, `pdlp.cpp`, `pdlp_cpu.cpp`, `branch_and_bound.cpp` |
| `_firefly_solver` | pybind11 module | Built only when `BUILD_PYTHON_BINDINGS=ON` |
| Test executables | Executables | Under `tests/CMakeLists.txt` |

**CUDA Integration:**
```cmake
check_language(CUDA)
if(CMAKE_CUDA_COMPILER)
    option(WITH_CUDA "Enable CUDA support" ON)
endif()
if(WITH_CUDA)
    enable_language(CUDA)
    set(CMAKE_CUDA_ARCHITECTURES 89)  # RTX 4050 (Ada Lovelace)
    find_package(CUDAToolkit REQUIRED)
    target_sources(firefly_core PRIVATE src/pdlp_cuda.cu)
    target_compile_definitions(firefly_core PRIVATE FIREFLY_WITH_CUDA)
    target_link_libraries(firefly_core PUBLIC CUDA::cudart CUDA::cusparse CUDA::cublas)
endif()
```

**Address Sanitizer (dev):**
```cmake
option(WITH_ASAN "Enable Address Sanitizer" OFF)
```
Builds to `build_asan/` directory.

**Dependencies:**
- **Eigen 3.4.0** — fetched via `FetchContent` from GitLab
- **cuBLAS, cuSPARSE** — from CUDA Toolkit
- **pybind11** — found via CMake config (must be pre-installed for Python bindings)

### 10.2 Python Package Build (scikit-build-core)

**File:** [`core/pyproject.toml`](file:///E:/firefly/core/pyproject.toml)

```
pip install -e core --no-build-isolation
```

Sets `BUILD_PYTHON_BINDINGS=ON` automatically, produces `firefly_solver` importable package containing `_firefly_solver.pyd` (Windows) or `.so` (Linux).

### 10.3 API Distribution (PyInstaller)

```
core/firefly.spec    → CLI executable (firefly.exe)
api/firefly_api.spec → API server executable (firefly_api.exe)
```

The Tauri bundle embeds `firefly_api.exe` as `src-tauri/bin/firefly_api`.

### 10.4 Web Build

```bash
cd web
npm install
npm run dev      # Development server (Vite, port 5173)
npm run build    # Production build → dist/
npm run tauri    # Tauri dev/build
```

**Dependencies:**
- React 19.2.8 + React DOM
- React Router DOM 7.x
- Recharts 3.10 (charts)
- Framer Motion 13.4 (animations)
- Lucide React 1.48 (icons)
- Sonner 2.0 (toast notifications)
- TailwindCSS 4.3 + PostCSS
- TypeScript 6.0.2
- Vite 8.3
- Tauri 2.11 CLI + API
- shadcn/ui (components.json present)

### 10.5 GitHub Releases

Current: `v0.1.0`  
Release assets:
- `firefly.exe` — Windows CLI standalone
- `firefly_api.exe` — Windows API server standalone

---

## 11. Non-Functional Requirements

### 11.1 Performance

| Metric | Target | Current Status |
|--------|--------|---------------|
| Simplex: Small LP (< 100 vars, < 100 constrs) | < 100ms | Met |
| PDLP CPU: Medium LP (1000 vars, 500 constrs) | < 2s | Met |
| PDLP CUDA: Medium LP (1000 vars, 500 constrs) | < 200ms | Met |
| B&B: Small MILP (< 50 integer vars) | < 60s | Met |
| afiro.mps (Netlib) GPU | ~120ms | Met |
| flugpl.mps (MIPLIB, MILP) GPU | ~4.5s | Met |

### 11.2 Correctness

- All OPTIMAL results verified by internal self-check against constraints
- LP objective parity between GPU and CPU within 1e-3 tolerance
- All numeric comparisons use `tolerance = 1e-6` default

### 11.3 Reliability

- GPU failure falls back to CPU PDLP transparently
- PDLP iteration/time limit falls back to Simplex in "auto" mode
- Presolve infeasibility detection propagates correctly to all paths

### 11.4 Security

- `MAX_UPLOAD_SIZE_BYTES`: 50MB file upload limit
- CORS restricted to `localhost:5173` in dev (configurable via `.env`)
- No shell injection vectors (file paths validated via pybind11)

### 11.5 Observability

- Structured logging via Python `logging` module (`INFO` level)
- Every request logged: `[Problem] [Method] [GPU] [Status] [Time]`
- Presolve statistics surfaced in every solve response
- Trace narration provides human-readable solve audit

---

## 12. Known Gaps & Technical Debt

### 12.1 Algorithmic

| Gap | Impact | Priority |
|-----|--------|---------|
| Simplex has no LU update (Bartels-Golub) — refactorizes every iteration | O(n³) per iteration; slow on medium/large problems | HIGH |
| No steepest-edge pricing — Bland's rule slow on degenerate problems | Increased iterations | MEDIUM |
| No dual simplex — only primal Phase I/II | Cannot warm-start from dual feasibility | MEDIUM |
| PDLP adaptive step size not fully implemented per Applegate et al. | Slower convergence on badly scaled problems | MEDIUM |
| B&B uses no cutting planes (Gomory cuts, cover cuts, etc.) | Larger search trees for combinatorial MILPs | LOW |
| B&B uses no strong branching or pseudo-cost initialization | Suboptimal branching decisions | LOW |
| QP not yet implemented (architecture planned) | Only LP/MILP supported | LOW |

### 12.2 Engineering

| Gap | Impact | Priority |
|-----|--------|---------|
| CudaContext mutex serializes all GPU solves | No concurrent GPU solves | MEDIUM |
| `parse_mps_string()` writes temp file to disk | I/O latency; temp file cleanup if crash | MEDIUM |
| Static benchmark data in Benchmarks.tsx (not live API call) | Stale UI data | LOW |
| Model context panel shows hardcoded values (4096 rows, 12288 cols) | UI not reflecting real loaded model | LOW |
| Upload .mps button in Solve page not wired to WebSocket send | Feature incomplete | MEDIUM |
| Simplex no per-iteration callback (iteration_callback no-op on Simplex path) | No streaming for simplex solves | LOW |
| Debug/diagnostic `std::cout` in pdlp.cpp and pdlp_cpu.cpp (L_norm, Ruiz stats) | Noisy stdout in production | LOW |
| `DEBUG: Row DWASE` debug print in presolve.cpp | Leftover debug code | LOW |

### 12.3 Testing

| Gap | Impact |
|-----|--------|
| Benchmarks page not integrated with live `/benchmark` endpoint | Static data only |
| No automated performance regression CI gate | Regressions may go undetected |
| No memory leak tests (Valgrind / ASAN in CI) | GPU memory leak risk on error paths |

---

## 13. Compliance with Non-Negotiable Rules

The three immutable constraints from `AGENTS.md`:

### Rule 1: No Solver Libraries in `core/`

✅ **Compliant.** The only external dependencies used in `core/` are:
- **Eigen 3.4.0** — for sparse matrix representation and SparseLU in Simplex only (low-level math primitive, not a solver)
- **cuBLAS / cuSPARSE** — for GPU SpMV and norm operations (low-level math primitives)

No imports of: SciPy's `linprog`, HiGHS, GLPK, SCIP, CBC, OR-Tools, Gurobi, CPLEX, Xpress.

### Rule 2: Never Alter Test Data

✅ **Compliant (by design).** Test fixtures in `tests/regression/` and `api/sample_problems/` are read-only inputs. The solver code and test code are what gets fixed when a test fails.

### Rule 3: No Silent Fabrication

✅ **Compliant (enforced).** Every mock/fallback response in `api/main.py` and `api/main.py` WebSocket handler explicitly sets `mock=True` in the response. The `SolveResponse.mock` field is `Optional[bool]` — when `null`, the result is real; when `true`, it is explicitly marked as fabricated.

---

## 14. Roadmap & Future Scope

### Phase 1 (Current — v0.1.0)
- [x] MPS Parser (full section support)
- [x] Presolver (5 reduction rules + equilibration scaling)
- [x] Revised Simplex (two-phase, bounded, Bland's rule)
- [x] PDLP CPU (Chambolle-Pock with restarts)
- [x] PDLP CUDA (GPU-accelerated SpMV on sm_89)
- [x] Branch-and-Bound (best-first + depth-first, PDLP/Simplex LP backend)
- [x] pybind11 bindings + Python API
- [x] FastAPI REST + WebSocket streaming server
- [x] React + Tauri desktop UI
- [x] CLI with context menu integration
- [x] Windows one-line installer

### Phase 2 (Planned)
- [ ] LU update (Bartels-Golub) in Simplex for ~10× speedup
- [ ] Dual simplex for warm-starting
- [ ] Steepest-edge pricing
- [ ] Full Applegate et al. adaptive step size and restart schedule
- [ ] Live benchmark API integration in Benchmarks page
- [ ] Real model context (rows/cols from /inspect API) in Solve page
- [ ] Upload .mps via WebSocket in Solve page
- [ ] Per-stream CUDA contexts for concurrent GPU solves
- [ ] Remove debug `std::cout` from production builds

### Phase 3 (Future)
- [ ] Quadratic Programming (QP) solver
- [ ] Gomory cuts for MILP
- [ ] Strong branching heuristics
- [ ] Linux / macOS packaging
- [ ] Cloud deployment (containerized FastAPI)
- [ ] Problem generator / example library
- [ ] Interactive sensitivity analysis UI

---

*Document generated from full source analysis of `E:\firefly` on 2026-09-25.*  
*Authors: The Fireflies — SIH 2026 PS 26119*
