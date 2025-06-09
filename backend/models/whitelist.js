const mongoose = require('mongoose');

const whitelistSchema = new mongoose.Schema({
  users: {
    type: [String], // Array of user IDs
    default: [],
  },
  servers: {
    type: [String], // Array of server IDs
    default: [],
  },
});

const Whitelist = mongoose.models.Whitelist || mongoose.model('Whitelist', whitelistSchema);
module.exports = Whitelist;
