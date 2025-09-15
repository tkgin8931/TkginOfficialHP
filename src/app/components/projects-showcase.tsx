"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
import { ExternalLink, Github } from "lucide-react"

interface Project {
  id: string
  title: string
  category: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  githubUrl: string
  liveUrl: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: "01",
    title: "E-Commerce Platform",
    category: "Full Stack",
    description: "Modern e-commerce solution with real-time inventory",
    longDescription:
      "Built a comprehensive e-commerce platform with real-time inventory management, payment processing, and admin dashboard. Features include user authentication, product catalog, shopping cart, and order tracking.",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe"],
    image: "/modern-ecommerce-dashboard.png",
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    id: "02",
    title: "Task Management App",
    category: "Frontend",
    description: "Collaborative project management with real-time updates",
    longDescription:
      "Developed a collaborative task management application with drag-and-drop functionality, real-time updates, team collaboration features, and advanced filtering options.",
    technologies: ["React", "Redux", "Socket.io", "Node.js", "MongoDB"],
    image: "/task-management-kanban.png",
    githubUrl: "https://github.com/username/taskapp",
    liveUrl: "https://taskapp-demo.com",
    featured: true,
  },
  {
    id: "03",
    title: "Weather Analytics",
    category: "Data Visualization",
    description: "Interactive weather data visualization dashboard",
    longDescription:
      "Created an interactive dashboard for weather data analysis with historical trends, forecasting, and geographical visualization using modern charting libraries.",
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    image: "/weather-analytics-dashboard-charts.jpg",
    githubUrl: "https://github.com/username/weather",
    liveUrl: "https://weather-analytics.com",
    featured: false,
  },
  {
    id: "04",
    title: "Mobile Fitness App",
    category: "Mobile",
    description: "Cross-platform fitness tracking application",
    longDescription:
      "Built a comprehensive fitness tracking app with workout planning, progress tracking, social features, and integration with wearable devices.",
    technologies: ["React Native", "Firebase", "Redux", "Expo", "TypeScript"],
    image: "/fitness-app-interface.png",
    githubUrl: "https://github.com/username/fitness",
    liveUrl: "https://fitness-app.com",
    featured: false,
  },
]

const categories = ["All", "Full Stack", "Frontend", "Data Visualization", "Mobile"]

export function ProjectsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [expandedProject, setExpandedProject] = useState<string | null>(null)

  const filteredProjects = projects.filter(
    (project) => selectedCategory === "All" || project.category === selectedCategory,
  )

  return (
    <section className="relative min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and technical expertise across various domains
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={cn(
                "group relative overflow-hidden rounded-lg border-2 transition-all duration-500",
                "bg-card/50 backdrop-blur-sm",
                expandedProject === project.id
                  ? "border-accent shadow-2xl shadow-accent/20 md:col-span-2"
                  : "border-border hover:border-primary hover:shadow-lg hover:shadow-primary/20",
                project.featured && "ring-2 ring-accent/30",
              )}
            >
              {/* Project number */}
              <div className="absolute top-4 left-4 z-10 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                {project.id}
              </div>

              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-accent rounded-full text-accent-foreground text-xs font-bold">
                  FEATURED
                </div>
              )}

              {/* Project image */}
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent"></div>
              </div>

              {/* Project content */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent font-mono text-sm">{project.category}</span>
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {expandedProject === project.id ? project.longDescription : project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted rounded-full text-muted-foreground text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                  className="w-full mt-4 py-2 px-4 rounded-lg border border-border hover:border-primary hover:bg-primary/10 text-foreground transition-colors"
                >
                  {expandedProject === project.id ? "Show Less" : "Learn More"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
