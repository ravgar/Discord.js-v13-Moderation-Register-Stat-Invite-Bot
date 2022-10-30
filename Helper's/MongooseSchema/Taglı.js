const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const tagli = mongoose.Schema({
guildID: String,
userID: String,
execID: String,
victimID: String,
Kullanilar: Array,
Taggeds: { type: Array, default: [] },
date: {type: Number, default: Date.now()},
ToplamTagli: {type: Number, default: 0},


});

module.exports = mongoose.model("tagli", tagli);
