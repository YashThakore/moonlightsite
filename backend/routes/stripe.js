const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Whitelist = require("../models/whitelist");
const { client } = require("../lib/discord");
const { EmbedBuilder } = require("discord.js");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const ADMIN_ID = "969716767242977300"; // Replace with your Discord user ID

router.use(bodyParser.raw({ type: "application/json" }));

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const sessionId = event.data.object.id;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["custom_fields", "payment_intent"],
      });

      const serverId = session.custom_fields.find(f => f.key === "serverid")?.text?.value;
      const receiptUrl = session.payment_intent?.charges?.data[0]?.receipt_url;

      if (!serverId) {
        console.warn("⚠️ No serverid found in custom fields");
        return res.status(200).send("Missing serverid field.");
      }

      await mongoose.connect(process.env.MONGODB_URI);
      const whitelist = await Whitelist.findOne() || new Whitelist();

      if (!whitelist.servers.includes(serverId)) {
        whitelist.servers.push(serverId);
        await whitelist.save();
        console.log(`✅ Whitelisted server ${serverId}`);
      }

      // Get server name if bot is in the guild
      let serverName = `Unknown`;
      const guild = client.guilds.cache.get(serverId);
      if (guild) serverName = guild.name;

      // Send DM to admin
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

  res.status(200).json({ received: true });
});

module.exports = router;
