const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const banLimit = new Map();
const moment = require("moment")
module.exports = { name: "ban", aliases: ["yasakla", "banned"], category: "Penal", desc: "Kullanıcıyı Sunucudan Yasakalama Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.banStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const Reason = args.splice(1).join(" ");
    if(!Reason) return message.reply(AutoReply.SebebBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(User.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings.banLimit > 0 && banLimit.has(message.author.id) && banLimit.get(message.author.id) == Settings.banLimit) return message.reply(`${AutoReply.banLimit}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    await message.guild.members.ban(User.id, { reason: Reason + ` Yetkili: ${message.author.id}` }).catch(x => message.reply("Kullanıcı sunucuda yasaklı veya sunucuda değil.")).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings.banLimit > 0) { if (!banLimit.has(message.author.id)) banLimit.set(message.author.id, 1);
    else banLimit.set(message.author.id, banLimit.get(message.author.id) + 1);
    setTimeout(() => { if (banLimit.has(message.author.id)) banLimit.delete(message.author.id);}, 1000 * 60 * 60)};
    let count = await Database.countDocuments().exec();
    count = count == 0 ? 1 : count + 1;
    await Database.findOneAndUpdate({ guildID: message.guild.id, victimID: User.id }, { $inc: { cezapuan: 50 } }, { upsert: true });
    await cezaKayit.findOneAndUpdate({ guildID: message.guild.id, execID: User.id }, { $inc: { Ban: 1, Jail: 0, Mute: 0, Vmute: 0 } }, { upsert: true });
    const cezapuanData = await Database.findOne({ guildID: message.guild.id, victimID: User.id });
    let Penal = await new Database({ guildID: Settings.guildID, execID: message.author.id, cezaID: count, victimID: User.id, dateNow: Date.now(), activity: true, Temporary: true, Reason: Reason, Type: "BAN"}).save()
    message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_banned") || "Emoji Bulunamadı"} ${User} (\`${User.user.tag}\` - \`${User.id}\`) isimli kullanıcı, **${Reason}** sebebiyle ${message.author} tarafından sunucudan yasaklandı. (\`Ceza Numarası #${count}\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    let BanEmbed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    client.channels.cache.get(Server.banLog).send({ embeds: [BanEmbed.setDescription(`\`•\` İşlem Uygulayan: ${User ? User.toString() : ""} - (\`${User.id}\` - \`${User.user.tag}\`)
    \`•\` İşlem Uygulanan: ${message.author} -  (\`${message.author.id}\` - \`${message.author.tag}\`)
    \`•\` Tarih: \`${moment(Date.now()).locale("tr").format("LLL")}\`
    \`•\` Sebep: [\`${Reason}\`]
    \`•\` Kullanıcının Cezapuanı: \`${cezapuanData ? cezapuanData.cezapuan : 0}\``)] }); 
     
}
}