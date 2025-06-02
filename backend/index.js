// index.js
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const statsRouter = require("./routes/stats")
const { setupDiscordBot } = require("./lib/discord")

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Routes
app.use("/api/stats", statsRouter)

// Start server and bot
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`)
  await setupDiscordBot()
})