"use client"

import { useState } from "react"
import { cn } from "../lib/utils"

interface Skill {
  name: string
  level: number
  category: string
  experience: string
}

const skills: Skill[] = [
  { name: "TypeScript", level: 95, category: "Languages", experience: "4+ years" },
  { name: "JavaScript", level: 98, category: "Languages", experience: "5+ years" },
  { name: "Python", level: 85, category: "Languages", experience: "3+ years" },
  { name: "React", level: 95, category: "Frontend", experience: "4+ years" },
  { name: "Next.js", level: 90, category: "Frontend", experience: "3+ years" },
  { name: "Vue.js", level: 80, category: "Frontend", experience: "2+ years" },
  { name: "Node.js", level: 88, category: "Backend", experience: "4+ years" },
  { name: "Express.js", level: 85, category: "Backend", experience: "3+ years" },
  { name: "PostgreSQL", level: 82, category: "Database", experience: "3+ years" },
  { name: "MongoDB", level: 78, category: "Database", experience: "2+ years" },
  { name: "AWS", level: 75, category: "Cloud", experience: "2+ years" },
  { name: "Docker", level: 80, category: "DevOps", experience: "2+ years" },
]

const categories = ["All", "Languages", "Frontend", "Backend", "Database", "Cloud", "DevOps"]

export function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const filteredSkills = skills.filter((skill) => selectedCategory === "All" || skill.category === selectedCategory)

  return (
    <section className="relative min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Technical Skills</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proficiency across modern technologies and development practices
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-lg border-2 transition-all duration-300 font-medium",
                selectedCategory === category
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-card/50 text-foreground hover:border-primary hover:bg-primary/10",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className={cn(
                "group relative p-6 rounded-lg border-2 transition-all duration-500",
                "bg-card/50 backdrop-blur-sm",
                hoveredSkill === skill.name
                  ? "border-accent bg-accent/10 shadow-lg shadow-accent/20 scale-105"
                  : "border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20",
              )}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Skill number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{skill.name}</h3>
                    <span className="text-accent font-mono text-sm">{skill.level}%</span>
                  </div>
                  <div className="text-muted-foreground text-sm mb-3">
                    {skill.category} • {skill.experience}
                  </div>
                </div>

                {/* Skill level bar */}
                <div className="relative">
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full transition-all duration-1000 ease-out",
                        hoveredSkill === skill.name ? "bg-accent" : "bg-primary",
                      )}
                      style={{
                        width: `${skill.level}%`,
                        transitionDelay: hoveredSkill === skill.name ? "0ms" : `${index * 100}ms`,
                      }}
                    />
                  </div>

                  {/* Skill level indicator */}
                  <div
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-all duration-300",
                      hoveredSkill === skill.name
                        ? "bg-accent border-accent-foreground"
                        : "bg-primary border-primary-foreground",
                    )}
                    style={{ left: `calc(${skill.level}% - 6px)` }}
                  />
                </div>

                {/* Proficiency label */}
                <div className="text-center">
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                      skill.level >= 90
                        ? "bg-accent/20 text-accent"
                        : skill.level >= 80
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground",
                    )}
                  >
                    {skill.level >= 90
                      ? "Expert"
                      : skill.level >= 80
                        ? "Advanced"
                        : skill.level >= 70
                          ? "Intermediate"
                          : "Beginner"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
