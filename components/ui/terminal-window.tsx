"use client";

import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showButtons?: boolean;
  onClose?: () => void;
}

export function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  showButtons = true,
  onClose,
}: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      {showButtons && (
        <div className="terminal-header">
          {onClose ? (
            <button
              type="button"
              aria-label="Close window"
              className="terminal-button terminal-button-close cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-terminal-green-medium focus:ring-offset-0"
              onClick={onClose}
            />
          ) : (
            <div className="terminal-button" />
          )}
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
