const { Client, GatewayIntentBits, Partials } = require("discord.js")

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessageTyping,
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildMember,
  ],
  allowedMentions: {
    parse: ["users"],
    repliedUser: false,
  },
  shards: "auto",
})

let statsCache = {
  serverCount: 0,
  userCount: 0,
  topGuilds: [],
  lastUpdated: new Date(),
}

async function updateStats() {
  try {
    const guilds = client.guilds.cache

    const results = await Promise.all(
      guilds.map(async (g) => {
        try {
          const guild = await g.fetch()
          return {
            id: guild.id,
            name: guild.name,
            icon:
              guild.iconURL({ dynamic: true }) ||
              "https://cdn.discordapp.com/embed/avatars/0.png",
            memberCount: guild.memberCount ?? 0,
          }
        } catch {
          return null
        }
      })
    )

    const validResults = results.filter((g) => g !== null)
    const sorted = validResults.sort((a, b) => b.memberCount - a.memberCount)

    statsCache = {
      serverCount: validResults.length,
      userCount: validResults.reduce((acc, g) => acc + g.memberCount, 0),
      topGuilds: sorted.slice(0, 50),
      lastUpdated: new Date(),
    }
  } catch (err) {
    console.error("Error updating stats:", err)
  }
}

async function setupDiscordBot() {
  client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`)
    updateStats()
    setInterval(updateStats, 5000)
  })

  await client.login(process.env.DISCORD_TOKEN)
}

function getStats() {
  return statsCache
}

module.exports = {
  setupDiscordBot,
  getStats,
}