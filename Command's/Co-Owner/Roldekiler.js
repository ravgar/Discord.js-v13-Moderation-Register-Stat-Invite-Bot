const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "roldekiler", aliases: ["roldeki-kullanıcılar"],  category: "Co-owner", desc: "Roldeki Üyeleri Kontrol Etme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if (!Role) return message.reply(AutoRepy.RolBelirt)
    let Roldekiler = message.guild.members.cache.filter(wexcik => wexcik.roles.cache.has(Role.id)).size
    message.channel.send(`\`-\` <@&${Role.id}> \`(${Role.id})\` rolünde \`${Roldekiler}\` üye bulunmakta üyeler sırasıyla aşağıda listelenmiştir.\n\`\`\`js\n${message.guild.roles.cache.get(Role.id).members.map(m=> m .toString()+ " - " + "("+m.user.tag+")").join("\n")}\`\`\``, { split: true }).catch(err => message.channel.send(`Bir hata oluştu. | Hata kodu: ${err}`));}}