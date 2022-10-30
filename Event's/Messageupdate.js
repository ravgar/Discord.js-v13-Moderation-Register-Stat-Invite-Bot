const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const ms = require("ms")
const data = require("../Helper's/MongooseSchema/Komut-engel")
module.exports = async (oldMessage, newMessage) => {
    if (!oldMessage.content && !newMessage.content) return;
    if (oldMessage.author.bot) return;
      if(!oldMessage.guild) return;
    const Embed = new MessageEmbed()
    .setAuthor(oldMessage.member.displayName, oldMessage.author.avatarURL({ dynamic: true }))
    .setFooter(oldMessage.guild.name, client.user.avatarURL({ dynamic: true }))
    .setColor("RANDOM")
    .setTimestamp()
    .setDescription(`${oldMessage.channel} kanalında ${oldMessage.author} kişisi mesajını düzenledi.`)
    .addField(`Eski Mesaj`, `||${oldMessage.content}||`)
    .addField(`Yeni Mesaj`, `||${newMessage.content}||`)
   
    client.channels.cache.find(a => a.name === "mesaj_log").send({embeds: [Embed]})
}
module.exports.conf = {
    name: "messageUpdate"
}