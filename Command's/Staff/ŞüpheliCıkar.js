const Database = require("../../Helper's/MongooseSchema/Registeryy")
const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const moment = require("moment")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "süphelicıkar", aliases: ["spcıkar"],  category: "Staff", desc: "Süphelide Bulunan Kullanıcıyı Şüpheliden Çıkarma",
execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.regisyterStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!message.channel.id.includes(Server.registerChannel)) return message.reply("Bu komutu yanlızca register kanalında kullanabilirsin.").then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(Member.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!Member.roles.cache.has(Server.suspiciousRole)) return message.reply(AutoReply.SüpheliDegil).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    if (Member === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Member.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!Member.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Member.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(Server.sunucuTag && Member.user.username.includes(Server.sunucuTag)) Member.roles.add(Server.familyRole).catch();
    Member.roles.set("")
    await Member.roles.add(Server.unregisterRole)
    Database.findOne({guildID: message.guild.id, victimID: Member.id}, (err, res) => {
        if(!res) {
        new Database({guildID: message.guild.id, victimID: Member.id, nicknames: [{isimler: Member.displayName, rol: `Şüpheli Çıkartma`, execID: message.author.id, date: Date.now()}]}).save()
        } else {
        res.nicknames.push({isimler: Member.displayName,rol: `Şüpheli Çıkartma`, execID: message.author.id, date: Date.now()})
        res.save()}})
        await Database.findOneAndUpdate({ guildID: message.guild.id, execID: message.author.id }, { $inc: { erkek: 0, kari: 1 } }, { upsert: true });
        
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
    message.reply({ embeds: [Embed.setDescription(`${Member} adlı kullanıcı **Şüpheli hesap** kategorisinden çıkarıldı`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    }
}