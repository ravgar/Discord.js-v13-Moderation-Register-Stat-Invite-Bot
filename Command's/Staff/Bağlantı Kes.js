const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const voicekickLimit = new Map();
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "kes", aliases: ["bağlantıkes", "bkes" ],  category: "Staff", desc: "Kullanıcıyı Ses Kanalından Atma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings.voicekickLimit > 0 && voicekickLimit.has(message.author.id) && voicekickLimit.get(message.author.id) == Settings.voicekickLimit) return message.reply(`${AutoReply.voicekickLimit}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!User) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.voice.channel) return message.reply(AutoReply.seskanalındadegilKes).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(Settings["Client.Bot.Footer"]).setColor("ORANGE");
    message.channel.send({ embeds: [Embed.setDescription(`${User} adlı üyenin ses bağlantısı başarılı bir şekilde kesildi.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 25000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    User.voice.disconnect()
    if (Settings.voicekickLimit > 0) { if (!voicekickLimit.has(message.author.id)) voicekickLimit.set(message.author.id, 1);
      else voicekickLimit.set(message.author.id, voicekickLimit.get(message.author.id) + 1);
      setTimeout(() => { if (voicekickLimit.has(message.author.id)) voicekickLimit.delete(message.author.id);}, 1000 * 60 * 60)};    }}

    
    