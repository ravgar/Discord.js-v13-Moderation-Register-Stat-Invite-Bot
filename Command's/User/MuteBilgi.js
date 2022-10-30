const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const moment = require("moment")
const Settings = require("../../Helper's/Settings.json")
const mbLimit = new Map();
const AutoReply = require("../../Helper's/AutoRepy")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
module.exports = { name: "mutebilgi", aliases: ["vmutebilgi", "cmutebilgi", "mb"],   category: "User", desc: "VoiceMute & ChatMute cezanızın bitmesine kalan süreyi görüntüleme komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
        if (Settings.mbLimit > 0 && mbLimit.has(message.author.id) && mbLimit.get(message.author.id) == Settings.mbLimit) return message.reply(`${AutoReply.mbLimit}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        Database.find({victimID: member.id, activity: true, Type: "VOICE-MUTE"}, async (err,res) => {
          res = res.reverse();
          let sesveri = res.map((x, index) => `[<@${x.execID}>] \`#${x.cezaID}]\` bitmesine \`${moment(x.finishDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kaldı. [\`${x.Reason}\`]`).slice(0,1) 
        
          Database.find({victimID: member.id, activity: true, Type: "CHAT-MUTE"}, async (err,res) => {
            res = res.reverse();
            let chatveri = res.map((x, index) => `[<@${x.execID}>] \`#${x.cezaID}]\` bitmesine \`${moment(x.finishDate - Date.now()).format("m [dakika,] s [saniye.]")}\` kaldı. [\`${x.Reason}\`]`).slice(0,1) 
  
          message.reply({ embeds: [embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_ses") || "Emoji Bulunamadı"} **Voice-Mute Bilgisi**
          Kullanıcının aktif olan voice mute bilgileri aşağıda belirtilmiştir.\n\n${sesveri.join(", \n") || "Aktif bir Voice-Mute ceza-i işlemin bulunmuyor."}
          **────────────────────**
          ${client.emojis.cache.find(x => x.name === "ravgar_mesaj") || "Emoji Bulunamadı"} **Chat-Mute Bilgisi**
          Kullanıcının aktif olan chat mute bilgileri aşağıda belirtilmiştir.\n\n${chatveri.join(", \n") || "Aktif bir Chat-Mute ceza-i işlemin bulunmuyor."}`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
        })
    })
    if (Settings.mbLimit > 0) { if (!mbLimit.has(message.author.id)) mbLimit.set(message.author.id, 1);
      else mbLimit.set(message.author.id, mbLimit.get(message.author.id) + 1);
      setTimeout(() => { if (mbLimit.has(message.author.id)) mbLimit.delete(message.author.id);}, 1000 * 60 * 15)};  
        
      
    }
}