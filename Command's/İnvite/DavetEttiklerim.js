const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const moment = require("moment")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const inviteMemberSchema = require("../../Helper's/MongooseSchema/İnviteMember");
const { date } = require("zod");
module.exports = { name: "davetettiklerim", aliases: [],  category: "User", desc: "Davetinizi Öğrenme Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const data = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
        const filtered = data.filter(x => message.guild.members.cache.get(x.userID));
        let Embedcik = new MessageEmbed().setColor("RANDOM").setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.channel.send({ embeds: [Embedcik.setDescription(
        filtered.length > 0 ? filtered.map((m, index) => `\`${index + 1}.\` <@${m.userID}>, (<t:${Math.floor(Math.floor(m.date) / 1000)}:R>), \`${m.inviteCode}\``).join("\n") : "Databasede Kayıtlı Davet Ettiğin Kullanıcı Bulunamadı.!")] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
       
    
    }
}    