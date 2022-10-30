const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "sesli", aliases: ["voicebilgi"],  category: "Co-owner", desc: "Sesteki Kullanıcıları Detaylı Görüntüleme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
    let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
    let topses = message.guild.members.cache.filter(s => s.voice.channel);
    let yayın = topses.filter(s => s.voice.streaming);
    let mik = topses.filter(s => s.voice.selfMute).size;
    let kulak = topses.filter(s => s.voice.selfDeaf).size;
    let yetkili = message.guild.members.cache.filter(x => {
        return x.voice.channel && x.roles.cache.has(Server.botCommand)
    }).size
message.reply({ embeds: [Embed.setDescription(`
\`❯\` Sesli kanallarında **${sesli}** kullanıcı bulunuyor.
\`❯\` Sesli kanallarında **${yetkili}** yetkili bulunuyor.
\`❯\` Mikrofonu kapalı: **${mik}**
\`❯\` Kulaklığı kapalı: **${kulak}**
\`❯\` Yayında: **${yayın.size}** 
`)] });

    }
}