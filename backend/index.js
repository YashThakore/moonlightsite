// index.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const statsRouter = require("./routes/stats")
const authRouter = require("./routes/auth")
const serversRouter = require("./routes/servers")
const stripeWebhook = require('./routes/stripe');
const { setupDiscordBot } = require("./lib/discord")

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/stats", statsRouter)
app.use("/api/auth", authRouter)
app.use("/api/servers", serversRouter)
app.use('/stripe', stripeWebhook);

// Start server and bot
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)
  await setupDiscordBot()
})