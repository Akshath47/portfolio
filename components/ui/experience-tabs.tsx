"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

const experiences: Experience[] = [
  {
    id: "work",
    title: "Software Engineering Intern",
    company: "Unicorn Studio",
    period: "Summer 2024",
    description: "Built and maintained features for the company's flagship design product, focusing on performance and user experience.",
    technologies: ["Next.js", "TypeScript", "Vercel"]
  },
  {
    id: "projects",
    title: "Hackathon Winner",
    company: "HackTheFuture",
    period: "2023",
    description: "Developed a full-stack application in 24 hours that won first place for its innovative use of AI.",
    technologies: ["Python", "FastAPI", "React"]
  },
  {
    id: "education",
    title: "Computer Science Student",
    company: "Imperial College London",
    period: "2021 - Present",
    description: "Pursuing MEng in Computing with focus on machine learning and software engineering. Dean's List recipient.",
    technologies: ["Python", "Java", "C++", "Machine Learning"]
  }
];

const tabLabels = {
  work: "Work",
  projects: "Projects", 
  education: "Education"
};

export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState("work");

  const activeExperience = experiences.find(exp => exp.id === activeTab);

  return (
    <div className="w-full">
      <div className="experience-tabs">
        {experiences.map((experience) => (
          <button
            key={experience.id}
            className={`experience-tab ${activeTab === experience.id ? 'active' : ''}`}
            onClick={() => setActiveTab(experience.id)}
          >
            {tabLabels[experience.id as keyof typeof tabLabels]}
          </button>
        ))}
      </div>

      <div className="relative min-h-[300px]">
        {experiences.map((experience) => (
          <div
            key={experience.id}
            className={`experience-content absolute inset-0 ${
              activeTab === experience.id ? 'active' : ''
            }`}
            style={{
              display: activeTab === experience.id ? 'block' : 'none'
            }}
          >
            <Card className="layered-section-card">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  {experience.title}
                </CardTitle>
                <p className="text-sm text-gray-400">
                  {experience.company} | {experience.period}
                </p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-300">
                  {experience.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {experience.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      className="bg-gray-700 text-gray-200 hover:bg-gray-600"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}