// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const statsRouter = require("./routes/stats");
const authRouter = require("./routes/auth");
const serversRouter = require("./routes/servers");
const { setupDiscordBot, client } = require("./lib/discord");
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Whitelist = require("./models/whitelist");
const { EmbedBuilder } = require("discord.js");

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PORT = process.env.PORT;
const ADMIN_ID = "969716767242977300";

// Must go FIRST — Stripe webhook uses raw body
app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("✅ Stripe webhook received!");
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error("❌ Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const serverId = session.custom_fields.find(f => f.key === "serverid")?.text?.value;
      const receiptUrl = session.payment_intent?.charges?.data[0]?.receipt_url;

      if (!serverId) {
        console.warn("⚠️ No serverid found in custom fields");
        return res.status(200).send("Missing serverid field.");
      }

      try {
        await mongoose.connect(process.env.MONGODB_URI);
        const whitelist = await Whitelist.findOne() || new Whitelist();

        if (!whitelist.servers.includes(serverId)) {
          whitelist.servers.push(serverId);
          await whitelist.save();
          console.log(`✅ Whitelisted server ${serverId}`);
        }

        let serverName = "Unknown";
        const guild = client.guilds.cache.get(serverId);
        if (guild) serverName = guild.name;

        const adminUser = await client.users.fetch(ADMIN_ID);
        if (adminUser) {
          const embed = new EmbedBuilder()
            .setTitle("✅ Server Whitelisted")
            .setColor("#00ff88")
            .addFields(
              { name: "Server Name", value: `${serverName}`, inline: true },
              { name: "Server ID", value: `\`${serverId}\``, inline: true }
            )
            .setDescription(receiptUrl ? `[🧾 View Stripe Receipt](${receiptUrl})` : "No receipt URL available.")
            .setTimestamp();

          await adminUser.send({ embeds: [embed] });
        }

        await mongoose.disconnect();
        return res.status(200).send("Server whitelisted and DM sent.");
      } catch (err) {
        console.error("❌ Error processing webhook:", err);
        return res.status(500).send("Internal Server Error");
      }
    }

    res.status(200).send("Event received.");
  }
);

// Now normal middlewares — after webhook
app.use(cors());
app.use(express.json());

// Other routes
app.use("/api/stats", statsRouter);
app.use("/api/auth", authRouter);
app.use("/api/servers", serversRouter);

// Start server and bot
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await setupDiscordBot();
});
