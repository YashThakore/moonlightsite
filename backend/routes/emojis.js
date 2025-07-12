const express = require("express");
const router = express.Router();
const EmojiCache = require("../models/emojiCache");
const dbConnect = require("../lib/db");

router.get("/", async (req, res) => {
  try {
    await dbConnect();
    const all = await EmojiCache.find(); // all guilds
    const emojis = all.flatMap((doc) => doc.emojis);

    res.json({ success: true, emojis });
  } catch (err) {
    console.error("Emoji fetch error:", err);
    res.status(500).json({ success: false, error: "Server error." });
  }
});

module.exports = router;
