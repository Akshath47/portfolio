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

function LocationIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string | React.ReactNode;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: "valuelabs-ai",
    title: "Applied AI Engineering Intern",
    company: "ValueLabs",
    period: "Jul 2025 – Sep 2025",
    location: "Hyderabad, India",
    description: (
      <div className="space-y-2 text-xs">
        <p>• Reworked a JD-to-resume semantic search system using vector embeddings and Qdrant, improving accuracy and scalability</p>
        <p>• Optimized query efficiency through caching and tuning, reducing response times from ~90s to ~6s</p>
        <p>• Built a real-time voice interviewer on GPT-Realtime with multi-agent architecture for phase control</p>
        <p>• Implemented prompt engineering and guardrails to ensure relevance and reduce hallucinations</p>
        <p>• Built a sales meeting assistant with hybrid RAG pipeline combining Qdrant and keyword search</p>
      </div>
    ),
    technologies: ["Qdrant", "GPT-Realtime", "RAG", "Multi-Agent Systems", "Speech-to-Speech AI", "Vector DB"]
  },
  {
    id: "heavenly-joy",
    title: "Technical Consultant Volunteer",
    company: "Heavenly Joy Foundation",
    period: "May 2025 – Present",
    location: "Hyderabad, India",
    description: "Volunteering to develop a responsive website and mobile app (iOS and Android) for a charity organization.",
    technologies: ["React", "iOS", "Android", "Responsive Design"]
  },
  {
    id: "valuelabs-ml",
    title: "Intern",
    company: "ValueLabs",
    period: "Jul 2023 – Aug 2023",
    location: "Hyderabad, India",
    description: (
      <div className="space-y-1 text-xs">
        <p>• Introduced to machine learning, working on regression and clustering models</p>
        <p>• Explored transformers and natural language processing fundamentals</p>
        <p>• Worked on sentiment analysis and text classification with unlabelled data</p>
        <p>• Explored computer vision and convolutional neural networks</p>
        <p>• Built an image classifier using CNN architecture</p>
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
          <div className="space-y-2 md:space-y-3">
            <div>
              <div className="flex items-start gap-2 mb-1.5 md:mb-2">
                <span className="text-terminal-green-medium flex-shrink-0 text-sm md:text-base">$</span>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-terminal-green-bright font-mono leading-tight">
                  {experience.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-terminal-green-dark ml-4 md:ml-6">
                {experience.company} | {experience.period}
              </p>
              <div className="flex items-center gap-1 text-xs text-terminal-green-dark ml-4 md:ml-6">
                <LocationIcon className="w-3 h-3 flex-shrink-0" />
                <span>{experience.location}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-1.5 ml-4 md:ml-6">
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
            <div className="mt-2 md:mt-3 pt-2 md:pt-3 border-t border-terminal-green-dark/30 flex items-center gap-2 ml-4 md:ml-6">
              <span className="text-terminal-green-medium text-xs">[</span>
              <span className="text-terminal-green-bright text-xs md:text-sm animate-pulse font-mono">
                click for details
              </span>
              <span className="text-terminal-green-medium text-xs">]</span>
            </div>
          </div>
        </TerminalWindow>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen} modal={false}>
        <DialogContent className="max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl max-h-[85vh] bg-transparent border-none p-3 sm:p-4 md:p-5 lg:p-6 overflow-hidden flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>{experience.title}</DialogTitle>
          </DialogHeader>
          <TerminalWindow
            title={`${experience.company.toLowerCase().replace(/\s+/g, '-')}-${experience.id}-details`}
            className="h-full flex flex-col"
          >
            <div className="space-y-3 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-800/50 [&::-webkit-scrollbar-thumb]:bg-terminal-green-dark [&::-webkit-scrollbar-thumb:hover]:bg-terminal-green-medium [&::-webkit-scrollbar-thumb]:rounded">
              {/* Experience Title */}
              <div className="border-b border-terminal-green-dark/30 pb-3">
                <h2 className="text-xl md:text-2xl font-bold text-terminal-green-bright font-mono mb-1">
                  {experience.title}
                </h2>
                <p className="text-terminal-green-medium text-xs md:text-sm font-mono">
                  {experience.company} | {experience.period}
                </p>
                <div className="flex items-center gap-1.5 text-terminal-green-dark text-xs md:text-sm font-mono">
                  <LocationIcon className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{experience.location}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                  Details
                </h3>
                <div className="subsection-hr mb-2" />
                <div className="text-terminal-green-medium text-xs md:text-sm leading-relaxed">
                  {experience.description}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-base font-semibold text-terminal-green-bright mb-1 font-mono">
                  Technologies & Skills
                </h3>
                <div className="subsection-hr mb-2" />
                <div className="flex flex-wrap gap-1.5">
                  {experience.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs px-2 py-1 border-terminal-green-dark/50 text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black hover:border-terminal-green-medium transition-all duration-300 font-mono rounded"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TerminalWindow>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function ExperienceTabs() {
  return (
    <div className="w-full grid grid-cols-1 gap-3 sm:gap-4 md:gap-6">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}
