"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TerminalWindow } from "@/components/ui/terminal-window";

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

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="cursor-pointer transition-all duration-300 hover:scale-[1.02]"
        onClick={handleCardClick}
      >
        <TerminalWindow
          title={`${experience.company.toLowerCase().replace(/\s+/g, '-')}-${experience.id}`}
          className="h-full"
        >
          <div className="space-y-3">
            <div>
              <div className="flex items-start gap-2 mb-2">
                <span className="text-terminal-green-medium flex-shrink-0">$</span>
                <h3 className="text-base md:text-lg font-bold text-terminal-green-bright font-mono">
                  {experience.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-terminal-green-dark ml-6">
                {experience.company} | {experience.period}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 md:gap-2 ml-6">
              {experience.technologies.slice(0, 4).map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="text-xs px-2 py-0.5 border-terminal-green-dark text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black font-mono"
                >
                  {tech}
                </Badge>
              ))}
              {experience.technologies.length > 4 && (
                <Badge
                  variant="outline"
                  className="text-xs px-2 py-0.5 border-terminal-green-dark text-terminal-green-dark font-mono"
                >
                  +{experience.technologies.length - 4}
                </Badge>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-terminal-green-dark opacity-30 flex items-center gap-2 ml-6">
              <span className="text-terminal-green-dark text-xs">[</span>
              <span className="text-terminal-green-medium text-xs animate-pulse font-mono">
                click for details
              </span>
              <span className="text-terminal-green-dark text-xs">]</span>
            </div>
          </div>
        </TerminalWindow>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto bg-black/95 backdrop-blur-sm border-2 border-terminal-green-medium/40 rounded-lg [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>{experience.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Experience Title */}
            <div className="border-b border-terminal-green-dark/30 pb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-terminal-green-bright font-mono mb-2">
                {experience.title}
              </h2>
              <p className="text-terminal-green-medium text-sm md:text-base font-mono">
                {experience.company} | {experience.period}
              </p>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-terminal-green-bright mb-3 font-mono">
                Details
              </h3>
              <div className="text-terminal-green-medium text-sm md:text-base leading-relaxed">
                {experience.description}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h3 className="text-lg font-semibold text-terminal-green-bright mb-3 font-mono">
                Technologies & Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-xs md:text-sm px-3 py-1.5 border-terminal-green-dark/50 text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black hover:border-terminal-green-medium transition-all duration-300 font-mono rounded"
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
