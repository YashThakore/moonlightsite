const express = require("express");
const router = express.Router();
const dbConnect = require("../lib/db"); // ✅ Keep this
const Job = require("../models/jobs");
const VoiceMaster = require("../models/voicemaster");

// POST /api/setup/voicemaster/:guildId
router.post("/voicemaster/:guildId", async (req, res) => {
  await dbConnect(); // ✅ Ensure DB connection
  const { guildId } = req.params;

  try {
    await Job.create({ name: "setup:voicemaster", guildId });
    res.json({ success: true });
  } catch (err) {
    console.error("[Setup API] Failed to create setup job:", err);
    res.status(500).json({ success: false, error: "Failed to queue setup job" });
  }
});

// GET /api/setup/voicemaster/:guildId
router.get("/voicemaster/:guildId", async (req, res) => {
  await dbConnect(); // ✅ Ensure DB connection
  const { guildId } = req.params;

  try {
    const vm = await VoiceMaster.findOne({ guildId });
    res.json({ setupFinished: vm?.setupFinished || false });
  } catch (err) {
    console.error("[Setup API] Failed to check setup status:", err);
    res.status(500).json({ setupFinished: false });
  }
});

module.exports = router;
