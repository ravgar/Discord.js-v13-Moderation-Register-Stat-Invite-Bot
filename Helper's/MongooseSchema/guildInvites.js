const mongoose = require('mongoose');

let invites = new mongoose.Schema({
    guildID: String,
    invites: { type: Map, default: new Map() }
});

module.exports = mongoose.model('guildInvites', invites);

