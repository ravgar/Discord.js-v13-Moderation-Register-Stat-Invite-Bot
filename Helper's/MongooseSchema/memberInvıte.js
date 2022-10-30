const mongoose = require('mongoose');

let invites = new mongoose.Schema({
    guildID: String,
    members: { type: Map, default: new Map() }
});

module.exports = mongoose.model('invitesssss', invites);
