const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const inviteMemberSchema = require("../../Helper's/MongooseSchema/İnviteMember");
module.exports = { name: "davetim", aliases: [],  category: "User", desc: "Davetinizi Öğrenme Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
        const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
        const total = inviterData ? inviterData.total : 0;
        const regular = inviterData ? inviterData.regular : 0;
        const bonus = inviterData ? inviterData.bonus : 0;
        const leave = inviterData ? inviterData.leave : 0;
        const fake = inviterData ? inviterData.fake : 0;
        const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
        const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
        const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;    
        let Embedcik = new MessageEmbed().setColor("RANDOM").setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        message.channel.send({ embeds: [Embedcik.setDescription(`
        Toplam **${total}** davetin var! (**${regular}** gerçek, **${leave}** ayrılmış, **${fake}** fake, **${weekly}** haftalık)
  `)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 20000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
       
    
    }
}    