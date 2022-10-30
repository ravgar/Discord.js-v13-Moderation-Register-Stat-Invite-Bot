const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
module.exports = { name: "url", aliases: ["url-kullanım", "urlkullanım"],  category: "Owner", desc: "Sunucudaki Url Kullanımını Görüntüleme Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        let Embedcik = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.guild.fetchVanityData().then(res => {
            message.reply({ embeds: [Embedcik.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`**${message.guild.name}** Sunucusunun Özel-Davet İstatistikleri\n\nSunucu özel daveti: **${res.code}** Kullanımı : **${res.uses}**`)] }) })       }}    