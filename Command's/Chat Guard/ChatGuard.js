const moment = require("moment");
require("moment-duration-format");
moment.locale('tr');
const messageGuild = require("../../Helper's/MongooseSchema/StatisticSchema/messageGuildSchema");
const messageGuildChannel = require("../../Helper's/MongooseSchema/StatisticSchema/messageGuildChannelsSchema");
const voiceGuild = require("../../Helper's/MongooseSchema/StatisticSchema/voiceGuildSchema");
const messageUser = require("../../Helper's/MongooseSchema/StatisticSchema/messageUserSchema");
const voiceUser = require("../../Helper's/MongooseSchema/StatisticSchema/voiceUserSchema");
const voiceGuildChannel = require("../../Helper's/MongooseSchema/StatisticSchema/voiceGuildChannelSchema");
const Settings = require("../../Helper's/Settings.json")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const RegisterData = require("../../Helper's/MongooseSchema/Registeryy")
const ms = require("ms")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const AutoRepy = require("../../Helper's/AutoRepy");
const ChatGuard = require("../../Helper's/MongooseSchema/chatGuard")
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = { name: "testesdss", aliases: ["reklamEngel"],   category: "Chat-Guard", desc: "---",
    execute: async (client, message, args, FlatEmbed) => { 
      let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      let bıdıbıdıyapmakıral = await ChatGuard.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
      let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM").setDescription(`
Hey! \`${message.guild.name}\` sunucusunun chat-guard ayarları aşağıda belirtilmiştir.      

Reklam Engel: __${bıdıbıdıyapmakıral.reklamEngel ? '**Açık** 🟢' : '**Kapalı** 🔴'}__
Küfür Engel: __${bıdıbıdıyapmakıral.küfürEngel ? '**Açık** 🟢' : '**Kapalı** 🔴'}__
Spam Engel: __YAPIM AŞAMASI__
`)
        message.reply({embeds: [Embed]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

      

    }}
        