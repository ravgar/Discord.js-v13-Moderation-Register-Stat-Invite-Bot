const mongoose = require("mongoose")
let Schema = mongoose.Schema;
const Settings = require("../Settings.json")
let serverSettings = Schema({
    guildID: {
        type: Number,
        default: ""
    },
voiceMuteLog: {type: String, default: ""},
sunucuTag: {type: String, default: ""},
sunucuTag2: {type: String, default: ""},
chatMuteLog: {type: String, default: ""},
banLog: {type: String, default: ""},
jailLog: {type: String, default: ""},
guardLog: {type: String, default: ""},
rolAlmaChannel: {type: String, default: ""},
chatChannel: {type: String, default: ""},
registerChannel: {type: String, default: ""},
inviteLogChannel: {type: String, default: ""},
cezapuanLog: {type: String, default: ""},
kurallarchannel: {type: String, default: ""},
basvuruLog: {type: String, default: ""},
basvuruChannel: {type: String, default: ""},
denetimLog: {type: String, default: ""},
komutChannels: {type: Array, default: ""},
BotSes: {type: String, default: ""},
rolsecimChannel: {type: String, default: ""},
kpanelChannel: {type: String, default: ""},
yönetimRoles: {type: Array, default: ""},
ownerRoles: {type: Array, default: ""},
meetingChannel: {type: String, default: ""},
katılıdRol: {type: String, default: ""},
mazeretliRol: {type: String, default: ""},

ilkyetkiler: {type: Array, default: ""},
ikinciyetkiler: {type: Array, default: ""},
ucuncuyetkiler: {type: Array, default: ""},

tagLog: {type: String, default: ""},
yttagLog: {type: String, default: ""},

regisyterStaff: {type: Array, default: ""},
voiceMuteStaff: {type: Array, default: ""},
chatMuteStaff: {type: Array, default: ""},
jailStaff: {type: Array, default: ""},
banStaff: {type: Array, default: ""},
transportStaff: {type: String, default: ""},
botCommand: {type: String, default: ""},
yetkialımdm: {type: String, default: ""},
rolverYasaklıRoller: {type: Array, default: ""},

familyRole: {type: String, default: ""},
manRole: {type: Array, default: ""},
womanRole: {type: Array, default: ""},
unregisterRole: {type: String, default: ""},
boosterRole: {type: String, default: ""},
specialRole: {type: String, default: ""},

mutedRole: {type: String, default: ""},
vmutedRole: {type: String, default: ""},
jailedRole: {type: String, default: ""},
bannedTagRole: {type: String, default: ""},
suspiciousRole: {type: String, default: ""},
clownRole: {type: String, default: ""},
EventsRole: {type: String, default: ""},
GiveawaRole: {type: String, default: ""},

tagliAlim: {type: Boolean, default: false },
yenihesapkontrol: {type: Boolean, default: false },
yasaklıtagkontro: {type: Boolean, default: false },

renkYesil: {type: String, default: ""},
renkKırmızı: {type: String, default: ""},
renkSarı: {type: String, default: ""},
renkMor: {type: String, default: ""},
renkTuruncu: {type: String, default: ""},
renkKahverengi: {type: String, default: ""},

publicCategory: {type: String, default: ""},
RegisterCategory: {type: String, default: ""},
solvingterapiCategory: {type: String, default: ""},
privateCategory: {type: String, default: ""},
streamerCategory: {type: String, default: ""},
vkdcCategory: {type: String, default: ""},


})
module.exports = mongoose.model("setup", serverSettings);
