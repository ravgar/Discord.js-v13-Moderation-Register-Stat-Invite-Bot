
const { Discord, Client, Collection, Intents, Guild } = require('discord.js');
const guildInvites = require("./Helper's/MongooseSchema/guildInvites");
const members = require("./Helper's/MongooseSchema/memberInvıte");
const İnviter = require("./Helper's/MongooseSchema/İnviter")
const sunucuVeri = require("./Helper's/MongooseSchema/_setup")
const { getVoiceConnection } = require('@discordjs/voice');
const CoinsSchema = require("./Helper's/MongooseSchema/StatisticSchema/CoinSchema")
const client3 = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_INVITES] ,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'ROLE', "GUILD_MEMBER", "USER", "GUILD_INVITES", "MANAGE_GUILD"],
    });
const Settings = require("./Helper's/Settings.json")  
const inviteMemberSchema  = require("./Helper's/MongooseSchema/İnviteMember")
const inviterSchema = require("./Helper's/MongooseSchema/İnviter")
const chatguard = require("./Helper's/MongooseSchema/chatGuard")
require("./Helper's/DatabaseHandler");
require("./Helper's/Function")(client3)
const { MessageEmbed } = require("discord.js");
const moment = require("moment")
var logs = require("discord-logs")
logs(client3)
const FunCountCoin = require("./Helper's/MongooseSchema/FunGame")

client3.on('ready', async () => {
  client3.guilds.cache.forEach(async (guild) => {
    setInterval(() => {
      const connection = getVoiceConnection("965608031540899870");
            client3.user.setActivity(Settings["Client.Bot.Activity"], {type: "STREAMING", url: "https://twitch.tv/ravgarcık"})
    }, 10000);

      const inviteData = await guildInvites.findOne({ guildID: Settings.guildID });
      const memberData = await members.findOne({ guildID: Settings.guildID });
      if (!inviteData) console.log("Sunucu ayarları başarıyla yüklendi! artık kurulum yapabilirsiniz!"),await new members({ guildID: Settings.guildID }).save()
      const chatguardd = await chatguard.findOne({ guildID: Settings.guildID });
      if (!chatguardd) console.log("Chat Guard ayarları yapıldı!"),await new chatguard({ guildID: Settings.guildID }).save()

  
      const fetchedInvites = await guild.invites.fetch();
      if (!inviteData && !memberData) {
          await guild.invites.fetch().then(invites => {
              new guildInvites({
                  guildID: guild.id,
                  invites: new Map(invites.map(invite => [invite.code, invite.uses]))
              }).save();
          });
          new members({
              guildID: guild.id,
          }).save();
      } else {
          await guildInvites.findOneAndUpdate({ guildID: guild.id }, { $set: { invites: new Map(fetchedInvites.map(invite => [invite.code, invite.uses])) } }, { upsert: true });
      }
  });
});

client3.on('inviteCreate', async (invite) => {
  const inviteData = await guildInvites.findOne({ guildID: invite.guild.id });
  if (!inviteData) {
      await invite.guild.invites.fetch().then(invites => {
          new guildInvites({
              guildID: invite.guild.id,
              invites: new Map(invites.map(inv => [inv.code, inv.uses]))
          }).save();
      });
      return;
  }
  inviteData.invites.set(invite.code, invite.uses);
  await inviteData.save();
});
client3.on('inviteDelete', async (invite) => {
  const inviteData = await guildInvites.findOne({ guildID: invite.guild.id });
  if (!inviteData) {
      await invite.guild.invites.fetch().then(invites => {
          new guildInvites({
              guildID: invite.guild.id,
              invites: new Map(invites.map(inv => [inv.code, inv.uses]))
          }).save();
      });
      return;
  }
  inviteData.invites.delete(invite.code);
  await inviteData.save();
});

client3.on('guildMemberAdd', async (member) => {
  let Server =  sunucuVeri.findOne({ guildID: client3.guilds.cache.get(Settings.guildID) })
  let inviteChannelID = await sunucuVeri.findOne({}).then(x => x.inviteLogChannel);
  const inviteData = await guildInvites.findOne({ guildID: member.guild.id });
  const memberData = await members.findOne({ guildID: member.guild.id });
  if (!inviteData) {
      await member.guild.invites.fetch().then(invites => {
          new guildInvites({
              guildID: member.guild.id,
              invites: new Map(invites.map(inv => [inv.code, inv.uses]))
          }).save();
      });
      return;
  }
  const newInvites = await member.guild.invites.fetch();
  const invite = newInvites.filter(inv => inv.uses != inviteData.invites.get(inv.code)).first() || { code: member.guild.vanityURLCode, uses: 0 };
  if (invite && !invite.code) return;
  const inviter = (invite.code == member.guild.vanityURLCode) ? { user: { tag: member.guild.name, id: member.guild.vanityURLCode }, id: member.guild.vanityURLCode } : member.guild.members.cache.get(invite.inviter.id);
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
  if (isMemberFake) {
    await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviteCode: invite.code, inviter: invite.inviter.id, date: Date.now() } }, { upsert: true });
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, fake: 1 } }, { upsert: true })
    client3.channels.cache.get("İNVİTE KANAL İD").send(`${member} (\`${member.id}\`) Kullanıcısıyla beraber \`${member.guild.memberCount}\` Kişi Olduk. **Davet Eden: ${inviter === member.guild.id ? member.guild.name : inviter}** 🕵`).catch(err => {});
    await CoinsSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { TotalCoinYT: 3, TotalCoinYT: 3, InvıteCoin: 3 } }, { upsert: true })  
  } else {
    if(invite.code == "ÖZEL URLNİZ") return client3.channels.cache.get("İNVİTE KANAL İD").send(`${member}  (\`${member.id}\`) Kullanıcısıyla beraber \`${member.guild.memberCount}\` Kişi Olduk. **Davet Eden: "ÖZELURL"`).catch(err => {});
    await inviteMemberSchema.findOneAndUpdate({ guildID: member.guild.id, userID: member.user.id }, { $set: { inviteCode: invite.code, inviter: invite.inviter.id || "URL", date: Date.now() } }, { upsert: true });
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { total: 1, regular: 1 } }, { upsert: true })
    await CoinsSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { TotalCoinYT: 6, TotalCoinYT: 6, InvıteCoin: 6 } }, { upsert: true })  
    client3.channels.cache.get("İNVİTE KANAL İD").send(`${member}  (\`${member.id}\`) Kullanıcısıyla beraber \`${member.guild.memberCount}\` Kişi Olduk. **Davet Eden: ${inviter === member.guild.id ? member.guild.name : inviter}** ✅`).catch(err => {});
    await FunCountCoin.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { CoinCount: 75 } }, { upsert: true });
  }
  if (invite.code) {
      inviteData.invites.set(invite.code, invite.uses);
      await inviteData.save();
  }

  memberData.members.set(member.id, { inviter: inviter, invite: invite });
  await memberData.save();

});

client3.on('guildMemberRemove', async (member) => {
  let Server =  sunucuVeri.findOne({ guildID: client3.guilds.cache.get(Settings.guildID) })
  let inviteChannelID = await sunucuVeri.findOne({}).then(x => x.inviteLogChannel);
  let isMemberFake = (Date.now() - member.user.createdTimestamp) < 7 * 24 * 60 * 60 * 1000;
  const inviteData = await guildInvites.findOne({ guildID: member.guild.id });
  const memberData = await members.findOne({ guildID: member.guild.id });
  if (!inviteData) return;
  if (!memberData) return;
  const data = memberData.members.get(member.id);
  if (!data) return client3.channels.cache.get("İNVİTE KANAL İD").send(`${member.user.tag} Kullanıcısı sunucudan ayrıldı **Davet Eden: Bulunamadı.** `)
  const invite = data.invite;
  const inviter = data.inviter == member.guild.vanityURLCode ? { user: { tag: member.guild.name, id: member.guild.vanityURLCode }, id: member.guild.vanityURLCode } : member.guild.members.cache.get(data.inviter);
  if (!inviter) return;
  if (isMemberFake) {
    client3.channels.cache.get("İNVİTE KANAL İD").send(`${member}  (\`${member.id}\`) Kullanıcısı Sunucudan Ayrıldı \`${member.guild.memberCount}\` Kişi Kaldık. **Davet Eden: ${inviter === member.guild.id ? member.guild.name : inviter}** 🕵`).catch(err => {});
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    await CoinsSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { TotalCoinYT: -3, TotalCoinYT: -3, InvıteCoin: -3 } }, { upsert: true })  
  } else {
    client3.channels.cache.get("İNVİTE KANAL İD").send(`${member}  (\`${member.id}\`) Kullanıcısı Sunucudan Ayrıldı \`${member.guild.memberCount}\` Kişi Kaldık. **Davet Eden: ${inviter === member.guild.id ? member.guild.name : inviter}** 🏃`).catch(err => {});
    await inviterSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { leave: 1, total: -1 } }, { upsert: true });
    await CoinsSchema.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { TotalCoinYT: -6, TotalCoinYT: -6, InvıteCoin: -6} }, { upsert: true })  
    await FunCountCoin.findOneAndUpdate({ guildID: member.guild.id, userID: inviter.id }, { $inc: { CoinCount: -75 } }, { upsert: true });

  }
  memberData.members.delete(member.id);
   await memberData.save();

});

client3
	.login("invite token gir")
	.then(() => console.log('Invıte_Client Aktif!'))
	.catch(() => console.log("Invıte_Client Aktif Edilemedi!"));
