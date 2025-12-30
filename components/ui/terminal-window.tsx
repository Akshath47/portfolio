"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showButtons?: boolean;
}

export function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  showButtons = true,
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      {showButtons && (
        <div className="terminal-header">
          <div className="terminal-button" />
          <div className="terminal-button" />
          <div className="terminal-button" />
          {title && <span className="terminal-title ml-2">{title}</span>}
        </div>
      )}
      <div className="terminal-content">{children}</div>
    </div>
  );
}

interface TerminalLineProps {
  prompt?: string;
  children: ReactNode;
  className?: string;
}

export function TerminalLine({
  prompt = "$",
  children,
  className = "",
}: TerminalLineProps) {
  return (
    <div className={`flex items-start gap-2 ${className}`}>
      <span className="text-terminal-green-medium flex-shrink-0">{prompt}</span>
      <span className="text-terminal-green-bright">{children}</span>
    </div>
  );
}

interface TerminalOutputProps {
  children: ReactNode;
  className?: string;
  dim?: boolean;
}

export function TerminalOutput({
  children,
  className = "",
  dim = false,
}: TerminalOutputProps) {
  return (
    <div
      className={`${dim ? "text-terminal-green-dark" : "text-terminal-green-medium"} ${className}`}
    >
      {children}
    </div>
  );
}
