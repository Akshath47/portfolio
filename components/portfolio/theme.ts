// Burgundy palette + resolved theme tokens for dark/light mode.
// Values taken verbatim from the design reference's renderVals().

export type Mode = "dark" | "light";

export type Theme = {
  bg: string;
  bg2: string;
  border: string;
  fg: string;
  muted: string;
  accent: string;
  accent2: string;
  accent3: string;
  accent4: string;
  accentDim: string;
};

// The reference ships three presets (phosphor / burgundy / violet); per the
// handoff we ship the burgundy default only.
const BURGUNDY = {
  a: "#c9364f",
  a2: "#f0b877",
  aL: "#7a2439",
  a2L: "#946621",
  dim: "#391722",
  dimL: "#fbe4e9",
  a3: "#d88fa0",
  a3L: "#9c4a5c",
  a4: "#ff6b8a",
  a4L: "#b8213f",
};

export function getTheme(mode: Mode): Theme {
  const isDark = mode !== "light";
  return {
    bg: isDark ? "#0a0e0c" : "#f4f6f2",
    bg2: isDark ? "#101512" : "#ffffff",
    border: isDark ? "#20302a" : "#d8ddd6",
    fg: isDark ? "#dceee1" : "#14201a",
    muted: isDark ? "#7c9187" : "#5c6b62",
    accent: isDark ? BURGUNDY.a : BURGUNDY.aL,
    accent2: isDark ? BURGUNDY.a2 : BURGUNDY.a2L,
    accent3: isDark ? BURGUNDY.a3 : BURGUNDY.a3L,
    accent4: isDark ? BURGUNDY.a4 : BURGUNDY.a4L,
    accentDim: isDark ? BURGUNDY.dim : BURGUNDY.dimL,
  };
}

// Build the CSS-custom-property map applied to the page root, so static markup
// can reference var(--accent) etc. exactly like the reference template.
export function themeVars(t: Theme): React.CSSProperties {
  return {
    ["--bg" as string]: t.bg,
    ["--bg2" as string]: t.bg2,
    ["--border" as string]: t.border,
    ["--fg" as string]: t.fg,
    ["--muted" as string]: t.muted,
    ["--accent" as string]: t.accent,
    ["--accent2" as string]: t.accent2,
    ["--accent3" as string]: t.accent3,
    ["--accent4" as string]: t.accent4,
    ["--accentDim" as string]: t.accentDim,
  } as React.CSSProperties;
}
