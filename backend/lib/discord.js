const { Client, GatewayIntentBits, Partials } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // needed for memberCount
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
});

let statsCache = {
  serverCount: 0,
  userCount: 0,
  topGuilds: [],
  lastUpdated: new Date(),
};

function updateStats() {
  try {
    const guilds = client.guilds.cache.map((g) => {
      return {
        id: g.id,
        name: g.name,
        icon: g.iconURL({ dynamic: true }) || "https://cdn.discordapp.com/embed/avatars/0.png",
        memberCount: g.memberCount ?? 0,
      };
    });

    const sorted = guilds.sort((a, b) => b.memberCount - a.memberCount);

    statsCache = {
      serverCount: guilds.length,
      userCount: guilds.reduce((acc, g) => acc + g.memberCount, 0),
      topGuilds: sorted.slice(0, 50),
      lastUpdated: new Date(),
    };
  } catch (err) {
    console.error("Error updating stats:", err);
  }
}

async function setupDiscordBot() {
  client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
    updateStats();
    setInterval(updateStats, 5000);
  });

  await client.login(process.env.DISCORD_TOKEN);
}

function getStats() {
  return statsCache;
}

module.exports = {
  setupDiscordBot,
  getStats,
};
