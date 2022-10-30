const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const Database = require("../../Helper's/MongooseSchema/ExecutorModel")
const Users = require("../../Helper's/MongooseSchema/YetkiliVer")
const { table } = require("table")
const { MessageEmbed, Discord, User } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "yetkibaşlat", aliases: ["yetkili-al", "yetkiver"],  category: "Staff", desc: "Yetki Verme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
    if(!message.member.permissions.has("8") && !Server.yetkialımdm.some(rol => message.member.roles.cache.has(rol)) && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol)) && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    if(!Server.komutChannels.some(kanal => message.channel.id.includes(kanal))) return message.reply(`${Settings.Warning} \`Hatalı Kullanım\` Komutları Yanlızca ${KomutChannel} kanallarında kullanabilirsin.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])    
    let baslangıcYt = Server.ilkyetkiler ? `${Server.ilkyetkiler.length > 1 ? Server.ilkyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ilkyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ilkyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
    let ikinciYt = Server.ikinciyetkiler ? `${Server.ikinciyetkiler.length > 1 ? Server.ikinciyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ikinciyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ikinciyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
    let ücüncüYe = Server.ucuncuyetkiler ? `${Server.ucuncuyetkiler.length > 1 ? Server.ucuncuyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ucuncuyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ucuncuyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`    
    let ucuncuYT = Server.ucuncuyetkiler ? `${Server.ucuncuyetkiler.length > 1 ? Server.ucuncuyetkiler.slice(0, -1).map(x => `${x}`).join(" ") + Server.ucuncuyetkiler.map(x => `${x}`).slice(-1) : Server.ucuncuyetkiler.map(x => `${x}`).join(" ")}` : `${Settings.Warning}`    
    if(!member) return message.reply({ embeds: [Embed.setDescription(`
    Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.
    
    \`${Settings.Prefix}yetkiver 728161454288535604 1\` - ${baslangıcYt}
    \`${Settings.Prefix}yetkiver 728161454288535604 2\` - ${ikinciYt}
    \`${Settings.Prefix}yetkiver 728161454288535604 3\` - ${ücüncüYe}
    
        `)] });
        if (!member.user.username.includes(Server.sunucuTag)) return message.channel.send(AutoReply.yetVerTagsız).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

    if(!args[0]) return message.reply({ embeds: [Embed.setDescription(`
Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.

\`${Settings.Prefix}yetkiver 728161454288535604 1\` - ${baslangıcYt}
\`${Settings.Prefix}yetkiver 728161454288535604 2\` - ${ikinciYt}
\`${Settings.Prefix}yetkiver 728161454288535604 3\` - ${ücüncüYe}

    `)] });
    if(!args[1]) return message.reply({ embeds: [Embed.setDescription(`
    Merhaba, belirttiğiniz kullanıcıya verebileceğiniz yetkiler aşağıda belirtilmiştir aşağıdaki örneklere göre yetkilerini verebilirsiniz.
    
    \`${Settings.Prefix}yetkiver 728161454288535604 1\` - ${baslangıcYt}
    \`${Settings.Prefix}yetkiver 728161454288535604 2\` - ${ikinciYt}
    \`${Settings.Prefix}yetkiver 728161454288535604 3\` - ${ücüncüYe}
    
        `)] });
    

    if(args[1] === "1") {
    member.roles.add(Server.ilkyetkiler)
    await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
    message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${baslangıcYt} yetkileri verildi.`)] });
  } 
  if(args[1] === "2") {
    member.roles.add(Server.ikinciyetkiler)
      await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
      message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${ikinciYt} yetkileri verildi.`)] });
  
    } 
    if(args[1] === "3") {
      member.roles.add(Server.ucuncuyetkiler)
      await Users.findOneAndUpdate({ guildID: message.guild.id, userID: member.id }, { $set: { Enabled: true, Auth: message.author.id, Time: Date.now() } }, { upsert: true })
      message.reply({ embeds: [Embed.setDescription(`${member} - (\`${member.id}\`) adlı kullanıcıya ${ücüncüYe} yetkileri verildi.`)] });
      client.channels.cache.find(a => a.name === "yetki-log").send(`:small_orange_diamond: ${member} (\`${member.id}\`) adlı üyeye başlangıç yetkileri verildi. [\`${moment(Date.now()).locale("tr").format("LLL")}\`]\`\`\`fix\n${message.guild.roles.cache.get(ucuncuYT) ? message.guild.members.roles.get(ucuncuYT).name : ucuncuYT }\`\`\``).catch(() => { });

  
    } 


  }
  }

    
    