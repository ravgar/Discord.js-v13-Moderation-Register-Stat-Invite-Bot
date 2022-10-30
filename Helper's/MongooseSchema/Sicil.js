const mongoose = require("mongoose");
const guildLess = mongoose.Schema({

    _id: String,
    voicemute: Boolean,
    reason: String,
    date: Number,
    cno: Number

});
module.exports = mongoose.model("voicemutes", guildLess);
