const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "cezanumarası", aliases: ["cezabilgi", "ceza"],  category: "Staff", desc: "CezaID ile ceza detaylayını görme komutus",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
    let sayi = args[0]
    if(!Number(sayi) && !sayi) return message.reply(AutoReply.SayıBelirt), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    Database.findOne({guildID: message.guild.id,cezaID: sayi }, async (err, ceza) => {
      if(ceza) {
        message.reply({ embeds: [Embed.setDescription(`
        ${client.emojis.cache.find(x => x.name === "ravgar_soru") || "Emoji Bulunamadı"} **${args[0]}** ceza numarasına ait ceza-i işlem verileri; 
        \`\`\`js
=> Kullanıcı: ${message.guild.members.cache.get(ceza.victimID) ? message.guild.members.cache.get(ceza.victimID).user.tag : ceza.victimID } (${ceza.victimID})
=> Yetkili: ${message.guild.members.cache.get(ceza.execID) ? message.guild.members.cache.get(ceza.execID).user.tag : ceza.execID } (${ceza.victimID})
=> Tür: ${ceza.Type}
=> Sebep: ${ceza.Reason}
=> Başlangıç Tarihi: ${moment(ceza.dateNow).locale("tr").format("LLL")}
=> Bitiş Tarihi: ${moment(ceza.finishDate).locale("tr").format("LLL")}
=> Ceza ${ceza.activity == true ? "🟢 [AKTİF]" : ceza.Bitis == "null" ? "🔴 [DE-AKTİF]" : "🔴 [DE-AKTİF]"}\`\`\`
Haksız bir ceza-i işlem oldugunu düşünüyorsanız Üst yetkililerimize yazmaktan çekinmemelisin.`)]})
            } else {
                message.reply(AutoReply.CezaNoYok).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
            }
          })
          }
        }

    
    