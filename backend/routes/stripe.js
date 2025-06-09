// routes/stripeWebhook.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const bodyParser = require("body-parser");

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

    console.log("✅ Received checkout.session.completed event");
    console.log("🔍 Full session object:\n", JSON.stringify(session, null, 2));

    return res.status(200).send("Logged session data.");
  }

  res.status(200).json({ received: true });
});

module.exports = router;
