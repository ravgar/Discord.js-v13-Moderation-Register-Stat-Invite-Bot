const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const Discord = require("discord.js")
const talkedRecently2 = new Set();
const { MessageEmbed } = require("discord.js");
const FunCountCoin = require("../../Helper's/MongooseSchema/FunGame")
module.exports = { name: "cf", aliases: ["test"], category: "Client-owner",  desc: "Test Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
            if (talkedRecently2.has(message.author.id)) {
                return message.channel.send(`${client.emojis.cache.find(a => a.name === "ravgar_warning")} Hey Dur Bakalım! Daily komutunu \`10 Saniyede\` bir kullanabilirsin.`);
         } else {     
            talkedRecently2.add(message.author.id);
            setTimeout(() => {
            message.delete();

            talkedRecently2.delete(message.author.id);
            }, 10000);
        }
            const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
            let argss = args[0]
            if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
            if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
            let Coin = db ? db.CoinCount : 0;
            if(Coin < argss) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Oynamak istediğin değer kadar \`FunCoin\` coinin bulunmamakta.`)
            let kazanç = ((Number(args[0]) * 2))
            const cevaplar = ["win","lost","win","lost","win","lost","lost","lost","win","lost"];                        
            var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];
            let msg = await message.channel.send(`**${message.member.user.username}** ${argss} **${Settings.guildName}** Coini değerinde coin çeviriyorum\nCoin çevriliyor ${client.emojis.cache.find(res => res.name === "ravgar_coin")}`);
            if (cevap === "lost") {
                msg.edit({content: `**${message.member.user.username}** ${argss} **${Settings.guildName}** coini değerinde coin çevrildi..\nTüh Bee! ${client.emojis.cache.find(res => res.name === "ravgar_coin")} **${argss}** **${Settings.guildName}** coini kaybettin!`});
                await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: -argss, yazıtureGame: 1 } }, { upsert: true });
            } else if (cevap === "win") {
                    msg.edit({content: `**${message.member.user.username}** **__${argss}__** **${Settings.guildName}** coini değerinde coin çevrildi..\nHelalllğ! ${client.emojis.cache.find(res => res.name === "ravgar_coin")} **${kazanç}** **${Settings.guildName}** coini kazandın!`});
                    await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: kazanç, yazıtureGame: 1 } }, { upsert: true });
                }
        
        }    
      }
    }