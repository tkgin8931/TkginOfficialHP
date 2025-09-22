"use client"

import { useState } from "react"
import { Github, Mail, MapPin, Newspaper, ExternalLink } from "lucide-react"

export function ProfileInfo() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null)

  const socialLinks = [
    {
      id: "github",
      icon: Github,
      label: "GitHub",
      url: "https://github.com/tkgin8931/",
      username: "@takgin8931",
    },
    {
      id: "blog",
      icon: Newspaper,
      label: "Qitta",
      url: "",
      username: "takgin",
    },
  ]


  return (
    <section className="relative py-8 bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 border-2 border-accent/30 flex items-center justify-center mx-auto">
                <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">T.T</span>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-background rounded-full"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">takgin</h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
              A student studying web development.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Science Tokyo, Japan</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Available for hire</span>
              </div> */}
            </div>
          </div>

          {/* Social Links - 2つだけ中央寄せ */}
          <div className="grid grid-cols-2 gap-6 mb-16 justify-center mx-auto w-fit">
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 bg-card/50 bg-white text-black backdrop-blur-sm border border-border/50 rounded-xl hover:border-accent/50 transition-all duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredSocial(social.id)}
                  onMouseLeave={() => setHoveredSocial(null)}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                        hoveredSocial === social.id ? "bg-accent text-background" : "bg-accent/10 text-accent"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-black mb-1">{social.label}</h3>
                      <p className="text-sm text-muted-foreground">{social.username}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>

                  {hoveredSocial === social.id && (
                    <div className="absolute inset-0 bg-accent/5 rounded-xl pointer-events-none" />
                  )}
                </a>
              )
            })}
          </div>

          {/* Profile Stats */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {profileStats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 bg-card/30 backdrop-blur-sm border border-border/30 rounded-xl hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="text-3xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  )
}
