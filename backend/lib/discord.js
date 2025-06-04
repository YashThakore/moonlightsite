const { Client, GatewayIntentBits, Partials, Options } = require("discord.js")

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
    makeCache: Options.cacheWithLimits({
        GuildMemberManager: {
            maxSize: Infinity,
        },
    }),

})

let statsCache = {
    serverCount: 0,
    userCount: 0,
    topGuilds: [],
    lastUpdated: new Date(),
}

async function updateStats() {
    try {
        const guilds = client.guilds.cache.map((g) => g);
        const results = await Promise.all(
            guilds.map(async (guild) => {
                return {
                    id: guild.id,
                    name: guild.name,
                    icon: guild.iconURL({ dynamic: true }),
                    memberCount: guild.memberCount || 0,
                };
            })
        );

        const sorted = results.sort((a, b) => b.memberCount - a.memberCount);

        statsCache = {
            serverCount: results.length,
            userCount: results.reduce((acc, g) => acc + g.memberCount, 0),
            topGuilds: sorted.slice(0, 50),
            lastUpdated: new Date(),
        };
    } catch (err) {
        console.error("Error updating stats:", err);
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
    client,
    setupDiscordBot,
    getStats,
}