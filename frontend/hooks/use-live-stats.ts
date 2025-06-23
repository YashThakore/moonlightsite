"use client"

import { useState, useEffect, useCallback } from "react"

interface Guild {
  id: string
  name: string
  icon: string | null
  memberCount: number
}

interface StatsResponse {
  success: boolean
  error?: string
  data: {
    serverCount: number
    userCount: number
    topGuilds: Guild[]
    lastUpdated: string
  }
}

interface UseLiveStatsReturn {
  stats: StatsResponse["data"] | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  isConnected: boolean
}

export function useLiveStats(): UseLiveStatsReturn {
  const [stats, setStats] = useState<StatsResponse["data"] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      const response = await fetch("https://dolphin-app-2f7qd.ondigitalocean.app/api/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      })

      const data: StatsResponse = await response.json()

      if (data.success) {
        setStats(data.data)
        setLastUpdated(new Date(data.data.lastUpdated))
        setError(null)
        setIsConnected(true)
      } else {
        setError(data.error || "Failed to fetch stats")
        setIsConnected(false)

        if (data.data) {
          setStats(data.data)
          setLastUpdated(new Date(data.data.lastUpdated))
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Network error"
      setError(errorMessage)
      setIsConnected(false)
      console.error("Error fetching stats:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [fetchStats])

  return {
    stats,
    loading,
    error,
    lastUpdated,
    isConnected,
  }
}
