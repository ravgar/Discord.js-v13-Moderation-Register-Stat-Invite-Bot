const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const Database2 = require("../../Helper's/MongooseSchema/Registeryy")
const Database = require("../../Helper's/MongooseSchema/RegisteryNames")
const Base = require("../../Helper's/MongooseSchema/ExecutorModel")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "kadın", aliases: ["k", "woman"],  category: "Register", desc: "Kullanıcıyı Kadın Olarak Kayıt Etme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.regisyterStaff.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!message.channel.id.includes(Server.registerChannel)) return message.reply("Bu komutu yanlızca register kanalında kullanabilirsin."), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!Member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    if (Server.tagliAlim === true && !Member.user.username.includes("Wench") &&  !Member.user.username.includes(";D")  && !Member.user.username.includes("wench") && !Member.user.discriminator.includes("1928") && !Member.roles.cache.has(Server.specialRole) && !Member.roles.cache.has(Server.boosterRole)) return message.channel.send(AutoReply.TaglıAlım).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let SunucuTag = Server.sunucuTag
    const İsim = args.slice(1).filter(x => isNaN(x)).map(arg => arg.charAt(0).toUpperCase() + arg.slice(arg.charAt(0).length).toLowerCase()).join(" ");
    const Yas = args[2];
    if(!İsim) return message.reply(AutoReply.İsimBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(isNaN(Yas)) return message.reply(AutoReply.YasBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(Server.manRole && Server.manRole.some(rol => Member.roles.cache.has(rol) && Server.womanRole && Server.manRole.some(rol => Member.roles.cache.has(rol)))) return message.reply(AutoReply.KayıtlıUser).catch(e => { }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Settings["Bot.Owner"].includes(Member.id)) return message.reply(AutoReply.BotSahibi).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Member === message.member.id) return message.reply(AutoReply.Self).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Member.user.bot) return message.reply(AutoReply.Botİslem).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (!Member.manageable) return message.reply(AutoReply.YetkimYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if (Member.roles.highest.position >= message.member.roles.highest.position && !Settings["Bot.Owner"].includes(message.author.id)) return message.reply(AutoReply.YetersizYetki), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    await Member.setNickname(`${Member.user.username.includes(Server.sunucuTag) ? Server.sunucuTag : (Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)} ${İsim} | ${Yas}`)
    let = İsimYascik = `${Member.user.username.includes(Server.sunucuTag) ? Server.sunucuTag : (Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)} ${İsim} | ${Yas}`
    await Member.roles.set(Server.womanRole)
    if(Server.sunucuTag && Member.user.username.includes(Server.sunucuTag)) Member.roles.add(Server.familyRole).catch();
    Database.findOne({guildID: message.guild.id, victimID: Member.id}, (err, wex) => {
        if(!wex) {
            let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
            message.reply({ embeds: [Embed.setDescription(`${Member} adlı kullanıcı **Kadın** olarak kayıt edildi.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 20000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
        } else {
        const History = wex.nicknames.reverse().map((e, i) => ` \`${i + 1}.\` \`${e.isimler}\` (**${e.rol}**) - <@${e.execID}> - ${dateToUnixEpoch (e.date)}`).slice(0, 30)
        let Embede = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
        message.reply({ embeds: [Embede.setDescription(`${Member} adlı kullanıcı **Kadın** olarak kayıt edildi fakat kişini geçmiş isimleri görüntülendi.\n\n${History.join("\n")}\n\n${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} Kullanıcının toplam \`${History.length}\` adet geçmiş isim kaydı görüntülendi.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 20000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)}})
    Database.findOne({guildID: message.guild.id, victimID: Member.id}, (err, res) => {
        if(!res) {
        new Database({guildID: message.guild.id, victimID: Member.id, nicknames: [{isimler: `${İsimYascik}`, rol: `Kadın`, execID: message.author.id, date: Date.now()}]}).save()
        } else {
        res.nicknames.push({isimler: `${İsimYascik}`,rol: `Kadın`, execID: message.author.id, date: Date.now()})
        res.save()}})
        await Database2.findOneAndUpdate({ guildID: message.guild.id, execID: message.author.id }, { $inc: { erkek: 0, kari: 1 } }, { upsert: true });}}
function dateToUnixEpoch(date) {
    return `<t:${Math.floor(Math.floor(date) / 1000)}:R>`
  }
