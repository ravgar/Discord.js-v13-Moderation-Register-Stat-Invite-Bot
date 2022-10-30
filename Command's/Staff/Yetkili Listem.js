const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const moment = require("moment")
const Users = require("../../Helper's/MongooseSchema/YetkiliVer")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "yetkililistem", aliases: ["yetkili-listem"],  category: "Staff", desc: "Yetki Verdiğin Kullanıcıları Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    let Zort = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
    let ytVeri = await Users.find({ Auth: message.author.id })
    if(!ytVeri) return message.reply("Database'de kayıtlı veri bulunamadı.")
    let History2 = ytVeri.map((x, index) => `\n \`${index + 1}.\` <@${(x.userID)}> (\`${x.userID}\` ${dateToUnixEpoch (x.Time)} ${x.Enabled == true ? "🟢 (Hala Yetkili)" : x.Enabled == "null" ? "🔴 (Yetkiden Ayrılmış)" : "🔴 (Yetkiden Ayrılmış)"}`).slice(0,20) 

        return message.reply({ embeds: [Zort.setDescription(`Belirttiğin kullanıcı başka bir yetkili tarafından taglı olarak kayıt edilmiş detaylı bilgilendirme aşağıda yazmaktadır.
        ─────────────────────────────
   ${History2}\n\nİşlemde herhangi bir hata oldugunu düşünüyorsan Ownerlara yazmaktan çekinme. `)] });
    }}
    function dateToUnixEpoch(date) {
        return `<t:${Math.floor(Math.floor(date) / 1000)}:R>`
      }