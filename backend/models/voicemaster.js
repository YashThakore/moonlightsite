const mongoose = require('mongoose');

const activeChannelSchema = new mongoose.Schema({
    channelId: String,
    ownerId: String,
    channelLimit: Number,
    channelBitrate: Number,
    channelName: String,
});

const joinToCreateChannelSchema = new mongoose.Schema({
    guildId: String,
    channelId: String,
});

const voiceMasterSchema = new mongoose.Schema({
    guildId: String,
    defaultName: String,
    defaultBitrate: Number,
    defaultLimit: Number,
    joinToCreateChannelIds: [joinToCreateChannelSchema],
    activeChannels: [activeChannelSchema],
    setupFinished: { type: Boolean, default: false },
});

const VoiceMaster = mongoose.model('VoiceMaster', voiceMasterSchema);

module.exports = VoiceMaster;
