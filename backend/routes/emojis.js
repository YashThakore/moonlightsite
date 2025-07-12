const express = require("express");
const router = express.Router();
const authMiddleware = require("../lib/authMiddleware");
const client = require("../lib/discord");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const emojis = [];

    for (const [guildId, guild] of client.guilds.cache) {
      try {
        const guildEmojis = await guild.emojis.fetch();

        guildEmojis.forEach((emoji) => {
          emojis.push({
            id: emoji.id,
            name: emoji.name,
            animated: emoji.animated,
            guild: guild.name,
            url: `https://cdn.discordapp.com/emojis/${emoji.id}.${
              emoji.animated ? "gif" : "webp"
            }`,
          });
        });
      } catch (e) {
        console.warn(`Failed to fetch emojis for guild ${guildId}`);
      }
    }

    res.json({ success: true, emojis });
  } catch (err) {
    console.error("Emoji fetch error:", err);
    res.status(500).json({ success: false, error: "Server error." });
  }
});

module.exports = router;
