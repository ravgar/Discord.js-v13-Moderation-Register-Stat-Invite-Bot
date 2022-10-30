const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = { name: "emoji-ekle", aliases: ["emojiekle"], category: "Client-owner",  desc: "Emoji Ekleme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
          let emojiLink = args[0];
          let emojiName = args[1];
          let guild = message.guild;
          if (!emojiLink) return message.channel.send("Emojiyi Belirt.");
          if (!emojiName) return message.channel.send("Emojinin İsmini Belirt.");
          guild
          .emojis.create(`${emojiLink}`, `${emojiName}`)
          .then(emoji => message.reply(`\`${emojiName}\` adında emoji oluşturuldu. (${emoji})`))
        message.react(client.emojis.cache.find(res => res.name === "ravgar_onay")).catch(console.error);
    
        
        }  }
}