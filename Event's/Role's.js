const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Settings = require("../Helper's/Settings.json")
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const AutoReply = require("../Helper's/AutoRepy")
const moment = require("moment")
const ms = require('ms')
const { MessageEmbed, Discord } = require("discord.js");
module.exports = async message => {
  const prefix = [".", "!"]
  let client = message.client;
  const sunucu = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
  let Embed = new MessageEmbed().setColor("RANDOM").setFooter(`${Settings["Client.Bot.Footer"]}`)
  if (message.author.bot || message.channel.type === "dm") return;
let komut = [
  {name: Settings["Guild.Vip.Name"], role: Settings["Guild.Vip.Role"], aliases: []}
  //{name: "KOMUTADI", role: "ROLADI", aliases: ["EŞDEĞERKOMUTLAR"]}



];
if(!prefix.some(x => message.content.startsWith(x))) return
    let command = message.content.split(" ")[0].slice(1);
    let args = message.content.split(" ").slice(1);
let aliasess = komut.find(x=> x.aliases.includes(command));
var cmd = komut.find(x=> x.name == command);

if (cmd) {
  if(!message.member.roles.cache.has(Settings["Guild.Clown.Role"]) && !message.member.permissions.has("MANAGE_ROLES")) return message.reply(AutoReply.YetersizYetki)
  let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!victim || message.mentions.members.size < 1 && isNaN(args[0])) return message.reply(AutoReply.EksikArguman)
  
    if (!victim.roles.cache.has(cmd.role)) {
      victim.roles.add(cmd.role).catch(e => {});
      return message.reply({ embeds: [Embed.setDescription(`${victim} adlı üyeye <@&${cmd.role}> rolü verildi.`)] })

    } else {
      victim.roles.remove(cmd.role).catch(e => {});
      return message.reply({ embeds: [Embed.setDescription(`${victim} adlı üyeden <@&${cmd.role}> rolü alındı.`)] })
    };
  } else if(aliasess) {
      if(!message.member.roles.cache.has(Settings["Guild.Clown.Role"]) && !message.member.permissions.has("MANAGE_ROLES")) return message.reply(AutoReply.YetersizYetki)
      let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (!victim || message.mentions.members.size < 1 && isNaN(args[0])) return message.reply(AutoReply.EksikArguman)
    message.channel.send(`**Tüm argümanları doğru doldurunuz!** \`.${aliasess.name} @Ravgar/728161454288535604\` `)
  
      if (!victim.roles.cache.has(aliasess.role)) {
        victim.roles.add(aliasess.role).catch(e => {});
        return message.reply({ embeds: [Embed.setDescription(`${victim} adlı üyeye <@&${cmd.role}> rolü verildi.`)] })
  
      } else {
        victim.roles.remove(aliasess.role).catch(e => {});
        return message.reply({ embeds: [Embed.setDescription(`${victim} adlı üyeden <@&${cmd.role}> rolü alındı.`)] })
       
  
      };
  } 
  
  if(message.content.toLowerCase() == ".tag") 
  return message.reply({ embeds: [Embed.setDescription(` İsmine \` ₴ - Swagist \` Taglarımızı Alabilirsin.`)] })

  }
  
module.exports.conf = { name: "message"}