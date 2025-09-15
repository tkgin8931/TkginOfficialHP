"use client"

import { useState } from "react"
import { cn } from "../lib/utils"

interface AudioEquipmentCardProps {
  id: string
  number: string
  title: string
  description?: string
  isSelected?: boolean
  onSelect?: (id: string) => void
  className?: string
}

export function AudioEquipmentCard({
  id,
  number,
  title,
  description,
  isSelected = false,
  onSelect,
  className,
}: AudioEquipmentCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    onSelect?.(id)
  }

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-300 ease-out",
        "bg-card/80 backdrop-blur-sm rounded-lg p-6",
        "border-2 border-transparent",
        "hover:border-border hover:bg-card/90",
        "hover:scale-105 hover:shadow-xl",
        isSelected && "bg-accent border-accent shadow-2xl shadow-accent/20",
        isSelected && "text-accent-foreground",
        className,
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Number */}
      <div
        className={cn(
          "text-sm font-mono font-bold mb-3 transition-all duration-200",
          isSelected ? "text-accent-foreground" : "text-muted-foreground",
          (isHovered || isSelected) && "scale-110",
        )}
      >
        {number}
      </div>

      {/* Card Title */}
      <h3
        className={cn(
          "font-sans font-bold text-lg leading-tight transition-all duration-200",
          isSelected ? "text-accent-foreground" : "text-card-foreground",
          (isHovered || isSelected) && "scale-105",
        )}
      >
        {title}
      </h3>

      {/* Card Description */}
      {description && (
        <p
          className={cn(
            "text-sm mt-2 transition-opacity duration-200",
            isSelected ? "text-accent-foreground/80" : "text-muted-foreground",
            isHovered && "opacity-100",
          )}
        >
          {description}
        </p>
      )}

      {/* Hover Glow Effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-lg transition-opacity duration-300",
          "bg-gradient-to-br from-primary/10 to-accent/10",
          "opacity-0 group-hover:opacity-100",
          isSelected && "opacity-30",
        )}
      />
    </div>
  )
}
