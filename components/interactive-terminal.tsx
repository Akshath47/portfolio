"use client";

import { useState, useRef, useEffect } from "react";

interface TerminalLine {
  type: "input" | "output" | "error" | "success";
  content: string;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to akshath@portfolio terminal. Type 'help' for available commands." }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const showToggleButton = false; // Temporarily hide the floating terminal button

  const commands: Record<string, () => TerminalLine[]> = {
    help: () => [
      { type: "output", content: "Available commands:" },
      { type: "output", content: "  help          - Show this help message" },
      { type: "output", content: "  about         - Display information about Akshath" },
      { type: "output", content: "  skills        - List technical skills" },
      { type: "output", content: "  experience    - Jump to experience section" },
      { type: "output", content: "  projects      - Jump to projects section" },
      { type: "output", content: "  journey       - Jump to journey section" },
      { type: "output", content: "  contact       - Show contact information" },
      { type: "output", content: "  resume        - Download resume" },
      { type: "output", content: "  clear         - Clear terminal" },
      { type: "output", content: "  matrix        - Enter the Matrix..." },
      { type: "output", content: "  whoami        - Find out who you're talking to" },
      { type: "output", content: "  sudo          - Try it and see..." },
    ],
    about: () => [
      { type: "output", content: "Computing student at Imperial College London" },
      { type: "output", content: "Passionate about AI, systems design, and building things that matter" },
      { type: "output", content: "Love tackling challenging problems and turning ideas into working solutions" },
    ],
    skills: () => [
      { type: "output", content: "Languages: Python, JavaScript, Kotlin, Java, C" },
      { type: "output", content: "AI/ML: RAG, LangGraph, Agentic AI, Speech AI, GPT-Realtime" },
      { type: "output", content: "Web: React, Next.js, TypeScript" },
      { type: "output", content: "Databases: Qdrant, Vector DB" },
    ],
    experience: () => {
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      return [{ type: "success", content: "Navigating to Experience section..." }];
    },
    projects: () => {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      return [{ type: "success", content: "Navigating to Projects section..." }];
    },
    journey: () => {
      document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" });
      return [{ type: "success", content: "Navigating to Journey section..." }];
    },
    contact: () => [
      { type: "output", content: "Email: akshathyennam@gmail.com" },
      { type: "output", content: "LinkedIn: linkedin.com/in/akshathyennam" },
      { type: "output", content: "GitHub: github.com/Akshath47" },
    ],
    resume: () => {
      window.open("/AkshathYennam_CV.pdf", "_blank");
      return [{ type: "success", content: "Opening resume in new tab..." }];
    },
    clear: () => {
      setHistory([]);
      return [];
    },
    whoami: () => [
      { type: "output", content: "You're chatting with Akshath Yennam" },
      { type: "output", content: "Software Engineer | AI Engineer | Builder" },
      { type: "output", content: "Currently studying Computing at Imperial College London" },
      { type: "output", content: "Fun fact: I learn best by getting my hands dirty!" },
    ],
    matrix: () => {
      // Trigger matrix effect
      const event = new CustomEvent("triggerMatrixEffect");
      window.dispatchEvent(event);
      return [
        { type: "success", content: "Wake up, Neo..." },
        { type: "success", content: "The Matrix has you..." },
        { type: "success", content: "Follow the white rabbit." },
      ];
    },
    sudo: () => [
      { type: "error", content: "Nice try! But you don't have sudo privileges here 😉" },
      { type: "output", content: "[sudo] password for visitor: " },
      { type: "error", content: "Sorry, try again." },
    ],
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Add to history
    setHistory(prev => [...prev, { type: "input", content: `$ ${cmd}` }]);

    if (!trimmedCmd) return;

    // Add to command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    // Execute command
    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      setHistory(prev => [...prev, ...output]);
    } else {
      setHistory(prev => [...prev, {
        type: "error",
        content: `Command not found: ${trimmedCmd}. Type 'help' for available commands.`
      }]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Terminal Button */}
      {showToggleButton && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black border-2 border-terminal-green-medium rounded-lg flex items-center justify-center hover:bg-terminal-green-dark/20 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-terminal-green-medium/50"
          aria-label="Toggle terminal"
        >
          <span className="text-terminal-green-bright font-mono text-xl">&gt;_</span>
        </button>
      )}

      {/* Terminal Window */}
      {isOpen && (
        <div className={`fixed z-50 bg-black border-2 border-terminal-green-medium rounded-lg shadow-2xl shadow-terminal-green-medium/30 flex flex-col transition-all duration-300 ${
          isMaximized
            ? "top-4 bottom-4 right-6 w-[90vw] md:w-[500px] h-auto"
            : "bottom-24 right-6 w-[90vw] md:w-[600px] max-h-[400px]"
        }`}>
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-terminal-green-dark/50 bg-terminal-green-dark/10">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
                title="Close"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer"
                title="Minimize"
              />
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
                title={isMaximized ? "Restore" : "Maximize"}
              />
              <span className="text-terminal-green-medium text-xs font-mono ml-2">
                terminal@interactive
              </span>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="flex-1 overflow-y-auto p-3 space-y-1 text-sm font-mono [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium"
          >
            {history.map((line, idx) => (
              <div
                key={idx}
                className={
                  line.type === "input"
                    ? "text-terminal-green-bright font-semibold"
                    : line.type === "error"
                    ? "text-red-400"
                    : line.type === "success"
                    ? "text-emerald-400"
                    : "text-gray-400"
                }
              >
                {line.content}
              </div>
            ))}
          </div>

          {/* Terminal Input */}
          <div className="flex items-center gap-2 px-3 py-2 border-t border-terminal-green-dark/50 bg-terminal-green-dark/10">
            <span className="text-terminal-green-medium">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-terminal-green-bright font-mono outline-none"
              placeholder="Type a command..."
              autoComplete="off"
            />
          </div>
        </div>
      )}
    </>
  );
}
