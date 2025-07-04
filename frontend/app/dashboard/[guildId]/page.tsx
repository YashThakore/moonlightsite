"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, AudioLines, ChartBar } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function ServerManagePage() {
  const { guildId } = useParams()
  const [loading, setLoading] = useState(true)
  const [prefix, setPrefix] = useState("")
  const [nickname, setNickname] = useState("")
  const [events, setEvents] = useState<any[]>([])
  const [confirmingVM, setConfirmingVM] = useState(false);
  const [confirmingCounter, setConfirmingCounter] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")
  const [voicemasterStatus, setVoicemasterStatus] = useState<"idle" | "setting-up" | "done">("idle");
  const [counterStatus, setCounterStatus] = useState<"idle" | "setting-up" | "done">("idle");

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
    if (voicemasterStatus === "setting-up") {
      const interval = setInterval(async () => {
        const res = await fetch(`https://api.moonlightbot.xyz/api/setup/voicemaster/${guildId}`);
        const data = await res.json();
        if (data.setupFinished) {
          clearInterval(interval);
          setVoicemasterStatus("done");
          setConfirmingVM(false);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [voicemasterStatus, guildId]);


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

  useEffect(() => {
    async function fetchCounterStatus() {
      const res = await fetch(`https://api.moonlightbot.xyz/api/setup/counter/${guildId}`);
      const data = await res.json();
      if (data.setupFinished) {
        setCounterStatus("done");
      }
    }
    fetchCounterStatus();
  }, [guildId]);

  useEffect(() => {
    if (counterStatus === "setting-up") {
      const interval = setInterval(async () => {
        const res = await fetch(`https://api.moonlightbot.xyz/api/setup/counter/${guildId}`);
        const data = await res.json();
        if (data.setupFinished) {
          clearInterval(interval);
          setCounterStatus("done");
          setConfirmingCounter(false);
        }
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [counterStatus, guildId]);


  const handleSave = async () => {
    await fetch(`https://api.moonlightbot.xyz/api/servers/${guildId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefix, nickname }),
    })

    alert("Settings saved!")
  }

  const handleEnableVoicemaster = async () => {
    setVoicemasterStatus("setting-up")
    setErrorMsg("")

    try {
      const res = await fetch(
        `https://api.moonlightbot.xyz/api/setup/voicemaster/${guildId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guildId }),
        }
      )

      const data = await res.json()
      if (!data.success) {
        setErrorMsg(data.error || "Failed to set up Voicemaster")
        setVoicemasterStatus("idle")
        setConfirmingVM(false)
        return
      }
      // Polling is now handled exclusively by the useEffect hook
    } catch (err) {
      console.error(err)
      setErrorMsg("Error triggering setup")
      setVoicemasterStatus("idle")
      setConfirmingVM(false)
    }
  }

  const handleEnableCounter = async () => {
    setCounterStatus("setting-up");
    setErrorMsg("");

    try {
      const res = await fetch(
        `https://api.moonlightbot.xyz/api/setup/counter/${guildId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ guildId }),
        }
      );

      const data = await res.json();
      if (!data.success) {
        setErrorMsg(data.error || "Failed to set up Counter");
        setCounterStatus("idle");
        setConfirmingCounter(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Error triggering counter setup");
      setCounterStatus("idle");
      setConfirmingCounter(false);
    }
  };


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
            <div className="grid md:grid-cols-3 gap-6 pt-6">
              <Card className="bg-gray-900/50 border border-gray-800 shadow-sm rounded-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <AudioLines className="w-8 h-8 text-white" />
                    <div>
                      <CardTitle className="text-white text-base">Voicemaster</CardTitle>
                      <CardDescription className="text-white/60 text-sm">
                        Allow your members to create temporary voice channels in one click in your server
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {voicemasterStatus === "done" ? (
                    <Button disabled className="w-full h-8 text-sm bg-gray-600 text-white font-medium">
                      Enabled
                    </Button>
                  ) : voicemasterStatus === "setting-up" ? (
                    <Button disabled className="w-full h-8 text-sm bg-gray-700 text-white font-medium flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting Up
                    </Button>
                  ) : confirmingVM ? (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 h-8 text-sm bg-green-500 text-white hover:bg-green-600 font-medium"
                        onClick={handleEnableVoicemaster}
                      >
                        Confirm
                      </Button>
                      <Button
                        className="flex-1 h-8 text-sm bg-gray-700 text-white hover:bg-gray-600 font-medium"
                        onClick={() => setConfirmingVM(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full h-8 text-sm bg-gray-800 text-white hover:bg-gray-700 font-medium"
                      onClick={() => setConfirmingVM(true)}
                      disabled={voicemasterStatus !== "idle"}
                    >
                      + Enable
                    </Button>
                  )}


                  {errorMsg && <p className="text-sm text-red-400 mt-2">{errorMsg}</p>}
                </CardContent>
              </Card>
              <Card className="bg-gray-900/50 border border-gray-800 shadow-sm rounded-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <ChartBar className="w-8 h-8 text-white" />
                    <div>
                      <CardTitle className="text-white text-base">Server Counters</CardTitle>
                      <CardDescription className="text-white/60 text-sm">
                        Display live server statistics like members, bots, and total users in voice channels.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {counterStatus === "done" ? (
                    <Button disabled className="w-full h-8 text-sm bg-gray-600 text-white font-medium">
                      Enabled
                    </Button>
                  ) : counterStatus === "setting-up" ? (
                    <Button disabled className="w-full h-8 text-sm bg-gray-700 text-white font-medium flex items-center justify-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Setting Up
                    </Button>
                  ) : confirmingCounter  ? (
                    <div className="flex gap-2">
                      <Button
                        className="flex-1 h-8 text-sm bg-green-500 text-white hover:bg-green-600 font-medium"
                        onClick={handleEnableCounter}
                      >
                        Confirm
                      </Button>
                      <Button
                        className="flex-1 h-8 text-sm bg-gray-700 text-white hover:bg-gray-600 font-medium"
                        onClick={() => setConfirmingCounter(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full h-8 text-sm bg-gray-800 text-white hover:bg-gray-700 font-medium"
                      onClick={() => setConfirmingCounter(true)}
                      disabled={counterStatus !== "idle"}
                    >
                      + Enable
                    </Button>
                  )}

                  {errorMsg && <p className="text-sm text-red-400 mt-2">{errorMsg}</p>}
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