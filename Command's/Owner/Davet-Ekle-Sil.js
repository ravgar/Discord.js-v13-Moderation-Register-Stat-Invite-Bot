const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const moment = require("moment")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const inviteMemberSchema = require("../../Helper's/MongooseSchema/İnviteMember");
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
module.exports = { name: "davet", aliases: ["invite", "bonus"], category: "Owner", desc: "Kullanıcıya Bonus Davet Ekleme",
    execute: async (client, message, args, author, channel, guild) => {
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        if (args[0] === "ekle" || args[0] === "add") {
          const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
          if (!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)  
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        const Miktar = args[2];
        if (!Miktar) return message.reply(AutoRepy.MiktarBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { total: parseInt(Miktar), bonus: parseInt(Miktar) } }, { upsert: true });
        message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} ${member} adlı üyeye **${Miktar}** bonus davet eklendi.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
      } else if (args[0] === "sil" || args[0] === "delete") {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return;
        const Miktar = args[2];
        if (!Miktar) return message.reply(AutoRepy.MiktarBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        const data = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
        if (!data) return message.reply(AutoRepy.DataBulunmadıInvıte).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $inc: { total: -parseInt(Miktar), bonus: -parseInt(Miktar) } }, { upsert: true });
        message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} ${member} adlı üyesinden **${Miktar}** davet silindi!.`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
      } else if (args[0] === "sorgu" || args[0] === "query") {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1]);
        if (!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        const data = await inviteMemberSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
        if (!data) return message.reply(AutoRepy.kisiBulunamadıInvıte).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        const inviter = await client.users.fetch(data.inviter);
        message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_soru")} Kullanıcı: ${member.toString()} - (\`${member.id}\`)\n${client.emojis.cache.find(x => x.name === "ravgar_beyazboncuk")} Tarih: \`${moment(data.date).locale("tr").format("LLL")}\` (<t:${Math.floor(Math.floor(data.date) / 1000)}:R>)\n${client.emojis.cache.find(x => x.name === "ravgar_warning")} Davet Eden: (${inviter} (\`${inviter.id})\`)`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
      }
    },
    }    