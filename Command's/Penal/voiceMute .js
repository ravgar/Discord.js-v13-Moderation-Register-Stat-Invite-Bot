const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")

const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const voiceMuteLimit = new Map();
const moment = require("moment")
module.exports = { name: "voicemute", aliases: ["vmute", "sesmute"],  category: "Penal", desc: "Kullanıcıyı Ses Kanallarında Susturma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.voiceMuteStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const User = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let Time = args[1]
    const Reason = args.splice(2).join(" ");
    if(!Reason) return message.reply(AutoReply.SebebBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!Time) return message.reply(AutoReply.ZamanBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.cache.has(Server.vmutedRole)) return message.reply(AutoReply.VmuteActive).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(User.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings.voiceMuteLimit > 0 && voiceMuteLimit.has(message.author.id) && voiceMuteLimit.get(message.author.id) == Settings.voiceMuteLimit) return message.reply(`${AutoReply.voiceMuteLimit}`), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!User.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (User.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(User.voice.channel) User.voice.setMute(true);
    await User.roles.add(Server.vmutedRole, `Voice Mute, Yetkili: ${message.author.tag}`)
    if (Settings.voiceMuteLimit > 0) { if (!voiceMuteLimit.has(message.author.id)) voiceMuteLimit.set(message.author.id, 1);
        else voiceMuteLimit.set(message.author.id, voiceMuteLimit.get(message.author.id) + 1);
        setTimeout(() => { if (voiceMuteLimit.has(message.author.id)) voiceMuteLimit.delete(message.author.id);}, 1000 * 60 * 60)};    
    let count = await Database.countDocuments().exec();
    count = count == 0 ? 1 : count + 1;
    await Database.findOneAndUpdate({ guildID: message.guild.id, victimID: User.id }, { $inc: { cezapuan: 15 } }, { upsert: true });
    let Penal = await new Database({ guildID: Settings.guildID, execID: message.author.id, cezaID: count, victimID: User.id, dateNow: Date.now(), activity: true, Temporary: true, Reason: Reason, Type: "VOICE-MUTE", Kontrol: "VOICEMUTE", finishDate: (Date.now() + ms(Time))}).save()
    await cezaKayit.findOneAndUpdate({ guildID: message.guild.id, execID: User.id }, { $inc: { Ban: 0, Jail: 0, Mute: 0, Vmute: 1 } }, { upsert: true });
    const cezapuanData = await Database.findOne({ guildID: Settings.guildID, victimID: User.id });
    const muteSure = args[1].replace(`s`, " Saniye").replace(`m`, " Dakika").replace(`h`, " Saat").replace(`d`, " Gün").replace(`w`, " Hafta")
    message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_vmuted") || "Emoji Bulunamadı"} ${User} (\`${User.user.tag}\` - \`${User.id}\`) isimli kullanıcı, **${Reason}** sebebiyle ${message.author} tarafından \`${muteSure}\` süresince ses kanallarında susturuldu. (\`Ceza Numarası #${count}\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    let VoiceMuteEmbed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    client.channels.cache.get(Server.voiceMuteLog).send({ embeds: [VoiceMuteEmbed.setDescription(`\`•\` İşlem Uygulayan: ${User ? User.toString() : ""} - (\`${User.id}\` - \`${User.user.tag}\`)
    \`•\` İşlem Uygulanan: ${message.author} -  (\`${message.author.id}\` - \`${message.author.tag}\`)
    \`•\` Tarih: \`${moment(Date.now()).locale("tr").format("LLL")}\`
    \`•\` Sebep: [\`${Reason}\`]
    \`•\` Kullanıcının Cezapuanı: \`${cezapuanData ? cezapuanData.cezapuan : 0}\``)] }); 
     
}
}
