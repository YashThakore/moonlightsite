const express = require("express");
const axios = require("axios");
const router = express.Router();
const { client } = require("../lib/discord");

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

        const { access_token } = tokenResponse.data;

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
        console.log("Raw guilds:", guildsResponse.data);


        const botGuildIds = new Set(client.guilds.cache.map(g => g.id));

        const manageableGuilds = Array.isArray(guildsResponse.data)
          ? guildsResponse.data.filter(g => {
              const perms = parseInt(g.permissions)
              const hasAccess = (perms & 0x20) === 0x20 || (perms & 0x8) === 0x8
              return botGuildIds.has(g.id) && hasAccess
            })
          : []        

        res.json({
            user: userResponse.data,
            guilds: manageableGuilds,
        });

    } catch (err) {
        console.error("OAuth2 Error:", err?.response?.data || err);
        res.status(500).send("OAuth2 callback failed");
    }
});

module.exports = router;