const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "avatar", aliases: ["av", "pp"], category: "User", desc: "Avatar Görüntüleme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let User = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.member;
    let avatar = User.user.avatarURL({dynamic: true, size: 4096})
    let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
    const row = new MessageActionRow().addComponents(
    new MessageButton().setLabel(`LINK`).setStyle(5).setURL(avatar),)    
    let msg = await message.channel.send({ components: [row], embeds: [Embed.setImage(avatar).setDescription(`**${User.user.tag || message.author}** Kullanıcısının Avatar'ı`)]})
    var filter = (button) => button.user.id === message.author.id;
    const collector = msg.createMessageComponentCollector({ filter, time: 30000 })
    }
}