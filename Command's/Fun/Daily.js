const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const talkedRecently = new Set();
const FunCountCoin = require("../../Helper's/MongooseSchema/FunGame")
module.exports = { name: "daily", aliases: ["test"], category: "Client-owner",  desc: "Test Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
            if (talkedRecently.has(message.author.id)) {
                return message.channel.send(`${client.emojis.cache.find(a => a.name === "ravgar_warning")} Hey Dur Bakalım! Daily komutunu \`24 Saatte\` bir kullanabilirsin.`);
         } else {     
            talkedRecently.add(message.author.id);
            setTimeout(() => {
            message.delete();

              talkedRecently.delete(message.author.id);
            }, 86400000);
        }
            const sayı = Math.floor(Math.random() * 500);
            message.reply(`${client.emojis.cache.find(a => a.name === "ravgar_coin")} Bugün **${sayı}** \`FunCoin\` kazandın.`)    
            await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: sayı } }, { upsert: true });

       }
      }
    }