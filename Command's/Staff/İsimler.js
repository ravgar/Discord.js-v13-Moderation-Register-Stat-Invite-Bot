const Database = require("../../Helper's/MongooseSchema/RegisteryNames")
const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const moment = require("moment")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "isimler", aliases: ["names"],  category: "Staff", desc: "Kullanıcının Geçmiş İsimlerini Görüntüleme Komutu",
execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const victim = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!victim) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    Database.findOne({guildID: message.guild.id, victimID: victim.id}, (err, res) => {
        if(!res) {
return message.reply("Kullanıcının isim geçmişi olmadığı için veri görüntüleyemedim.")
        } else {
            const History = res.nicknames.reverse().map((e, i) => ` \`${i + 1}.\` \`${e.isimler}\` (**${e.rol}**) - <@${e.execID}> - <t:${Math.floor(Math.floor(e.date) / 1000)}:R>`).slice(0, 30)
        message.reply({ embeds: [Embed.setDescription(`${victim} adlı üyenin geçmiş isimleri sırasıyla aşağıda listelenmiştir.

        ${History.join("\n")}
        
        ${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} üyenin \`${History.length}\` adet geçmiş ismi görüntülendi.`)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 
        
        }
        
        })
    }
}
function dateToUnixEpoch(date) {
    return `<t:${Math.floor(Math.floor(date) / 1000)}:L>`
  }
  

