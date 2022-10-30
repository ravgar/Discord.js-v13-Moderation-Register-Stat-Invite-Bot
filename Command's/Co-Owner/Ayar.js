const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "ayar", aliases: ["setting"], category: "Co-owner", desc: "Taglı Alım, Ytag, Yeni Hesap Kontrol Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    let Embedcik = new MessageEmbed().setFooter(Settings["Client.Bot.Footer"]).setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
    let embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
    const row = new MessageActionRow()
    .addComponents(
    new MessageButton()
    .setCustomId('taglialim')
    .setLabel(`Taglı Alım : ${Server.tagliAlim ? '🟢' : '🔴'}`)
    .setStyle('PRIMARY'),
    new MessageButton()
    .setCustomId('yenihesap')
    .setLabel(`Yeni Hesap Kontrol : ${Server.yenihesapkontrol ? '🟢' : '🔴'}`)
    .setStyle('PRIMARY'),
    new MessageButton()
    .setCustomId('yasaklitag')
    .setLabel(`Yasaklı Tag Kontrol : ${Server.yasaklıtagkontrol ? '🟢' : '🔴'}`)
    .setStyle('PRIMARY'),
    new MessageButton()
    .setCustomId('yasaklıtagListe')
    .setLabel(`Yasaklı Tag Liste`)
    .setStyle('PRIMARY'),

    )
    let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`Hey ${message.author}, aşağıda bulunan butonlara tıkla ve dilediğin ayarı aç/kapat!`)] })
    var filter = (button) => button.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on('collect', async (button, user) => {      
        if(button.customId === "yenihesap") {
            if (Server.yeniHesap === true) 
            { 
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { yeniHesap: false }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Yeni Hesap Koruması\` kapatıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            } else if (Server.yeniHesap === false) {
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { yeniHesap: true }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Yeni Hesap Koruması\` açıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            }
            }
            if(button.customId === "yasaklitag") {
            if (Server.yasakliTag === true) 
            { 
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { yasakliTag: false }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Yasaklı Tag Koruması\` kapatıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            } else if (Server.yasakliTag === false) {
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { yasakliTag: true }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Yasaklı Tag Koruması\` açıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            }
            }
            if(button.customId === "taglialim") {
            if (Server.tagliAlim === true) 
            { 
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { tagliAlim: false }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` kapatıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            } else if (Server.tagliAlim === false) {
                await sunucuVeri.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { tagliAlim: true }, {upsert: true});
                button.reply(`Tebrikler ${button.user}! Başarıyla \`Taglı Alım\` açıldı!`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
            }
            }
            if(button.customId === "yasaklıtagListe") {
                let data = await YasaklıTag.find({ guildID: message.guild.id })
                msg.delete()
                let map = data.length > 0 ? data.map((value, index) => `${value.Tag}    |    ${client.users.cache.filter(s => s.username.includes(value.Tag)).size}`).join('\n') : "Sunucuya ait veri bulunamadı."
                let map2 = `TAG  |   KİŞİ`
                button.reply({ embeds: [Embedcik.setDescription(`Aşağıda belirtilen taglar ${message.guild.name} sunucusunda yasaklı durumdadır.
                \`\`\`php\n${map2}\n${map}\`\`\``)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 25000))
                }
                
        })    

    }
}