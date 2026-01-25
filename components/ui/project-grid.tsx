"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  technologies: string[];
  github: boolean;
  codeUrl?: string;
  projectType: string;
  buttonText?: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Deep Research Agent",
    description: "An AI agent that autonomously researches topics using web scraping and LLMs.",
    image: "/img_deep_research.png",
    details: "A multi-agent research workflow built with LangGraph and the DeepAgents library that autonomously explores complex topics. The system decomposes each query into sub-questions, performs parallelized searches, fact-checks retrieved information, and synthesizes structured, citation-backed summaries. Designed with modular nodes for decomposition, retrieval, verification, and synthesis, the agent demonstrates scalable orchestration across multiple reasoning paths. It was also tested on both short and long-form research prompts to evaluate factual consistency, synthesis quality, and depth of reasoning.",
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
    description: "An educational operating system project implementing core kernel subsystems.",
    image: "/img_pintos.png",
    details:
      "An operating systems project based on the PintOS educational kernel, focused on implementing and extending core OS subsystems. I worked on thread scheduling, user process management, and virtual memory, handling kernel threads, page tables, and synchronization primitives. The project involved managing page faults, process lifecycles, and interactions between user programs and the kernel, strengthening my understanding of concurrency, memory management, and low-level debugging.",
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
    description: "A machine learning project that predicts stock prices using historical data.",
    image: "/img_stock_predictor.png",
    details: "A machine learning project focused on forecasting stock prices using historical time-series data. Implemented with LSTM-based recurrent neural networks in TensorFlow, the model captures temporal dependencies and trends over multiple time horizons. Data preprocessing, feature scaling, and model evaluation were handled using Pandas, NumPy, and Scikit-learn. Visualization through Matplotlib highlighted prediction accuracy and loss trends across epochs, providing valuable insights into model behavior and overfitting control.",
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
    description: "A low-level emulator and assembler built from scratch with a real-time audio extension.",
    image: "/img_audio_synth.png",
    details: "A collaborative low-level systems project developed entirely in C, featuring a custom assembler and emulator that replicate a simplified CPU instruction set. The project implements instruction decoding, memory management, and register operations from the ground up. As an extension, an audio synthesizer was integrated, mapping keyboard inputs to tone generation at the hardware-interaction layer. This extension showcased real-time I/O handling, digital signal processing fundamentals, and creativity in combining systems programming with sound.",
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
    description: "An AI-powered companion designed to assist with planning and maintaining focus.",
    image: "/img_summit.png",
    details: "Summit is a conversational multi-agent system that helps users plan tasks, manage focus, and track priorities. Built with LangGraph and powered by LLMs, it combines memory persistence, user profiling, and contextual reasoning to provide personalized guidance. The agent dynamically adjusts task recommendations based on urgency, energy, and goals, while maintaining continuity through stored context. Designed as an experiment in emotional and contextual adaptation, it blends productivity tools with conversational AI design principles.",
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

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

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
        <DialogContent className="w-[96vw] max-w-screen-xl max-h-[95vh] bg-transparent border-none p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {selectedProject?.title || "Project Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <TerminalWindow
              title={`${selectedProject.title.toLowerCase().replace(/\s+/g, '-')}-details.exe`}
              className="h-full flex flex-col"
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
                  <div>
                    <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                      Details
                    </h3>
                    <div className="subsection-hr mb-2" />
                    <p className="text-terminal-green-medium text-xs md:text-sm leading-relaxed">
                      {selectedProject.details}
                    </p>
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
