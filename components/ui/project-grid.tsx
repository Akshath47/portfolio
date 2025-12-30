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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
              <div className="space-y-3">
                <div className="rounded overflow-hidden border border-terminal-green-dark/30">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg md:text-xl font-bold text-terminal-green-bright font-mono">
                    {project.title}
                  </h3>
                  <p className="text-sm text-terminal-green-medium leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
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
        <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-sm border-2 border-terminal-green-medium/40 rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded p-6">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {selectedProject?.title || "Project Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-6">
              {/* Project Title */}
              <div className="border-b border-terminal-green-dark/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold text-terminal-green-bright font-mono mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-terminal-green-medium text-sm md:text-base">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details - Before Image */}
              <div>
                <h3 className="text-lg font-semibold text-terminal-green-bright mb-3 font-mono">
                  Details
                </h3>
                <p className="text-terminal-green-medium text-sm md:text-base leading-relaxed">
                  {selectedProject.details}
                </p>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-lg font-semibold text-terminal-green-bright mb-3 font-mono">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-transparent text-terminal-green-medium border border-terminal-green-dark/50 rounded text-xs md:text-sm hover:bg-terminal-green-medium hover:text-black hover:border-terminal-green-medium transition-all duration-300 font-mono"
                    >
                      {tech}
                    </span>
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
                  className="w-full h-48 md:h-64 object-cover"
                />
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
