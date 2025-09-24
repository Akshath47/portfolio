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
    <main className="flex min-h-screen flex-col">
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <section className="relative w-full h-screen">
        <UnicornScene projectId="WRA2ea7ojy5q3VLa3E8k" width="100vw" height="100vh" />
      </section>

      <div className="flex flex-col items-center p-24">
        <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
          Hi, I’m Akshath
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          CS student at Imperial College London
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button>View Resume</Button>
          <Button variant="secondary">Contact Me</Button>
        </div>
      </div>

      <section id="about" className="mt-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          I am a Computer Science student at Imperial College London, passionate about building beautiful and functional web applications.
        </p>
      </section>

      <section id="experience" className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Experience
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Software Engineering Intern</CardTitle>
              <p className="text-sm text-muted-foreground">
                Unicorn Studio | Summer 2024
              </p>
            </CardHeader>
            <CardContent>
              <p>
                Built and maintained features for the company's flagship design
                product, focusing on performance and user experience.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge>Next.js</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Vercel</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Hackathon Winner</CardTitle>
              <p className="text-sm text-muted-foreground">
                HackTheFuture | 2023
              </p>
            </CardHeader>
            <CardContent>
              <p>
                Developed a full-stack application in 24 hours that won first
                place for its innovative use of AI.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">React</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="projects" className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Projects
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <Image
              src="/placeholder.svg"
              alt="Project thumbnail"
              width={500}
              height={300}
              className="rounded-t-lg object-cover"
            />
            <CardHeader>
              <CardTitle>Portfolio Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                My personal portfolio, built with Next.js and shadcn/ui.
              </p>
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>More Details</AccordionTrigger>
                  <AccordionContent>
                    This project showcases my skills in frontend development and
                    responsive design.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <Card>
            <Image
              src="/placeholder.svg"
              alt="Project thumbnail"
              width={500}
              height={300}
              className="rounded-t-lg object-cover"
            />
            <CardHeader>
              <CardTitle>AI Chatbot</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                A chatbot powered by the latest in LLM technology.
              </p>
              <Accordion type="single" collapsible className="w-full mt-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>More Details</AccordionTrigger>
                  <AccordionContent>
                    This project explores natural language processing and API
                    integrations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="skills" className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Skills
        </h2>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Badge variant="outline">JavaScript</Badge>
          <Badge variant="outline">TypeScript</Badge>
          <Badge variant="outline">Python</Badge>
          <Badge variant="outline">React</Badge>
          <Badge variant="outline">Next.js</Badge>
          <Badge variant="outline">Node.js</Badge>
          <Badge variant="outline">HTML</Badge>
          <Badge variant="outline">CSS</Badge>
          <Badge variant="outline">Git</Badge>
        </div>
      </section>

      <section id="achievements" className="mt-12 w-full max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Achievements
        </h2>
        <div className="mt-6">
          <VerticalTimeline>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
              date="2023 - present"
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            >
              <h3 className="vertical-timeline-element-title">
                Dean's List
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                Imperial College London
              </h4>
              <p>
                Awarded for outstanding academic performance.
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2023"
              iconStyle={{ background: "rgb(233, 30, 99)", color: "#fff" }}
            >
              <h3 className="vertical-timeline-element-title">
                First Class Honours
              </h3>
              <h4 className="vertical-timeline-element-subtitle">
                MEng Computing
              </h4>
              <p>
                Graduated with First Class Honours from Imperial College London.
              </p>
            </VerticalTimelineElement>
          </VerticalTimeline>
        </div>
      </section>

      <section id="contact" className="mt-12 w-full max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
        <div className="mt-6 flex justify-center gap-4">
          <Button asChild>
            <a href="mailto:akshath@example.com">Email</a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://linkedin.com/in/akshath" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="https://github.com/akshath" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <footer className="mt-12 w-full max-w-4xl text-center">
        <Separator />
        <p className="mt-4 text-sm text-muted-foreground">
          © 2024 Akshath. All rights reserved.
        </p>
      </footer>
      </div>
    </main>
  );
}
