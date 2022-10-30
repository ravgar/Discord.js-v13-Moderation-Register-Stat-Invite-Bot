const mongoose = require("mongoose");
const datatTest = mongoose.Schema({
    _id: String,
    guildID: String,
    userID: String,
    Enabled: Boolean,
    Auth: String,
    Time: Number,
    LeftTime: Number 
});
module.exports = mongoose.model("datatTest", datatTest);
