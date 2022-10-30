const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const YetkiliData = require("../../Helper's/MongooseSchema/YetkiliSicil")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "uyarı", aliases: ["cezalı", "jailed"],  category: "Penal", desc: "Kullanıcıyı Sunucuda Uyarma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.jailStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const Reason = args.splice(1).join(" ");
    if(!Reason) return message.reply(AutoReply.SebebBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.cache.has(Server.vmutedRole)) return message.reply(AutoReply.JailActive).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(User.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let count = await Database.countDocuments().exec();
    count = count == 0 ? 1 : count + 1;
    await YetkiliData.findOneAndUpdate({ guildID: message.guild.id, execID: User.id }, { $inc: { cezapuan: 10 } }, { upsert: true });
    let Penal = await new YetkiliData({ guildID: Settings.guildID, execID: message.author.id, victimID: User.id, dateNow: Date.now(), activity: true, Temporary: true, Reason: Reason, Type: "UYARI"}).save()
    const cezapuanData = await YetkiliData.findOne({ guildID: message.guild.id, userID: User.id });
    message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_warning") || "Emoji Bulunamadı"} ${User} (\`${User.user.tag}\` - \`${User.id}\`) isimli kullanıcı, **${Reason}** sebebiyle ${message.author} tarafından uyarıldı. (\`Ceza Numarası #${count}\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    let JailedEmbed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    client.channels.cache.get(Server.jailLog).send({ embeds: [JailedEmbed.setDescription(`\`•\` İşlem Uygulayan: ${User ? User.toString() : ""} - (\`${User.id}\` - \`${User.user.tag}\`)
    \`•\` İşlem Uygulanan: ${message.author} -  (\`${message.author.id}\` - \`${message.author.tag}\`)
    \`•\` Tarih: \`${moment(Date.now()).locale("tr").format("LLL")}\`
    \`•\` Toplam Cezapuanı: \`${cezapuanData ? cezapuanData.cezapuan : 0}\`
    \`•\` Sebep: [\`${Reason}\`]`)] }); 
     
}
}