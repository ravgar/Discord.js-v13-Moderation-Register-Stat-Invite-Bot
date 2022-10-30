const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "snipe", aliases: ["silinmişmesaj" ],  category: "Staff", desc: "Silinen Mesajı Görme Komutus",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let mesaj = client.snipe.get(message.channel.id)
    if(!mesaj) return message.reply(AutoReply.Mesayok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter("Silinme Tarih: " + moment(mesaj.createdTimestamp).locale("tr").format("ll") + ", " + moment(mesaj.createdTimestamp).locale("tr").format("LTS")).setColor("ORANGE");
    message.channel.send({ embeds: [Embed.setDescription(`${mesaj.content}`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 25000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)


  }
        }

    
    