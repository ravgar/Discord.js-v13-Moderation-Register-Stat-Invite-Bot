const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const ms = require("ms")
const data = require("../Helper's/MongooseSchema/Komut-engel")
module.exports = async (message) => {  
    if (message.author.bot || message.channel.type == "dm") return;
    if(!message.guild) return;
    const Embed = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
    .setFooter(message.guild.name, client.user.avatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`${message.channel} kanalından ${message.author} kişisinin mesajı silindi.`)
    .addField(`Mesaj Bilgileri`, `\`•\` Mesaj içeriği: ${message.content}\n\`•\` Mesaj ID: **${message.id}**\n\`•\` Silinme Tarihi: **${moment(message.deletedTimestamp).locale("tr").format("LLL")}**`)
    .addField(`Gönderici Bilgileri`, `\`•\` Kullanıcı: ${message.member.toString()} **-** (\`${message.author.id}\`)\n\`•\` Oluşturulma Tarihi: **${moment(message.author.createdTimestamp).locale("tr").format("LLL")}**`)
    client.channels.cache.find(a => a.name === "mesaj_log").send({embeds: [Embed]})
}
module.exports.conf = {
    name: "messageDelete"
}