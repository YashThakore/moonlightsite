const express = require("express");
const axios = require("axios");
const router = express.Router();
const { client } = require("../lib/discord");
const User = require("../models/user");

const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
const REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

router.get("/login", (req, res) => {
    const redirect = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
    )}&response_type=code&scope=identify%20guilds`;
    res.redirect(redirect);
});

router.get("/callback", async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send("Missing code");

    try {
        const tokenResponse = await axios.post(
            "https://discord.com/api/oauth2/token",
            new URLSearchParams({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "authorization_code",
                code,
                redirect_uri: REDIRECT_URI,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const { access_token, refresh_token, expires_in } = tokenResponse.data;
        const expires_at = new Date(Date.now() + expires_in * 1000);

        // Fetch user and their guilds
        const [userResponse, guildsResponse] = await Promise.all([
            axios.get("https://discord.com/api/users/@me", {
                headers: { Authorization: `Bearer ${access_token}` },
            }),
            axios.get("https://discord.com/api/users/@me/guilds", {
                headers: { Authorization: `Bearer ${access_token}` },
            }),
        ]);
        console.log("User:", userResponse.data);

        const botGuildIds = new Set(client.guilds.cache.map(g => g.id));

        const manageableGuilds = Array.isArray(guildsResponse.data)
            ? guildsResponse.data.filter(g => {
                const perms = parseInt(g.permissions)
                const hasAccess = (perms & 0x20) === 0x20 || (perms & 0x8) === 0x8
                return botGuildIds.has(g.id) && hasAccess
            })
            : [];

        const ownedGuildsWithoutBot = Array.isArray(guildsResponse.data)
            ? guildsResponse.data.filter(g => {
                return g.owner && !botGuildIds.has(g.id)
            })
            : [];

        // Save user in Mongo
        await User.findOneAndUpdate(
            { discordId: userResponse.data.id },
            {
                accessToken: access_token,
                refreshToken: refresh_token,
                expiresAt: expires_at,
                userData: userResponse.data
            },
            { upsert: true, new: true }
        );

        res.json({
            user: userResponse.data,
            guilds: manageableGuilds,
            owned_guilds_without_bot: ownedGuildsWithoutBot,
        });

    } catch (err) {
        console.error("OAuth2 Error:", err?.response?.data || err);
        res.status(500).send("OAuth2 callback failed");
    }
});

router.get("/refresh", async (req, res) => {
    const discordId = req.query.discordId;
    if (!discordId) return res.status(400).send("Missing discordId");

    try {
        const user = await User.findOne({ discordId });
        if (!user) return res.status(404).send("User not found");

        let accessToken = user.accessToken;
        let refreshToken = user.refreshToken;

        // If token expired → refresh it
        if (user.expiresAt < new Date()) {
            console.log(`Refreshing token for user ${discordId}...`);
            const tokenResponse = await axios.post(
                "https://discord.com/api/oauth2/token",
                new URLSearchParams({
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: "refresh_token",
                    refresh_token: refreshToken,
                    redirect_uri: REDIRECT_URI,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            accessToken = tokenResponse.data.access_token;
            refreshToken = tokenResponse.data.refresh_token;
            const expires_at = new Date(Date.now() + tokenResponse.data.expires_in * 1000);

            // Update user in DB
            user.accessToken = accessToken;
            user.refreshToken = refreshToken;
            user.expiresAt = expires_at;
            await user.save();
        }

        // Fetch user and their guilds
        const [userResponse, guildsResponse] = await Promise.all([
            axios.get("https://discord.com/api/users/@me", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
            axios.get("https://discord.com/api/users/@me/guilds", {
                headers: { Authorization: `Bearer ${accessToken}` },
            }),
        ]);

        const botGuildIds = new Set(client.guilds.cache.map(g => g.id));

        const manageableGuilds = Array.isArray(guildsResponse.data)
            ? guildsResponse.data.filter(g => {
                const perms = parseInt(g.permissions)
                const hasAccess = (perms & 0x20) === 0x20 || (perms & 0x8) === 0x8
                return botGuildIds.has(g.id) && hasAccess
            })
            : [];

        const ownedGuildsWithoutBot = Array.isArray(guildsResponse.data)
            ? guildsResponse.data.filter(g => {
                return g.owner && !botGuildIds.has(g.id)
            })
            : [];

        res.json({
            user: userResponse.data,
            guilds: manageableGuilds,
            owned_guilds_without_bot: ownedGuildsWithoutBot,
        });

    } catch (err) {
        console.error("OAuth2 Refresh Error:", err?.response?.data || err);
        res.status(500).send("OAuth2 refresh failed");
    }
});

module.exports = router;