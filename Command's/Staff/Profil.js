const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "profil", aliases: ["profile", "pırofil"],  category: "Staff", desc: "Kullanıcı Hakkında Detaylı Bilgileri Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
    cezaKayit.findOne({guildID: message.guild.id,execID: member.id},async (err, res) => {
      let text 
      if(!res) {
        message.reply({ embeds: [Embed.setDescription(`Merhaba \`${message.member.displayName}\` şu anda ${member} kişisinin profiline bakmaktasın!
        \`⦁\` **${member} Kişisinin bilgileri**
        \`-\` **Tam Adı** \`${member.user.tag}\`
        \`-\` **Oluşturulma Bilgisi** \`${moment(member.user.createdAt).locale("tr").format("LLL")}\`
        \`-\` **Sunucuya Katılım Bilgisi** \`${moment(member.user.joinedTimestamp).locale("tr").format("LLL")}\`

        \`⦁\` **${member} Kişisinin ceza bilgileri!**
        Kişinin ceza bilgisi bulunamadı!
      
        **Rolleri** ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
        `)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
 
        return
    }

    let ban = Number(res.Ban || 0)
    let jail = Number(res.Jail || 0)
    let vmute = Number(res.Vmute || 0)
    let mute = Number(res.Mute || 0)
    let total = Number(mute) + Number(vmute) + Number(jail) +  Number(ban)
    
     text = `Toplamda \`${total}\` kadar ceza almış Bunlardan;
    
     \`\`\`php\nJail: ${jail}  tanesi  Ban: ${ban} Chat-Mute ${mute} Voice-Mute: ${vmute}\`\`\` cezası bulunmaktadır.
     `
    
     message.reply({ embeds: [Embed.setDescription(`Merhaba \`${message.member.displayName}\` şu anda ${member} kişisinin profiline bakmaktasın!
     
     \`⦁\` **${member} Kişisinin bilgileri**
     \`-\` **Tam Adı** \`${member.user.tag}\`
     \`-\` **Oluşturulma Bilgisi** \`${moment(member.user.createdAt).locale("tr").format("LLL")}\`
     \`-\` **Sunucuya Katılım Bilgisi** \`${moment(member.user.joinedTimestamp).locale("tr").format("LLL")}\`

     \`⦁\` **${member} Kişisinin ceza bilgileri!**
     
     **Rolleri** ${member.roles.cache.size > 8 ? `Çok fazla rolün mevcut (${member.roles.cache.size})` : member.roles.cache.filter(x => x.name !== "@everyone").map(roles => roles).join(",")}
     
     Toplamda \`${total}\` kadar ceza almış Bunlardan;\`\`\`php\nJail: ${jail} Ban: ${ban} Chat-Mute ${mute} Voice-Mute: ${vmute}\`\`\` 

     `)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 



})

  

  }
        }

    
    