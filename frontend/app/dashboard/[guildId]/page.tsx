"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ServerManagePage() {
  const { guildId } = useParams()
  const [loading, setLoading] = useState(true)
  const [prefix, setPrefix] = useState("")
  const [nickname, setNickname] = useState("")
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(`https://dolphin-app-2f7qd.ondigitalocean.app/api/servers/${guildId}`)
        const data = await res.json()

        if (data.success) {
          setPrefix(data.data.prefix || "!")
          setNickname(data.data.nickname || "")
          setEvents(data.data.events || [])
        }
      } catch (err) {
        console.error("Error fetching server config:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [guildId])

  const handleSave = async () => {
    await fetch(`https://dolphin-app-2f7qd.ondigitalocean.app/api/servers/${guildId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefix, nickname }),
    })

    alert("Settings saved!")
  }

  if (loading) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Loader2 className="h-10 w-10 animate-spin text-[#FDFBD4]" />
          <p className="text-white mt-4">Loading server config...</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="pt-32 md:pt-40 px-4 md:px-10 pb-10 space-y-6">
        <h1 className="text-white text-4xl font-extrabold mb-6">Manage Server</h1>

        <Tabs defaultValue="usage" className="w-full space-y-8">
          <TabsList className="grid grid-cols-6 rounded-xl border border-gray-800 bg-gray-900/70 p-1">
            <TabsTrigger
              value="usage"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Usage
            </TabsTrigger>
            <TabsTrigger
              value="emojis"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Emojis
            </TabsTrigger>
            <TabsTrigger
              value="tools"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Server Tools
            </TabsTrigger>
            <TabsTrigger
              value="roles"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Roles
            </TabsTrigger>
            <TabsTrigger
              value="plugins"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Plugins
            </TabsTrigger>
            <TabsTrigger
              value="leveling"
              className="data-[state=active]:bg-[#FDFBD4] data-[state=active]:text-black text-white font-semibold py-2 rounded-lg"
            >
              Leveling
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage" className="space-y-8">
            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Bot Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-white block mb-2 text-sm font-medium">Prefix</label>
                  <Input
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <label className="text-white block mb-2 text-sm font-medium">Nickname</label>
                  <Input
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <Button
                  onClick={handleSave}
                  className="bg-[#FDFBD4] text-black hover:bg-[#f2f0ef] font-semibold"
                >
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-white text-2xl font-bold">Recent Events</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {events.length > 0 ? (
                  events.map((event, i) => (
                    <div
                      key={i}
                      className="text-gray-300 text-sm border-b border-gray-700 py-2 last:border-none"
                    >
                      <span className="font-mono text-xs text-gray-500 mr-2">{event.timestamp}</span>
                      {event.description}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No recent events.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Placeholder content for other tabs */}
          <TabsContent value="emojis">
            <p className="text-gray-300">Emojis settings coming soon.</p>
          </TabsContent>

          <TabsContent value="tools">
            <p className="text-gray-300">Server Tools settings coming soon.</p>
          </TabsContent>

          <TabsContent value="roles">
            <p className="text-gray-300">Roles settings coming soon.</p>
          </TabsContent>

          <TabsContent value="plugins">
            <p className="text-gray-300">Plugins settings coming soon.</p>
          </TabsContent>

          <TabsContent value="leveling">
            <p className="text-gray-300">Leveling settings coming soon.</p>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
