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
const ChatGuard = require("../../Helper's/MongooseSchema/chatGuard")
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
const AutoRepy = require("../../Helper's/AutoRepy");
module.exports = { name: "küfürengel", aliases: ["küfür-engel"],   category: "Chat-Guard", desc: "---",
    execute: async (client, message, args, FlatEmbed) => { 
      let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      if(!message.member.permissions.has("8") &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 

      let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
      if (!args[0]) return message.reply(AutoRepy.ArgumanBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
      if(args[0].toLowerCase() === "aç") {
        await ChatGuard.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { küfürEngel: true }, {upsert: true});
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} Küfür Koruması Başarılı Bir Şekilde Aktif edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

      } else if (args[0].toLowerCase() === "kapat") {
        await ChatGuard.findOneAndUpdate({guildID: client.guilds.cache.get(Settings.guildID) }, { küfürEngel: false }, {upsert: true});
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_tik")} Küfür Koruması Başarılı Bir Şekilde De-Aktif edildi.`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

      }
    }                  
            }
        