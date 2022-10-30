const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Users = require("../Helper's/MongooseSchema/RegisteryNames")
module.exports = async (oldMember, newMember) => {  
    await newMember.guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" }).then(async (audit) => {
        const data = audit.entries.first();
        const target = data.target;
        const executor = data.executor;
        if (executor.bot) return;
  
        newMember.roles.cache.forEach(async (role) => {
          if (!oldMember.roles.cache.has(role.id)) {
            const Embed = new MessageEmbed()
            .setAuthor(newMember.displayName, newMember.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`${target} **-** (\`${target.id}\`) kullanıcısına yeni bir rol eklendi.`)
            .addField(`Ekleyen Kişi`, `${executor} **-** (\`${executor.id}\`)`)
            .addField(`Eklenen Rol`, `${role.toString()} **-** (\`${role.id}\`)`)
            client.channels.cache.find(a => a.name === "role_log").send({ embeds: [Embed] });
  
          };
        });
  
        oldMember.roles.cache.forEach(async (role) => {
          if (!newMember.roles.cache.has(role.id)) {
            const Embed = new MessageEmbed()
            .setAuthor(newMember.displayName, newMember.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setDescription(`${target} **-** (\`${target.id}\`) kullanıcısından bir rol alındı.`)
            .addField(`Alan Kişi`, `${executor} **-** (\`${executor.id}\`)`)
            .addField(`Alınan Rol`, `${role.toString()} **-** (\`${role.id}\`)`)
  
            client.channels.cache.find(a => a.name === "role_log").send({ embeds: [Embed] });
            };
        });
  
      });
  };
  

              module.exports.conf = {
    name: "guildMemberUpdate"
}