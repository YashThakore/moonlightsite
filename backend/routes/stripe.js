// routes/stripeWebhook.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const bodyParser = require("body-parser");
const dbConnect = require("../lib/db");
const Whitelist = require("../models/whitelist");


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to handle raw body (important for signature verification)
router.use(bodyParser.raw({ type: "application/json" }));

router.post("/webhook", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("⚠️ Webhook signature failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Read Server ID from custom_fields
    const serverId = session.custom_fields?.find((f) => f.key === "server_id")
      ?.text?.value;

    if (!serverId) {
      console.warn("Missing server ID from checkout");
      return res.status(400).send("Missing server ID");
    }

    console.log(`✅ Payment received for server ID: ${serverId}`);

    // Whitelist logic here
    try {
      // Example: update DB
      await dbConnect();
      await Whitelist.updateOne(
        {},
        { $addToSet: { servers: serverId } },
        { upsert: true }
      );

      return res.status(200).send("Server whitelisted!");
    } catch (e) {
      console.error("❌ Failed to update whitelist:", e);
      return res.status(500).send("Internal Server Error");
    }
  }

  res.status(200).json({ received: true });
});

module.exports = router;
