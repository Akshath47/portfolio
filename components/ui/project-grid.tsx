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
  {
    id: "1",
    title: "Deep Research Agent",
    description: "An AI agent that autonomously researches topics using web scraping and LLMs.",
    image: "/img_deep_research.png",
    details: "A multi-agent research workflow built with LangGraph and the DeepAgents library that autonomously explores complex topics. The system decomposes each query into sub-questions, performs parallelized searches, fact-checks retrieved information, and synthesizes structured, citation-backed summaries. Designed with modular nodes for decomposition, retrieval, verification, and synthesis, the agent demonstrates scalable orchestration across multiple reasoning paths. It was also tested on both short and long-form research prompts to evaluate factual consistency, synthesis quality, and depth of reasoning.",
    technologies: ["Langgraph", "OpenAI API", "Python", "Agentic AI Workflows", "Web Scraping"]
  },
  {
    id: "2",
    title: "Emulator & Assembler with Audio Synth Extension",
    description: "A group project involving an emulator and assembler built from scratch, with an audio synthesizer extension.",
    image: "/img_audio_synth.png",
    details: "A collaborative low-level systems project developed entirely in C, featuring a custom assembler and emulator that replicate a simplified CPU instruction set. The project implements instruction decoding, memory management, and register operations from the ground up. As an extension, an audio synthesizer was integrated, mapping keyboard inputs to tone generation at the hardware-interaction layer. This extension showcased real-time I/O handling, digital signal processing fundamentals, and creativity in combining systems programming with sound.",
    technologies: ["C", "Low-level Systems Programming", "x86 Assembly", "Audio Synthesis"]
  },
  {
    id: "3",
    title: "Summit - AI companion for planning & focus",
    description: "An AI-powered companion designed to assist with planning and maintaining focus.",
    image: "/img_summit.png",
    details: "Summit is a conversational multi-agent system that helps users plan tasks, manage focus, and track priorities. Built with LangGraph and powered by LLMs, it combines memory persistence, user profiling, and contextual reasoning to provide personalized guidance. The agent dynamically adjusts task recommendations based on urgency, energy, and goals, while maintaining continuity through stored context. Designed as an experiment in emotional and contextual adaptation, it blends productivity tools with conversational AI design principles.",
    technologies: ["Langgraph", "OpenAI API", "Python", "Agentic AI Workflows"]
  },
  {
    id: "4",
    title: "Stock Price Predictor",
    description: "A machine learning project that predicts stock prices using historical data.",
    image: "/img_stock_predictor.png",
    details: "A machine learning project focused on forecasting stock prices using historical time-series data. Implemented with LSTM-based recurrent neural networks in TensorFlow, the model captures temporal dependencies and trends over multiple time horizons. Data preprocessing, feature scaling, and model evaluation were handled using Pandas, NumPy, and Scikit-learn. Visualization through Matplotlib highlighted prediction accuracy and loss trends across epochs, providing valuable insights into model behavior and overfitting control.",
    technologies: ["TensorFlow", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Python"]
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
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[85vh] bg-transparent border-none p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col">
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
              <div className="space-y-3 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded">
                {/* Project Title */}
                <div className="border-b border-terminal-green-dark/30 pb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-terminal-green-bright font-mono mb-1">
                    {selectedProject.title}
                  </h2>
                  <p className="text-terminal-green-medium text-xs md:text-sm">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Project Details */}
                <div>
                  <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                    Details
                  </h3>
                  <div className="subsection-hr mb-2" />
                  <p className="text-terminal-green-medium text-xs md:text-sm leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>

                {/* Technologies */}
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

                {/* Project Image - At Bottom, Smaller */}
                <div className="rounded-lg overflow-hidden border border-terminal-green-dark/30">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={600}
                    height={300}
                    className="w-full h-40 md:h-48 object-cover"
                  />
                </div>
              </div>
            </TerminalWindow>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
