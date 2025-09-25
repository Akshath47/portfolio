"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import dynamic from "next/dynamic";
import "react-vertical-timeline-component/style.min.css";
import { ModeToggle } from "@/components/mode-toggle";
import UnicornScene from "unicornstudio-react/next";

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
    <main className="relative min-h-screen">
      {/* UnicornScene as full page background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <UnicornScene projectId="k7hNr7cWYaAZHKZSB9de" width="100vw" height="100vh" />
      </div>

      {/* Mode toggle positioned above everything */}
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>

      {/* All content overlaid on the UnicornScene background */}
      <div className="relative z-40">
        {/* Spacer for full hero page - just the UnicornScene */}
        <div className="h-screen"></div>

        {/* Content sections starting one page below */}
        <div className="min-h-screen">
          {/* Hero section with black background */}
          <section className="relative pt-16 pb-16">
            <div className="container mx-auto px-4">
              <Card className="max-w-6xl mx-auto bg-black/90 border-gray-800 shadow-2xl">
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
            </div>
          </section>

          {/* Additional Content Sections with black backgrounds */}
          <div className="flex flex-col items-center p-24">
            <section id="experience" className="w-full max-w-6xl mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Experience
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Software Engineering Intern</CardTitle>
                    <p className="text-sm text-gray-400">
                      Unicorn Studio | Summer 2024
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">
                      Built and maintained features for the company's flagship design
                      product, focusing on performance and user experience.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-gray-700 text-gray-200">Next.js</Badge>
                      <Badge className="bg-gray-700 text-gray-200">TypeScript</Badge>
                      <Badge className="bg-gray-700 text-gray-200">Vercel</Badge>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Hackathon Winner</CardTitle>
                    <p className="text-sm text-gray-400">
                      HackTheFuture | 2023
                    </p>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">
                      Developed a full-stack application in 24 hours that won first
                      place for its innovative use of AI.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200">Python</Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200">FastAPI</Badge>
                      <Badge variant="secondary" className="bg-gray-700 text-gray-200">React</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="projects" className="w-full max-w-6xl mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Projects
              </h2>
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-700">
                  <Image
                    src="/placeholder.svg"
                    alt="Project thumbnail"
                    width={500}
                    height={300}
                    className="rounded-t-lg object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-white">Portfolio Website</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">
                      My personal portfolio, built with Next.js and shadcn/ui.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-gray-700">
                        <AccordionTrigger className="text-gray-300 hover:text-white">More Details</AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                          This project showcases my skills in frontend development and
                          responsive design.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-700">
                  <Image
                    src="/placeholder.svg"
                    alt="Project thumbnail"
                    width={500}
                    height={300}
                    className="rounded-t-lg object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl text-white">AI Chatbot</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-gray-300">
                      A chatbot powered by the latest in LLM technology.
                    </p>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-gray-700">
                        <AccordionTrigger className="text-gray-300 hover:text-white">More Details</AccordionTrigger>
                        <AccordionContent className="text-gray-400">
                          This project explores natural language processing and API
                          integrations.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="achievements" className="w-full max-w-6xl mb-16">
              <h2 className="text-4xl font-bold tracking-tight text-center mb-12 text-white">
                Achievements
              </h2>
              <div className="mt-6">
                <VerticalTimeline>
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: "rgb(31, 41, 55)", color: "#fff", border: "1px solid rgb(75, 85, 99)" }}
                    contentArrowStyle={{ borderRight: "7px solid rgb(31, 41, 55)" }}
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
                    contentStyle={{ background: "rgb(31, 41, 55)", color: "#fff", border: "1px solid rgb(75, 85, 99)" }}
                    contentArrowStyle={{ borderRight: "7px solid rgb(31, 41, 55)" }}
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

            <footer className="w-full max-w-6xl text-center">
              <Separator className="mb-8 bg-gray-700" />
              <p className="text-sm text-gray-400">
                © 2024 Akshath. All rights reserved.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
