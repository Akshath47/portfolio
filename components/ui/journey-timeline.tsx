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
    id: "internship-3",
    title: "Incoming Technology Intern",
    organization: "Man Group",
    period: "March 2026",
    description: "Received an offer to join Man Group as a Summer 2026 intern at their London office.",
    // technologies: [],
    type: "work"
  },
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
  {
    id: "hackathon",
    title: "Hackathon 2nd Round",
    organization: "IIIT-H Hackathon",
    period: "2023",
    description: "Participated in the IIT-H Makers’ Hackathon, developing an Arduino-based IoT device and app while learning teamwork, IoT fundamentals, and earning Level 2 recognition for innovation.",
    // technologies: ["IoT", "Arduino"],
    type: "project"
  },
];

const typeColors = {
  education: "#00ff41", // bright matrix green
  work: "#00cc33", // medium green
  achievement: "#39ff14", // bright highlight green
  project: "#00aa2e" // darker green
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
      {/* Central Timeline line - visible on desktop, hidden on mobile */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 transform -translate-x-1/2"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 255, 65, 0.3) 5%, rgba(0, 255, 65, 0.5) 15%, rgba(0, 255, 65, 0.6) 50%, rgba(0, 255, 65, 0.5) 85%, rgba(0, 255, 65, 0.3) 95%, transparent 100%)'
        }}
      ></div>

      {/* Mobile timeline line - left side - behind cards */}
      <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 z-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 255, 65, 0.2) 5%, rgba(0, 255, 65, 0.4) 15%, rgba(0, 255, 65, 0.5) 50%, rgba(0, 255, 65, 0.4) 85%, rgba(0, 255, 65, 0.2) 95%, transparent 100%)'
        }}
      ></div>

      <div className="relative z-10">
        {journeyEntries.map((entry, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={entry.id}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className="relative flex flex-col items-start md:flex-row md:items-center md:justify-center mb-6 md:mb-20 group timeline-item opacity-0 translate-y-8 transition-all duration-700 ease-out pl-6 md:pl-0"
            >
              {/* Mobile timeline dot with subtle connecting line */}
              <div className="md:hidden absolute left-0 top-6 -translate-x-[5px]">
                {/* Subtle connecting line to card */}
                <div
                  className="absolute left-1.5 top-1.5 w-4 h-px opacity-30"
                  style={{ backgroundColor: typeColors[entry.type] }}
                ></div>
                {/* Timeline dot */}
                <div
                  className="w-3 h-3 rounded-full border-2 border-gray-800 relative"
                  style={{
                    backgroundColor: typeColors[entry.type],
                    boxShadow: `0 0 8px ${typeColors[entry.type]}40`
                  }}
                ></div>
              </div>
              {/* Left side content (even indices) */}
              {isEven && (
                <>
                  {/* Journey Card - Left side */}
                  <div className="w-full md:w-5/12 order-2 md:order-1 relative z-10">
                    <Card className="layered-section-card hover:scale-[1.02] transition-all duration-300 mt-0 md:mr-16 md:mt-0 font-mono">
                      <CardHeader className="pb-2 p-3 md:pb-3 md:p-6">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            {/* Period inside card on mobile, hidden on desktop */}
                            <div className="block md:hidden text-sm font-semibold mb-1.5"
                              style={{ color: typeColors[entry.type] }}>
                              [{entry.period}]
                            </div>
                            <CardTitle className="text-base md:text-xl text-terminal-green-bright mb-1.5 md:mb-2 group-hover:text-terminal-green-bright transition-colors leading-tight">
                              &gt; {entry.title}
                            </CardTitle>
                            <p className="text-terminal-green-medium text-sm md:text-base font-medium mb-1.5 md:mb-1">
                              @ {entry.organization}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 md:px-3 md:py-1 border-opacity-70 transition-all duration-300 group-hover:border-opacity-100 mt-1 md:mt-2 font-mono"
                              style={{
                                borderColor: typeColors[entry.type],
                                color: typeColors[entry.type]
                              }}
                            >
                              [{typeLabels[entry.type].toUpperCase()}]
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 p-3 md:p-6 md:pt-0">
                        <p className="text-terminal-green-medium text-xs md:text-sm mb-2 md:mb-4 leading-relaxed">
                          {entry.description}
                        </p>

                        {entry.technologies && entry.technologies.length > 0 && (
                          <>
                            <Separator className="mb-4 bg-terminal-green-dark opacity-30" />
                            <div className="flex flex-wrap gap-2">
                              {entry.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-terminal-green-dark text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black transition-all duration-300 font-mono"
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

                  {/* Timeline node - Center (absolute positioned) - hidden on mobile, visible on desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
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

                  {/* Year/Period - Right side - hidden on mobile, visible on desktop */}
                  <div className="hidden md:block md:w-5/12 md:text-left md:pl-16 md:order-3">
                    <div className="md:text-2xl md:font-bold text-terminal-green-bright md:mb-2 font-mono">
                      [{entry.period}]
                    </div>
                  </div>
                </>
              )}

              {/* Right side content (odd indices) */}
              {!isEven && (
                <>
                  {/* Year/Period - Left side - hidden on mobile, visible on desktop */}
                  <div className="hidden md:block md:w-5/12 md:text-right md:pr-16 md:order-1">
                    <div className="md:text-2xl md:font-bold text-terminal-green-bright md:mb-2 font-mono">
                      [{entry.period}]
                    </div>
                  </div>

                  {/* Timeline node - Center (absolute positioned) - hidden on mobile, visible on desktop */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
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
                  <div className="w-full md:w-5/12 pl-0 md:pl-16 order-2 md:order-3 relative z-10">
                    <Card className="layered-section-card hover:scale-[1.02] transition-all duration-300 mt-0 md:mt-0 font-mono">
                      <CardHeader className="pb-2 p-3 md:pb-3 md:p-6">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            {/* Period inside card on mobile, hidden on desktop */}
                            <div className="block md:hidden text-sm font-semibold mb-1.5"
                              style={{ color: typeColors[entry.type] }}>
                              [{entry.period}]
                            </div>
                            <CardTitle className="text-base md:text-xl text-terminal-green-bright mb-1.5 md:mb-2 group-hover:text-terminal-green-bright transition-colors leading-tight">
                              &gt; {entry.title}
                            </CardTitle>
                            <p className="text-terminal-green-medium text-sm md:text-base font-medium mb-1.5 md:mb-1">
                              @ {entry.organization}
                            </p>
                            <Badge
                              variant="outline"
                              className="text-xs px-2 py-0.5 md:px-3 md:py-1 border-opacity-70 transition-all duration-300 group-hover:border-opacity-100 mt-1 md:mt-2 font-mono"
                              style={{
                                borderColor: typeColors[entry.type],
                                color: typeColors[entry.type]
                              }}
                            >
                              [{typeLabels[entry.type].toUpperCase()}]
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 p-3 md:p-6 md:pt-0">
                        <p className="text-terminal-green-medium text-xs md:text-sm mb-2 md:mb-4 leading-relaxed">
                          {entry.description}
                        </p>

                        {entry.technologies && entry.technologies.length > 0 && (
                          <>
                            <Separator className="mb-4 bg-terminal-green-dark opacity-30" />
                            <div className="flex flex-wrap gap-2">
                              {entry.technologies.map((tech) => (
                                <Badge
                                  key={tech}
                                  variant="outline"
                                  className="text-xs px-2 py-0.5 border-terminal-green-dark text-terminal-green-medium hover:bg-terminal-green-medium hover:text-black transition-all duration-300 font-mono"
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
