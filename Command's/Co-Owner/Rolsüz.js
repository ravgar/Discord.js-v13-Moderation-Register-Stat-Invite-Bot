const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "roles", aliases: ["rolsüz"],  category: "Co-owner", desc: "Rolsüz Kullanıcılara Kayıtsız Rolü Verme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
      let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))   
      let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
      let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
      if (args[0] == "add") {
          bg.forEach(r => {
              r.roles.add(Server.unregisterRole)
          });
          message.reply({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_beyazboncuk")} Sunucuda Rolü Olmayan Kullanıcılara <@&${Server.unregisterRole}> rolü tanılandı. (\`${bg.size}\`)`)] }).catch((err) => console.log(err), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)).then(e => setTimeout(() => e.delete().catch(() => { }), 20000))
      } else if (!args[0]) {
          message.reply({ embeds: [Embed.setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_beyazboncuk")} Sunucuda Rolsüzlere Verilmek için Tanımlanan Rol;
${client.emojis.cache.find(x => x.name === "ravgar_beyazboncuk")} Unregister Rol: <@&${Server.unregisterRole}>
${client.emojis.cache.find(x => x.name === "ravgar_beyazboncuk")} Sunucuda Rolü Bulunmayan Kullanıcı Sayısı \`${bg.size}\`
          
          Kullanıcılara Rolü Vermek için \`.roles add\` komutunu uygula.`)] }).catch((err) => console.log(err), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)).then(e => setTimeout(() => e.delete().catch(() => { }), 25000))
      }
  }
}
