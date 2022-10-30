const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const neredec = mongoose.Schema({
guildID: String,
userID: String,
date: {type: Number, default: Date.now()},});

module.exports = mongoose.model("neredec", neredec);
