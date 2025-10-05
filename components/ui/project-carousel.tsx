"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export function ProjectCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
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
              <Dialog key={`${project.id}-${index}`} open={isModalOpen && selectedProject?.id === project.id} onOpenChange={(open) => {
                setIsModalOpen(open);
                if (!open) setSelectedProject(null);
              }}>
                <Card
                  className="project-card-infinite layered-section-card cursor-pointer"
                  onClick={() => handleCardClick(project)}
                  onMouseEnter={handleCardMouseEnter}
                  onMouseLeave={handleCardMouseLeave}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="rounded-t-lg object-cover w-full h-48"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-white">{project.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">{project.description}</p>
                    <div className="text-[oklch(0.70_0.18_190)] text-sm">
                      Click to view full details
                    </div>
                  </CardContent>
                </Card>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/90 backdrop-blur-sm border-[oklch(0.65_0.26_340/0.8)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb:hover]:bg-primary/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-white">{project.title}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={300}
                      className="rounded-lg object-cover w-full h-64"
                    />
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">Description</h3>
                        <p className="text-gray-300">{project.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">Details</h3>
                        <p className="text-gray-300">{project.details}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-white">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject?.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-[oklch(0.70_0.18_190/0.15)] text-[oklch(0.70_0.18_190)] border border-[oklch(0.70_0.18_190/0.4)] rounded-full text-sm hover:bg-[oklch(0.70_0.18_190/0.25)] transition-all duration-300 hover:scale-105"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </div>

      <div className="carousel-controls">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === centerIndex ? 'active' : ''}`}
            onClick={() => {
              // Optional: Allow clicking dots to jump to specific project
              const targetTranslateX = -(index * step);
              setTranslateX(targetTranslateX);
            }}
          />
        ))}
      </div>
    </div>
  );
}
