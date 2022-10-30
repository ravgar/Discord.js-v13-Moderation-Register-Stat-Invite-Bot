const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "ytsay", aliases: ["ysay"], category: "Co-owner", desc: "Yetkilililer Hakkında Bilgi Alma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
    if(!args[0]) {
        
    let enAltYetkiliRolu = message.guild.roles.cache.get(Server.botCommand);
      let members = message.guild.members.cache.filter(member => member.roles.highest.position >= enAltYetkiliRolu.position);    
      let sesteOlmayanlar = members.filter(member =>  !member.voice.channel && !member.user.bot && member.presence && member.presence.status !== "offline");
      message.channel.send(`Sunucumuzda aktif olan fakat seste olmayan yetkililer\n\`\`\`js\n${sesteOlmayanlar.map(member => ` ${member} `).join(",")}\`\`\`
Sunucumuzda ${sesteOlmayanlar.size} yetkili aktif fakat ses kanalına bağlı değil.\`${Settings.Prefix}ytsay dm\``, {split: true})}
      if(args[0] === "dm") {
        message.guild.members.cache.filter(
            yetkili => yetkili.roles.cache.has(Server.botCommand)).filter(yetkilises => !yetkilises.voice.channel && yetkilises.presence && yetkilises.presence.status != "offline" )
            .forEach(user => {
                user.send(`Merhabalar. **${message.guild.name}** sunucusunda ses aktifliğinizi artırmak ve yetkinizi yükseltmek için seslere giriniz. Müsait değil isen **Sleep Room** kanalına afk bırakabilirsin.`).catch(err => {
                    message.channel.send(`${user} isimli yetkiliye özel mesajları kapalı olduğu için mesaj atamıyorum. Lütfen seslere geçebilir misin ? Müsait değilsen **Sleep Room** kanalına geçebilirsin.`)
                })
            })
        }
    }
}