"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectGrid } from "@/components/ui/project-grid";
import { ExperienceTabs } from "@/components/ui/experience-tabs";
import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { ScrollAnimationProvider } from "@/components/ui/scroll-animations";
import { MatrixRain } from "@/components/matrix-rain";
import "react-vertical-timeline-component/style.min.css";

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  // Auto scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
    // Show content after a brief delay
    setTimeout(() => setShowContent(true), 100);
  }, []);

  return (
    <ScrollAnimationProvider>
      <main className="relative min-h-screen scanlines crt-flicker">
        {/* Matrix Rain Background */}
        <MatrixRain />

        {/* All content overlaid on the Matrix background */}
        <div className="relative z-10">
          {/* Hero Section - Full viewport height */}
          <section className="min-h-screen flex items-center justify-center px-4 py-16">
            <div className="container max-w-4xl mx-auto">
              <div className="terminal-window mb-8">
                <div className="terminal-header">
                  <div className="terminal-button" />
                  <div className="terminal-button" />
                  <div className="terminal-button" />
                  <span className="terminal-title ml-2">akshath@portfolio:~</span>
                </div>
                <div className="terminal-content space-y-4">
                  {/* Name and Title */}
                  <div className="mb-6">
                    <div className="flex items-center">
                      <h1 className="text-4xl md:text-6xl font-bold text-terminal-green-bright hero-name">
                        AKSHATH YENNAM
                      </h1>
                      <span className="cursor-blink ml-2" />
                    </div>
                    <p className="text-lg md:text-xl text-terminal-green-medium mt-4 hero-tagline">
                      Software Engineer | AI Enthusiast | Builder
                    </p>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Bio */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium">$</span>
                      <span className="text-terminal-green-bright font-mono">cat about.txt</span>
                    </div>
                    <div className="ml-6 text-terminal-green-medium space-y-2">
                      <p>
                        Passionate about learning, building, and exploring the possibilities of technology.
                      </p>
                      <p>
                        I enjoy taking on challenges that help me grow, and I&apos;m always looking for ways to connect ideas with impact.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Contact */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium">$</span>
                      <span className="text-terminal-green-bright font-mono">cat contact.txt</span>
                    </div>
                    <div className="ml-6 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-terminal-green-dark">EMAIL:</span>
                        <span className="text-terminal-green-bright font-mono">akshathyennam@gmail.com</span>
                      </div>
                      <div className="flex flex-col md:flex-row gap-3">
                        <Button size="default" className="cta-button" asChild>
                          <a href="mailto:akshathyennam@gmail.com">
                            [ CONTACT ME ]
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Profiles */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium">$</span>
                      <span className="text-terminal-green-bright font-mono">ls -la profiles/</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex flex-col md:flex-row gap-3">
                        <Button asChild className="secondary-button">
                          <a href="/Akshath_Yennam_CV.pdf" target="_blank" rel="noopener noreferrer">
                            [ RESUME.PDF ]
                          </a>
                        </Button>
                        <Button asChild className="secondary-button">
                          <a href="https://www.linkedin.com/in/akshathyennam/" target="_blank" rel="noopener noreferrer">
                            [ LINKEDIN ]
                          </a>
                        </Button>
                        <Button asChild className="secondary-button">
                          <a href="https://github.com/Akshath47" target="_blank" rel="noopener noreferrer">
                            [ GITHUB ]
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Skills */}
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium">$</span>
                      <span className="text-terminal-green-bright font-mono">cat skills.txt</span>
                    </div>
                    <div className="ml-6">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">Python</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">JavaScript</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">Kotlin</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">Java</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">C</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">RAG</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">LangGraph</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">Agentic AI</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">Speech AI</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono">GPT-Realtime</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="text-center">
                <p className="text-terminal-green-dark font-mono text-sm animate-pulse">
                  ▼ scroll down for more ▼
                </p>
              </div>
            </div>
          </section>

          {/* Content sections with terminal styling */}
          <div className="relative">
            <div className="container mx-auto px-3 md:px-4 pb-8 md:pb-16 max-w-6xl">
              {/* Experience Section */}
              <section id="experience" className="w-full mx-auto mb-16 md:mb-24 fade-in-up stagger-1">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-mono text-terminal-green-bright mb-3">
                    Experience
                  </h2>
                  <div className="h-0.5 bg-terminal-green-dark opacity-30" />
                </div>
                <ExperienceTabs />
              </section>

              {/* Projects Section */}
              <section id="projects" className="w-full mx-auto mb-16 md:mb-24 fade-in-up stagger-2">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-mono text-terminal-green-bright mb-3">
                    Projects
                  </h2>
                  <div className="h-0.5 bg-terminal-green-dark opacity-30" />
                </div>
                <ProjectGrid />
              </section>

              {/* Journey Section */}
              <section id="journey" className="w-full mx-auto mb-12 md:mb-16 fade-in-up stagger-3">
                <div className="mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold font-mono text-terminal-green-bright mb-3">
                    Journey
                  </h2>
                  <div className="h-0.5 bg-terminal-green-dark opacity-30" />
                </div>
                <JourneyTimeline />
              </section>

            </div>
          </div>

          {/* Footer - Full Width */}
          <footer className="w-full mt-16 border-t border-terminal-green-dark/30 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-6 text-center">
              <p className="text-terminal-green-medium text-sm font-mono">
                © 2025 Akshath Yennam. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
    </ScrollAnimationProvider>
  );
}
