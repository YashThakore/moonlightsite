const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    guildId: String,
    categoryId: String,
    allId: String,
    membersId: String,
    botsId: String,
    enabled: { type: Boolean, default: true },
    refreshRate: { type: Number, default: 5 },
    setupFinished: { type: Boolean, default: false },
});

module.exports = mongoose.model('servercounters', counterSchema);
