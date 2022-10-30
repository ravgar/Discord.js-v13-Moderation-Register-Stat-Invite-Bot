const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const registery = mongoose.Schema({
guildID: String,
execID: String,
victimID: String,
erkek:{type: Number, default: 0},
kari: {type: Number, default: 0},
nicknames: Array,
Taggeds: { type: Array, default: [] },
userCIK: String,
Kullanilar: Array,
date: {type: Number, default: Date.now()},
Names: { type: Array, default: [] },

nicknamesss: String,

});

module.exports = mongoose.model("registery", registery);
