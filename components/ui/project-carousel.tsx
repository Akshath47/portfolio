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
  const animationRef = useRef<number | null>(null);

  // Card width + gap
  const cardWidth = 320; // 300px card + 20px gap
  const totalWidth = projects.length * cardWidth;

  useEffect(() => {
    if (!isAnimating) return;

    const animate = () => {
      setTranslateX(prev => {
        const newTranslateX = prev - 1;
        
        // Reset at the exact moment when we've scrolled exactly one full set
        // This ensures the reset happens when identical content is perfectly aligned
        if (newTranslateX <= -totalWidth) {
          return 0; // Reset to start position
        }
        
        return newTranslateX;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isAnimating, totalWidth]);

  // Create exactly 2 copies - one visible, one ready to replace
  const infiniteProjects = [...projects, ...projects];

  // Calculate which card is currently in the center for dot indicators
  const getCenterIndex = () => {
    const containerCenter = 600; // Half of 1200px container width
    const adjustedTranslateX = Math.abs(translateX) % totalWidth;
    // Calculate which project is closest to center based on scroll position
    return Math.round(adjustedTranslateX / cardWidth) % projects.length;
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
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
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
                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                        <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Details</h3>
                        <p className="text-gray-600 dark:text-gray-300">{project.details}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Technologies</h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                            React
                          </span>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                            Next.js
                          </span>
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full text-sm">
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
              const targetTranslateX = -(index * cardWidth);
              setTranslateX(targetTranslateX);
            }}
          />
        ))}
      </div>
    </div>
  );
}
