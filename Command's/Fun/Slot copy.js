const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const Discord = require("discord.js")
const talkedRecently3 = new Set();
const { MessageEmbed } = require("discord.js");
const FunCountCoin = require("../../Helper's/MongooseSchema/FunGame")
module.exports = { name: "slot", aliases: ["s"], category: "Client-owner",  desc: "Test Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
            const slotItems = ["🍇", "🍉", "🍊", "🍎", "7", "🍓", "🍒"];
            const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
            let argss = args[0]
            if (!argss) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
            if (isNaN(argss)) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Geçerli bir sayı belirtmelisin.`)
            let Coin = db ? db.CoinCount : 0;
            if(Coin < argss) return message.reply(`${client.emojis.cache.find(res => res.name === "ravgar_warning")} Hey Dur Bakalım! Oynamak istediğin değer kadar \`FunCoin\` coinin bulunmamakta.`)
            let win = false;
            let number = []
            for (i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }        
            if (number[0] == number[1] && number[1] == number[1]) { 
                argss *= 9
                win = true;
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
                argss *= 1.50
                win = true;
            }
            let text = `:slot_machine: Slot Oynanıyorrr..\n> Bakalım şanslımısın **${message.member.user.username} ?**\n> **Hazır Mısın...**`
            let text2 = text
            if(win) {
            text2 += `\n> ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\nOleeyy! **${argss}** \`FunCoin\` Kazandın!`;
           await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: argss, ruletGame: 1 } }, { upsert: true });
   
        } else {
            text2 += `\n> ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\nTüh Bee! **${argss}** \`FunCoin\` Kaybettin!`;
           await FunCountCoin.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { CoinCount: -argss, ruletGame: 1 } }, { upsert: true });
            }
            let mesaj = await message.channel.send(text)
            setTimeout(function(){
				mesaj.edit(text2)
			},1000);

                }    
      }
    }         
