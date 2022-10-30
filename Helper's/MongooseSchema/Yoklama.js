const mongoose = require('mongoose');

const yoklama = mongoose.Schema({
    guildID: String,
    Katılanlar: {type: Array, default: []},
    Katılmayanlar: {type: Array, default: []},
});

module.exports = mongoose.model("yoklama", yoklama);
