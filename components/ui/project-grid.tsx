"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  details: string;
  fullDetails?: string;
  technologies: string[];
  github: boolean;
  codeUrl?: string;
  projectType: string;
  buttonText?: string;
}

const formatText = (text: string) =>
  text
    .split(/\r?\n+/)
    .map(chunk => chunk.trim())
    .filter(Boolean);

const projects: Project[] = [
  {
    id: "1",
    title: "Deep Research Agent",
    summary: "An autonomous AI system that can take a high-level research question and independently explore it end to end. The agent breaks problems down, searches the web in parallel, verifies information, and produces structured, citation-backed outputs. Designed to mimic how a human researcher explores complex topics, but at scale.",
    description: "An AI agent that autonomously researches topics using web scraping and LLMs.",
    image: "/img_deep_research.png",
    details: "A multi-agent deep research system implemented using LangGraph, extending ideas from the DeepAgents library. The system orchestrates a set of specialized agents that collaborate over a shared virtual filesystem to perform end-to-end research workflows.\n\nThe architecture consists of distinct agents with clearly scoped responsibilities: a Clarifier agent to identify ambiguities and request human input, a Decomposer to break queries into sub-questions, a Strategist to plan research steps, a Researcher hub to execute parallel web research, a Fact-Checker to validate claims and detect contradictions, a Synthesizer to generate structured reports with citations, and a Reviewer to perform final validation and gap analysis.\n\nAgents communicate through a shared state and a virtual filesystem abstraction, allowing intermediate artifacts such as notes, sources, and drafts to be written and read across stages. Research execution uses a parallel map–reduce pattern, where sub-questions are researched concurrently and merged into a unified result.\n\nThe workflow is implemented as a LangGraph graph with explicit stages and transitions. Human-in-the-loop clarification is supported through interruptible agents, allowing the workflow to pause and resume when additional input is required. Model selection is configurable per agent, enabling different language models and parameters to be assigned based on task requirements.\n\nThe system integrates external web search and scraping tools and produces structured, citation-backed research reports as final output. The application can be run via the LangGraph CLI or invoked programmatically as a compiled graph.",
    technologies: [
      "Python",
      "LangGraph",
      "Multi-Agent Systems",
      "LLM Orchestration",
      "Web Scraping",
      "Information Retrieval",
      "Prompt Engineering"
    ],
    github: true,
    codeUrl: "https://github.com/Akshath47/deep_research",
    projectType: "Personal Project",
    buttonText: "Code"
  },
  {
    id: "2",
    title: "PintOS - Operating System",
    summary: "An educational operating system project focused on implementing real kernel subsystems rather than writing user-space code. The project involved working directly with scheduling, memory management, and user-kernel interactions in low-level C.",
    description: "An educational operating system project implementing core kernel subsystems.",
    image: "/img_pintos.png",
    details: "An operating systems project based on the PintOS educational kernel, implemented in C. The project involved modifying and extending core kernel subsystems including thread scheduling, user program execution, and virtual memory management.\n\nThread scheduling was implemented using priority-based scheduling, with kernel threads coordinated through synchronization primitives such as locks, semaphores, and condition variables. Scheduling logic manages thread states and context switching under concurrent workloads.\n\nUser program support includes loading and executing user-level programs, setting up user address spaces, and handling system calls. System call handling validates user-provided pointers, manages transitions between user mode and kernel mode, and coordinates process creation, waiting, and termination.\n\nThe virtual memory subsystem was extended to support paging with explicit frame allocation, eviction, and swapping. Physical frames are tracked using a frame table, and an enhanced clock hand algorithm is used during eviction to select victim frames under memory pressure. Evicted pages are written to swap space and restored on demand through page fault handling.\n\nPage faults are handled by determining the fault cause, validating memory accesses, and loading pages either from executable files or swap space. Page sharing is implemented to allow multiple processes to reference the same physical frame where appropriate, while keeping isolation via per-process page table mappings.\n\nMemory management operates directly on page tables, frame tables, and swap data structures to coordinate safe access to limited physical memory under concurrent kernel activity.",
    technologies: [
      "C",
      "Operating Systems",
      "Kernel Development",
      "Thread Scheduling",
      "Virtual Memory",
      "Page Tables",
      "Concurrency & Synchronization"
    ],
    github: false,
    codeUrl: "",
    projectType: "University Project",
    buttonText: ""
  },
  {
    id: "3",
    title: "Stock Price Predictor",
    summary: "A time-series forecasting model that predicts next-day stock prices using a stacked LSTM neural network. The model is trained on sliding windows of historical price data to capture temporal dependencies and generate short-term price predictions.",
    description: "A machine learning project that predicts stock prices using historical data.",
    image: "/img_stock_predictor.png",
    details: "A time-series forecasting model implemented using a stacked LSTM architecture in TensorFlow to predict next-day stock prices from historical data. The model is trained on sliding windows of 60 consecutive days of price data, formatted as (samples, timesteps, features) for sequential learning.\n\nThe network consists of four stacked LSTM layers with 50 units each. The first three LSTM layers return sequences to allow deeper temporal feature extraction, while the final LSTM layer outputs a single hidden state. A Dropout layer with a rate of 0.2 follows each LSTM layer to reduce overfitting. The output layer is a Dense(1) layer with a linear activation function to perform regression.\n\nThe model is compiled using the Adam optimizer with mean squared error loss. Input data is preprocessed using scaling and reshaping utilities from Pandas, NumPy, and Scikit-learn. Training produces a predicted price curve that closely follows the underlying trend of the test data.\n\nModel performance is evaluated visually by plotting predicted prices against actual prices, along with short-term trend visualizations showing a rolling window of recent prices ending in the predicted next-day value.",
    technologies: [
      "Python",
      "TensorFlow",
      "Recurrent Neural Networks (LSTM)",
      "Time-Series Analysis",
      "Pandas",
      "NumPy",
      "Model Evaluation"
    ],
    github: false,
    codeUrl: "",
    projectType: "Personal Project",
    buttonText: ""
  },
  {
    id: "4",
    title: "Emulator & Assembler with Audio Synth Extension",
    summary: "A low-level systems project that simulates how a CPU executes programs, built entirely from scratch in C. The project was extended with a real-time audio synthesizer, combining systems programming with interactive I/O and sound generation.",
    description: "A low-level emulator and assembler built from scratch with a real-time audio extension.",
    image: "/img_audio_synth.png",
    details: "A low-level systems project implemented in C consisting of a custom assembler and an instruction-level emulator for a simplified instruction set. The assembler parses assembly source code and translates it into a structured instruction representation. This includes parsing opcodes and operands, resolving labels and symbols, validating instruction formats, and encoding instructions into a form suitable for execution by the emulator.\n\nThe emulator executes assembled programs by interpreting instructions sequentially and updating program state. It maintains execution state including registers, a program counter, and a simulated memory space. Arithmetic, control flow, and memory operations are implemented directly in software using C data structures.\n\nControl flow instructions modify execution by updating the program counter based on jumps and conditional branches. Memory instructions read from and write to a bounded memory model with explicit address validation and error handling.\n\nAn extension was implemented using SDL to integrate real-time audio synthesis into the emulator runtime. Keyboard input events are captured and mapped to sound generation, introducing event-driven I/O and real-time interaction alongside instruction execution.\n\nThe project focuses on instruction encoding, execution state management, control flow handling, and low-level execution logic within a single C codebase.",
    technologies: [
      "C",
      "Systems Programming",
      "Custom ISA Design",
      "Instruction Decoding",
      "Execution Pipelines",
      "SDL3",
      "Real-Time I/O"
    ],
    github: true,
    codeUrl: "https://github.com/Akshath47/C_project_extension_synth/",
    projectType: "University Project",
    buttonText: "Extension code"
  },
  {
    id: "5",
    title: "Summit - AI companion for planning & focus",
    summary: "A conversational AI companion designed to help users plan tasks, stay focused, and manage priorities over time. Summit adapts its recommendations based on user context, goals, and past interactions, aiming to feel more like a persistent assistant than a stateless chatbot.",
    description: "An AI-powered companion designed to assist with planning and maintaining focus.",
    image: "/img_summit.png",
    details: "A conversational task and scheduling assistant implemented using a multi-agent LangGraph workflow. The system supports natural language interaction for task management, scheduling, profile updates, and focus guidance, with persistent state maintained across conversations.\n\nSummit is structured as a graph of specialized agents coordinated by a central conversation router. User messages are first processed by a conversation agent, which parses intent and routes requests to dedicated agents responsible for task management, scheduling, profile updates, focus coaching, and instruction preferences. Outputs from these agents are combined by a response synthesizer to produce a single natural language reply.\n\nTask management includes creating, updating, and completing tasks via natural language input. Scheduling logic handles calendar events and deadlines, with task and event data stored using LangGraph’s memory system. User profile information and preferences are incrementally learned and stored, allowing behavior and responses to adapt over time.\n\nFocus coaching is implemented as a dedicated agent that generates suggestions based on inferred mood and energy levels. State and data flow between agents are defined using typed schemas and reducers to ensure consistent state updates across the workflow.\n\nThe project is implemented in Python and organized around a LangGraph graph definition, with separate modules for configuration, prompts, and state definitions. The application runs using the LangGraph CLI and currently uses an in-memory store for persistence, with planned migration to a database-backed store.",
    technologies: [
      "Python",
      "LangGraph",
      "Conversational AI",
      "Contextual Reasoning",
      "Memory Persistence",
      "Agentic Workflows",
      "LLM-Based Systems"
    ],
    github: true,
    codeUrl: "https://github.com/Akshath47/summit",
    projectType: "Personal Project",
    buttonText: "Code"
  }
];

export function ProjectGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailsExpanded, setDetailsExpanded] = useState(false);
  const detailsScrollRef = useRef<HTMLDivElement | null>(null);
  const [thumbStyle, setThumbStyle] = useState({ height: 0, top: 0 });

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    setDetailsExpanded(false);
  }, [selectedProject]);

  useEffect(() => {
    const el = detailsScrollRef.current;
    if (!el) return;

    const updateThumb = () => {
      const { clientHeight, scrollHeight, scrollTop } = el;
      if (scrollHeight === 0) return;
      const trackHeight = clientHeight;
      const thumbHeight = Math.max((clientHeight / scrollHeight) * trackHeight, 18);
      const maxTop = trackHeight - thumbHeight;
      const top = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * maxTop : 0;
      setThumbStyle({ height: thumbHeight, top });
    };

    updateThumb();
    el.addEventListener("scroll", updateThumb);
    const resizeObserver = new ResizeObserver(updateThumb);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener("scroll", updateThumb);
      resizeObserver.disconnect();
    };
  }, [detailsExpanded, selectedProject]);

  return (
    <div className="w-full">
      {/* Project Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
            onClick={() => handleCardClick(project)}
          >
            <TerminalWindow
              title={`${project.title.toLowerCase().replace(/\s+/g, '-')}.exe`}
              className="h-full"
            >
              <div className="space-y-2 md:space-y-3">
                <div className="rounded overflow-hidden border border-terminal-green-dark/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-40 sm:h-44 md:h-48 object-cover"
                  />
                </div>
                <div className="space-y-1.5 md:space-y-2">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-terminal-green-bright font-mono leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-terminal-green-medium leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 md:gap-1.5 pt-1.5 md:pt-2">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0.5 border-terminal-green-dark/50 text-terminal-green-dark hover:bg-terminal-green-dark hover:text-black font-mono"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0.5 border-terminal-green-dark/50 text-terminal-green-dark font-mono"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-terminal-green-dark/30 flex items-center gap-2">
                    <span className="text-terminal-green-medium text-xs">[</span>
                    <span className="text-terminal-green-bright text-xs md:text-sm animate-pulse font-mono">
                      click for details
                    </span>
                    <span className="text-terminal-green-medium text-xs">]</span>
                  </div>
                </div>
              </div>
            </TerminalWindow>
          </div>
        ))}
      </div>

      {/* Project Details Dialog */}
      <Dialog modal={false} open={selectedProject !== null} onOpenChange={(open) => {
        if (!open) handleCloseDialog();
      }}>
        <DialogContent
          showCloseButton={false}
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="w-[96vw] max-w-screen-xl max-h-[95vh] bg-transparent border-none p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col"
        >
          <DialogHeader>
            <DialogTitle className="sr-only">
              {selectedProject?.title || "Project Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <TerminalWindow
              title={`${selectedProject.title.toLowerCase().replace(/\s+/g, '-')}-details.exe`}
              className="h-full flex flex-col"
              onClose={handleCloseDialog}
            >
              <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:grid-cols-2 items-start lg:items-stretch max-h-[82vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded p-1">
                {/* Project Title */}
                <div className="border-b border-terminal-green-dark/30 pb-3 lg:col-span-2">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold text-terminal-green-bright font-mono mb-1">
                        {selectedProject.title}
                      </h2>
                      <p className="text-terminal-green-medium text-xs md:text-sm">
                        {selectedProject.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 md:gap-3 min-h-[38px]">
                      {selectedProject.projectType.trim() ? (
                        <span className="text-terminal-green-medium text-xs md:text-sm font-mono leading-none flex items-center">
                          {selectedProject.projectType}
                        </span>
                      ) : null}
                      {selectedProject.github ? (
                        <Button
                          asChild
                          className="inline-flex items-center gap-2 bg-transparent text-terminal-green-bright border border-terminal-green-dark/60 hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-3 py-2 transition-colors duration-200"
                        >
                          <a href={selectedProject.codeUrl || "#"} target="_blank" rel="noopener noreferrer">
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              viewBox="0 0 24 24"
                              className="w-4 h-4"
                              fill="currentColor"
                            >
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.207 11.387.6.113.793-.262.793-.582 0-.287-.01-1.045-.016-2.052-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.746.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.304-5.467-1.332-5.467-5.931 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.116-3.176 0 0 1.008-.323 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.289-1.553 3.295-1.23 3.295-1.23.654 1.653.242 2.873.118 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.48 5.921.43.371.823 1.103.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .322.19.699.8.58C20.565 21.796 24 17.298 24 12 24 5.37 18.63 0 12 0Z" />
                            </svg>
                            <span>{selectedProject.buttonText || "code"}</span>
                          </a>
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Project Details + Technologies */}
                <div className="flex flex-col gap-4 md:gap-6 h-full">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-terminal-green-bright font-mono">
                        Summary
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs md:text-sm font-mono border-terminal-green-dark/50 text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black"
                        onClick={() => setDetailsExpanded(prev => !prev)}
                      >
                        {detailsExpanded ? "Show summary" : "Read more"}
                      </Button>
                    </div>
                    <div className="subsection-hr" />
                    {detailsExpanded ? (
                      <div className="relative">
                      <div
                        ref={detailsScrollRef}
                        className="text-terminal-green-medium text-xs md:text-sm leading-relaxed max-h-64 overflow-y-scroll pr-6 space-y-2 custom-scroll"
                        style={{ scrollbarGutter: "stable", scrollbarWidth: "none", msOverflowStyle: "none" }}
                      >
                        {formatText(selectedProject.fullDetails || selectedProject.details).map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-black border border-terminal-green-dark/50 rounded">
                          <div
                            className="absolute left-[2px] right-[2px] bg-[#39ff14] rounded border border-terminal-green-bright"
                            style={{ height: `${thumbStyle.height}px`, top: `${thumbStyle.top}px` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="text-terminal-green-medium text-xs md:text-sm leading-relaxed space-y-1.5">
                        {formatText(selectedProject.summary || selectedProject.description).map((line, idx) => (
                          <p key={idx}>{line}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                      Technologies
                    </h3>
                    <div className="subsection-hr mb-2" />
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs px-2 py-1 border-terminal-green-dark/50 text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black hover:border-terminal-green-medium transition-all duration-300 font-mono"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Image - Right column at half width */}
                <div className="rounded-lg overflow-hidden border border-terminal-green-dark/30 bg-black/70 lg:order-last">
                  <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[460px]">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(min-width: 1024px) 40vw, (min-width: 768px) 70vw, 92vw"
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </TerminalWindow>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
