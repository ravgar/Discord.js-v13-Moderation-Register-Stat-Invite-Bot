const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const FunCountCoin = require("../../Helper's/MongooseSchema/FunGame");
const { MessageEmbed } = require("discord.js");
const { set } = require("mongoose");
module.exports = { name: "funcoin", aliases: ["test"], category: "Client-owner",  desc: "Test Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
            const db = await FunCountCoin.findOne({ guildID: message.guild.id, userID: message.member.id });
            const coinCountUser = db ? db.CoinCount : 0;
            const yazıturaCountUser = db ? db.yazıtureGame : 0;
            const rulesCountUser = db ? db.ruletGame : 0;
            const Embedcik = new MessageEmbed().setDescription(`Sunucuda Toplam **${coinCountUser} ${Settings.guildName}** coinin bulunmakta.\n\n\`\`\`diff\n-Yazı-Tura ${yazıturaCountUser ||"0"} - Rulet ${rulesCountUser || "0"}\`\`\``).setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})) 
           if(!args[0]) return message.reply({embeds: [Embedcik]})    

            if(args[0] == "help") {
                const Embedcik = new MessageEmbed().addField(`FunCoin Nasıl Oynanır?`, `\`•\` ${Settings.Prefix}<cf/coinflip> <Miktar>`).addField(`Nasıl Coin Kazanacağım?`, `\`•\` 24 saatte bir kullabileceğin \`${Settings.Prefix}daily\` komutu ile \`0 - 500\` arasında coin kazanabilirsin.\n\`•\` Sunucumuza Üye davet ederek her bir üye \`75 FunCoin'e\` eşittir.\n\`•\` Tag alarak \`600 FunCoin\` kazanabilirsin.`).setDescription(`Selamlar \`${Settings.guildName}\` Üyeleri, \`FunCoin\` Sistemimiz hakkındaki bilgiler aşşağıda belirtilmiştir.`).setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})) 
                message.reply({embeds: [Embedcik]})    
    
            }
       }
      }
    }