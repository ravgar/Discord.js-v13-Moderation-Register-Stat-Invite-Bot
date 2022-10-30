const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const yetkilial = mongoose.Schema({
    guildID: String,
    userID: String,
execID: String,
victimID: String,
Kullanilar: Array,
YetkiTürü: String,
Yetkilicik: { type: Array, default: [] },
date: {type: Number, default: Date.now()},
ToplamTagli: {type: Number, default: 0},
activity: { type: Boolean, default: true },


});

module.exports = mongoose.model("yetkilial", yetkilial);
