"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + projects.length) % projects.length;
      visible.push({
        ...projects[index],
        position: i === 0 ? 'center' : 'side'
      });
    }
    return visible;
  };

  return (
    <div className="w-full">
      <div className="project-carousel">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPrevious}
          className="z-20 bg-black/50 border-gray-600 text-white hover:bg-black/70"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center justify-center gap-8 flex-1">
          {getVisibleProjects().map((project, index) => (
            <Card
              key={project.id}
              className={`project-card ${project.position} layered-section-card`}
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
                {project.position === 'center' && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-gray-700">
                      <AccordionTrigger className="text-gray-300 hover:text-white">
                        More Details
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-400">
                        {project.details}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNext}
          className="z-20 bg-black/50 border-gray-600 text-white hover:bg-black/70"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="carousel-controls">
        {projects.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}