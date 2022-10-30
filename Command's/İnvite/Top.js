const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const moment = require("moment")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const inviteMemberSchema = require("../../Helper's/MongooseSchema/İnviteMember");
const { date } = require("zod");
module.exports = { name: "topdavet", aliases: [],  category: "User", desc: "Davetinizi Öğrenme Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const data = await inviterSchema.find({ guildID: message.guild.id }).sort({ total: -1 });
        if (!data.length) return message.channel.send(embed.setDescription("Herhangi bir invite verisi bulunamadı!"));
        const arr = [];
        data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
        const index = arr.findIndex((x) => x.id === message.author.id) + 1;
        const list = data.filter((x) => message.guild.members.cache.has(x.userID)).splice(0, 100).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` <@${x.userID}> toplam **${x.total}** üye davet etmiş.`).join("\n");
        const veri = await inviterSchema.findOne({ guildID: message.guild.id, userID: message.author.id });
        let Embedcik = new MessageEmbed().setColor("RANDOM").setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.channel.send({ embeds: [Embedcik.setDescription(`Aşağıda **${member.guild.name}** sunucusunun en iyi davet yapanların sıralaması belirtilmiştir.\n\n${list}\n\nSen ${index}. sıradasın! toplam **${veri.total}** üye davet etmişsin.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 30000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
       
    
    }
}    