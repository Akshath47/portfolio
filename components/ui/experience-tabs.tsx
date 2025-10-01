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
  }
];

const tabLabels = {
  work: "Work"
};

export function ExperienceTabs() {
  const experience = experiences[0]; // Get the single work experience

  return (
    <div className="w-full">
      <Card className="layered-section-card">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-white mb-2">
            {experience.title}
          </CardTitle>
          <p className="text-sm text-gray-400 mt-2">
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
                variant="outline"
                className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
