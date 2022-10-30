const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = {
  name: "unjail", aliases: ["cezalıkaldır", "unjailed"],  category: "Penal", desc: "Kullanıcının Cezalısını Kaldıran Komut",
  execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if (!message.member.permissions.has("8") && !Server.jailStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!User) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.roles.cache.has(Server.jailedRole)) return message.reply(AutoReply.JailDisable).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(User.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    await User.roles.set("", `UnJail, Yetkili: ${message.author.tag}`)
    await User.roles.add(Server.unregisterRole, `UnJail, Yetkili: ${message.author.tag}`)
    message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} ${User} (\`${User.user.tag}\` - \`${User.id}\`) isimli kullanıcı, ${message.author} tarafından cezalıdan çıkarıldı.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    let mList = await Database.find({ activity: true, victimID: User.id, Type: "JAIL"})
    if (mList.length <= 0) return
    mList.forEach(d => {
      d.activity = false;
      d.Temporary = false
      d.save();
    });
  }
}