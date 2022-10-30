const { DiscordBanners } = require('discord-banners');
const {MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed, Message} = require("discord.js")
const discordBanners = new DiscordBanners(client);
module.exports = { name: "banner", aliases: ["bnner"],   category: "User", desc: "Banner Görüntüleme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let User = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    let Embed = new MessageEmbed()
    const Banner = await discordBanners.getBanner(User.id, { size: 2048, format: "png", dynamic: true })
    const row = new MessageActionRow().addComponents(
        new MessageButton().setLabel(`LINK`).setStyle(5).setURL(Banner),)    
    let msg = await message.channel.send({ components: [row], embeds: [Embed.setImage(Banner).setDescription(`**${User.user.tag || message.author}** Kullanıcısının Banner'ı`)]})
 }
}