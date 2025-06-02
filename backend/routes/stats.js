const express = require("express")
const router = express.Router()
const { getStats } = require("../lib/discord")

router.get("/", (req, res) => {
  const stats = getStats()
  res.json({
    success: true,
    data: {
      ...stats,
      lastUpdated: stats.lastUpdated.toISOString(),
    },
  })
})

module.exports = router
