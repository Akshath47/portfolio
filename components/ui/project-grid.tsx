"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
  technologies: string[];
}

const projects: Project[] = [
  // 1) Deep Research
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
    ]
  },
  // 2) PintOS
  {
    id: "5",
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
    ]
  },
  // 3) Stock Price Predictor
  {
    id: "4",
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
    ]
  },
  // 4) Emulator
  {
    id: "2",
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
    ]
  },
  // 5) Summit
  {
    id: "3",
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
    ]
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
              <div className="grid gap-4 sm:gap-5 md:gap-6 lg:gap-8 lg:grid-cols-2 items-start max-h-[82vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded p-1">
                {/* Project Title */}
                <div className="border-b border-terminal-green-dark/30 pb-3 lg:col-span-2">
                  <h2 className="text-xl md:text-2xl font-bold text-terminal-green-bright font-mono mb-1">
                    {selectedProject.title}
                  </h2>
                  <p className="text-terminal-green-medium text-xs md:text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Project Details + Technologies */}
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                      Details
                    </h3>
                    <div className="subsection-hr mb-2" />
                    <p className="text-terminal-green-medium text-xs md:text-sm leading-relaxed">
                      {selectedProject.details}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                      Technologies
                    </h3>
                    <div className="subsection-hr mb-2" />
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
