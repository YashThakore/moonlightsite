"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bot,
  Crown,
  ExternalLink,
  Loader2,
  LogOut,
  Settings,
} from "lucide-react"

interface User {
  id: string
  username: string
  discriminator: string
  avatar: string | null
  global_name: string | null
}

interface Guild {
  id: string
  name: string
  icon: string | null
  owner: boolean
  permissions: string
  features: string[]
  approximate_member_count?: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [authenticating, setAuthenticating] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [guilds, setGuilds] = useState<Guild[]>([])
  const [ownedGuildsWithoutBot, setOwnedGuildsWithoutBot] = useState<Guild[]>([])

  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("moonlight_user")
    const storedGuilds = localStorage.getItem("moonlight_guilds")
    const storedOwnedGuilds = localStorage.getItem("moonlight_owned_guilds")

    if (storedUser && storedGuilds) {
      try {
        setUser(JSON.parse(storedUser))
        setGuilds(JSON.parse(storedGuilds))
        if (storedOwnedGuilds) {
          setOwnedGuildsWithoutBot(JSON.parse(storedOwnedGuilds))
        }
        setLoading(false)
        return
      } catch {
        localStorage.removeItem("moonlight_user")
        localStorage.removeItem("moonlight_guilds")
        localStorage.removeItem("moonlight_owned_guilds")
      }
    }

    const code = typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("code")
      : null

    if (code) {
      setAuthenticating(true)
      fetch(`https://api.moonlightbot.xyz/api/auth/callback?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.user && Array.isArray(data.guilds)) {
            localStorage.setItem("moonlight_user", JSON.stringify(data.user))
            localStorage.setItem("moonlight_guilds", JSON.stringify(data.guilds))
            localStorage.setItem("moonlight_owned_guilds", JSON.stringify(data.owned_guilds_without_bot || []))
            setUser(data.user)
            setGuilds(data.guilds)
            setOwnedGuildsWithoutBot(data.owned_guilds_without_bot || [])
            window.history.replaceState(null, "", "/dashboard")
          } else {
            throw new Error("Invalid user or guilds data")
          }
        })
        .catch((err) => {
          console.error("OAuth error:", err)
          localStorage.removeItem("moonlight_user")
          localStorage.removeItem("moonlight_guilds")
          localStorage.removeItem("moonlight_owned_guilds")
          setUser(null)
          setGuilds([])
          setOwnedGuildsWithoutBot([])
        })
        .finally(() => {
          setLoading(false)
          setAuthenticating(false)
        })
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("moonlight_user")
    localStorage.removeItem("moonlight_guilds")
    localStorage.removeItem("moonlight_owned_guilds")
    setUser(null)
    setGuilds([])
    setOwnedGuildsWithoutBot([])
  }

  const handleLogin = () => {
    window.location.href = "https://api.moonlightbot.xyz/api/auth/login"
  }

  const getGuildIconUrl = (guild: Guild) => {
    return guild.icon
      ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=64`
      : "/placeholder.svg?height=64&width=64"
  }

  const hasManagePermissions = (permissions: string) => {
    const perms = Number.parseInt(permissions)
    return (perms & 0x20) === 0x20 || (perms & 0x8) === 0x8
  }

  const manageableGuilds = guilds.filter((g) => hasManagePermissions(g.permissions))

  if (loading || authenticating) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-[#FDFBD4]" />
          <p className="text-white mt-4">
            {authenticating ? "Authenticating with Discord..." : "Loading your dashboard..."}
          </p>
        </div>
      </PageLayout>
    )
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <Bot className="h-16 w-16 text-[#FDFBD4] mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Moonlight Dashboard</h1>
          <p className="text-gray-400 mb-6">Sign in to manage your servers</p>
          <Button onClick={handleLogin} className="bg-[#5865F2] text-white px-6 py-3">
            Login with Discord
          </Button>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="pt-32 md:pt-40 px-4 md:px-10 pb-10">
        <h1 className="text-white text-3xl font-bold mb-4">
          Welcome, {user.global_name || user.username}
        </h1>
        <p className="text-gray-400 mb-6">
          You can manage {manageableGuilds.length} server{manageableGuilds.length !== 1 ? "s" : ""}.
        </p>
        <Button onClick={handleLogout} className="border border-gray-600 text-gray-300 mb-8">
          <LogOut className="mr-2" />
          Logout
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manageableGuilds.map((guild) => (
            <Card key={guild.id} className="bg-gray-900/50 border border-gray-800 hover:border-[#FDFBD4]/50 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <img
                    src={getGuildIconUrl(guild)}
                    alt={guild.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-white text-lg truncate">{guild.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      {guild.owner && (
                        <Badge variant="secondary" className="bg-[#FDFBD4]/20 text-[#FDFBD4] text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          Owner
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF]"
                    onClick={() => router.push(`/dashboard/${guild.id}`)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configure
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => window.open(`https://discord.com/channels/${guild.id}`, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {ownedGuildsWithoutBot.length > 0 && (
          <>
            <h2 className="text-white text-xl font-bold mt-10 mb-4">Your servers without Moonlight</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ownedGuildsWithoutBot.map((guild) => (
                <Card key={guild.id} className="bg-gray-900/50 border border-gray-800 hover:border-[#FDFBD4]/50 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={getGuildIconUrl(guild)}
                        alt={guild.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-white text-lg truncate">{guild.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="bg-[#FDFBD4]/20 text-[#FDFBD4] text-xs">
                            <Crown className="h-3 w-3 mr-1" />
                            Owner
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button
                      size="sm"
                      className="bg-[#FDFBD4] text-[#030303] hover:bg-[#F2F0EF] w-full"
                      onClick={() => window.open(`https://discord.com/oauth2/authorize?client_id=809245562615758898&scope=bot%20applications.commands&permissions=8&guild_id=${guild.id}&redirect_uri=https://moonlightbot.xyz/dashboard&response_type=code`, "_blank")}
                    >
                      Add Moonlight
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

      </div>
    </PageLayout>
  )
}
