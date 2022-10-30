const mongoose = require("mongoose")
let Schema = mongoose.Schema;
const inviteData = mongoose.Schema({
    _id: String,
    guildID: String,
    userID: String,
    authID: String,
    invTime: Number
});
module.exports = mongoose.model("inviterDatacik", inviteData);
