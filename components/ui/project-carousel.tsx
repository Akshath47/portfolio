"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "Portfolio Website",
    description: "My personal portfolio, built with Next.js and shadcn/ui.",
    image: "/placeholder.svg",
    details: "This project showcases my skills in frontend development and responsive design."
  },
  {
    id: "2",
    title: "AI Chatbot",
    description: "A chatbot powered by the latest in LLM technology.",
    image: "/placeholder.svg",
    details: "This project explores natural language processing and API integrations."
  },
  {
    id: "3",
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration.",
    image: "/placeholder.svg",
    details: "Built with React, Node.js, and Stripe for secure payments."
  },
  {
    id: "4",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates.",
    image: "/placeholder.svg",
    details: "Features real-time collaboration using WebSockets and React."
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
        const gapStr = (cs as any).columnGap || (cs as any).gap || '0px';
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
                    <div className="text-gray-400 text-sm">
                      Click to view full details
                    </div>
                  </CardContent>
                </Card>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto layered-section-card bg-[rgba(0,0,0,0.7)] border-[oklch(0.65_0.26_340/0.8)]">
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
                          <span className="px-3 py-1 bg-[oklch(0.70_0.18_190/0.15)] text-[oklch(0.70_0.18_190)] border border-[oklch(0.70_0.18_190/0.4)] rounded-full text-sm hover:bg-[oklch(0.70_0.18_190/0.25)] transition-all duration-300 hover:scale-105">
                            React
                          </span>
                          <span className="px-3 py-1 bg-[oklch(0.65_0.26_340/0.15)] text-[oklch(0.65_0.26_340)] border border-[oklch(0.65_0.26_340/0.4)] rounded-full text-sm hover:bg-[oklch(0.65_0.26_340/0.25)] transition-all duration-300 hover:scale-105">
                            Next.js
                          </span>
                          <span className="px-3 py-1 bg-[oklch(0.55_0.22_290/0.15)] text-[oklch(0.55_0.22_290)] border border-[oklch(0.55_0.22_290/0.4)] rounded-full text-sm hover:bg-[oklch(0.55_0.22_290/0.25)] transition-all duration-300 hover:scale-105">
                            TypeScript
                          </span>
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
