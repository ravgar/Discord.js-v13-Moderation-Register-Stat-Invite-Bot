const mongoose = require("mongoose")
let Schema = mongoose.Schema;
const talentPerm = mongoose.Schema({
    guildID: String,
    komutAd: String,
    verilcekRol: Array,
    YetkiliRol: Array,
    EkleyenYetkili: String
});
module.exports = mongoose.model("talentPerm", talentPerm);
