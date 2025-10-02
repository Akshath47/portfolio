"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string | React.ReactNode;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: "valuelabs-ai",
    title: "Applied AI Engineering Intern",
    company: "ValueLabs",
    period: "Jul 2025 – Sep 2025",
    description: (
      <div className="space-y-2">
        <p>• Redesigned and optimized a JD-to-resume semantic search system with Qdrant vector DB, improving accuracy and cutting response times from 90s to 6s</p>
        <p>• Developed a GPT-Realtime based voice interviewer using a multi-agent architecture to manage phase-by-phase control and context-aware handoffs</p>
        <p>• Implemented real-time speech pipelines for the interviewer, integrating low-latency transcription, response generation, and text-to-speech with prompt guardrails to ensure relevance, tone control, and reduced hallucinations</p>
        <p>• Built a sales meeting assistant with a hybrid RAG pipeline, enhancing retrieval via multi-query rewriting, RRF scoring, and contextual memory</p>
      </div>
    ),
    technologies: ["Qdrant", "GPT-Realtime", "RAG", "Multi-Agent Systems", "Speech-to-Speech AI", "Vector DB"]
  },
  {
    id: "heavenly-joy",
    title: "Technical Consultant Volunteer",
    company: "Heavenly Joy Foundation",
    period: "May 2025 – Present",
    description: "Volunteering to develop a responsive website and mobile app (iOS and Android) for a charity organization.",
    technologies: ["React", "iOS", "Android", "Responsive Design"]
  },
  {
    id: "valuelabs-ml",
    title: "Intern",
    company: "ValueLabs",
    period: "Jul 2023 – Aug 2023",
    description: "Gained foundational experience in machine learning through regression, clustering, and natural language processing with transformers. Built sentiment analysis and text classification models, and developed an image classifier using CNNs. Explored computer vision concepts and neural network architectures at a high level.",
    technologies: ["Python", "Machine Learning", "CNN", "Transformers", "Computer Vision"]
  }
];

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="layered-section-card h-full flex flex-col cursor-pointer hover:border-primary transition-all duration-300 group relative overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl text-white mb-2 group-hover:text-primary transition-colors duration-300">
                {experience.title}
              </CardTitle>
              <p className="text-sm text-gray-400 mt-2">
                {experience.company} | {experience.period}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-sm px-3 py-1 border-primary/50 text-white"
              >
                {tech}
              </Badge>
            ))}
            {experience.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-sm px-3 py-1 border-primary/50 text-gray-400"
              >
                +{experience.technologies.length - 4} more
              </Badge>
            )}
          </div>
          <div className="mt-auto pt-3 border-t border-gray-700/50 flex items-center justify-between text-sm">
            <span className="text-primary font-medium group-hover:text-accent transition-colors duration-300">
              View Details
            </span>
            <ChevronRight className="w-4 h-4 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-all duration-300" />
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-black/90 backdrop-blur-sm border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl text-white mb-2">
              {experience.title}
            </DialogTitle>
            <p className="text-sm text-gray-400">
              {experience.company} | {experience.period}
            </p>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <div className="text-gray-300">
              {experience.description}
            </div>
            <div className="pt-4 border-t border-gray-700">
              <h4 className="text-sm font-semibold text-white mb-3">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ExperienceTabs() {
  return (
    <div className="w-full grid grid-cols-1 gap-6">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
