const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const moment = require('moment');
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const YasaklıTag = require("../Helper's/MongooseSchema/YasaklıTag")

const data = require("../Helper's/MongooseSchema/YasaklıTag")
module.exports = async (member) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let WelcomeChannel = Server.registerChannel
    let unregisterRole = Server.unregisterRole
    let supheliRole = Server.suspiciousRole
    let cmuted = Server.mutedRole
    let kurallar = Server.kurallarchannel
    let sunucuTag = Server.sunucuTag
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-999])/g)
    if (üs) {
      üyesayısı = üyesayısı.replace(/([0-9999])/g, d => {
        return {
          "0": `${client.emojis.cache.find(x => x.name === "sifir")}`,
          "1": `${client.emojis.cache.find(x => x.name === "bir")}`, //ÜYE SAYISINI EMOJİLYE ÇEVİRMEK İÇİN BURAYA SADECE SAYI EMOJİLERİNİN İSMİNİ GİRMEN YETERLİ
          "2": `${client.emojis.cache.find(x => x.name === "iki")}`, 
          "3": `${client.emojis.cache.find(x => x.name === "uc")}`,
          "4": `${client.emojis.cache.find(x => x.name === "dort")}`,
          "5": `${client.emojis.cache.find(x => x.name === "bes")}`,
          "6": `${client.emojis.cache.find(x => x.name === "alti")}`,
          "7": `${client.emojis.cache.find(x => x.name === "yedi")}`,  
          "8": `${client.emojis.cache.find(x => x.name === "sekiz")}`,
          "9": `${client.emojis.cache.find(x => x.name === "dokuz")}`
        }[d];
      })
    }
    if(member.user.bot) return

    let guild = client.guilds.cache.get(Settings.guildID)
    Database.find({guildID: guild.id, activity: true,Type: "JAIL",Temporary: true},async function(err, Cezali) {
        if ((!Cezali) || (Cezali.length < 1)) return null;
        for (var RavgarWex of Cezali) {
            let user = guild.members.cache.get(RavgarWex.victimID)
            if(!user)  return null
                    if(!user.roles.cache.has(Server.jailedRole)) {
                      user.roles.set([Server.jailedRole]);}}})
let suphelilik = true;
    if ((Date.now() - member.user.createdAt) > (1000 * 60 * 60 * 24 * 7)) suphelilik = false;
    let guildSize = member.guild.members.cache.size;
    if(suphelilik) {
        member.roles.add(supheliRole)//DEVELOPED BY RAVGAR/WEX
        if (WelcomeChannel) client.channels.cache.get(WelcomeChannel).send(`${member} katıldı. Fakat hesabı \`7\` günden yeni olduğu için onu \`Şüpheli\` kısmına gönderdim.`)
        member.setNickname(Settings["Guild.Süpheli.İsim"])
        } else {                   
        member.roles.add(unregisterRole)//DEVELOPED BY RAVGAR/WEX
        if (WelcomeChannel) client.channels.cache.get(WelcomeChannel).send(`
> ${member} ${member.guild.name} Sunucumuza Hoş Geldin
> Seninle beraber sunucumuz **${member.guild.members.cache.size}** üye sayısına ulaştı.
> Hesabını __${moment(member.user.createdTimestamp).locale("tr").format("LLL")}__ tarihinde (<t:${Math.floor(Math.floor(member.user.createdTimestamp) / 1000)}:R>) oluşturulmuş.
> Kayıt işlemlerinden sonra <#${Settings.KurallarChannel}> kanalından sunucu kurallarımızı okuyabilirsin.
`)
             member.setNickname(Settings["Guild.Unregister.İsim"])
            if(member.user.username.includes("TAGINIZI GİRİNİZ/KOPYALAYARAK/ÇOĞALTABİLİRSİNİZ")) member.roles.add(Server.familyRole)//sunucuya taglı girerse rolünü verir
        }
        client.channels.cache.find(a => a.name === "giris-cikis-log-basit").send(`:tada: ${member} (\`${member.user.tag}\` - \`${member.id}\`) isimli üye sunucuya katıldı!`)

    }
        

module.exports.conf = {
    name: "guildMemberAdd"
}
