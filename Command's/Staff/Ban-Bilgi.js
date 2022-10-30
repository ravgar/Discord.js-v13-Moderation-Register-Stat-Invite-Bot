const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "banbilgi", aliases: ["bansorgu", "ban-bilgi"],  category: "Staff", desc: "Ban Sebebini Görme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !message.member.roles.cache.has(Server.botCommand)) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
    let id = args[0]
    if(!args[0] || isNaN(args[0])) return message.reply(AutoReply.birIDbelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    
    
    Database.findOne({guildID: message.guild.id, Type: "BAN",victimID: args[0]},async function(err, data) {
    
    
        if(data) {
    
          message.channel.send({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_banned") || "Emoji Bulunamadı"} Kullanıcı: \`${client.users.cache.get(data.victimID) ? client.users.cache.get(data.victimID).tag : data.victimID }\` (\`${data.victimID}\`)\n─────────────────────────────\n\`${client.users.cache.get(data.execID) ? client.users.cache.get(data.execID).tag : data.execID }\` (\`${data.execID}\`) tarafından \`${moment(data.dateNow).locale("tr").format("LLL")}\` tarihinde \`${data.Reason}\` sebebiyle sunucudan yasaklandı.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
        } else {
          await client.users.fetch(args[0]).then(res => {

              message.guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD', limit: 100}).then(audit => {
                let user = audit.entries.find(a => a.target.id === res.id)
                if(user){
                  message.channel.send({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_banned") || "Emoji Bulunamadı"} Kullanıcı:  \`${client.users.cache.get(id) ? client.users.cache.get(id).tag : id }\` (\`${id}\`)\n─────────────────────────────\n\`${user.executor.tag}\` (\`${user.executor.id}\`) tarafından \`${moment(user.createdAt).locale("tr").format("lll")}\` tarihinde \`${user.reason || "Belirtilmeyen Bir Sebeb"}\` sebebiyle sunucudan yasaklanmış.`)] }), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)

                }else{
                    return message.channel.send("\n\nBu yasaklama, son 100 yasaklama içinde olmadığından dolayı ban bilgisini yazamıyorum."), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
                }
            })
        })
      }
    })
    }
}        
    