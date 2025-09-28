"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { ExperienceTabs } from "@/components/ui/experience-tabs";
import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { CentralBlackBar } from "@/components/ui/central-black-bar";
import { ScrollAnimationProvider } from "@/components/ui/scroll-animations";
import { UnicornStudioScript } from "@/components/unicorn-studio-script";
import dynamic from "next/dynamic";
import "react-vertical-timeline-component/style.min.css";


const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false }
);

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
);

export default function Home() {
  // Auto scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollAnimationProvider>
      <UnicornStudioScript />
      <main className="relative min-h-screen">
        {/* Unicorn Studio embed as full page background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <div
            data-us-project="Kq6lW4MFKwYq3IoC5s3q?update=1.0.9"
            style={{width: '100vw', height: '110vh'}}
          ></div>
        </div>

        {/* Central Black Bar - appears after scrolling */}
        <CentralBlackBar />

        {/* All content overlaid on the UnicornScene background */}
        <div className="relative z-40">
        {/* Spacer for full hero page - just the UnicornScene */}
        <div className="h-screen"></div>

        {/* Main Gradient Card - spans all content sections */}
        <div className="main-gradient-card w-full min-h-screen">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            
            {/* Hero Section Card - Layered on main gradient card */}
            <section className="relative mb-24 fade-in-up">
              <Card className="max-w-6xl mx-auto layered-section-card">
                <CardContent className="p-16">
                  {/* Main Hero Content */}
                  <div className="text-center mb-12">
                    <p className="text-lg text-white mb-8 max-w-3xl mx-auto">
                      I am a Computer Science student at Imperial College London, passionate about building beautiful and functional web applications.
                    </p>
                  </div>

                  <Separator className="mb-12 bg-gray-700" />

                  {/* Contact Section */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-white">Get in Touch</h2>
                    <div className="flex justify-center gap-4">
                      <Button size="lg" className="cta-button px-12 py-6 text-xl" asChild>
                        <a href="mailto:akshath@example.com">Contact Me</a>
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-12 bg-gray-700" />

                  {/* Profiles Section */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-white">Profile</h2>
                    <div className="flex justify-center gap-4">
                      <Button className="secondary-button">Resume</Button>
                      <Button asChild className="secondary-button">
                        <a href="https://linkedin.com/in/akshath" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                      <Button asChild className="secondary-button">
                        <a href="https://github.com/akshath" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-12 bg-gray-700" />

                  {/* Skills Section */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">JavaScript</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">TypeScript</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Python</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">React</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Next.js</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Node.js</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">HTML</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">CSS</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Git</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Experience Section - Layered on main gradient card */}
            <section id="experience" className="w-full max-w-6xl mx-auto mb-24 fade-in-up stagger-1">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Experience
              </h2>
              <ExperienceTabs />
            </section>

            {/* Projects Section - Layered on main gradient card */}
            <section id="projects" className="w-full max-w-6xl mx-auto mb-24 fade-in-up stagger-2">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-6 text-white">
                Projects
              </h2>
              <ProjectCarousel />
            </section>

            {/* Journey Section - Layered on main gradient card */}
            <section id="journey" className="w-full max-w-6xl mx-auto mb-16 fade-in-up stagger-3">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Journey
              </h2>
              <div className="mt-6">
                <JourneyTimeline />
              </div>
            </section>

            {/* Footer */}
            <footer className="w-full max-w-6xl mx-auto text-center fade-in-up stagger-4">
              <Separator className="mb-8 bg-gray-700" />
              <p className="text-sm text-gray-400">
                © 2024 Akshath. All rights reserved.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </main>
    </ScrollAnimationProvider>
  );
}
