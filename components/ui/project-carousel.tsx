"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/ui/terminal-window";

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
  },
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
  }
];

export function ProjectCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Dynamically measured spacing between consecutive cards (in px)
  const [step, setStep] = useState(320);
  const [loopWidth, setLoopWidth] = useState(projects.length * 320);
  const loggedMeasurementRef = useRef(false);

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      setTranslateX(prev => {
        const next = prev - 1;
        if (next <= -loopWidth) {
          const wrapped = next + loopWidth;
          return wrapped;
        }
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, loopWidth]);

  // Measure step and loop width from DOM
  useEffect(() => {
    const measure = () => {
      const inner = innerRef.current;
      if (!inner) return;
      const cards = Array.from(inner.querySelectorAll('.project-card-infinite')) as HTMLElement[];
      if (cards.length >= 2) {
        const r1 = cards[0].getBoundingClientRect();
        const r2 = cards[1].getBoundingClientRect();
        const measuredStep = r2.left - r1.left;
        const cs = getComputedStyle(inner);
        const gapStr = cs.columnGap || cs.gap || '0px';
        const gap = parseFloat(gapStr);
        const measuredWidth = cards[0].getBoundingClientRect().width;
        const computedLoopWidth = measuredStep * projects.length;
        setStep(measuredStep);
        setLoopWidth(computedLoopWidth);
        if (!loggedMeasurementRef.current) {
          console.debug('[ProjectCarousel] measure', {
            measuredWidth: Math.round(measuredWidth * 100) / 100,
            gap,
            measuredStep: Math.round(measuredStep * 100) / 100,
            loopWidth: Math.round(computedLoopWidth * 100) / 100,
            count: projects.length
          });
          loggedMeasurementRef.current = true;
        }
      }
    };
    // measure after paint to ensure layout is ready
    requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Create exactly 2 copies - one visible, one ready to replace
  const infiniteProjects = [...projects, ...projects];

  // Calculate which card is currently in the center for dot indicators
  const getCenterIndex = () => {
    const adjusted = Math.abs(translateX) % loopWidth;
    return Math.round(adjusted / step) % projects.length;
  };

  const centerIndex = getCenterIndex();

  const handleCardClick = (project: Project, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedProject(project);
  };

  const handleCloseDialog = () => {
    setSelectedProject(null);
  };

  // Pause animation only when hovering over project cards
  const handleCardMouseEnter = () => setIsAnimating(false);
  const handleCardMouseLeave = () => setIsAnimating(true);

  return (
    <div className="w-full">
      <div className="project-carousel-container">
        <div className="project-carousel-track" ref={containerRef}>
          <div
            className="project-carousel-inner"
            ref={innerRef}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: 'none'
            }}
          >
            {infiniteProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="project-card-infinite cursor-pointer flex-shrink-0"
                onClick={(e) => handleCardClick(project, e)}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
              >
                <TerminalWindow
                  title={`${project.title.toLowerCase().replace(/\s+/g, '-')}.exe`}
                  className="w-[300px] h-full"
                >
                  <div className="space-y-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={300}
                      height={180}
                      className="rounded object-cover w-full h-36 md:h-40 border border-terminal-green-dark"
                    />
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-terminal-green-medium flex-shrink-0">&gt;</span>
                        <h3 className="text-base md:text-lg font-bold text-terminal-green-bright font-mono">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-xs md:text-sm text-terminal-green-medium ml-5">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 ml-5 mt-3">
                        <span className="text-terminal-green-medium text-xs">[</span>
                        <span className="text-terminal-green-bright text-sm animate-pulse font-mono">
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
        </div>
      </div>

      {/* Single Dialog outside the carousel */}
      <Dialog modal={false} open={selectedProject !== null} onOpenChange={(open) => {
        if (!open) handleCloseDialog();
      }}>
        <DialogContent className="w-[96vw] max-w-screen-xl max-h-[95vh] overflow-y-auto bg-black/95 backdrop-blur-sm border-2 border-terminal-green-medium/40 rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded p-6 lg:p-8">
          <DialogHeader>
            <DialogTitle className="sr-only">
              {selectedProject?.title || "Project Details"}
            </DialogTitle>
          </DialogHeader>
          {selectedProject && (
            <div className="grid gap-6 lg:gap-8 lg:grid-cols-2 items-start">
              {/* Project Title */}
              <div className="border-b border-terminal-green-dark/30 pb-4 lg:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-terminal-green-bright font-mono mb-2">
                  {selectedProject.title}
                </h2>
                <p className="text-terminal-green-medium text-sm md:text-base">
                  {selectedProject.description}
                </p>
              </div>

              {/* Project Details + Technologies */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-terminal-green-bright mb-2 font-mono">
                    Details
                  </h3>
                  <div className="subsection-hr mb-3" />
                  <p className="text-terminal-green-medium text-sm md:text-base leading-relaxed">
                    {selectedProject.details}
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-terminal-green-bright mb-2 font-mono">
                    Technologies
                  </h3>
                  <div className="subsection-hr mb-3" />
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
              </div>

              {/* Project Image - Right column, half width */}
              <div className="rounded-lg overflow-hidden border border-terminal-green-dark/30 bg-black/70">
                <div className="relative w-full h-[340px] md:h-[440px] lg:h-[560px]">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, (min-width: 768px) 90vw, 96vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <div className="carousel-controls mt-4 md:mt-2">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === centerIndex ? 'active' : ''}`}
            onClick={() => {
              // Optional: Allow clicking dots to jump to specific project
              const targetTranslateX = -(index * step);
              setTranslateX(targetTranslateX);
            }}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
