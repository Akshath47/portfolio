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
import { InteractiveTerminal } from "@/components/interactive-terminal";
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
          <section className="min-h-screen flex items-center justify-center px-4 pt-8 pb-16">
            <div className="container max-w-4xl mx-auto">
              <div className="terminal-window mb-6">
                <div className="terminal-header">
                  <div className="terminal-button" />
                  <div className="terminal-button" />
                  <div className="terminal-button" />
                  <span className="terminal-title ml-2 text-xs md:text-sm">akshath@portfolio:~</span>
                </div>
                <div className="terminal-content space-y-3">
                  {/* Name and Title */}
                  <div className="mb-4">
                    <div className="flex items-center flex-wrap">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-terminal-green-bright hero-name leading-tight">
                        AKSHATH YENNAM
                      </h1>
                      <span className="cursor-blink ml-2" />
                    </div>
                    <p className="text-base sm:text-lg md:text-xl text-terminal-green-medium mt-3 hero-tagline">
                      Software Engineer | AI Engineer | Builder
                    </p>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Bio */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium text-sm md:text-base">$</span>
                      <span className="text-terminal-green-bright font-mono text-sm md:text-base">cat about.txt</span>
                    </div>
                    <div className="ml-4 md:ml-6 text-terminal-green-medium space-y-2 text-xs sm:text-sm md:text-base leading-relaxed">
                      <p>
                        I&apos;m a Computing student at Imperial College London, passionate about AI, systems design, and building things that matter.
                      </p>
                      <p>
                        I love tackling challenging problems and turning ideas into working solutions. I learn best by getting my hands dirty and figuring things out as I go.
                      </p>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Contact */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium text-sm md:text-base">$</span>
                      <span className="text-terminal-green-bright font-mono text-sm md:text-base">cat contact.txt</span>
                    </div>
                    <div className="ml-4 md:ml-6 space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span className="text-terminal-green-dark text-xs md:text-sm">EMAIL:</span>
                        <span className="text-terminal-green-bright font-mono text-xs md:text-sm break-all">akshathyennam@gmail.com</span>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                        <Button size="default" className="cta-button w-full sm:w-auto" asChild>
                          <a href="mailto:akshathyennam@gmail.com">
                            [ CONTACT ME ]
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30" />

                  {/* Profiles */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium text-sm md:text-base">$</span>
                      <span className="text-terminal-green-bright font-mono text-sm md:text-base">ls -la profiles/</span>
                    </div>
                    <div className="ml-4 md:ml-6">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button asChild className="secondary-button w-full sm:w-auto text-xs sm:text-sm">
                          <a href="/AkshathYennam_CV.pdf" target="_blank" rel="noopener noreferrer">
                            [ RESUME.PDF ]
                          </a>
                        </Button>
                        <Button asChild className="secondary-button w-full sm:w-auto text-xs sm:text-sm">
                          <a href="https://www.linkedin.com/in/akshathyennam/" target="_blank" rel="noopener noreferrer">
                            [ LINKEDIN ]
                          </a>
                        </Button>
                        <Button asChild className="secondary-button w-full sm:w-auto text-xs sm:text-sm">
                          <a href="https://github.com/Akshath47" target="_blank" rel="noopener noreferrer">
                            [ GITHUB ]
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-terminal-green-dark opacity-30 my-2" />

                  {/* Skills */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-terminal-green-medium text-sm md:text-base">$</span>
                      <span className="text-terminal-green-bright font-mono text-sm md:text-base">cat skills.txt</span>
                    </div>
                    <div className="ml-4 md:ml-6">
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">Python</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">JavaScript</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">Java</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">C</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">Backend Engineering</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">Machine Learning</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">RAG</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">LangGraph</Badge>
                        <Badge variant="outline" className="border-terminal-green-medium text-terminal-green-bright hover:bg-terminal-green-bright hover:text-black font-mono text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1">Agentic AI</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="text-center mt-4 mb-8">
                <p className="text-terminal-green-dark font-mono text-xs md:text-sm animate-pulse">
                  ▼ scroll down for more ▼
                </p>
              </div>
            </div>
          </section>

          {/* Content sections with terminal styling */}
          <div className="relative">
            <div className="container mx-auto px-3 md:px-4 pb-8 md:pb-16 max-w-6xl">
              {/* Experience Section */}
              <section id="experience" className="w-full mx-auto mb-12 md:mb-16 fade-in-up stagger-1">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-green-bright mb-3 section-title">
                    Experience
                  </h2>
                  <div className="section-hr" />
                </div>
                <ExperienceTabs />
              </section>

              {/* Projects Section */}
              <section id="projects" className="w-full mx-auto mb-12 md:mb-16 fade-in-up stagger-2">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-green-bright mb-3 section-title">
                    Projects
                  </h2>
                  <div className="section-hr" />
                </div>
                <ProjectGrid />
              </section>

              {/* Journey Section */}
              <section id="journey" className="w-full mx-auto mb-8 md:mb-12 fade-in-up stagger-3">
                <div className="mb-6 md:mb-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-terminal-green-bright mb-3 section-title">
                    Journey
                  </h2>
                  <div className="section-hr" />
                </div>
                <JourneyTimeline />
              </section>

            </div>
          </div>

          {/* Footer - Full Width */}
          <footer className="w-full mt-8 md:mt-12 border-t border-terminal-green-dark/30 bg-black/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4 text-center">
              <p className="text-terminal-green-medium text-xs md:text-sm font-mono">
                © 2025 Akshath Yennam. All rights reserved.
              </p>
            </div>
          </footer>
        </div>

        {/* Interactive Terminal */}
        <InteractiveTerminal />
      </main>
    </ScrollAnimationProvider>
  );
}
