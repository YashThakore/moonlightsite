const express = require("express");
const router = express.Router();
const Prefix = require("../models/prefix");
const { client } = require("../lib/discord");
const dbConnect = require("../lib/db");
const { AuditLogEvent } = require("discord.js");

function formatAuditDescription(entry) {
    const executor = entry.executor?.tag || "Unknown";
    const target = entry.target?.tag || entry.target?.username || entry.target?.name || "Unknown";

    switch (entry.action) {
        case AuditLogEvent.GuildUpdate:
            return `${executor} updated the server`;

        case AuditLogEvent.ChannelCreate:
            return `${executor} created channel ${target}`;
        case AuditLogEvent.ChannelUpdate:
            return `${executor} updated channel ${target}`;
        case AuditLogEvent.ChannelDelete:
            return `${executor} deleted channel ${target}`;

        case AuditLogEvent.ChannelOverwriteCreate:
            return `${executor} created permission overrides for ${target}`;
        case AuditLogEvent.ChannelOverwriteUpdate:
            return `${executor} updated permission overrides for ${target}`;
        case AuditLogEvent.ChannelOverwriteDelete:
            return `${executor} removed permission overrides for ${target}`;

        case AuditLogEvent.MemberKick:
            return `${executor} kicked ${target}`;
        case AuditLogEvent.MemberPrune:
            return `${executor} pruned inactive members`;
        case AuditLogEvent.MemberBanAdd:
            return `${executor} banned ${target}`;
        case AuditLogEvent.MemberBanRemove:
            return `${executor} unbanned ${target}`;
        case AuditLogEvent.MemberUpdate:
            return `${executor} updated member ${target}`;
        case AuditLogEvent.MemberRoleUpdate:
            return `${executor} updated roles for ${target}`;
        case AuditLogEvent.MemberMove:
            return `${executor} moved ${target} to another voice channel`;
        case AuditLogEvent.MemberDisconnect:
            return `${executor} disconnected ${target} from voice`;

        case AuditLogEvent.BotAdd:
            return `${executor} added bot ${target}`;

        case AuditLogEvent.RoleCreate:
            return `${executor} created role ${target}`;
        case AuditLogEvent.RoleUpdate:
            return `${executor} updated role ${target}`;
        case AuditLogEvent.RoleDelete:
            return `${executor} deleted role ${target}`;

        case AuditLogEvent.InviteCreate:
            return `${executor} created an invite`;
        case AuditLogEvent.InviteUpdate:
            return `${executor} updated an invite`;
        case AuditLogEvent.InviteDelete:
            return `${executor} deleted an invite`;

        case AuditLogEvent.WebhookCreate:
            return `${executor} created a webhook`;
        case AuditLogEvent.WebhookUpdate:
            return `${executor} updated a webhook`;
        case AuditLogEvent.WebhookDelete:
            return `${executor} deleted a webhook`;

        case AuditLogEvent.EmojiCreate:
            return `${executor} added emoji ${target}`;
        case AuditLogEvent.EmojiUpdate:
            return `${executor} updated emoji ${target}`;
        case AuditLogEvent.EmojiDelete:
            return `${executor} deleted emoji ${target}`;

        case AuditLogEvent.MessageDelete:
            return `${executor} deleted a message by ${target}`;
        case AuditLogEvent.MessageBulkDelete:
            return `${executor} bulk deleted messages in a channel`;
        case AuditLogEvent.MessagePin:
            return `${executor} pinned a message in ${entry.extra?.channel?.name || "a channel"}`;
        case AuditLogEvent.MessageUnpin:
            return `${executor} unpinned a message in ${entry.extra?.channel?.name || "a channel"}`;

        case AuditLogEvent.IntegrationCreate:
            return `${executor} created an integration`;
        case AuditLogEvent.IntegrationUpdate:
            return `${executor} updated an integration`;
        case AuditLogEvent.IntegrationDelete:
            return `${executor} deleted an integration`;

        case AuditLogEvent.StageInstanceCreate:
            return `${executor} created a stage instance`;
        case AuditLogEvent.StageInstanceUpdate:
            return `${executor} updated a stage instance`;
        case AuditLogEvent.StageInstanceDelete:
            return `${executor} deleted a stage instance`;

        case AuditLogEvent.StickerCreate:
            return `${executor} created sticker ${target}`;
        case AuditLogEvent.StickerUpdate:
            return `${executor} updated sticker ${target}`;
        case AuditLogEvent.StickerDelete:
            return `${executor} deleted sticker ${target}`;

        case AuditLogEvent.GuildScheduledEventCreate:
            return `${executor} created a scheduled event`;
        case AuditLogEvent.GuildScheduledEventUpdate:
            return `${executor} updated a scheduled event`;
        case AuditLogEvent.GuildScheduledEventDelete:
            return `${executor} deleted a scheduled event`;

        case AuditLogEvent.ThreadCreate:
            return `${executor} created thread ${target}`;
        case AuditLogEvent.ThreadUpdate:
            return `${executor} updated thread ${target}`;
        case AuditLogEvent.ThreadDelete:
            return `${executor} deleted thread ${target}`;

        case AuditLogEvent.ApplicationCommandPermissionUpdate:
            return `${executor} updated command permissions`;

        case AuditLogEvent.AutoModerationRuleCreate:
            return `${executor} created an AutoMod rule`;
        case AuditLogEvent.AutoModerationRuleUpdate:
            return `${executor} updated an AutoMod rule`;
        case AuditLogEvent.AutoModerationRuleDelete:
            return `${executor} deleted an AutoMod rule`;

        case AuditLogEvent.AutoModerationBlockMessage:
            return `AutoMod blocked a message`;
        case AuditLogEvent.AutoModerationFlagToChannel:
            return `AutoMod flagged a message to a channel`;
        case AuditLogEvent.AutoModerationUserCommunicationDisabled:
            return `AutoMod muted ${target}`;

        default:
            return `${executor} performed an unknown action (${entry.action})`;
    }
}

// GET current prefix and nickname
router.get("/:guildId", async (req, res) => {
    await dbConnect();
    const { guildId } = req.params;

    try {
        const guild = await client.guilds.fetch(guildId);
        const me = await guild.members.fetch(client.user.id);
        const nickname = me.nickname || me.user.username;

        const prefixDoc = await Prefix.findOne({ Guild: guildId });
        const prefix = prefixDoc ? prefixDoc.Prefix : ".";

        const fetchedLogs = await guild.fetchAuditLogs({ limit: 50 });
        const events = fetchedLogs.entries.map(entry => {
            const timestamp = entry.createdAt.toISOString().replace("T", " ").split(".")[0];

            return {
                timestamp,
                description: formatAuditDescription(entry),
            };
        });

        res.json({
            success: true,
            data: {
                prefix,
                nickname,
                events,
            }
        });
    } catch (err) {
        console.error("Error fetching server data:", err);
        res.status(500).json({ success: false, error: "Failed to fetch server data" });
    }
});

// POST updated prefix and nickname
router.post("/:guildId", async (req, res) => {
    await dbConnect();
    const { guildId } = req.params;
    const { prefix, nickname } = req.body;

    try {
        if (prefix) {
            await Prefix.findOneAndUpdate(
                { Guild: guildId },
                { Prefix: prefix },
                { upsert: true, new: true }
            );
        }

        if (nickname) {
            const guild = await client.guilds.fetch(guildId);
            const me = await guild.members.fetch(client.user.id);
            await me.setNickname(nickname);
        }

        res.json({ success: true });
    } catch (err) {
        console.error("Error saving server settings:", err);
        res.status(500).json({ success: false, error: "Failed to save settings" });
    }
});

router.post("/:guildId/emoji", authMiddleware, async (req, res) => {
  const { guildId } = req.params;
  const { emoji } = req.body;

  if (!emoji?.url || !emoji?.name) {
    return res.status(400).json({ success: false, error: "Missing emoji data." });
  }

  try {
    const guild = await client.guilds.fetch(guildId);

    if (!guild) return res.status(404).json({ success: false, error: "Guild not found." });

    const addedEmoji = await guild.emojis.create({
      name: emoji.name,
      attachment: emoji.url,
    });

    return res.json({
      success: true,
      emoji: {
        id: addedEmoji.id,
        name: addedEmoji.name,
        url: addedEmoji.url,
      },
    });
  } catch (err) {
    console.error("Emoji add error:", err);
    res.status(500).json({ success: false, error: "Failed to add emoji." });
  }
});

module.exports = router;
