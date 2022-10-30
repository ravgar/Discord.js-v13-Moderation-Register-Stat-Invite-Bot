const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/YetkiliSicil")
const { table } = require("table")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "ytsicil", aliases: ["uyarılar"],  category: "Staff", desc: "Kullanıcıya Verilen Uyarıları Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    Database.find({victimID: member.id}, async (err, res) => {
        if (res.length <= 0) return message.reply(`${member} adlı kullanıcı hakkında ceza-i işlem verisi bulunamadı.`), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        let listed = res.reverse();
      let History = listed.map((x, index) => `\n \`${index + 1}.\` <@${x.execID}> tarafından **${x.Reason}** sebebiyle uyarıldı. [<t:${Math.floor(Math.floor(x.dateNow) / 1000)}:R>]`).slice(0,15) 
    message.reply({ embeds: [Embed.setDescription(`
    ${member} adlı üyenin ${res.length} uyarısı bulunmakta uyarıları sırasıyla aşağıda listelenmiştir.\n${History}`)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    });}}

    
    