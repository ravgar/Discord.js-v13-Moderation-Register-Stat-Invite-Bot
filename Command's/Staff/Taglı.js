const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const moment = require("moment")
const Users = require("../../Helper's/MongooseSchema/Taglı")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "taglı", aliases: ["setting"],  category: "Staff", desc: "Kullanıcıyı Taglı Olarak Kaydetme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !Server.regisyterStaff.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!member.user.username.includes("Chavo") && !member.user.username.includes("CHAVO") && !member.user.username.includes("Chavo") && !member.user.username.includes("chavo") && !member.user.username.includes(";D")) return message.channel.send(AutoRepy.taglıTagsız).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Zort = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
    let veri = await Users.findOne({ Taggeds: { $elemMatch: { userID: member.id } } })
    if (veri && veri.Taggeds.filter(e => e.userID === member.id)) {
        let Yetkili = `${(veri.Taggeds.filter(e => e.userID === member.id).map(e => (e.execID)))}`
        return message.reply({ embeds: [Zort.setDescription(`Belirttiğin kullanıcı başka bir yetkili tarafından taglı olarak kayıt edilmiş detaylı bilgilendirme aşağıda yazmaktadır.
        \`\`\`js\nYetkili => ${(veri.Taggeds.filter(e => e.userID === member.id).map(e => (message.guild.members.cache.get(e.execID) ? message.guild.members.cache.get(e.execID).user.tag : e.execID)))} (${(veri.Taggeds.filter(e => e.userID === member.id).map(e => (e.execID)))})\nTarih => ${(veri.Taggeds.filter(e => e.userID === member.id).map(e => moment(e.date).locale("tr").format("LLL")))}\`\`\`İşlemde herhangi bir hata oldugunu düşünüyorsan Ownerlara yazmaktan çekinme. `)] });
    } else {
        let embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
    let embed2 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RED");
    let embed3 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("GREEN");
    const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('onaylatagli').setLabel(`Onayla`).setStyle('SUCCESS'),
    new MessageButton().setCustomId('reddettagli').setLabel(`Reddet`).setStyle('DANGER'),)
    let msg = await message.channel.send({ components: [row], content: `${member}`, embeds: [embed.setDescription(`Hey ${member}, ${message.author} adlı yetkili seni taglı olarak kaydetmek istiyor onaylamak veya reddetmek için butonları kullanman yeterli.`)] })
    var filter = (button) => button.user.id === member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on('collect', async (button, user) => {      
    if(button.customId === "onaylatagli") {
        client.channels.cache.find(a => a.name === "tag_log").send(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} ${message.author} adlı yetkili ${member} adlı üyeyi taglı olarak kaydetti.`)
        await Users.findOneAndUpdate({ execID: message.author.id }, { $push: { Taggeds: { execID: message.author.id, userID: member.id, date: Date.now() } } }, { upsert: true });
        msg.delete()
        button.channel.send({embeds: [embed3.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} ${member} adlı üye onu taglı olarak kaydetmeni onayladı.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)}
    if(button.customId === "reddettagli") { 
    msg.delete()
    button.channel.send({embeds: [embed2.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} ${member} adlı üye onu taglı olarak kaydetmeni reddetti.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)}})}}}