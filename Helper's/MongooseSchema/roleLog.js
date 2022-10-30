const mongoose = require("mongoose");
const roleLog = mongoose.Schema({
    Rol: String,
    ExecID: String,
    kisiID: String,
    emoji: String,
    date: {type: Number, default: Date.now()},
    victimID: String
    
});
module.exports = mongoose.model("rollog", roleLog);
