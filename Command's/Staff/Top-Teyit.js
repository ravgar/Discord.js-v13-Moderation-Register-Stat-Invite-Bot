const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/Registeryy")
const { table } = require("table")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "topteyit", aliases: ["top-teyit"],  category: "Staff", desc: "Kayıt Yapan Kullanıcıların Listesini Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8")&& !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))  && !message.member.roles.cache.has(Server.botCommand) && !Server.regisyterStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    let data = await Database.find({guildID: message.guild.id}).sort({ teyitler: "descending" });
    let list = data.filter(x => ((x.erkek + x.kari !== 0)) && (message.guild.members.cache.get(x.execID)) )
    message.channel.send({embeds: [Embed.setDescription(`**Sunucuda En Çok Kayıt Yapan 30 Kişi**; \n\n${list.length ? list.map((d, index) => `\`${index+1}.\` <@${d.execID}> | ${d.erkek + d.kari } ( Erkek:\`${d.erkek}\` Kadın: \`${d.kari}\`) ${d.execID == message.author.id ? "**(Siz)**": ""}`).splice(0, 30).join("\n") : "Database'de Görüntülenebilecek Veri Bulunamadı."} `)] }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
  }
  }

    
    