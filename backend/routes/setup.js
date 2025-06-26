const express = require("express");
const router = express.Router();
const Job = require("../models/jobs");
const VoiceMaster = require("../models/voicemaster");
const dbConnect = require("../lib/db");

router.post("/api/setup/voicemaster", async (req, res) => {
    await dbConnect();

    const { guildId } = req.body;

    if (!guildId) return res.status(400).json({ success: false, error: "Missing guildId" });

    // Prevent duplicates
    const existing = await VoiceMaster.findOne({ guildId });
    if (existing?.setupFinished) {
        return res.json({ success: false, error: "Already set up" });
    }

    await Job.create({
        name: "setup:voicemaster",
        guildId,
    });

    res.json({ success: true });
});

router.get("/api/setup/voicemaster/:guildId", async (req, res) => {
    await dbConnect();

    const { guildId } = req.params;
    const config = await VoiceMaster.findOne({ guildId });

    res.json({ success: true, setupFinished: config?.setupFinished || false });
});

module.exports = router;
