// Data model for the terminal portfolio redesign.
// Ported verbatim from the design reference (Portfolio-Terminal-reference.html).

export type NavLink = { href: string; label: string };

export type Project = {
  id: string;
  filename: string;
  name: string;
  period: string;
  desc: string;
  tags: string[];
  isPrivate: boolean;
  hasRepo: boolean;
  url: string;
};

export type TimelineType = "work" | "edu" | "volunteer" | "achievement";

export type TimelineEntry = {
  id: string;
  hash: string;
  date: string;
  type: TimelineType;
  title: string;
  org: string;
  bullets: string[];
};

export type Role = {
  id: string;
  slug: string;
  hasStat: boolean;
  stat?: string;
  statLabel?: string;
  company: string;
  title: string;
  dates: string;
  location: string;
  current: boolean;
  tags: string[];
  bullets: string[];
};

export type SkillGroup = { label: string; items: string[] };

export const NAV_LINKS: NavLink[] = [
  { href: "#about", label: "about" },
  { href: "#projects", label: "projects" },
  { href: "#timeline", label: "timeline" },
  { href: "#experience", label: "experience" },
  { href: "#volunteering", label: "volunteering" },
  { href: "#skills", label: "skills" },
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    filename: "wacc_compiler.scala",
    name: "WACC Compiler",
    period: "Jan – Mar 2026",
    desc: "A full compiler for WACC (a C-like language) in Scala, from lexing through AArch64 codegen, extended with a CFG-based optimisation pipeline (constant propagation, dead code elimination) and a graph-colouring register allocator with multiple spill heuristics.",
    tags: ["Scala", "AArch64", "Compilers", "Register Allocation"],
    isPrivate: true,
    hasRepo: false,
    url: "",
  },
  {
    id: "p2",
    filename: "pintos_kernel.c",
    name: "PintOS — Operating System",
    period: "Oct – Dec 2025",
    desc: "A Unix-like kernel built on the PintOS teaching OS: priority-donating thread scheduler, syscall-driven user process lifecycle, and a virtual memory system with demand paging, frame eviction, and swap that cuts initial process memory use by over 95%.",
    tags: ["C", "Operating Systems", "Virtual Memory", "Concurrency"],
    isPrivate: true,
    hasRepo: false,
    url: "",
  },
  {
    id: "p3",
    filename: "deep_research.py",
    name: "Deep Research Agent",
    period: "Personal",
    desc: "A multi-agent research system on LangGraph that takes a high-level question and works it end-to-end — clarifying, decomposing into sub-questions, researching them in parallel, fact-checking claims, then synthesising a citation-backed report.",
    tags: ["Python", "LangGraph", "Multi-Agent Systems"],
    isPrivate: false,
    hasRepo: true,
    url: "https://github.com/Akshath47/deep_research",
  },
  {
    id: "p4",
    filename: "synth_emu.c",
    name: "Emulator & Assembler + Audio Synth",
    period: "University Project",
    desc: "A custom assembler and instruction-level emulator built from scratch in C — encoding, decoding, and executing a simplified instruction set — extended with a real-time SDL audio synthesizer driven by keyboard input.",
    tags: ["C", "Systems Programming", "Custom ISA", "SDL"],
    isPrivate: false,
    hasRepo: true,
    url: "https://github.com/Akshath47/C_project_extension_synth/",
  },
  {
    id: "p5",
    filename: "summit_agent.py",
    name: "Summit — AI Planning Companion",
    period: "Personal",
    desc: "A conversational planning and focus companion built as a multi-agent LangGraph workflow, routing requests across dedicated task, scheduling, profile, and focus-coaching agents with persistent memory across sessions.",
    tags: ["Python", "LangGraph", "Agentic Workflows"],
    isPrivate: false,
    hasRepo: true,
    url: "https://github.com/Akshath47/summit",
  },
  {
    id: "p6",
    filename: "stock_lstm.py",
    name: "Stock Price Predictor",
    period: "Personal",
    desc: "A 4-layer stacked LSTM in TensorFlow that forecasts next-day stock prices from 60-day sliding windows of historical data, with dropout regularisation between layers to curb overfitting.",
    tags: ["Python", "TensorFlow", "LSTM", "Time-Series"],
    isPrivate: false,
    hasRepo: false,
    url: "",
  },
];

export const TIMELINE: TimelineEntry[] = [
  { id: "t6", hash: "HEAD", date: "Expected 2028", type: "edu", title: "graduating with MEng Computing", org: "Imperial College London", bullets: ["Still compiling."] },
  { id: "t5", hash: "a91c5e3", date: "Jun 2026 – Sep 2026", type: "work", title: "Software Engineering Intern @ Man Group", org: "London, UK · current", bullets: ["Built data lineage + declarative data-quality checks across ~100 ETL pipelines", "Event-driven on Kafka, checks executed on Ray inside an isolated Kubernetes namespace"] },
  { id: "t11", hash: "7c2d9f4", date: "Jun 2026", type: "achievement", title: "First Class Honours", org: "Imperial College London", bullets: ["Achieved a First Class honours for Year 2 of my MEng Computing degree."] },
  { id: "t3", hash: "c4d81aa", date: "Apr 2026 – Present", type: "volunteer", title: "Technology Consultant @ Heavenly Joy Foundation", org: "Meal-delivery charity · Hyderabad", bullets: ["Built a full-stack ops platform — field-agent app, admin dashboard, fraud-detection layer"] },
  { id: "t4", hash: "f09e2d7", date: "Jan 2026 – Present", type: "work", title: "Backend Engineer (Part-time) @ Pulpoo", org: "Remote", bullets: ["Extracted a reusable omnichannel customer-support core from a production system", "Built the agent memory layer for a live Samsung Mexico deployment, cutting inference cost 30%"] },
  { id: "t2", hash: "2b7e9f0", date: "Jul – Sep 2025", type: "work", title: "AI Engineering Intern @ ValueLabs", org: "Hyderabad, India", bullets: ["Rebuilt a JD-to-resume semantic search system on Qdrant, cutting query latency ~90s to ~6s (15x)", "Built a real-time GPT-Realtime voice interviewer with a multi-agent, phase-by-phase architecture"] },
  { id: "t9", hash: "3d8a1c9", date: "Jun 2025", type: "achievement", title: "First Class Honours", org: "Imperial College London", bullets: ["Achieved a First Class honours for Year 1 of my MEng Computing degree."] },
  { id: "t1", hash: "8f1a3c2", date: "2024", type: "edu", title: "enrolled at Imperial College London", org: "MEng Computing · First Class (Yr 1 & 2 so far)", bullets: ["Coursework: Algorithms & Data Structures, Operating Systems, Machine Learning, Probability & Statistics, Software Engineering, Linear Algebra"] },
  { id: "t10", hash: "9e4b217", date: "2024", type: "achievement", title: "Valedictorian", org: "High School", bullets: ["Was honoured to be the valedictorian for my graduating class of 2024 at Sancta Maria, Hyderabad."] },
  { id: "t0", hash: "5a2f8e1", date: "Jul – Aug 2023", type: "work", title: "Intern @ ValueLabs", org: "Hyderabad, India", bullets: ["First introduction to ML: basic regression and clustering models, a sentiment-analysis project, and an early CNN image classifier"] },
];

export const ROLES: Role[] = [
  {
    id: "r1", slug: "man-group", hasStat: true, stat: "~100", statLabel: "ETL pipelines instrumented", company: "Man Group", title: "Software Engineering Intern", dates: "Jun 2026 – Sep 2026", location: "London, UK", current: true, tags: ["Kafka", "Kubernetes", "Ray", "DataHub", "Python"], bullets: [
      "Implemented data lineage emission across ~100 Investment Analytics ETL pipelines, wiring them into the firm's DataHub platform and replacing bespoke per-pipeline code with a reusable onboarding pattern.",
      "Built declarative data-quality checks (freshness, completeness, statistical anomaly detection) running at every ETL load step, catching issues before they reach client-facing dashboards.",
      "Folded lineage and data-quality into a config-driven pipeline base class, so future pipelines inherit both by default with no extra setup.",
      "Architected the system event-driven on Kafka, with checks executed on Ray clusters inside an isolated Kubernetes namespace.",
    ],
  },
  {
    id: "r2", slug: "pulpoo", hasStat: true, stat: "70%", statLabel: "faster response latency", company: "Pulpoo", title: "Backend Engineer, Part-time", dates: "Jan 2026 – Present", location: "Remote", current: true, tags: ["LLM Agents", "Neo4j", "Observability"], bullets: [
      "Architected and extracted a reusable omnichannel customer-support platform core from a production system, with an overlay layer letting client-specific workflows build against one core interface without forking it.",
      "Designed and deployed a scalable omnichannel memory layer for real-time AI agents in a live Samsung Mexico deployment, gating model downgrades on eval results to cut inference cost 30% with no regression.",
      "Cut live response latency 70% by moving memory extraction and knowledge-graph (Neo4j) writes off the synchronous path into an async job queue.",
      "Built an evaluation and observability layer (prompt versioning, regression testing, per-agent cost tracking), taking the system from prototype to a production-ready v1 used in real customer interactions.",
    ],
  },
  {
    id: "r3", slug: "valuelabs", hasStat: true, stat: "15×", statLabel: "faster semantic search", company: "ValueLabs", title: "AI Engineering Intern", dates: "Jul 2025 – Sep 2025", location: "Hyderabad, India", current: false, tags: ["Vector Search", "Qdrant", "Retrieval"], bullets: [
      "Rebuilt a JD-to-resume semantic search system on the Qdrant vector database, cutting query response times from ~90s to ~6s — a 15x speed-up — through caching and search-parameter tuning.",
      "Built a hybrid retrieval pipeline combining vector and keyword search with multi-query rewriting and reciprocal rank fusion, improving retrieval quality for a sales-meeting assistant.",
      "Built a real-time voice interviewing agent on GPT-Realtime with a multi-agent, phase-by-phase architecture for context-aware handoffs.",
      "Implemented prompt engineering and guardrails to keep live interviews on-topic, on-tone, and hallucination-free.",
    ],
  },
  {
    id: "r4", slug: "valuelabs-2023", hasStat: false, company: "ValueLabs", title: "Intern", dates: "Jul 2023 – Aug 2023", location: "Hyderabad, India", current: false, tags: ["Machine Learning", "Python", "Computer Vision"], bullets: [
      "Got an early introduction to machine learning, training basic regression and clustering models.",
      "Explored transformers and NLP, building a sentiment-analysis project and a text-classification project on unlabelled data.",
      "Took a first look at computer vision — learned how CNNs work and built a simple image classifier.",
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { label: "languages", items: ["Python", "C", "C++", "Scala", "Haskell", "Java", "Kotlin", "TypeScript", "JavaScript", "SQL"] },
  { label: "systems & infrastructure", items: ["Kubernetes", "Kafka", "Ray", "Docker", "Linux", "CI/CD", "Git"] },
  { label: "data & frameworks", items: ["PostgreSQL", "Neo4j", "Redis", "Qdrant", "PyTorch", "LangGraph", "React", "Node.js"] },
];

export const VOLUNTEER_LOG: { timestamp: string; text: string }[] = [
  { timestamp: "Sat Jul 18", text: "Designed a fraud-detection layer — location verification, photo-authenticity checks, and anomaly detection — so leadership can trust field data without manual audits." },
  { timestamp: "Wed Jul 08", text: "Added role-based permissions and an audit trail to support accountability as the charity expands to more villages and staff." },
  { timestamp: "Sun Jul 05", text: "Built the field-agent mobile app and admin dashboard end-to-end on a shared real-time data layer." },
  { timestamp: "Fri Jun 19", text: "Architected the platform to scale from a single-location operation to a multi-village model with no rework of the core." },
];

// Volunteering role start date, used for the systemd-style live uptime counter.
export const VOLUNTEER_START = new Date(2026, 3, 1); // 2026-04-01
