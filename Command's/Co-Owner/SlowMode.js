const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "slowmode", aliases: ["yasaşvamod", "slow-mode", "yavaş-mod"],  category: "Co-owner", desc: "Kanal Yavaş Modu Ayarlama Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let miktar = Number(args[0]);
    if (!miktar) return 
    message.channel.setRateLimitPerUser(miktar).catch(err => message.channel.send(`Bir hata oluştu! | ${err}`)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)
    message.reply(`${message.channel} kanalının yavaş modu **${miktar}** olarak değiştirildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
}}