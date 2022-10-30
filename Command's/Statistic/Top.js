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
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = { name: "top", aliases: ["topstat"],   category: "User", desc: "Sunucu içerisindeki top istatistikleri görüntüle",
    execute: async (client, message, args, FlatEmbed) => { 
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;        
        const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
        const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
        const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
        const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
        const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
        const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
        let ClientEmbed = new MessageEmbed().setColor("RANDOM").setFooter(Settings["Client.Bot.Footer"]).setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        const messageChannels = messageChannelData.splice(0, 5).map((x, index) => `\`${index == 0 ? `👑` : `${index == 0 ? `👑` : `${index+1}.`}`}\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n");
        const messageChannelsName = messageChannelData.splice(0, 5).map((x, index) => `\`•\` #${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : x.channelID } \`${Number(x.channelData).toLocaleString()}\``).join("\n");
        const voiceChannels = voiceChannelData.splice(0, 5).map((x, index) => `\`•\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n");
        const voiceChannelsName = voiceChannelData.splice(0, 5).map((x, index) => `\`•\` #${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : x.channelID } \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n");
        const messageUsers = messageUsersData.splice(0, 5).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join("\n");
        const voiceUsers = voiceUsersData.splice(0, 5).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join("\n");
        const DavetData = await inviterSchema.find({ guildID: message.guild.id }).sort({ total: -1 });
        const DavetSıralama = DavetData.splice(0, 5).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` <@${x.userID}> toplam **${x.total}** üye davet etmiş.`).join("\n");
        let Registery = await RegisterData.find({guildID: message.guild.id}).sort({ teyitler: "descending" });
        const TopTeyit = Registery.splice(0, 5).map((x, index) => `\`${index == 0 ? `👑` : `${index+1}.`}\` <@${x.execID}> toplam teyitleri \`${x.erkek + x.kari}\` (\`${x.erkek}\` Erkek, \`${x.kari}\` Kadın)`).join("\n");
           ClientEmbed.setDescription(`${message.guild.name} sunucusunun toplam ses ve chat bilgileri gösterilmektedir.`)
                                .addField(`Toplam Ses Sıralaması`,`Toplam ses aktifliği \`${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`\n\n${voiceUsers.length > 0 ? voiceUsers : ""}`)
                                .addField(`Toplam Ses Kanal Sıralaması`,`Toplam ses aktifliği \`${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`\n\n${voiceChannelsName.length > 0 ? voiceChannelsName : ""}`)
                                .addField(`Toplam Mesaj Sıralaması`,`Toplam gönderilen mesaj sayısı: \`${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`\n\n${messageUsers.length > 0 ? messageUsers : ""}`)
                                .addField(`Toplam Mesaj Kanal Sıralaması`,`Toplam gönderilen kanal mesaj sayısı: \`${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`\n\n${messageChannelsName.length > 0 ? messageChannelsName : ""}`)
                                .addField(`Toplam Top-Teyit Sıralaması`,`Toplam kaydedilen kullanıcı sayısı: \`#HATA teyit!\`\n\n${TopTeyit.length > 0 ? TopTeyit : ""}`)
                                .addField(`Toplam Davet Sıralaması`,`Toplam davet edilen kullanıcı sayısı: \`#HATA teyit!\`\n\n${DavetSıralama.length > 0 ? DavetSıralama : ""}`)

                              
                                message.reply({ embeds: [ClientEmbed] }).then(e => setTimeout(() => e.delete().catch(() => { }), 15000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`);
                              }
                          
            }
        