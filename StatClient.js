
const { Discord, Client, Collection, Intents, Guild } = require('discord.js');
const guildInvites = require("./Helper's/MongooseSchema/guildInvites");
const members = require("./Helper's/MongooseSchema/memberInvıte");
const İnviter = require("./Helper's/MongooseSchema/İnviter")
const { joinVoiceChannel } = require("@discordjs/voice");
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_INVITES] ,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'ROLE', "GUILD_MEMBER", "USER", "GUILD_INVITES", "MANAGE_GUILD"],
    });
const Settings = require("./Helper's/Settings.json")  
const inviteMemberSchema  = require("./Helper's/MongooseSchema/İnviteMember")
const inviterSchema = require("./Helper's/MongooseSchema/İnviter")
require("./Helper's/DatabaseHandler");
const { MessageEmbed } = require("discord.js");
const moment = require("moment")
var logs = require("discord-logs")
logs(client)
const { getVoiceConnection } = require('@discordjs/voice');
const sunucuVeri = require("./Helper's/MongooseSchema/_setup")
const MessageUserSchema = require("./Helper's/MongooseSchema/StatisticSchema/messageUserSchema")
const MessageGuildSchema = require("./Helper's/MongooseSchema/StatisticSchema/messageGuildSchema")
const MessageGuildChannelsSchema = require("./Helper's/MongooseSchema/StatisticSchema/messageGuildChannelsSchema")
const MessageUserChannelsSchema = require("./Helper's/MongooseSchema/StatisticSchema/messageUserChannelsSchema")
const VoiceUserSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceUserSchema")
const VoiceGuildSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceGuildSchema")
const VoiceGuildChannelSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceGuildChannelSchema")
const VoiceUserChannnelSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceUserChannelSchema")
const VoiceParentSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceUserParent")
const voiceJoinedAtSchema = require("./Helper's/MongooseSchema/StatisticSchema/voiceJoinedAtSchama")
const ParentsVoice = require("./Helper's/MongooseSchema/StatisticSchema/ParentsVoice")
client.on('ready', async () => {
  client.guilds.cache.forEach(async (guild) => {
    setInterval(() => {
      const connection = getVoiceConnection("965608031540899870");
            client.user.setActivity(Settings["Client.Bot.Activity"], {type: "STREAMING", url: "https://twitch.tv/ravgarcık"})
    }, 10000);
  })
});

client.on('messageCreate', async (message) => {
const prefix = Settings.TalentPrefix.find((x) => message.content.toLowerCase().startsWith(x));
if (message.author.bot || !message.guild || prefix) return;
await MessageUserSchema.findOneAndUpdate({ guildID: message.guild.id, userID: message.author.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
await MessageGuildSchema.findOneAndUpdate({ guildID: message.guild.id }, { $inc: { topStat: 1, dailyStat: 1, weeklyStat: 1, twoWeeklyStat: 1 } }, { upsert: true });
await MessageGuildChannelsSchema.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });
await MessageUserChannelsSchema.findOneAndUpdate({ guildID: message.guild.id,  userID: message.author.id, channelID: message.channel.id }, { $inc: { channelData: 1 } }, { upsert: true });});

client.on('voiceStateUpdate', async (oldState, newState) => {
  if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
  if (oldState.streaming && !newState.streaming) return 
  if (!oldState.streaming && newState.streaming) return 

  if (!oldState.channel  && newState.channelID) await voiceJoinedAtSchema.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
  let joinedAtData = await voiceJoinedAtSchema.findOne({ userID: oldState.id });
  if (!joinedAtData) await voiceJoinedAtSchema.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
  joinedAtData = await voiceJoinedAtSchema.findOne({ userID: oldState.id });
  if (!joinedAtData.date) return
  const data = Date.now() - joinedAtData.date;

  if (oldState.channel  && !newState.channelID) {
    await saveData(oldState, oldState.channel, data);
    await voiceJoinedAtSchema.deleteOne({ userID: oldState.id });
  } else if (oldState.channel  && newState.channelID) {
    await saveData(oldState, oldState.channel, data);
    await voiceJoinedAtSchema.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
  }
  async function saveData(user, channel, data) {
    await VoiceUserSchema.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data , oneMonthStat: data } }, { upsert: true });
    await VoiceGuildSchema.findOneAndUpdate({ guildID: user.guild.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data, oneMonthStat: data } }, { upsert: true });
    await VoiceGuildChannelSchema.findOneAndUpdate({ guildID: user.guild.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    await VoiceUserChannnelSchema.findOneAndUpdate({ guildID: user.guild.id, channelWeekly: channel.id,  twoWeeklyStat: data, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    if (channel.parent) await VoiceParentSchema.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentId, parentName: channel.parent.name }, { $inc: { parentData: data } }, { upsert: true });
    if (channel.parent) await ParentsVoice.findOneAndUpdate({ guildID: user.guild.id, userID: user.id, parentID: channel.parentıd }, { $inc: { parentData: data } }, { upsert: true });
  }
  
  
  });


client
	.login(Settings["Client.Statistic.Token"])
	.then(() => console.log("Statistic_Client Aktif!"))
	.catch(() => console.log("Statistic_Client Aktif Edilemedi!"));
