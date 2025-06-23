"use client"

import { useEffect, useRef, useState } from "react"
import { Users } from "lucide-react"

interface Guild {
  id: string
  name: string
  icon: string | null
  memberCount: number
}

interface GuildCarouselProps {
  guilds: Guild[]
  isConnected: boolean
}

export function GuildCarousel({ guilds }: GuildCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(true)

  const duplicatedGuilds = [...guilds, ...guilds]
  const scrollPosition = useRef(0)

  useEffect(() => {
    let animationFrame: number

    const step = () => {
      if (!scrollRef.current) return

      scrollPosition.current += 0.5
      const maxScroll = scrollRef.current.scrollWidth / 2

      if (scrollPosition.current >= maxScroll) {
        scrollPosition.current = 0
      }

      scrollRef.current.style.transform = `translateX(-${scrollPosition.current}px)`
      animationFrame = requestAnimationFrame(step)
    }

    if (isScrolling) {
      animationFrame = requestAnimationFrame(step)
    }

    return () => cancelAnimationFrame(animationFrame)
  }, [isScrolling])

  return (
    <div
      className="relative w-full max-w-5xl mx-auto overflow-hidden py-6"
      ref={containerRef}
      onMouseEnter={() => setIsScrolling(false)}
      onMouseLeave={() => setIsScrolling(true)}
    >
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />

      <div
        className="flex items-center whitespace-nowrap"
        ref={scrollRef}
        style={{
          willChange: "transform",
          transition: "none",
        }}
      >
        {duplicatedGuilds.map((guild, index) => (
          <div key={`${guild.id}-${index}`} className="flex flex-col items-center justify-center text-center px-4">
            <img
              src={guild.icon || "/placeholder.svg?height=48&width=48"}
              alt={guild.name}
              className="w-14 h-14 rounded-full object-cover mb-2"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=48&width=48"
              }}
            />
            <div className="text-white text-sm font-semibold">{guild.name}</div>
            <div className="text-gray-400 text-xs flex items-center gap-1">
              <Users className="h-3 w-3" />
              {guild.memberCount.toLocaleString()} members
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
