const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "kilit", aliases: ["kilitle"],  category: "Co-owner", desc: "Kanal Kilitleme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
      let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
      let everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
        if (message.channel.permissionsFor(everyone).has('SEND_MESSAGES')) {
          await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: false });
          message.react("🔒")
          await message.reply({ content: `Kanal Kilitlendi.` }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        } else {
          await message.channel.permissionOverwrites.edit(everyone.id, { SEND_MESSAGES: null });
          message.react("🔓")
          await message.reply({ content: `Kanal Kilidi Açıldı.` }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        };
          
    }
}