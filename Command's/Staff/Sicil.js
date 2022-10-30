const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const { table } = require("table")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "sicil", aliases: ["cezalar"],  category: "Staff", desc: "Kullanıcının Geçmiş Cezalarına Bakma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    let Embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId('cezanos').setLabel(`Ceza Numaralarını Görüntüle`).setStyle('SUCCESS'),
      new MessageButton().setCustomId('iptalledeee').setLabel(`Kapat`).setStyle('DANGER'),)  
    
      cezaKayit.findOne({guildID: message.guild.id,execID: member.id},async (err, res) => {
      let ban = Number(res.Ban || 0)
      let jail = Number(res.Jail || 0)
      let vmute = Number(res.Vmute || 0)
      let mute = Number(res.Mute || 0)
      let total = Number(mute) + Number(vmute) + Number(jail) +  Number(ban)
       text = `\`\`\`php\nJail: ${jail}  tanesi  Ban: ${ban} Chat-Mute ${mute} Voice-Mute: ${vmute}\`\`\``
    
       Database.find({victimID: member.id}, async (err, res) => {
        if (res.length <= 0) return  message.reply("Bu Kişinin herhangi bir sicil geçmişine rastlanmadı"), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        let listed = res.reverse();
      let History = listed.map((x, index) => `Ceza Durumu  => ${x.activity == true ? "🟢 (Devam Ediyor)" : x.Bitis == "null" ? "🔴 (Bitti)" : "🔴 (Bitti)"}\nID => ${x.cezaID}\nTür => ${x.Type}\nYetkili => ${message.guild.members.cache.get(x.execID) ? message.guild.members.cache.get(x.execID).displayName : x.execID } (${x.execID})\nTarih => ${moment(Number(x.dateNow)).locale("tr").format("LLL")}\nBitiş Tarihi => ${x.finishDate == "null" ? "KALICI" : x.finishDate == "KALICI" ? "KALICI" : moment(Number(x.finishDate)).locale("tr").format("LLL")}\nSebep => ${x.Reason}`).slice(0,1) 
      let History2 = listed.map((x, index) => `\n \`${index + 1}.\` **[${x.Type}]** <@${x.execID}>  tarafından **${x.Reason}** sebebiyle cezalandırıldı.\`(#${x.cezaID})\``).slice(0,20) 
      let msg = await message.channel.send({ components: [row], embeds: [Embed.setDescription(`${member} adlı üyenin ${res.length} cezası bulunmakta cezaları aşağıda belirtilmiştir.\n**SON CEZASI**\`\`\`php\n${History}\`\`\`${History2}\n${text}`)] }); message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 
      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
      collector.on('collect', async (button, user) => {      
        if(button.customId === "cezanos") {
          Database.find({victimID: member.id}, async (err, res) => {
            let listed = res.reverse();
      let cezanos = listed.reverse().map((x, index) => `${index + 1}. - (Ceza Numarası: #${x.cezaID}) - ${message.guild.members.cache.get(x.execID) ? message.guild.members.cache.get(x.execID).displayName : x.execID } - ${x.Type}`).slice(0,100).join("\n") 

          msg.delete()
          message.channel.send({ embeds: [Embed.setDescription(`${member} adlı üyenin ${res.length} cezası bulunmakta tüm cezalarının ceza numaraları aşağıda belirtilmiştir. \`\`\`js\n${cezanos}\`\`\`\n Cezaların detaylarına bakmak için \`${Settings.Prefix}ceza <CezaNumarası>\``)] })
          })
        }  
          if(button.customId === "iptalledeee") {
            msg.delete()
          }
        
      })
      
      });})}

    
  }