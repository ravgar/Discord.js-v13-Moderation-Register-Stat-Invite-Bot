const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/roleLog")
const { table } = require("table")
const cezaKayit = require("../../Helper's/MongooseSchema/cezaKayit")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "rollog", aliases: ["roleslog"],  category: "Staff", desc: "Kullanıcıya Verilen/Alınan Rolleri Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!member) return message.reply(AutoReply.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
       Database.find({victimID: member.id}, async (err, res) => {
        if(res.length < 1) return message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")} ${member} kişisinin herhangi bir rollog kaydına ulaşamadım!`)
        let listed = res.reverse();      
        let mapped = listed.map((value,index) => `\`${value.emoji}\` - \`${moment(value.Date).locale("tr").format("LLL")}\` - <@${value.ExecID}> <@&${value.Rol}>`).slice(0,20)
        const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('cezanos').setLabel(`Tüm Rol-Log'ları (${res.length} Log!)`).setStyle('SUCCESS'),
        new MessageButton().setCustomId('iptalledeee').setLabel(`Kapat`).setStyle('DANGER'),)  

        let msg = await message.channel.send({ components: [row], embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_soru") || "Emoji Bulunamadı"} ${member} adlı kullanıcının rol geçmiş kaydı.\n${mapped.join("\n")}\n\n${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} Kullanıcının \`${res.length}\` adet rol kaydı bulundu.`)] })
      var filter = (button) => button.user.id === message.author.id;
      const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
      collector.on('collect', async (button, user) => {      
        if(button.customId === "cezanos") {
          Database.find({victimID: member.id}, async (err, res) => {
            let listed = res.reverse();
            let mapped2 = listed.map((value,index) => `${value.emoji}   ${moment(value.Date).locale("tr").format("LLL")}   ${message.guild.members.cache.get(value.ExecID) ? message.guild.members.cache.get(value.ExecID).displayName : value.ExecID }  ${message.guild.roles.cache.get(value.Rol) ? message.guild.roles.cache.get(value.Rol).name : value.rol }`).slice(0,100)
          msg.delete()
          message.channel.send({ embeds: [Embed.setDescription(`\`\`\`php\n
İSLEM      TARİH                 YETKİLİ   ROL      \n${mapped2.join("\n")}\`\`\``)] })
          })
        }  
          if(button.customId === "iptalledeee") {
            msg.delete()
          }
        
      })
      
      });}}

    
  