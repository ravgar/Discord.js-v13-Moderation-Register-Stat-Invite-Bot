const mongoose = require('mongoose');

const schema = mongoose.Schema({
    guildID: Number,
    userID: String,
    reklamCount: Number,
    küfürCount: Number,
    spamCount: Number,


});

module.exports = mongoose.model("chatguardiancount", schema);
