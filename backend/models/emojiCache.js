const mongoose = require("mongoose");

const emojiSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  emojis: [
    {
      id: String,
      name: String,
      animated: Boolean,
      url: String,
    },
  ],
});

module.exports = mongoose.model("EmojiCache", emojiSchema);
