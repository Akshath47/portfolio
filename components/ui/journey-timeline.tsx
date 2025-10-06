"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useEffect, useRef } from "react";

interface JourneyEntry {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string;
  technologies?: string[];
  type: "education" | "work" | "achievement" | "project";
}

const journeyEntries: JourneyEntry[] = [
  {
    id: "internship-2",
    title: "Applied AI Engineering Intern",
    organization: "Valuelabs",
    period: "Summer 2025",
    description: "I built AI systems that could think and respond in real time. Designing RAG pipelines and agentic workflows helped me understand how coordination brings ideas to life.",
    // technologies: ["Qdrant", "GPT-Realtime", "RAG", "Multi-Agent Systems", "Speech-to-Speech AI", "Vector DB"],
    type: "work"
  },
  {
    id: "first-class",
    title: "First Class Honours",
    organization: "Imperial College London",
    period: "July 2025",
    description: "Achieved a First Class honours for Year 1 of my BEng Computing degree.",
    // technologies: [],
    type: "achievement"
  },
  {
    id: "volunteer",
    title: "Technical Consultant Volunteer",
    organization: "Heavenly Joy Foundation",
    period: "May 2025 - Present",
    description: "Volunteering as a technical consultant, I began building a website and mobile app for a charity that provides meals to the elderly. It felt meaningful to use what I know to make something that helps people directly.",
    // technologies: ["Qdrant", "GPT-Realtime", "RAG", "Multi-Agent Systems", "Speech-to-Speech AI", "Vector DB"],
    type: "work"
  },
  {
    id: "imperial",
    title: "Computing Student",
    organization: "Imperial College London",
    period: "Sep 2024 - Present",
    description: "Pursuing BEng in Computing. Relevant coursework includes Data Structures, Algorithms, Databases, Operating Systems, Software Engineering Design and Machine Learning. ",
    // technologies: ["Haskell", "Kotlin", "C", "Java", "Databases", "Computer Systems", "Computer Architecture", "Graphs and Algorithms", "Linear Algebra", "Statistics"],
    type: "education"
  },
  {
    id: "sancta-maria",
    title: "Valedictorian",
    organization: "High School",
    period: "March 2024",
    description: "Was honoured to be the valedictorian for my graduating class of 2024 at Sancta Maria, Hyderabad.",
    // technologies: [],
    type: "education"
  },
  {
    id: "internship-1",
    title: "Intern",
    organization: "Valuelabs",
    period: "Summer 2023",
    description: "My first experience with machine learning was both chaotic and eye-opening. I explored regression, clustering, and early NLP models, and it was the first time I saw data start to learn and respond.",
    // technologies: ["Python", "Machine Learning", "CNN", "Transformers", "Computer Vision"],
    type: "work"
  },
  // {
  //   id: "hackathon",
  //   title: "Hackathon Winner",
  //   organization: "HackTheFuture",
  //   period: "2023",
  //   description: "Developed a full-stack application in 24 hours that won first place for its innovative use of AI in accessibility technology.",
  //   technologies: ["Python", "FastAPI", "React", "OpenAI API"],
  //   type: "project"
  // },
];

const typeColors = {
  education: "oklch(0.70 0.18 190)", // aqua
  work: "oklch(0.65 0.26 340)", // magenta
  achievement: "oklch(0.55 0.22 290)", // purple
  project: "oklch(0.60 0.18 190)" // lighter aqua
};

const typeLabels = {
  education: "Education",
  work: "Work",
  achievement: "Achievement",
  project: "Project"
};

export function JourneyTimeline() {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref) => {
      if (ref) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                // Animate this specific item when it comes into view
                entry.target.classList.add('timeline-visible');
                // Disconnect this observer since we only need to animate once
                observer.disconnect();
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
          }
        );

        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Central Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent transform -translate-x-px"></div>

      <div className="relative">
        {journeyEntries.map((entry, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={entry.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative flex items-center justify-center mb-20 group timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out"
            >
              {/* Left side content (even indices) */}
              {isEven && (
                <>
                  {/* Journey Card - Left side */}
                  <div className="w-5/12">
                    <Card className="layered-section-card hover:scale-[1.02] transition-all duration-300 mr-16">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-white mb-2 group-hover:text-gray-200 transition-colors">
                              {entry.title}
                            </CardTitle>
                            <p className="text-gray-300 font-medium mb-1">
                              {entry.organization}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs px-3 py-1 border-opacity-50 transition-all duration-300 group-hover:border-opacity-100 mt-2"
                              style={{
                                borderColor: typeColors[entry.type],
                                color: typeColors[entry.type]
                              }}
                            >
                              {typeLabels[entry.type]}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {entry.description}
                        </p>

                        {entry.technologies && entry.technologies.length > 0 && (
                          <>
                            <Separator className="mb-4 bg-gray-700" />
                            <div className="flex flex-wrap gap-2">
                              {entry.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-sm px-3 py-1 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline node - Center (absolute positioned) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-6 h-6 rounded-full border-3 border-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-125 relative"
                      style={{
                        backgroundColor: typeColors[entry.type],
                        boxShadow: `0 0 20px ${typeColors[entry.type]}60`
                      }}
                    >
                      {/* Pulse effect */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-25"
                        style={{ backgroundColor: typeColors[entry.type] }}
                      ></div>
                      {/* Inner dot */}
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      ></div>
                    </div>

                    {/* Connecting line to right */}
                    <div
                      className="absolute top-3 left-6 w-16 h-0.5 opacity-40"
                      style={{ backgroundColor: typeColors[entry.type] }}
                    ></div>
                    {/* Arrow head */}
                    <div
                      className="absolute top-2 left-22 w-0 h-0 border-l-4 border-t-2 border-b-2 opacity-40"
                      style={{
                        borderLeftColor: typeColors[entry.type],
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent'
                      }}
                    ></div>
                  </div>

                  {/* Year/Period - Right side */}
                  <div className="w-5/12 text-left pl-16">
                    <div className="text-2xl font-bold text-white mb-2">
                      {entry.period}
                    </div>
                  </div>
                </>
              )}

              {/* Right side content (odd indices) */}
              {!isEven && (
                <>
                  {/* Year/Period - Left side */}
                  <div className="w-5/12 text-right pr-16">
                    <div className="text-2xl font-bold text-white mb-2">
                      {entry.period}
                    </div>
                  </div>

                  {/* Timeline node - Center (absolute positioned) */}
                  <div className="absolute left-1/2 transform -translate-x-1/2">
                    <div
                      className="w-6 h-6 rounded-full border-3 border-gray-800 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                      style={{
                        backgroundColor: typeColors[entry.type],
                        boxShadow: `0 0 20px ${typeColors[entry.type]}60`
                      }}
                    >
                      {/* Pulse effect */}
                      <div
                        className="absolute inset-0 rounded-full animate-ping opacity-25"
                        style={{ backgroundColor: typeColors[entry.type] }}
                      ></div>
                      {/* Inner dot */}
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                      ></div>
                    </div>

                    {/* Connecting line to left */}
                    <div
                      className="absolute top-3 -left-16 w-16 h-0.5 opacity-40"
                      style={{ backgroundColor: typeColors[entry.type] }}
                    ></div>
                    {/* Arrow head */}
                    <div
                      className="absolute top-2 -left-20 w-0 h-0 border-r-4 border-t-2 border-b-2 opacity-40"
                      style={{
                        borderRightColor: typeColors[entry.type],
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent'
                      }}
                    ></div>
                  </div>

                  {/* Journey Card - Right side */}
                  <div className="w-5/12 pl-16">
                    <Card className="layered-section-card hover:scale-[1.02] transition-all duration-300">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <CardTitle className="text-xl text-white mb-2 group-hover:text-gray-200 transition-colors">
                              {entry.title}
                            </CardTitle>
                            <p className="text-gray-300 font-medium mb-1">
                              {entry.organization}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs px-3 py-1 border-opacity-50 transition-all duration-300 group-hover:border-opacity-100 mt-2"
                              style={{
                                borderColor: typeColors[entry.type],
                                color: typeColors[entry.type]
                              }}
                            >
                              {typeLabels[entry.type]}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <p className="text-gray-300 mb-4 leading-relaxed">
                          {entry.description}
                        </p>

                        {entry.technologies && entry.technologies.length > 0 && (
                          <>
                            <Separator className="mb-4 bg-gray-700" />
                            <div className="flex flex-wrap gap-2">
                              {entry.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-sm px-3 py-1 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
