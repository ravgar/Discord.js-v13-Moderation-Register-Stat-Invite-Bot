const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const Users = require("../../Helper's/MongooseSchema/Taglı")
const Userss = require("../../Helper's/MongooseSchema/YetkiliAl")

const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "taglılarım", aliases: ["tag-listem"],  category: "Staff", desc: "Taglı Olarak Kaydettiğin Kullanıcıları Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand) && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol))) return
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let member = message.member
    let embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
    let embed2 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RED");
    let embed3 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("GREEN");
    const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('reddettt').setLabel(`Kapat`).setStyle('SECONDARY'),)
    let veri = await Users.findOne({ Taggeds: { $elemMatch: { execID: member.id } } })
    if(!veri) return message.reply(AutoRepy.VerinYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (veri && veri.Taggeds.filter(e => e.execID === member.id)) {
    let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`${(veri.Taggeds.filter(e => e.execID === member.id).map(e => `<@${(e.userID)}> (\`${message.guild.members.cache.get(e.userID) ? message.guild.members.cache.get(e.userID).user.tag : e.userID}\` - \`${(e.userID)}\`)`)).join("\n")}\n\n${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} Toplam \`${(veri.Taggeds.filter(e => e.execID === member.id)).length}\` kullanıcıyı taglı olarak kaydetmişsin.\nİşlemde herhangi bir hata oldugunu düşünüyorsan Ownerlara yazmaktan çekinme.`)] }); message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    var filter = (button) => button.user.id === member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on('collect', async (button, user) => {      
        let ytVeri = await Userss.findOne({ Yetkilicik: { $elemMatch: { execID: member.id } } })
        if(!ytVeri) return message.reply(AutoRepy.VerinYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        if (ytVeri && ytVeri.Yetkilicik.filter(e => e.execID === member.id)) {
if(button.customId === "reddettt") { msg.delete()}}})}}}

