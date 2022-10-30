const mongoose = require("mongoose")
let Schema = mongoose.Schema;
const Settings = require("../Settings.json")
let schema = Schema({
    guildID: {
        type: Number,
        default: ""
    },
   userID: Number,
   CoinCount: Number,
   ruletGame: Number,
   yazıtureGame: Number,

})
module.exports = mongoose.model("funnygame", schema);
