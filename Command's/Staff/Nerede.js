const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")
const { table } = require("table")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "nerde", aliases: ["sesbilgi", "nerede"],  category: "Staff", desc: "Kullanıcının Hangi Ses Kanalında Oldugunu Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 

  
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
    let mic = member.voice.selfMute == true ? `**Kapalı**` : `**Acık**`
    let hop = member.voice.selfDeaf == true ? `**Kapalı**` : `**Acık**`
    let txt = ""

    if(client.channelTime.has(member.id)) {
        let süresi = client.channelTime.get(member.id) 
        txt += "Kullanıcı **"+ member.voice.channel.name +"** kanalına \`"+ await client.turkishDate(Date.now() - süresi.time)+"\` önce giriş yapmış."
    } else {                                                                  // ${moment(süresi.time).startOf(Date.now()).fromNow()}
        txt += "Kullanıcının ses süresi bilgisi yok." 
    }

    message.reply({ embeds: [Embed.setDescription(`

    ${client.emojis.cache.find(x => x.name === "ravgar_member") || "Emoji Bulunamadı"} Kullanıcı: ${member}, Ses kanalı ${member.voice.channel}
    ───────────────
    ${client.emojis.cache.find(x => x.name === "ravgar_sescik") || "Emoji Bulunamadı"}  ${txt}
    ───────────────
    ${client.emojis.cache.find(x => x.name === "ravgar_ayar") || "Emoji Bulunamadı"}  Kullanıcının Mikrafonu **${mic}** , Kulaklığı **${hop}**`)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 
    
    
    
    

  

  }
        }

    
    