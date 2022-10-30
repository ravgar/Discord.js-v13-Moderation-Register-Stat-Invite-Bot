const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "say", aliases: [" "],  category: "Co-owner", desc: "Sunucu İstatistiklerini Görüntüleme Komutu",
   
execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) }).setTimestamp().setColor(message.author.displayHexColor).setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })}).setThumbnail(message.guild.iconURL({ dynamic: true }))
    let Database = await sunucuVeri.findOne({});
    let Tag = Database.sunucuTag;
    let Tag2 = await message.guild.members.cache.filter(member => member.user.username.includes("TAGLARI ÇOĞALTABİLİRSİNİZ")).size;
    let Tag3 = await message.guild.members.cache.filter(member => member.user.username.includes("TAGLARI ÇOĞALTABİLİRSİNİZ")).size;
    let ETag4 = await message.guild.members.cache.filter(member => member.user.discriminator.includes("ETİKET TAGI GİR")).size;
    let ses = message.guild.members.cache.filter(x => x.voice.channel).size
    let bot = message.guild.members.cache.filter(s => s.voice.channel && s.user.bot).size
    let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
    let topses = message.guild.members.cache.filter(s => s.voice.channel);
    let yayın = topses.filter(s => s.voice.streaming);
    let mik = topses.filter(s => s.voice.selfMute).size;
    let kulak = topses.filter(s => s.voice.selfDeaf).size;
    let yetkili = message.guild.members.cache.filter(x => {
        return x.voice.channel && x.roles.cache.has("1017788438596042843")

    }).size
    let AktifKullanıcı = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
    let Boost = message.guild.premiumSubscriptionCount;
    let BoostLevel = message.guild.premiumTier;
    message.channel.send({ embeds: [Embed.setDescription(`<t:${Math.floor(Math.floor(Date.now()) / 1000)}:R> \`Alınan Sunucu Verisi\` 

\` • \` Sunucuda **${message.guild.memberCount}** Üye Bulunmaktadır!
\` • \` Sunucuda Anlık **${AktifKullanıcı}** Aktif Üye Bulunmakta!
\` • \` Tagımıza Sahip Kişi Sayısı (**${Tag}!**)
\` • \` Sesli Kanallarda **${ses-bot || "0"}** (**+${bot || "0"} Bot**) Kişi Bulunmakta!

`)] });
    }
}