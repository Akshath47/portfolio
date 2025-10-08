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
      <div className="space-y-3">
        <p>Gained experience in real-time AI pipelines, vector databases, agentic frameworks, hybrid retrieval, and collaborative problem-solving</p>

        <p>• Reworked a JD-to-resume semantic search system using vector embeddings and the Qdrant vector database, improving both accuracy and scalability</p>
        <p>• Optimized query efficiency through caching and search parameter tuning, reducing response times from ~90s to ~6s</p>
        <br />

        <p>• Built a real-time voice interviewer on GPT-Realtime with a multi-agent architecture for phase-by-phase control and context-aware handoffs</p>
        <p>• Implemented prompt engineering and guardrails to ensure relevance, tone control, and reduce hallucinations in live interview settings</p>
        <br />

        <p>• Built a sales meeting assistant powered by a hybrid RAG pipeline combining Qdrant and keyword search</p>
        <p>• Improved retrieval quality with multi-query rewriting and RRF scoring, while supporting contextual memory and entity tracking</p>
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
    description: (
      <div className="space-y-2">
        <p>• Was introduced to the field of machine learning.</p>
        <p>• Worked on various different basic regression and clustering models.</p>
        <p>• Was introduced to transformers and dived into the field of natural language processing.</p>
        <p>• Worked on a sentiment analysis project and a text classification project with unlabelled data.</p>
        <p>• Briefly explored computer vision at a high level, learning how convolutional neural networks work.</p>
        <p>• Worked on an image classifier using a CNN.</p>
      </div>
    ),
    technologies: ["Python", "Machine Learning", "CNN", "Transformers", "Computer Vision"]
  }
];

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="layered-section-card h-full flex flex-col cursor-pointer hover:border-primary transition-all duration-300 group relative overflow-hidden min-h-[44px]"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader className="pb-3 p-4 md:pb-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg md:text-xl text-white mb-1 md:mb-2 group-hover:text-primary transition-colors duration-300">
                {experience.title}
              </CardTitle>
              <p className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
                {experience.company} | {experience.period}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-4 pt-0 md:p-6 md:pt-0">
          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4">
            {experience.technologies.slice(0, 4).map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-xs md:text-sm px-2 py-0.5 md:px-3 md:py-1 border-primary/50 text-white"
              >
                {tech}
              </Badge>
            ))}
            {experience.technologies.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs md:text-sm px-2 py-0.5 md:px-3 md:py-1 border-primary/50 text-gray-400"
              >
                +{experience.technologies.length - 4} more
              </Badge>
            )}
          </div>
          <div className="mt-auto pt-2 md:pt-3 border-t border-gray-700/50 flex items-center justify-between text-xs md:text-sm">
            <span className="text-primary font-medium group-hover:text-accent transition-colors duration-300">
              View Details
            </span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </CardContent>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-lg pointer-events-none transition-all duration-300" />
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-2xl max-h-[85vh] md:max-h-[80vh] overflow-y-auto bg-black/90 backdrop-blur-sm border-primary/20 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb:hover]:bg-primary/50 [&::-webkit-scrollbar-thumb]:rounded-full p-4 md:p-6">
          <DialogHeader>
            <DialogTitle className="text-xl md:text-2xl text-white mb-1 md:mb-2">
              {experience.title}
            </DialogTitle>
            <p className="text-xs md:text-sm text-gray-400">
              {experience.company} | {experience.period}
            </p>
          </DialogHeader>
          <div className="mt-3 md:mt-4 space-y-3 md:space-y-4">
            <div className="text-gray-300 text-sm md:text-base">
              {experience.description}
            </div>
            <div className="pt-3 md:pt-4 border-t border-gray-700">
              <h4 className="text-xs md:text-sm font-semibold text-white mb-2 md:mb-3">Technologies & Skills</h4>
              <div className="flex flex-wrap gap-1.5 md:gap-2">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300"
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
    <div className="w-full grid grid-cols-1 gap-4 md:gap-6">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
