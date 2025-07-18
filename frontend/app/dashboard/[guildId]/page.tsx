"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageLayout } from "@/components/page-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, AudioLines, ChartBar, Instagram } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface Channel {
  id: string;
  name: string;
}

interface InstagramUser {
  username: string;
  customMessage?: string;
  lastPostCode?: string;
  lastStoryIds?: string[];
}

interface InstagramData {
  guildId: string;
  channelId: string;
  usernames: InstagramUser[];
}

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
  const [emojis, setEmojis] = useState<any[]>([]);
  const [emojiSearch, setEmojiSearch] = useState("");
  const [emojiLoading, setEmojiLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("moonlight_token") : null;
  const headers: HeadersInit | undefined = token ? { Authorization: `Bearer ${token}` } : undefined;
  const [currentPage, setCurrentPage] = useState(1);
  const emojisPerPage = 100;
  const [isPremium, setIsPremium] = useState(false);
  const [showIGModal, setShowIGModal] = useState(false);
  const [igData, setIgData] = useState<InstagramData | null>(null);
  const [selectedChannel, setSelectedChannel] = useState(igData?.channelId || "");
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    if (igData?.channelId) {
      setSelectedChannel(igData.channelId);
    }
  }, [igData]);


  useEffect(() => {
    async function fetchChannels() {
      try {
        const res = await fetch(`https://api.moonlightbot.xyz/api/servers/channels/${guildId}`);
        const data = await res.json();
        if (data.success) {
          setChannels(data.channels);
        }
      } catch (err) {
        console.error("Failed to fetch channels:", err);
      }
    }

    fetchChannels();
  }, [guildId]);

  useEffect(() => {
    async function fetchIGInfo() {
      try {
        const [igRes, premiumRes] = await Promise.all([
          fetch(`https://api.moonlightbot.xyz/api/instagram/${guildId}`),
          fetch(`https://api.moonlightbot.xyz/api/premium/${guildId}`)
        ]);

        const igJson = await igRes.json();
        const premiumJson = await premiumRes.json();

        if (igJson.success) setIgData(igJson.data);
        if (premiumJson.success) setIsPremium(premiumJson.data.isPremium);
      } catch (err) {
        console.error("Error fetching Instagram data:", err);
      }
    }

    fetchIGInfo();
  }, [guildId]);

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

  const filteredEmojis = emojis.filter((e) =>
    e.name.toLowerCase().includes(emojiSearch.toLowerCase())
  );
  const indexOfLastEmoji = currentPage * emojisPerPage;
  const indexOfFirstEmoji = indexOfLastEmoji - emojisPerPage;
  const paginatedEmojis = filteredEmojis.slice(indexOfFirstEmoji, indexOfLastEmoji);
  const totalPages = Math.ceil(filteredEmojis.length / emojisPerPage);


  useEffect(() => {
    async function fetchEmojis() {
      setEmojiLoading(true);
      try {
        const res = await fetch("https://api.moonlightbot.xyz/api/emojis", { headers });
        const data = await res.json();
        if (data.success) {
          const sorted = data.emojis.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          setEmojis(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch emojis:", err);
      } finally {
        setEmojiLoading(false);
      }
    }

    fetchEmojis();
  }, []);

  const handleAddEmoji = async (emoji: any) => {
    try {
      const res = await fetch(
        `https://api.moonlightbot.xyz/api/servers/${guildId}/emoji`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ emoji }),
        }
      );
      const data = await res.json();
      if (!data.success) {
        alert("Failed to add emoji.");
      } else {
        alert("Emoji added!");
      }
    } catch (err) {
      console.error("Add emoji error:", err);
    }
  };

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

          <TabsContent value="emojis" className="space-y-4">
            <div className="flex justify-between items-center">
              <Input
                placeholder="Search emojis..."
                value={emojiSearch}
                onChange={(e) => setEmojiSearch(e.target.value)}
                className="w-full max-w-7xl mx-auto bg-gray-800 border-gray-700 text-white"
              />
            </div>

            {emojiLoading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : (
              <div className="grid grid-cols-8 gap-4">
                {paginatedEmojis.map((emoji) => (
                  <div
                    key={emoji.id}
                    className="flex flex-col items-center p-2 border border-gray-700 rounded-xl bg-gray-900/60"
                  >
                    <img src={emoji.url} alt={emoji.name} className="w-10 h-10" />
                    <p className="text-white text-xs mt-1">{emoji.name}</p>
                    <Button
                      onClick={() => handleAddEmoji(emoji)}
                      className="text-xs mt-2 bg-[#FDFBD4] text-black hover:bg-[#f2f0ef]"
                    >
                      + Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center gap-2 mt-4">
              <Button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Previous
              </Button>
              <span className="text-white text-sm flex items-center px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="bg-gray-700 text-white hover:bg-gray-600"
              >
                Next
              </Button>
            </div>
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
                  ) : confirmingCounter ? (
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
              <Card className="bg-gray-900/50 border border-gray-800 shadow-sm rounded-xl">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Instagram className="w-8 h-8 text-white" />s
                    <div>
                      <CardTitle className="text-white text-base">Instagram</CardTitle>
                      <CardDescription className="text-white/60 text-sm">
                        Auto-post new Instagram posts & stories from selected users to a channel.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowIGModal(true)}
                    className="w-full h-8 text-sm bg-gray-800 text-white hover:bg-gray-700 font-medium"
                  >
                    {igData ? "Edit Settings" : "+ Enable"}
                  </Button>
                </CardContent>
              </Card>
              {showIGModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
                  <div className="bg-[#111827] w-full max-w-md mx-auto p-6 rounded-xl shadow-2xl">
                    <h2 className="text-white text-xl font-semibold mb-6">Instagram Settings</h2>

                    {/* Channel Dropdown */}
                    <div className="mb-5">
                      <label className="block text-sm text-white mb-1">Channel to Post In</label>
                      <select
                        value={selectedChannel}
                        onChange={(e) => setSelectedChannel(e.target.value)}
                        size={4}
                        className="w-full max-h-[160px] overflow-y-auto p-2 rounded bg-gray-800 text-white focus:outline-none"
                      >
                        {channels.map((ch) => (
                          <option key={ch.id} value={ch.id}>
                            #{ch.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Tracked Accounts */}
                    <div className="mb-5">
                      <label className="block text-sm text-white mb-2">
                        Tracked Accounts ({igData?.usernames?.length || 0}/{isPremium ? 5 : 1})
                      </label>
                      {[...Array(isPremium ? 5 : 1)].map((_, i) => (
                        <input
                          id={`ig-user-${i}`}
                          key={i}
                          defaultValue={igData?.usernames?.[i]?.username || ""}
                          placeholder={`Instagram Username ${i + 1}`}
                          className="w-full p-2 mb-2 rounded bg-gray-800 text-white focus:outline-none"
                        />
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => setShowIGModal(false)}
                        className="bg-gray-700 text-white hover:bg-gray-600"
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-[#FDFBD4] text-black hover:bg-[#f2f0ef]"
                        onClick={async () => {
                          const usernames = [...Array(isPremium ? 5 : 1)].map((_, i) => {
                            const input = document.getElementById(`ig-user-${i}`) as HTMLInputElement;
                            return input?.value?.trim() || "";
                          }).filter(Boolean).map(u => ({ username: u }));

                          const res = await fetch(`https://api.moonlightbot.xyz/api/instagram/${guildId}`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ channelId: selectedChannel, usernames })
                          });

                          const data = await res.json();
                          if (data.success) {
                            alert("Instagram settings saved.");
                            setIgData(data.data);
                            setShowIGModal(false);
                          } else {
                            alert("Failed to save settings.");
                          }
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}



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