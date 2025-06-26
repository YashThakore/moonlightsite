const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    name: String,
    guildId: String,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Jobs', JobSchema);
