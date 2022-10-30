const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const CoinsSchema = require("../../Helper's/MongooseSchema/StatisticSchema/CoinSchema");
module.exports = { name: "coinim", aliases: [],  category: "User", desc: "Davetinizi Öğrenme Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const coinData = await CoinsSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
      
        const total = coinData ? coinData.TotalCoinYT : 0;
        let Embedcik = new MessageEmbed().setColor("RANDOM").setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.channel.send({ embeds: [Embedcik.setDescription(`
        Toplam **${total}** 
  `)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 20000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
       
    
    }
}    