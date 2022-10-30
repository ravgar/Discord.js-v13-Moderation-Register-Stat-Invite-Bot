const { Activity } = require('discord.js');
const mongoose = require('mongoose');

const komutengel = mongoose.Schema({
    guild: String,
    engel: Array

});

module.exports = mongoose.model("komutengel", komutengel);
