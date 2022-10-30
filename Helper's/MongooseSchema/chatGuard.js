const mongoose = require('mongoose');
const schema = mongoose.Schema({
    guildID: Number,
    userID: String,
    reklamEngel: { type: Boolean, default: true },
    küfürEngel: { type: Boolean, default: true },
    spamEngel: { type: Boolean, default: true },});
module.exports = mongoose.model("chatguardian", schema);
