"use client"

import { useState, useEffect } from "react"
import { useLiveStats } from "@/hooks/use-live-stats"
import { AnimatedCounter   } from "@/components/animated-counter"
import { GuildCarousel } from "@/components/guild-carousel"
import { Server, Users, Wifi, WifiOff, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LiveStatsSection() {
  const { stats, loading, error, lastUpdated, isConnected } = useLiveStats()
  const [timeAgo, setTimeAgo] = useState("")

  // Update "Updated X ago" every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (!lastUpdated) {
        setTimeAgo("Never")
        return
      }

      const now = new Date()
      const diffMs = now.getTime() - lastUpdated.getTime()
      const diffSeconds = Math.floor(diffMs / 1000)

      if (diffSeconds === 0) setTimeAgo("just now")
      else if (diffSeconds < 60) setTimeAgo(`${diffSeconds}s ago`)
      else if (diffSeconds < 3600) setTimeAgo(`${Math.floor(diffSeconds / 60)}m ago`)
      else setTimeAgo(lastUpdated.toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [lastUpdated])

  if (error && !stats) {
    return (
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-md mx-auto bg-red-900/20 border border-red-800 rounded-lg p-6">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-red-400 mb-2">Connection Error</h3>
            <p className="text-gray-400 text-sm mb-4">{error}</p>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-red-700 text-red-400 hover:bg-red-900/30"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative z-10 py-20 px-4">
      <div className="container mx-auto">
        {/* Live Status Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-8">
          <div className="flex items-center space-x-2 bg-gray-900/50 border border-gray-800 rounded-full px-4 py-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <span className="text-sm text-gray-400">
              {isConnected ? "Live Stats" : "Disconnected"}
              {lastUpdated && ` • Updated ${timeAgo}`}
            </span>
            {error && <AlertCircle className="h-4 w-4 text-yellow-500" title={error} />}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mb-16">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Server className="h-8 w-8 text-[#FDFBD4]" />
              <div>
                <div className="text-4xl font-bold text-[#FDFBD4]">
                  {loading ? (
                    <div className="animate-pulse bg-gray-700 h-10 w-24 rounded mx-auto" />
                  ) : (
                    <>
                      <AnimatedCounter   value={stats?.serverCount || 0} />
                      <span>+</span>
                    </>
                  )}
                </div>
                <div className="text-gray-400 text-lg">Guilds</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <Users className="h-8 w-8 text-[#FDFBD4]" />
              <div>
                <div className="text-4xl font-bold text-[#FDFBD4]">
                  {loading ? (
                    <div className="animate-pulse bg-gray-700 h-10 w-24 rounded mx-auto" />
                  ) : (
                    <>
                      <AnimatedCounter   value={stats?.userCount || 0} />
                      <span>+</span>
                    </>
                  )}
                </div>
                <div className="text-gray-400 text-lg">Users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Guilds Carousel */}
        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-700 h-8 w-48 rounded mx-auto" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-700 h-32 rounded-lg" />
              ))}
            </div>
          </div>
        ) : (
          <GuildCarousel guilds={stats?.topGuilds || []} isConnected={isConnected} />
        )}
      </div>
    </section>
  )
}
