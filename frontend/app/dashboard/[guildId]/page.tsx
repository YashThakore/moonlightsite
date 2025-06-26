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

  const [voicemasterStatus, setVoicemasterStatus] = useState<"idle" | "setting-up" | "done">("idle");

  useEffect(() => {
    async function fetchVMStatus() {
      const res = await fetch(`https://api.moonlightbot.xyz/api/setup/voicemaster/${guildId}`);
      const data = await res.json();
      if (data.setupFinished) {
        setVoicemasterStatus("done");
      }
    }
    fetchVMStatus();
  }, [guildId]);


  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const res = await fetch(`https://api.moonlightbot.xyz/api/servers/${guildId}`)
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
    await fetch(`https://api.moonlightbot.xyz/api/servers/${guildId}`, {
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
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-[#0F0F11] border border-gray-800 rounded-xl">
                <CardHeader className="flex items-center gap-3 px-4 pt-4 pb-2">
                  <div className="bg-blue-900/40 rounded-lg p-2">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12a3 3 0 003 3h1a3 3 0 000-6h-1a3 3 0 00-3 3z" />
                      <path d="M6 12a6 6 0 016-6h1a6 6 0 110 12h-1a6 6 0 01-6-6z" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle className="text-white text-base font-semibold">Temporary Channels</CardTitle>
                    <p className="text-xs text-gray-400">
                      Let members instantly create temp voice channels.
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="px-4 pb-4 pt-0">
                  <Button
                    disabled={voicemasterStatus !== "idle"}
                    className="w-full h-8 text-sm bg-yellow-300 text-black hover:bg-yellow-400 font-medium transition disabled:opacity-60"
                    onClick={async () => {
                      const confirmed = confirm("Are you sure you want to set up Temporary Channels?");
                      if (!confirmed) return;

                      setVoicemasterStatus("setting-up");

                      try {
                        const res = await fetch(`https://api.moonlightbot.xyz/api/setup/voicemaster/${guildId}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ guildId })
                        });

                        const data = await res.json();
                        if (!data.success) {
                          alert(data.error || "Failed to set up Voicemaster");
                          setVoicemasterStatus("idle");
                        } else {
                          const interval = setInterval(async () => {
                            const check = await fetch(`https://api.moonlightbot.xyz/api/setup/voicemaster/${guildId}`);
                            const result = await check.json();
                            if (result.setupFinished) {
                              clearInterval(interval);
                              setVoicemasterStatus("done");
                            }
                          }, 3000);
                        }
                      } catch (err) {
                        alert("Error triggering setup");
                        console.error(err);
                        setVoicemasterStatus("idle");
                      }
                    }}
                  >
                    {voicemasterStatus === "setting-up" ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" /> Setting up...
                      </span>
                    ) : voicemasterStatus === "done" ? (
                      "✅ Setup Complete"
                    ) : (
                      "+ Enable"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="leveling">
            <p className="text-gray-300">Leveling settings coming soon.</p>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}
