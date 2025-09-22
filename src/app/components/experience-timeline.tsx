"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
// import Image from "next/image"

interface Experience {
  id: string
  period: string
  company: string
  role: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: "01",
    period: "2025-present",
    company: "",
    role: "Challange myself to indie development and OSS Commit",
    description:
      "Leading development of scalable web applications using modern technologies. Architecting microservices and implementing CI/CD pipelines.",
    technologies: ["Kotlin", "Android/iOS", "Flutter", "AWS", "Docker","Tauri"],
  },
  {
    id: "02",
    period: "2025",
    company: "Town",
    role: "Infrastructure Engineer Intern",
    description:
      "Built responsive web applications and improved user experience across multiple products. Collaborated with design teams to implement pixel-perfect interfaces.",
    technologies: ["AWS", "AzureOpenAIService", "AlmaLinux", "Apache", "Wordpress"],
  },
  {
    id: "03",
    period: "2024",
    company: "Science Tokyo",
    role: "Study WebSite Development",
    description:
      "Developed features for mobile-first applications and learned modern development practices. Contributed to both frontend and backend development.",
    technologies: ["javascript/typescript","React", "Next.js","Electron","TailwindCSS"],
  },
  {
    id: "04",
    period: "2023-2025",
    company: "Science Tokyo",
    role: "Embedded System Engineer for Hybride Rocket",
    description:
      "Developed features for mobile-first applications and learned modern development practices. Contributed to both frontend and backend development.",
    technologies: ["Kicad", "Arduino","FreeRTOS","ESP32","Github"],
  },
]

export function ExperienceTimeline() {
  const [selectedId, setSelectedId] = useState("01")

  return (
    <section className="relative min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        {/* <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Building innovative solutions across different industries and technologies
          </p>
        </div> */}

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/80 transform md:-translate-x-px"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={cn(
                  "relative flex flex-col md:flex-row items-start md:items-center gap-8",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-green-500 rounded-full transform -translate-x-2 md:-translate-x-2 border-4 border-background z-10"></div>

                {/* Content card */}
                <div className="flex-1 ml-16 md:ml-0 md:w-1/2 bg-white text-black rounded-md">
                  <div
                    className={cn(
                      "group relative p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer",
                      "bg-card/50 backdrop-blur-sm",
                      selectedId === exp.id
                        ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                        : "border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20",
                    )}
                    onClick={() => setSelectedId(exp.id)}
                  >

                    <div className="space-y-4">
                      <div>
                        <div className="text-accent font-mono text-sm mb-1">{exp.period}</div>
                        <h3 className="text-xl font-bold text-black">{exp.role}</h3>
                        <div className="text-primary font-semibold">{exp.company}</div>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{exp.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-muted rounded-full text-muted-foreground text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1 w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
