"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    id: "deans-list",
    title: "Dean's List",
    organization: "Imperial College London",
    period: "2023 - present",
    description: "Awarded for outstanding academic performance and maintaining exceptional grades throughout the academic year.",
    type: "achievement"
  },
  {
    id: "first-class",
    title: "First Class Honours",
    organization: "MEng Computing",
    period: "2023",
    description: "Graduated with First Class Honours from Imperial College London, demonstrating excellence in computer science and engineering.",
    technologies: ["Python", "Java", "C++", "Machine Learning"],
    type: "education"
  },
  {
    id: "internship",
    title: "Software Engineering Intern",
    organization: "Unicorn Studio",
    period: "Summer 2024",
    description: "Built and maintained features for the company's flagship design product, focusing on performance optimization and user experience improvements.",
    technologies: ["Next.js", "TypeScript", "React", "Node.js"],
    type: "work"
  },
  {
    id: "hackathon",
    title: "Hackathon Winner",
    organization: "HackTheFuture",
    period: "2023",
    description: "Developed a full-stack application in 24 hours that won first place for its innovative use of AI in accessibility technology.",
    technologies: ["Python", "FastAPI", "React", "OpenAI API"],
    type: "project"
  },
  {
    id: "imperial",
    title: "Computer Science Student",
    organization: "Imperial College London",
    period: "2021 - Present",
    description: "Pursuing MEng in Computing with focus on machine learning, software engineering, and human-computer interaction. Active member of the Computer Science Society.",
    technologies: ["Python", "Java", "C++", "Machine Learning", "Computer Vision"],
    type: "education"
  }
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
  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Central Timeline line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gray-400/50 to-transparent transform -translate-x-px"></div>

      <div className="relative">
        {journeyEntries.map((entry, index) => {
          const isEven = index % 2 === 0;
          return (
            <div key={entry.id} className="relative flex items-center justify-center mb-20 group">
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
