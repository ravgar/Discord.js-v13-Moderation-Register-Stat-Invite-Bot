const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "izinligit", aliases: ["igit"],   category: "User", desc: "Belirttiğiniz Kullanıcı İzin verirse Yanına Gitme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.womanRole.some(rol => message.member.roles.cache.has(rol)) && !Server.manRole.some(rol => message.member.roles.cache.has(rol)) && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("BLUE");
    let embed2 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RED");
    let embed3 = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("GREEN");
    if (!message.member.voice.channel) { return message.reply(AutoRepy.sesKanalındaOlmanGerekİgit).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
    if (!member) { return message.reply(AutoRepy.İzinliGitKullanıcıBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
    if (message.member.voice.channel === member.voice.channel) { return message.reply(AutoRepy.AynıKanaldasınız).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
    if (!member.voice.channel) { return message.reply(AutoRepy.kullanıcıSesKanalındaDeğil).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
    if (member.user.bot) { return message.reply(AutoRepy.botunYanınaGidemezsin).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}
    const row = new MessageActionRow().addComponents(
    new MessageButton().setCustomId('onayla').setLabel(`Onayla`).setStyle('SUCCESS'),
    new MessageButton().setCustomId('reddet').setLabel(`Reddet`).setStyle('DANGER'),)
    let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`Hey ${message.author}, aşağıda bulunan butonlara tıklayarak odaya gelip gelmemesini belirtebilirsin.`)] }); message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    var filter = (button) => button.user.id === member.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on('collect', async (button, user) => {      
    if(button.customId === "onayla") { msg.delete()
    message.member.voice.setChannel(member.voice.channel.id)
    button.channel.send({embeds: [embed3.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} ${member} adlı kullanıcı odaya bağlanma istediğinizi onayladı.`)] })}
    if(button.customId === "reddet") { 
    button.channel.send({embeds: [embed2.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} ${member} adlı kullanıcı odaya bağlanma istediğinizi reddetti.`)] })}})}}