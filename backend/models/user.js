const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  discordId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  userData: { type: Object },
}, { timestamps: true });

module.exports = mongoose.model("userSiteData", UserSchema);
