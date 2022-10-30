const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const members = mongoose.Schema({
    Afk: {type: Boolean, default: false},
    Reason: String,
    datenow: {type: Number, default: Date.now()},
    memberID: String,
    uyarilar: Array
        
});

module.exports = mongoose.model("members", members);
