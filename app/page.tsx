"use client";

import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { ExperienceTabs } from "@/components/ui/experience-tabs";
import { JourneyTimeline } from "@/components/ui/journey-timeline";
import { ScrollAnimationProvider } from "@/components/ui/scroll-animations";
import { UnicornStudioScript } from "@/components/unicorn-studio-script";
import "react-vertical-timeline-component/style.min.css";



export default function Home() {
  // Auto scroll to top on page reload
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ScrollAnimationProvider>
      <UnicornStudioScript />
      <main className="relative min-h-screen" style={{overscrollBehavior: 'none'}}>
        {/* Unicorn Studio embed as full page background */}
        <div className="fixed inset-0 w-full h-full z-0" style={{overscrollBehavior: 'none'}}>
          <div
            data-us-project="Kq6lW4MFKwYq3IoC5s3q?update=1.0.10"
            style={{width: '100vw', height: '110vh'}}
          ></div>
        </div>

        {/* All content overlaid on the UnicornScene background */}
        <div className="relative z-40">
        {/* Spacer for full hero page - just the UnicornScene */}
        <div className="h-screen"></div>

        {/* Main Gradient Card - spans all content sections */}
        <div className="main-gradient-card w-full min-h-screen">
          <div className="container mx-auto px-3 md:px-4 pb-8 md:pb-16 max-w-4xl">
            
            {/* Hero Section Card - Layered on main gradient card */}
            <section className="relative mb-12 md:mb-24 fade-in-up">
              <Card className="max-w-6xl mx-auto layered-section-card">
                <CardContent className="pt-6 px-4 pb-2 md:pt-12 md:pr-12 md:pl-12">
                  {/* Main Hero Content */}
                  <div className="text-center mb-8 md:mb-12">
                    <p className="text-base md:text-lg text-white mb-6 md:mb-8 max-w-3xl mx-auto">
                      Passionate about learning, building, and exploring the possibilities of technology. I enjoy taking on challenges that help me grow, and I&apos;m always looking for ways to connect ideas with impact.
                    </p>
                  </div>

                  <Separator className="mb-6 md:mb-8 bg-gray-700" />

                  {/* Contact Section */}
                  <div className="text-center mb-6 md:mb-8">
                    {/* Prominent email address display */}
                    <div className="mb-4 md:mb-6">
                      <p className="text-lg md:text-2xl font-medium text-white mb-2">Email</p>
                      <p className="text-base md:text-xl text-gray-300 font-mono break-all px-2">akshathyennam@gmail.com</p>
                    </div>

                    {/* Secondary contact button */}
                    <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
                      <Button size="default" className="secondary-button px-8 py-3 w-full md:w-auto min-h-[44px]" asChild>
                        <a href="mailto:akshathyennam@gmail.com" target="_blank" rel="noopener noreferrer">Contact Me</a>
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-6 md:mb-8 bg-gray-700" />

                  {/* Profiles Section */}
                  <div className="text-center mb-6 md:mb-8">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6 text-white">Profile</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
                      <Button asChild className="secondary-button w-full md:w-auto min-h-[44px]">
                        <a href="/Akshath_Yennam_CV.pdf" target="_blank" rel="noopener noreferrer">
                          Resume
                        </a>
                      </Button>
                      <Button asChild className="secondary-button w-full md:w-auto min-h-[44px]">
                        <a href="https://www.linkedin.com/in/akshathyennam/" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                      <Button asChild className="secondary-button w-full md:w-auto min-h-[44px]">
                        <a href="https://github.com/Akshath47" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-6 md:mb-8 bg-gray-700" />

                  {/* Skills Section */}
                  <div className="mb-6 md:mb-8">
                    <h2 className="text-xl md:text-3xl font-bold tracking-tight text-center mb-4 md:mb-6 text-white">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Python</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">JavaScript</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Kotlin</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Java</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">C</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">RAG</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">LangGraph</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Agentic AI Systems</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">Speech-to-Speech AI</Badge>
                      <Badge variant="outline" className="text-xs md:text-sm px-3 py-1.5 md:px-4 md:py-2 border-primary text-white hover:bg-primary hover:border-accent hover:text-black transition-all duration-300">GPT-Realtime</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Experience Section - Layered on main gradient card */}
            <section id="experience" className="w-full max-w-6xl mx-auto mb-12 md:mb-24 fade-in-up stagger-1">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-8 md:mb-12 text-white">
                Experience
              </h2>
              <ExperienceTabs />
            </section>

            {/* Projects Section - Layered on main gradient card */}
            <section id="projects" className="w-full max-w-6xl mx-auto mb-12 md:mb-24 fade-in-up stagger-2">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center text-white mb-4 md:mb-6">
                Projects
              </h2>
              <ProjectCarousel />
            </section>

            {/* Journey Section - Layered on main gradient card */}
            <section id="journey" className="w-full max-w-6xl mx-auto mb-8 md:mb-16 fade-in-up stagger-3">
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-center mb-8 md:mb-12 text-white">
                Journey
              </h2>
              <div className="mt-4 md:mt-6">
                <JourneyTimeline />
              </div>
            </section>

            {/* Footer */}
            <footer className="w-full max-w-6xl mx-auto text-center fade-in-up stagger-4">
              <Separator className="mb-6 md:mb-8 bg-gray-700" />
              <p className="text-xs md:text-sm text-gray-400 px-4">
                © 2025 Akshath. All rights reserved.
              </p>
            </footer>

          </div>
        </div>
      </div>
    </main>
    </ScrollAnimationProvider>
  );
}
