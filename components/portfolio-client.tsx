"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import Image from "next/image";
import {
  NAV_LINKS,
  PROJECTS,
  ROLES,
  SKILL_GROUPS,
  TIMELINE,
  VOLUNTEER_LOG,
  VOLUNTEER_START,
  type TimelineType,
} from "@/components/portfolio/data";
import { getTheme, themeVars, type Mode } from "@/components/portfolio/theme";

// ── Config flags (easy to swap, matching the reference defaults) ──────────
const TIMELINE_STYLE: "classic" | "bold" = "bold";
const PROJECTS_STYLE: "grid" | "explorer" = "explorer";
const ENABLE_TYPEWRITER = true;
const CV_PATH = "/AkshathYennam_CV.pdf";
const MODE_STORAGE_KEY = "akshath-portfolio-terminal-mode";

// Parse a CSS declaration string into a React style object so the reference's
// inline style strings can be reused verbatim.
function css(s: string): CSSProperties {
  const out: Record<string, string> = {};
  for (const decl of s.split(";")) {
    const i = decl.indexOf(":");
    if (i === -1) continue;
    const prop = decl.slice(0, i).trim();
    const val = decl.slice(i + 1).trim();
    if (!prop) continue;
    const key = prop.startsWith("--")
      ? prop
      : prop.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
    out[key] = val;
  }
  return out as CSSProperties;
}

const FILTER_DEFS: { key: "all" | TimelineType; label: string }[] = [
  { key: "all", label: "all" },
  { key: "work", label: "work" },
  { key: "edu", label: "education" },
  { key: "volunteer", label: "volunteer" },
  { key: "achievement", label: "achievement" },
];

const TYPE_LABELS: Record<TimelineType, string> = {
  work: "WORK",
  edu: "EDUCATION",
  volunteer: "VOLUNTEER",
  achievement: "ACHIEVEMENT",
};

const KONAMI_SEQ = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "KeyB", "KeyA",
];

type TermLine = { type: "input" | "output"; text: string };

const GITHUB_PATH =
  "M12 .5C5.73.5.5 5.86.5 12.26c0 5.12 3.29 9.46 7.86 11 .57.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.39-3.88-1.39-.52-1.34-1.28-1.7-1.28-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.2 1.76 1.2 1.02 1.78 2.68 1.26 3.33.97.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.29-5.24-5.75 0-1.27.45-2.31 1.19-3.12-.12-.29-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.19a10.9 10.9 0 0 1 5.79 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.6.24 2.79.12 3.08.74.81 1.18 1.85 1.18 3.12 0 4.47-2.69 5.46-5.25 5.75.41.36.78 1.08.78 2.18 0 1.57-.02 2.84-.02 3.23 0 .31.21.68.8.56 4.56-1.55 7.85-5.89 7.85-11C23.5 5.86 18.27.5 12 .5Z";

function GitHubIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d={GITHUB_PATH} />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <span style={css("display:inline-flex;align-items:center;justify-content:center;width:15px;height:15px;border:1.5px solid currentColor;border-radius:3px;font-size:9px;font-weight:800;")}>
      in
    </span>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12m0 0-4-4m4 4 4-4" />
      <path d="M4 17v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" />
    </svg>
  );
}

function LockIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function PortfolioClient() {
  const [mode, setMode] = useState<Mode>("dark");
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | TimelineType>("all");
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [tiltId, setTiltId] = useState<string | null>(null);
  const [tiltRotX, setTiltRotX] = useState(0);
  const [tiltRotY, setTiltRotY] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState("p1");
  const [scrambleDisplay, setScrambleDisplay] = useState("WACC Compiler");
  const [termOpen, setTermOpen] = useState(false);
  const [termInput, setTermInput] = useState("");
  const [termLines, setTermLines] = useState<TermLine[]>([
    { type: "output", text: "akshath's portfolio shell — type 'help' to see available commands" },
  ]);
  const [konamiActive, setKonamiActive] = useState(false);
  const [now, setNow] = useState<number | null>(null);

  const aboutRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLElement | null>(null);
  const experienceRef = useRef<HTMLElement | null>(null);
  const volunteeringRef = useRef<HTMLElement | null>(null);
  const skillsRef = useRef<HTMLElement | null>(null);
  const termHistoryRef = useRef<HTMLDivElement | null>(null);
  const termInputRef = useRef<HTMLInputElement | null>(null);

  const scrambleInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const konamiTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Refs mirroring state for once-registered keydown listeners.
  const termOpenRef = useRef(termOpen);
  termOpenRef.current = termOpen;
  const selectedIdRef = useRef(selectedProjectId);
  selectedIdRef.current = selectedProjectId;

  const t = getTheme(mode);
  const isDark = mode !== "light";

  // ── Theme persistence ──────────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MODE_STORAGE_KEY);
      if (stored === "light" || stored === "dark") setMode(stored);
    } catch {
      /* ignore */
    }
  }, []);

  const toggleMode = useCallback(() => {
    setMode((prev) => {
      const m: Mode = (prev || "dark") === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(MODE_STORAGE_KEY, m);
      } catch {
        /* ignore */
      }
      return m;
    });
  }, []);

  // ── Scroll reveal ──────────────────────────────────────────────────
  useEffect(() => {
    const keys: Record<string, React.RefObject<HTMLElement | null>> = {
      about: aboutRef,
      projects: projectsRef,
      timeline: timelineRef,
      experience: experienceRef,
      volunteering: volunteeringRef,
      skills: skillsRef,
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const key = Object.keys(keys).find((k) => keys[k].current === e.target);
            if (key) {
              setRevealed((s) => (s[key] ? s : { ...s, [key]: true }));
              observer.unobserve(e.target);
            }
          }
        });
      },
      { threshold: 0.12 }
    );
    Object.values(keys).forEach((r) => {
      if (r.current) observer.observe(r.current);
    });
    return () => observer.disconnect();
  }, []);

  // ── Timeline scroll progress ───────────────────────────────────────
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (!timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const total = rect.height + vh * 0.5;
        const scrolled = vh * 0.85 - rect.top;
        let p = total > 0 ? scrolled / total : 0;
        p = Math.max(0, Math.min(1, p));
        p = Math.round(p * 40) / 40;
        setTimelineProgress((prev) => (prev === p ? prev : p));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // ── Live uptime ticker (systemd-style volunteering card) ───────────
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Scramble the selected project title ────────────────────────────
  const startScramble = useCallback((id: string) => {
    const project = PROJECTS.find((p) => p.id === id);
    if (!project) return;
    const target = project.name;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&";
    const duration = 380;
    const startTime = Date.now();
    if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    const tick = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      const revealCount = Math.ceil(progress * target.length);
      let display = "";
      for (let i = 0; i < target.length; i++) {
        if (target[i] === " ") {
          display += " ";
          continue;
        }
        display += i < revealCount ? target[i] : chars[Math.floor(Math.random() * chars.length)];
      }
      setScrambleDisplay(display);
      if (progress >= 1 && scrambleInterval.current) {
        clearInterval(scrambleInterval.current);
        scrambleInterval.current = null;
      }
    };
    scrambleInterval.current = setInterval(tick, 35);
    tick();
  }, []);

  const selectProject = useCallback(
    (id: string) => {
      if (id === selectedIdRef.current) return;
      setSelectedProjectId(id);
      startScramble(id);
    },
    [startScramble]
  );

  // ── Konami code ────────────────────────────────────────────────────
  const celebrateKonami = useCallback(() => {
    if (konamiTimeout.current) clearTimeout(konamiTimeout.current);
    setKonamiActive(true);
    konamiTimeout.current = setTimeout(() => setKonamiActive(false), 2200);
  }, []);

  const triggerKonamiFromKeys = useCallback(() => {
    celebrateKonami();
    setTermOpen(true);
    setTermLines((s) => [
      ...s,
      { type: "output", text: "↑↑↓↓←→←→ B A — sequence verified." },
      { type: "output", text: "KONAMI CODE ACCEPTED. +30 lives." },
    ]);
  }, [celebrateKonami]);

  // ── Global keydown: project arrow-nav + konami buffer ──────────────
  useEffect(() => {
    const onProjectsKeyDown = (e: KeyboardEvent) => {
      if (termOpenRef.current) return;
      const tag = (e.target as HTMLElement | null)?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      const ids = PROJECTS.map((p) => p.id);
      const idx = ids.indexOf(selectedIdRef.current);
      if (idx === -1) return;
      e.preventDefault();
      const nextIdx =
        e.key === "ArrowDown" ? Math.min(ids.length - 1, idx + 1) : Math.max(0, idx - 1);
      selectProject(ids[nextIdx]);
    };

    let konamiBuf: string[] = [];
    const onKonamiKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      konamiBuf.push(e.code);
      if (konamiBuf.length > KONAMI_SEQ.length) konamiBuf.shift();
      if (
        konamiBuf.length === KONAMI_SEQ.length &&
        konamiBuf.every((k, i) => k === KONAMI_SEQ[i])
      ) {
        konamiBuf = [];
        triggerKonamiFromKeys();
      }
    };

    window.addEventListener("keydown", onProjectsKeyDown);
    window.addEventListener("keydown", onKonamiKeyDown);
    return () => {
      window.removeEventListener("keydown", onProjectsKeyDown);
      window.removeEventListener("keydown", onKonamiKeyDown);
    };
  }, [selectProject, triggerKonamiFromKeys]);

  // Cleanup timers on unmount.
  useEffect(() => {
    return () => {
      if (konamiTimeout.current) clearTimeout(konamiTimeout.current);
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    };
  }, []);

  // ── Terminal history autoscroll + focus on open ────────────────────
  useEffect(() => {
    if (termHistoryRef.current) {
      termHistoryRef.current.scrollTop = termHistoryRef.current.scrollHeight;
    }
  }, [termLines]);

  useEffect(() => {
    if (termOpen && termInputRef.current) termInputRef.current.focus();
  }, [termOpen]);

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput;
    const lower = cmd.trim().toLowerCase();
    if (lower === "clear") {
      setTermLines([]);
      setTermInput("");
      return;
    }
    if (lower === "exit" || lower === "quit") {
      setTermOpen(false);
      setTermInput("");
      return;
    }
    const out: string[] = [];
    if (lower === "") {
      /* no-op */
    } else if (lower === "help")
      out.push("available: help, whoami, about, skills, projects, contact, cv, date, ls, cat <file>, sudo make coffee, konami, exit, clear");
    else if (lower === "whoami")
      out.push("akshath yennam — cs student @ imperial college london. backend / systems / applied ai.");
    else if (lower === "about")
      out.push("building backend systems by day, compilers and operating systems by night. currently at man group + pulpoo.");
    else if (lower === "skills")
      out.push("python · c · c++ · scala · java · kotlin · typescript · sql · haskell · kubernetes · kafka · ray · docker · postgres · neo4j · qdrant · pytorch · langgraph");
    else if (lower === "projects")
      out.push("see the projects section above — or scroll up, i know you just got here.");
    else if (lower === "contact")
      out.push("github.com/Akshath47 · linkedin.com/in/akshathyennam · akshathyennam@gmail.com");
    else if (lower === "cv" || lower === "resume" || lower === "download cv") {
      out.push("opening cv.pdf...");
      try {
        window.open(CV_PATH, "_blank");
      } catch {
        /* ignore */
      }
    } else if (lower === "date") out.push(new Date().toDateString() + " — probably mid-debug.");
    else if (lower === "ls") out.push("about.txt  projects/  experience/  skills.json  contact.md");
    else if (lower.indexOf("cat ") === 0) {
      const file = lower.slice(4).trim();
      if (file === "about.txt")
        out.push("cs student, backend/systems/ai. imperial college london, class of 2028.");
      else if (file === "contact.md")
        out.push("github.com/Akshath47 · linkedin.com/in/akshathyennam · akshathyennam@gmail.com");
      else if (file === "skills.json")
        out.push('{ "languages": ["python","c","c++","scala","java","kotlin","typescript","haskell"], "infra": ["kubernetes","kafka","ray","docker"], "data": ["postgresql","neo4j","qdrant","pytorch","langgraph"] }');
      else out.push("cat: " + file + ": no such file or directory");
    } else if (lower === "sudo make coffee")
      out.push("permission granted. brewing... done. productivity +100%.");
    else if (lower === "konami") {
      out.push("↑↑↓↓←→←→ B A — yes, it actually works now. try it on your keyboard.");
      celebrateKonami();
    } else out.push("command not found: " + cmd.trim() + " — type 'help'");

    setTermLines((s) => [
      ...s,
      { type: "input", text: cmd },
      ...out.map((text): TermLine => ({ type: "output", text })),
    ]);
    setTermInput("");
  };

  // ── Derived render values ──────────────────────────────────────────
  const revealAnim = (key: string): CSSProperties =>
    revealed[key] ? css("animation:fadeInUp .8s cubic-bezier(.2,.8,.2,1) both;") : {};

  const typeColor = (type: TimelineType) =>
    type === "work" ? t.accent : type === "edu" ? t.accent2 : type === "achievement" ? t.accent4 : t.accent3;

  const isBoldTimeline = TIMELINE_STYLE === "bold";
  const isExplorerProjects = PROJECTS_STYLE === "explorer";

  const LANG_COLORS: Record<string, string> = {
    Scala: t.accent,
    C: t.accent2,
    Python: "#f4c542",
    TypeScript: t.accent3,
    Kotlin: "#c77dff",
    Haskell: t.accent3,
    React: t.accent3,
    ARM: t.accent2,
  };

  const selectedProject =
    PROJECTS.find((p) => p.id === selectedProjectId) || PROJECTS[0];

  const uptimeString = (() => {
    if (now === null) return "";
    const diff = Math.max(0, now - VOLUNTEER_START.getTime());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    return `${d}d ${h}h ${m}m ${sec}s`;
  })();

  const rootStyle: CSSProperties = {
    ...css(
      "min-height:100vh;background:var(--bg);color:var(--fg);"
    ),
    fontFamily: "var(--font-jetbrains-mono), monospace",
    ...themeVars(t),
  };

  return (
    <div style={rootStyle}>
      {/* Fixed grid background overlay */}
      <div
        style={css(
          "position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.05;background-image:repeating-linear-gradient(0deg, var(--fg) 0px, var(--fg) 1px, transparent 1px, transparent 48px),repeating-linear-gradient(90deg, var(--fg) 0px, var(--fg) 1px, transparent 1px, transparent 48px);"
        )}
      />

      <div style={css("position:relative;z-index:1;")}>
        {/* ── Nav ──────────────────────────────────────────────────── */}
        <nav style={css("position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 28px;background:var(--bg);border-bottom:1px solid var(--border);")}>
          <a href="#top" style={css("color:var(--accent);font-weight:700;font-size:14px;text-decoration:none;letter-spacing:-.02em;white-space:nowrap;")}>
            akshath@dev<span style={css("color:var(--muted);")}>:~$</span>
          </a>
          <div style={css("display:flex;align-items:center;gap:20px;flex-wrap:wrap;")}>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="pf-navlink" style={css("color:var(--muted);text-decoration:none;font-size:13px;")}>
                ./{link.label}
              </a>
            ))}
          </div>
          <div style={css("display:flex;align-items:center;gap:10px;")}>
            <button onClick={toggleMode} className="pf-ghost" style={css("display:flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--border);color:var(--fg);border-radius:6px;padding:6px 10px;font-family:inherit;font-size:12px;cursor:pointer;")}>
              {isDark ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
              )}
              {isDark ? "dark" : "light"}
            </button>
            <a href={CV_PATH} download className="pf-fade" style={css("display:flex;align-items:center;gap:6px;background:var(--accent);color:var(--bg);text-decoration:none;padding:7px 14px;border-radius:6px;font-size:12px;font-weight:700;white-space:nowrap;")}>
              ↓ CV
            </a>
          </div>
        </nav>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header id="top" style={css("position:relative;overflow:hidden;min-height:86vh;display:flex;flex-direction:column;justify-content:center;padding:60px 28px;max-width:980px;margin:0 auto;")}>
          <div style={css("position:absolute;top:-10%;right:-10%;width:55vw;height:55vw;max-width:640px;max-height:640px;background:radial-gradient(circle, var(--accent) 0%, transparent 70%);opacity:.14;filter:blur(70px);animation:auroraDrift1 22s ease-in-out infinite;pointer-events:none;")} />
          <div style={css("position:absolute;bottom:-15%;left:-10%;width:45vw;height:45vw;max-width:520px;max-height:520px;background:radial-gradient(circle, var(--accent2) 0%, transparent 70%);opacity:.11;filter:blur(80px);animation:auroraDrift2 26s ease-in-out infinite;pointer-events:none;")} />
          <div style={css("color:var(--accent);font-size:14px;margin-bottom:18px;")}>$ whoami</div>
          <h1 style={css("font-size:clamp(40px,8vw,86px);line-height:1.03;margin:0 0 22px;font-weight:800;letter-spacing:-.02em;")}>Akshath Yennam</h1>
          <p style={css("font-size:clamp(15px,2vw,19px);line-height:1.6;color:var(--muted);max-width:640px;margin:0 0 10px;min-height:1.6em;")}>
            CS student at Imperial College London. I build backend systems by day, and compilers, operating systems, and AI agents by night — mostly on purpose.
            {ENABLE_TYPEWRITER && (
              <span style={css("animation:blink 1s step-end infinite;color:var(--accent);")}>_</span>
            )}
          </p>
          <div style={css("display:flex;align-items:center;gap:9px;margin:16px 0 36px;font-size:13px;color:var(--muted);")}>
            <span style={css("width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px var(--accentDim);")} />
            currently interning at Man Group · London
          </div>
          <div style={css("display:flex;flex-wrap:wrap;gap:12px;")}>
            <a href="https://github.com/Akshath47" target="_blank" rel="noopener" className="pf-ghost" style={css("display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;border:1px solid var(--border);color:var(--fg);")}>
              <GitHubIcon /> GitHub
            </a>
            <a href="https://linkedin.com/in/akshathyennam" target="_blank" rel="noopener" className="pf-ghost" style={css("display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;border:1px solid var(--border);color:var(--fg);")}>
              <LinkedInIcon /> LinkedIn
            </a>
            <a href="mailto:akshathyennam@gmail.com" className="pf-ghost" style={css("display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:600;border:1px solid var(--border);color:var(--fg);")}>
              <MailIcon /> Email
            </a>
            <a href={CV_PATH} download className="pf-fade" style={css("display:inline-flex;align-items:center;gap:8px;padding:11px 18px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;background:var(--accent);color:var(--bg);")}>
              <DownloadIcon /> Download CV
            </a>
          </div>
        </header>

        {/* ── About ────────────────────────────────────────────────── */}
        <section id="about" ref={aboutRef} style={{ ...css("max-width:900px;margin:0 auto;padding:100px 28px;display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;"), ...revealAnim("about") }}>
          <div style={css("width:220px;flex-shrink:0;")}>
            <Image
              src="/akshath.png"
              alt="Akshath Yennam"
              width={440}
              height={440}
              quality={95}
              priority
              style={css("width:220px;height:220px;border:1px solid var(--border);border-radius:14px;object-fit:cover;display:block;")}
            />
          </div>
          <div style={css("flex:1;min-width:280px;")}>
            <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>$ cat about.txt</div>
            <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 18px;font-weight:800;")}>About</h2>
            <p style={css("font-size:15px;line-height:1.75;color:var(--fg);margin:0 0 14px;max-width:620px;")}>
              I&apos;m a CS student at Imperial College London, currently interning as a software engineer in Front Office Engineering at Man Group and moonlighting as a backend engineer at Pulpoo, a startup building custom AI agents for workplace delegation and productivity. I like the unglamorous parts of software — pipelines, observability, the plumbing under the dashboard&nbsp;— the parts you only notice when they fail.
            </p>
            <p style={css("font-size:15px;line-height:1.75;color:var(--fg);margin:0;max-width:620px;")}>
              Outside of work I have an ever-growing backlog of side projects I swear I&apos;ll finish, and volunteer building software for a meal-delivery charity — so my hobbies feel slightly less self-indulgent.
            </p>
          </div>
        </section>

        {/* ── Projects ─────────────────────────────────────────────── */}
        <section id="projects" ref={projectsRef} style={{ ...css("max-width:1240px;margin:0 auto;padding:100px 28px;"), ...revealAnim("projects") }}>
          <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>$ ls ./projects</div>
          <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 8px;font-weight:800;")}>Projects</h2>
          <p style={css("font-size:13px;color:var(--muted);margin:0 0 34px;")}>
            {String(PROJECTS.length).padStart(2, "0")} repositories, sorted newest first.
          </p>

          {!isExplorerProjects && (
            <div style={css("display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:30px;")}>
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="pf-card" style={css("display:flex;flex-direction:column;background:var(--bg2);border:1px solid var(--border);border-radius:10px;overflow:hidden;")}>
                  <div style={css("display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--border);")}>
                    <span style={css("width:9px;height:9px;border-radius:50%;background:#ff5f56;")} />
                    <span style={css("width:9px;height:9px;border-radius:50%;background:#ffbd2e;")} />
                    <span style={css("width:9px;height:9px;border-radius:50%;background:#27c93f;")} />
                    <span style={css("margin-left:8px;font-size:11.5px;color:var(--muted);")}>{proj.filename}</span>
                  </div>
                  <div style={css("padding:26px 24px 28px;display:flex;flex-direction:column;gap:14px;flex:1;")}>
                    <div style={css("display:flex;align-items:baseline;justify-content:space-between;gap:8px;")}>
                      <h3 style={css("margin:0;font-size:16px;font-weight:700;")}>{proj.name}</h3>
                      <span style={css("font-size:11px;color:var(--muted);white-space:nowrap;")}>{proj.period}</span>
                    </div>
                    <p style={css("margin:0;font-size:13.5px;line-height:1.6;color:var(--muted);flex:1;")}>{proj.desc}</p>
                    <div style={css("display:flex;flex-wrap:wrap;gap:6px;")}>
                      {proj.tags.map((tag) => (
                        <span key={tag} style={css("font-size:10.5px;padding:3px 8px;border-radius:5px;background:var(--accentDim);color:var(--accent);")}>{tag}</span>
                      ))}
                      {proj.isPrivate && (
                        <span style={css("font-size:10.5px;padding:3px 8px;border-radius:5px;background:transparent;border:1px dashed var(--muted);color:var(--muted);")}>Private Repo</span>
                      )}
                    </div>
                    {proj.hasRepo && (
                      <a href={proj.url} target="_blank" rel="noopener" className="pf-link" style={css("margin-top:2px;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--fg);text-decoration:none;")}>
                        <GitHubIcon size={13} /> View on GitHub
                      </a>
                    )}
                    {proj.isPrivate && (
                      <span style={css("margin-top:2px;display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:600;color:var(--muted);")}>
                        <LockIcon /> Source private — university-owned
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isExplorerProjects && (
            <div style={css("display:flex;border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--bg2);min-height:540px;")}>
              <div style={css("width:300px;flex-shrink:0;border-right:1px solid var(--border);display:flex;flex-direction:column;")}>
                <div style={css("padding:12px 16px;border-bottom:1px solid var(--border);font-size:11px;color:var(--muted);display:flex;align-items:center;gap:6px;")}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                  click a file to preview it — or use ↑↓
                </div>
                <div style={css("overflow-y:auto;flex:1;padding:6px 0;")}>
                  {PROJECTS.map((proj) => {
                    const selected = proj.id === selectedProjectId;
                    const dotColor = LANG_COLORS[proj.tags[0]] || t.accent;
                    const size = Math.max(4, Math.round(proj.desc.length / 9)) + "K";
                    return (
                      <button
                        key={proj.id}
                        onClick={() => selectProject(proj.id)}
                        className="pf-row"
                        style={{
                          ...css("all:unset;cursor:pointer;display:flex;align-items:center;gap:10px;width:100%;box-sizing:border-box;padding:9px 16px;font-size:11.5px;border-left:3px solid transparent;"),
                          ...(selected
                            ? css(`background:${t.accentDim};color:${t.accent};font-weight:600;border-left:3px solid ${t.accent};`)
                            : css(`color:${t.fg};`)),
                        }}
                      >
                        <span style={css(`width:7px;height:7px;border-radius:50%;background:${dotColor};flex-shrink:0;`)} />
                        <span style={css("color:var(--muted);white-space:nowrap;")}>-rwxr-xr-x</span>
                        <span style={css("color:var(--muted);white-space:nowrap;width:34px;")}>{size}</span>
                        <span style={css("flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left;")}>{proj.filename}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={selected ? css(`opacity:1;color:${t.accent};`) : css(`opacity:.4;color:${t.muted};`)}>
                          <path d="M9 6l6 6-6 6" />
                        </svg>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div style={css("flex:1;padding:40px 44px;display:flex;flex-direction:column;min-width:0;")}>
                <div style={css("font-size:11.5px;color:var(--accent);margin-bottom:16px;")}>$ cat {selectedProject.filename}</div>
                <h3 style={css("margin:0 0 8px;font-size:27px;font-weight:800;letter-spacing:.01em;")}>{scrambleDisplay}</h3>
                <div style={css("font-size:12.5px;color:var(--muted);margin-bottom:26px;")}>{selectedProject.period}</div>
                <p style={css("font-size:15px;line-height:1.75;color:var(--fg);margin:0 0 28px;max-width:600px;")}>{selectedProject.desc}</p>
                <div style={css("display:flex;flex-wrap:wrap;gap:8px;margin-bottom:30px;")}>
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} style={css("font-size:11.5px;padding:4px 11px;border-radius:5px;background:var(--accentDim);color:var(--accent);")}>{tag}</span>
                  ))}
                  {selectedProject.isPrivate && (
                    <span style={css("font-size:11.5px;padding:4px 11px;border-radius:5px;background:transparent;border:1px dashed var(--muted);color:var(--muted);")}>Private Repo</span>
                  )}
                </div>
                {selectedProject.hasRepo && (
                  <a href={selectedProject.url} target="_blank" rel="noopener" className="pf-fade-82" style={css("display:inline-flex;align-items:center;gap:8px;width:fit-content;padding:11px 20px;border-radius:8px;text-decoration:none;font-size:13px;font-weight:700;background:var(--accent);color:var(--bg);transition:opacity .2s ease;")}>
                    View on GitHub <GitHubIcon size={14} />
                  </a>
                )}
                {selectedProject.isPrivate && (
                  <span style={css("display:inline-flex;align-items:center;gap:8px;width:fit-content;padding:11px 20px;border-radius:8px;font-size:13px;font-weight:700;color:var(--muted);border:1px dashed var(--border);")}>
                    <LockIcon size={14} /> Source private — university-owned
                  </span>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ── Timeline ─────────────────────────────────────────────── */}
        <section id="timeline" ref={timelineRef} style={{ ...css("max-width:1100px;margin:0 auto;padding:100px 28px;"), ...revealAnim("timeline") }}>
          <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>$ git log --all --graph --chronological</div>
          <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 12px;font-weight:800;")}>Timeline</h2>
          <p style={css("font-size:13px;color:var(--muted);margin:0 0 24px;")}>click a commit to expand. filter the branches below.</p>
          <div style={css("display:flex;flex-wrap:wrap;gap:8px;margin-bottom:48px;")}>
            {FILTER_DEFS.map((f) => {
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  style={{
                    ...css("font-family:inherit;font-size:11.5px;padding:7px 15px;border-radius:20px;cursor:pointer;transition:background .2s ease,color .2s ease,border-color .2s ease;"),
                    ...(active
                      ? css(`background:${t.accent};border:1px solid ${t.accent};color:${t.bg};font-weight:600;`)
                      : css(`background:transparent;border:1px solid ${t.border};color:${t.muted};`)),
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {!isBoldTimeline && (
            <div style={css("position:relative;padding-left:34px;max-width:820px;margin:0 auto;")}>
              <div style={css("position:absolute;left:9px;top:6px;bottom:6px;width:2px;background:var(--border);")} />
              <div style={{ ...css("position:absolute;left:9px;top:6px;width:2px;background:var(--accent);"), height: `${timelineProgress * 100}%`, transition: "height .08s linear" }} />
              {TIMELINE.map((item, idx) => {
                const isExpanded = expandedCommit === item.id;
                const matches = activeFilter === "all" || activeFilter === item.type;
                const color = typeColor(item.type);
                return (
                  <div key={item.id} style={{ position: "relative", display: matches ? "block" : "none", paddingBottom: "36px", opacity: 1, animation: revealed.timeline ? `fadeInUp .6s cubic-bezier(.2,.8,.2,1) ${idx * 70}ms both` : "none" }}>
                    <button onClick={() => setExpandedCommit((c) => (c === item.id ? null : item.id))} className="pf-classic-entry" style={css("all:unset;cursor:pointer;display:block;width:100%;box-sizing:border-box;border-radius:8px;padding:8px 10px;margin:-8px 0 -8px -10px;")}>
                      <div style={css("position:relative;display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;")}>
                        <span style={{ position: "absolute", left: "-34px", top: "50%", width: "13px", height: "13px", borderRadius: "50%", background: color, boxShadow: `0 0 0 ${isExpanded ? 6 : 4}px ${t.accentDim}`, transition: "box-shadow .25s ease, transform .25s ease", transform: `translateY(-50%) scale(${isExpanded ? 1.15 : 1})` }} />
                        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".06em", padding: "3px 9px", borderRadius: "20px", display: "inline-block", background: `${color}1f`, color, border: `1px solid ${color}66`, whiteSpace: "nowrap" }}>{TYPE_LABELS[item.type]}</span>
                        <span style={css("font-size:12px;color:var(--muted);")}>{item.hash}</span>
                        <span style={css("font-size:15px;font-weight:600;")}>{item.title}</span>
                        <span style={css("font-size:12px;color:var(--muted);margin-left:auto;white-space:nowrap;display:flex;align-items:center;gap:6px;")}>
                          {item.date} <span style={{ color: "var(--accent)", display: "inline-block", transform: `rotate(${isExpanded ? 90 : 0}deg)`, transition: "transform .25s ease" }}>▸</span>
                        </span>
                      </div>
                      <div style={css("font-size:12.5px;color:var(--muted);margin-top:4px;")}>{item.org}</div>
                    </button>
                    <div style={{ overflow: "hidden", maxHeight: isExpanded ? "520px" : "0px", opacity: isExpanded ? 1 : 0, transition: "max-height .45s cubic-bezier(.4,0,.2,1), opacity .3s ease" }}>
                      <ul style={css("margin:12px 0 0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:6px;")}>
                        {item.bullets.map((bullet, bi) => (
                          <li key={bi} style={css("font-size:13px;line-height:1.6;color:var(--fg);padding-left:18px;position:relative;")}>
                            <span style={css("position:absolute;left:0;color:var(--accent);")}>+</span>{bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isBoldTimeline && (
            <div style={css("position:relative;")}>
              <div style={css("position:absolute;left:50%;top:6px;bottom:6px;width:2px;background:var(--border);transform:translateX(-50%);")} />
              <div style={{ ...css("position:absolute;left:50%;top:6px;width:2px;background:var(--accent);transform:translateX(-50%);"), height: `${timelineProgress * 100}%`, transition: "height .08s linear" }} />
              {TIMELINE.map((item, idx) => {
                const isExpanded = expandedCommit === item.id;
                const matches = activeFilter === "all" || activeFilter === item.type;
                const color = typeColor(item.type);
                const side: "left" | "right" = idx % 2 === 0 ? "left" : "right";
                const isTilted = tiltId === item.id;
                const tiltTransform = isTilted
                  ? `perspective(700px) rotateX(${tiltRotX}deg) rotateY(${tiltRotY}deg) scale(1.03)`
                  : "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
                const clip =
                  side === "left"
                    ? "polygon(0 0, calc(100% - 16px) 0, 100% 50%, calc(100% - 16px) 100%, 0 100%)"
                    : "polygon(16px 0, 100% 0, 100% 100%, 16px 100%, 0 50%)";
                const cardStyle: CSSProperties = {
                  background: t.bg2,
                  border: `1px solid ${isTilted ? t.accent : t.border}`,
                  padding: side === "left" ? "24px 34px 24px 24px" : "24px 24px 24px 34px",
                  clipPath: clip,
                  width: "clamp(200px,100%,440px)",
                  cursor: "pointer",
                  transform: tiltTransform,
                  boxShadow: isTilted ? `0 14px 34px -10px ${t.accent}66` : "none",
                  transition: "transform .15s ease-out, border-color .2s ease, box-shadow .2s ease",
                };
                const Card = (
                  <div
                    style={cardStyle}
                    onClick={() => setExpandedCommit((c) => (c === item.id ? null : item.id))}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const px = (e.clientX - rect.left) / rect.width;
                      const py = (e.clientY - rect.top) / rect.height;
                      setTiltId(item.id);
                      setTiltRotY((px - 0.5) * 14);
                      setTiltRotX((0.5 - py) * 14);
                    }}
                    onMouseLeave={() => {
                      setTiltId(null);
                      setTiltRotX(0);
                      setTiltRotY(0);
                    }}
                  >
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: ".06em", padding: "3px 9px", borderRadius: "20px", display: "inline-block", background: `${color}1f`, color, border: `1px solid ${color}66`, whiteSpace: "nowrap" }}>{TYPE_LABELS[item.type]}</div>
                    <div style={css("font-size:24px;font-weight:800;color:var(--accent);line-height:1;margin-top:10px;")}>{item.date}</div>
                    <div style={css("font-size:17px;font-weight:700;margin-top:8px;")}>{item.title}</div>
                    <div style={css("font-size:12.5px;color:var(--muted);margin-top:3px;")}>{item.org}</div>
                    <div style={css("display:inline-flex;align-items:center;gap:6px;margin-top:14px;font-size:11.5px;color:var(--muted);")}>
                      <span>{item.hash}</span>
                      <span style={{ color: "var(--accent)", display: "inline-block", transform: `rotate(${isExpanded ? 90 : 0}deg)`, transition: "transform .25s ease" }}>▸</span>
                    </div>
                    <div style={{ overflow: "hidden", maxHeight: isExpanded ? "520px" : "0px", opacity: isExpanded ? 1 : 0, transition: "max-height .45s cubic-bezier(.4,0,.2,1), opacity .3s ease" }}>
                      <ul style={css("margin:12px 0 0;padding-left:0;list-style:none;display:flex;flex-direction:column;gap:6px;")}>
                        {item.bullets.map((bullet, bi) => (
                          <li key={bi} style={css("font-size:13px;line-height:1.6;color:var(--fg);padding-left:18px;position:relative;")}>
                            <span style={css("position:absolute;left:0;color:var(--accent);")}>+</span>{bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
                return (
                  <div key={item.id} style={{ display: matches ? "flex" : "none", alignItems: "center", width: "100%", padding: "26px 0", opacity: 1, animation: revealed.timeline ? `fadeInUp .6s cubic-bezier(.2,.8,.2,1) ${idx * 70}ms both` : "none" }}>
                    <div style={css("flex:1;display:flex;justify-content:flex-end;")}>
                      {side === "left" && Card}
                    </div>
                    <div style={css("width:64px;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative;")}>
                      <div style={{ width: "100%", height: "3px", background: color, opacity: 0.45 }} />
                      <div style={{ position: "absolute", top: "50%", left: "50%", width: "20px", height: "20px", background: color, border: `3px solid ${t.bg}`, transform: `translate(-50%,-50%) rotate(45deg) scale(${isExpanded ? 1.2 : 1})`, boxShadow: `0 0 0 ${isExpanded ? 5 : 3}px ${t.accentDim}`, transition: "transform .25s ease, box-shadow .25s ease" }} />
                    </div>
                    <div style={css("flex:1;display:flex;justify-content:flex-start;")}>
                      {side === "right" && Card}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Experience ───────────────────────────────────────────── */}
        <section id="experience" ref={experienceRef} style={{ ...css("max-width:920px;margin:0 auto;padding:100px 28px;"), ...revealAnim("experience") }}>
          <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>$ cat experience.log</div>
          <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 8px;font-weight:800;")}>Work Experience</h2>
          <p style={css("font-size:13px;color:var(--muted);margin:0 0 36px;")}>diffs from four codebases I&apos;ve shipped into.</p>
          {ROLES.map((role) => (
            <div key={role.id} style={css("border-top:1px solid var(--border);padding:34px 0;")}>
              <div style={css("font-size:11.5px;color:var(--muted);margin-bottom:16px;")}>~/experience/{role.slug} $ cat summary.diff</div>
              <div style={css("display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:10px;margin-bottom:4px;")}>
                <div style={css("display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;")}>
                  <h3 style={css("margin:0;font-size:20px;font-weight:800;")}>{role.title}</h3>
                  <span style={css("color:var(--accent);font-size:14.5px;")}>@ {role.company}</span>
                </div>
                <div style={css("display:flex;align-items:center;gap:8px;")}>
                  <span style={css("font-size:12.5px;color:var(--muted);white-space:nowrap;")}>{role.dates}</span>
                  {role.current && (
                    <span style={css("font-size:10px;padding:2px 8px;border-radius:20px;background:var(--accentDim);color:var(--accent);white-space:nowrap;")}>active now</span>
                  )}
                </div>
              </div>
              <div style={css("font-size:12.5px;color:var(--muted);margin-bottom:22px;")}>{role.location}</div>
              <div style={css("display:flex;flex-wrap:wrap;gap:28px;align-items:stretch;")}>
                <ul style={css("margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:3px;flex:1;min-width:280px;")}>
                  {role.bullets.map((bullet, bi) => (
                    <li key={bi} style={css("font-size:14px;line-height:1.6;color:var(--fg);padding:7px 14px 7px 28px;position:relative;background:var(--accentDim);")}>
                      <span style={css("position:absolute;left:11px;color:var(--accent);font-weight:700;")}>+</span>{bullet}
                    </li>
                  ))}
                </ul>
                {role.hasStat && (
                  <div style={css("flex-shrink:0;width:150px;text-align:center;border:1px solid var(--border);border-radius:10px;padding:20px 16px;display:flex;flex-direction:column;justify-content:center;")}>
                    <div style={css("font-size:30px;font-weight:800;color:var(--accent);line-height:1;")}>{role.stat}</div>
                    <div style={css("font-size:11px;color:var(--muted);margin-top:10px;line-height:1.4;")}>{role.statLabel}</div>
                  </div>
                )}
              </div>
              <div style={css("font-size:11.5px;color:var(--muted);margin-top:20px;")}>
                <span style={css("color:var(--accent);")}>stack:</span> {role.tags.join(" · ")}
              </div>
            </div>
          ))}
        </section>

        {/* ── Volunteering ─────────────────────────────────────────── */}
        <section id="volunteering" ref={volunteeringRef} style={{ ...css("max-width:900px;margin:0 auto;padding:100px 28px;"), ...revealAnim("volunteering") }}>
          <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>{"/* this one doesn't compile to a paycheck */"}</div>
          <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 24px;font-weight:800;")}>Volunteering</h2>
          <div style={css("border:1px solid var(--border);border-radius:10px;background:var(--bg2);overflow:hidden;")}>
            <div style={css("display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--border);")}>
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ff5f56;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ffbd2e;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#27c93f;")} />
              <span style={css("margin-left:8px;font-size:11.5px;color:var(--muted);")}>meal-delivery.service</span>
            </div>
            <div style={css("padding:28px 28px 30px;")}>
              <div style={css("display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:18px;")}>
                <span style={css("color:var(--accent2);font-size:15px;animation:pulse 2s ease-in-out infinite;")}>●</span>
                <span style={css("font-size:20px;font-weight:800;")}>Heavenly Joy Foundation</span>
                <span style={css("font-size:13px;color:var(--muted);")}>meal-delivery.service — Technology Consultant</span>
              </div>
              <div style={css("display:flex;flex-direction:column;gap:7px;font-size:13px;margin-bottom:22px;")}>
                <div>
                  <span style={css("color:var(--muted);")}>Loaded:</span> loaded (/etc/systemd/system/heavenly-joy.service; <span style={css("color:var(--accent);")}>enabled</span>)
                </div>
                <div>
                  <span style={css("color:var(--muted);")}>Active:</span> <span style={css("color:var(--accent2);font-weight:600;")}>active (running)</span> since 2026-04-01; {uptimeString} ago
                </div>
                <div>
                  <span style={css("color:var(--muted);")}>Docs:</span> none. it&apos;s volunteer work, not documentation work.
                </div>
              </div>
              <div style={css("display:flex;flex-direction:column;gap:9px;")}>
                {VOLUNTEER_LOG.map((log, li) => (
                  <div key={li} style={css("font-size:14px;line-height:1.6;color:var(--fg);padding:11px 16px 11px 30px;position:relative;background:var(--accentDim);border-radius:6px;")}>
                    <span style={css("position:absolute;left:13px;top:11px;color:var(--accent);font-weight:700;")}>+</span>{log.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ───────────────────────────────────────────────── */}
        <section id="skills" ref={skillsRef} style={{ ...css("max-width:900px;margin:0 auto;padding:100px 28px;"), ...revealAnim("skills") }}>
          <div style={css("color:var(--accent);font-size:13px;margin-bottom:10px;")}>$ ./skills</div>
          <h2 style={css("font-size:clamp(26px,4vw,34px);margin:0 0 30px;font-weight:800;")}>Skills</h2>
          <div style={css("border:1px solid var(--border);border-radius:10px;background:var(--bg2);overflow:hidden;")}>
            <div style={css("display:flex;align-items:center;gap:6px;padding:10px 14px;border-bottom:1px solid var(--border);")}>
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ff5f56;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ffbd2e;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#27c93f;")} />
              <span style={css("margin-left:8px;font-size:11.5px;color:var(--muted);")}>neofetch</span>
            </div>
            <div style={css("display:flex;flex-wrap:wrap;")}>
              <div style={css("padding:24px;display:flex;align-items:center;justify-content:center;border-right:1px solid var(--border);")}>
                <pre style={css("margin:0;font-size:12px;line-height:1.5;color:var(--accent);")}>{`╭───────────╮
│   A · Y   │
╰───────────╯
  v2026.07`}</pre>
              </div>
              <div style={css("padding:24px;display:flex;flex-direction:column;gap:16px;flex:1;min-width:260px;")}>
                {SKILL_GROUPS.map((group) => (
                  <div key={group.label}>
                    <div style={css("font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--accent);margin-bottom:8px;")}>{group.label}</div>
                    <div style={css("display:flex;flex-wrap:wrap;gap:7px;")}>
                      {group.items.map((skill) => (
                        <span key={skill} style={css("font-size:12.5px;padding:4px 10px;border-radius:5px;border:1px solid var(--border);color:var(--fg);")}>{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <footer id="contact" style={css("border-top:1px solid var(--border);padding:60px 28px 40px;")}>
          <div style={css("max-width:1100px;margin:0 auto;display:flex;flex-direction:column;gap:28px;")}>
            <div style={css("display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;align-items:flex-start;")}>
              <div>
                <div style={css("font-weight:700;font-size:16px;margin-bottom:6px;")}>Akshath Yennam</div>
                <div style={css("font-size:13px;color:var(--muted);max-width:340px;line-height:1.6;")}>Backend engineering, systems programming, applied AI. Currently at Man Group &amp; Pulpoo.</div>
              </div>
              <div style={css("display:flex;flex-wrap:wrap;gap:20px;")}>
                <a href="https://github.com/Akshath47" target="_blank" rel="noopener" className="pf-link" style={css("display:inline-flex;align-items:center;gap:7px;color:var(--fg);text-decoration:none;font-size:13px;")}>
                  <GitHubIcon /> GitHub
                </a>
                <a href="https://linkedin.com/in/akshathyennam" target="_blank" rel="noopener" className="pf-link" style={css("display:inline-flex;align-items:center;gap:7px;color:var(--fg);text-decoration:none;font-size:13px;")}>
                  <LinkedInIcon /> LinkedIn
                </a>
                <a href="mailto:akshathyennam@gmail.com" className="pf-link" style={css("display:inline-flex;align-items:center;gap:7px;color:var(--fg);text-decoration:none;font-size:13px;")}>
                  <MailIcon /> Email
                </a>
                <a href={CV_PATH} download className="pf-link" style={css("display:inline-flex;align-items:center;gap:7px;color:var(--fg);text-decoration:none;font-size:13px;")}>
                  <DownloadIcon /> CV
                </a>
              </div>
            </div>
            <div style={css("display:flex;flex-wrap:wrap;justify-content:space-between;gap:12px;font-size:12px;color:var(--muted);border-top:1px solid var(--border);padding-top:20px;")}>
              <span>© 2026 Akshath Yennam. Built with too much caffeine.</span>
              <span>psst — there&apos;s a terminal in the corner.</span>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Floating terminal launcher ─────────────────────────────── */}
      <button onClick={() => setTermOpen((o) => !o)} className="pf-term-btn" style={css("position:fixed;bottom:24px;right:24px;z-index:60;width:52px;height:52px;border-radius:50%;background:var(--accent);color:var(--bg);border:none;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 6px 18px rgba(0,0,0,.35);font-family:inherit;")}>
        {">_"}
      </button>

      {/* ── Terminal panel ─────────────────────────────────────────── */}
      {termOpen && (
        <div onClick={() => setTermOpen(false)} style={css("position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:70;display:flex;align-items:flex-end;justify-content:flex-end;padding:24px;")}>
          <div onClick={(e) => e.stopPropagation()} style={css("width:min(520px,92vw);height:min(440px,70vh);background:var(--bg2);border:1px solid var(--border);border-radius:10px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.5);")}>
            <div style={css("display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid var(--border);flex-shrink:0;")}>
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ff5f56;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#ffbd2e;")} />
              <span style={css("width:9px;height:9px;border-radius:50%;background:#27c93f;")} />
              <span style={css("margin-left:8px;font-size:11.5px;color:var(--muted);")}>akshath@portfolio: bash</span>
              <button onClick={() => setTermOpen(false)} style={css("margin-left:auto;background:none;border:none;color:var(--muted);cursor:pointer;font-size:14px;font-family:inherit;")}>✕</button>
            </div>
            <div ref={termHistoryRef} style={css("flex:1;overflow-y:auto;padding:14px 16px;font-size:12.5px;line-height:1.7;")}>
              {termLines.map((line, li) => (
                <div
                  key={li}
                  style={
                    line.type === "input"
                      ? { color: "var(--fg)", fontWeight: 600, marginTop: 8 }
                      : { color: "var(--muted)", whiteSpace: "pre-wrap" }
                  }
                >
                  {line.type === "input" ? "akshath@portfolio:~$ " + line.text : line.text}
                </div>
              ))}
            </div>
            <form onSubmit={handleTermSubmit} style={css("display:flex;align-items:center;gap:8px;padding:10px 16px;border-top:1px solid var(--border);flex-shrink:0;")}>
              <span style={css("color:var(--accent);font-size:12.5px;white-space:nowrap;")}>akshath@portfolio:~$</span>
              <input
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                ref={termInputRef}
                autoFocus
                placeholder="try 'help'"
                style={css("flex:1;background:transparent;border:none;outline:none;color:var(--fg);font-family:inherit;font-size:12.5px;min-width:0;")}
              />
            </form>
          </div>
        </div>
      )}

      {/* ── Konami overlay ─────────────────────────────────────────── */}
      {konamiActive && (
        <div style={css("position:fixed;inset:0;z-index:200;pointer-events:none;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.45);animation:konamiFade .2s ease-out;")}>
          <div style={css("border:1px solid var(--accent);background:var(--bg2);padding:22px 34px;border-radius:10px;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,.5);animation:konamiPop .45s cubic-bezier(.2,.8,.2,1) both;")}>
            <div style={css("font-size:11px;letter-spacing:.14em;color:var(--accent2);margin-bottom:8px;")}>ACHIEVEMENT_UNLOCKED.exe</div>
            <div style={css("font-size:24px;font-weight:800;color:var(--accent);margin-bottom:6px;")}>+30 LIVES</div>
            <div style={css("font-size:12.5px;color:var(--muted);")}>↑↑↓↓←→←→ B A — the real Konami Code, verified.</div>
          </div>
        </div>
      )}
    </div>
  );
}
