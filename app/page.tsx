"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { ExperienceTabs } from "@/components/ui/experience-tabs";
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
  return (
    <ScrollAnimationProvider>
      <UnicornStudioScript />
      <main className="relative min-h-screen">
        {/* Unicorn Studio embed as full page background */}
        <div className="fixed inset-0 w-full h-full z-0">
          <div
            data-us-project="Kq6lW4MFKwYq3IoC5s3q?update=1.0.1"
            style={{width: '100vw', height: '100vh'}}
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
                    <p className="text-2xl text-gray-300 mb-8">
                      CS student at Imperial College London
                    </p>
                    <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
                      I am a Computer Science student at Imperial College London, passionate about building beautiful and functional web applications.
                    </p>
                    <div className="flex justify-center gap-4 mb-12">
                      <Button size="lg" className="px-8 bg-white text-black hover:bg-gray-200">View Resume</Button>
                      <Button variant="outline" size="lg" className="px-8 border-gray-600 text-white hover:bg-gray-800">Contact Me</Button>
                    </div>
                  </div>

                  <Separator className="mb-12 bg-gray-700" />

                  {/* Skills Section */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-8 text-white">Skills</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">JavaScript</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">TypeScript</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">Python</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">React</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">Next.js</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">Node.js</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">HTML</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">CSS</Badge>
                      <Badge variant="outline" className="text-sm px-4 py-2 border-gray-600 text-gray-300">Git</Badge>
                    </div>
                  </div>

                  <Separator className="mb-12 bg-gray-700" />

                  {/* Contact Section */}
                  <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-8 text-white">Get in Touch</h2>
                    <div className="flex justify-center gap-4">
                      <Button asChild className="bg-white text-black hover:bg-gray-200">
                        <a href="mailto:akshath@example.com">Email</a>
                      </Button>
                      <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                        <a href="https://linkedin.com/in/akshath" target="_blank" rel="noopener noreferrer">
                          LinkedIn
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                        <a href="https://github.com/akshath" target="_blank" rel="noopener noreferrer">
                          GitHub
                        </a>
                      </Button>
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
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Projects
              </h2>
              <ProjectCarousel />
            </section>

            {/* Achievements Section - Layered on main gradient card */}
            <section id="achievements" className="w-full max-w-6xl mx-auto mb-16 fade-in-up stagger-3">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Achievements
              </h2>
              <div className="mt-6">
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "rgba(0, 0, 0, 0.4)", color: "#fff", border: "1px solid rgba(75, 85, 99, 0.3)", backdropFilter: "blur(4px)" }}
                    contentArrowStyle={{ borderRight: "7px solid rgba(0, 0, 0, 0.4)" }}
                    date="2023 - present"
                    iconStyle={{ background: "rgb(59, 130, 246)", color: "#fff" }}
                  >
                    <h3 className="vertical-timeline-element-title text-white">
                      Dean's List
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle text-gray-300">
                      Imperial College London
                    </h4>
                    <p className="text-gray-300">
                      Awarded for outstanding academic performance.
                    </p>
                  </VerticalTimelineElement>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "rgba(0, 0, 0, 0.4)", color: "#fff", border: "1px solid rgba(75, 85, 99, 0.3)", backdropFilter: "blur(4px)" }}
                    contentArrowStyle={{ borderRight: "7px solid rgba(0, 0, 0, 0.4)" }}
                    date="2023"
                    iconStyle={{ background: "rgb(236, 72, 153)", color: "#fff" }}
                  >
                    <h3 className="vertical-timeline-element-title text-white">
                      First Class Honours
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle text-gray-300">
                      MEng Computing
                    </h4>
                    <p className="text-gray-300">
                      Graduated with First Class Honours from Imperial College London.
                    </p>
                  </VerticalTimelineElement>
                </VerticalTimeline>
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
