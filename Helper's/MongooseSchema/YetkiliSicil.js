const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const ytpenal = mongoose.Schema({
guildID: String,
execID: String,
victimID: String,
dateNow: {type: Number, default: Date.now()},
activity: {type: Boolean, default: true},
Temporary: {type: Boolean, default: false},
Reason: String,
Type: String,
cezapuan: Number,
});

module.exports = mongoose.model("ytceza", ytpenal);
