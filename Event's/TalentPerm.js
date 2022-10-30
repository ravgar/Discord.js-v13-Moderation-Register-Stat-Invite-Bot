const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const ms = require("ms")
const talentPerms = require("../Helper's/MongooseSchema/talentPerm")
const data = require("../Helper's/MongooseSchema/Komut-engel");
const AutoRepy = require("../Helper's/AutoRepy");
module.exports = async (message) => {  
    if (!message.guild || message.channel.type === "dm") return;
    const prefixes = Settings.TalentPrefix
    let prefix = prefixes.filter(p => message.content.startsWith(p))[0];
    if (!prefix) return;
    let data = await talentPerms.find({guildID: message.guild.id}) || [];
    let ozelkomutlar = data;
    let yazilanKomut = message.content.split(" ")[0];
    yazilanKomut = yazilanKomut.slice(prefix.length);
    var args = message.content.split(" ").slice(1);
  
    let komut = ozelkomutlar.find(x => x.komutAd.toLowerCase() === yazilanKomut);
    if (!komut) return;
  
    let verilenRol = message.guild.roles.cache.some(rol => komut.verilcekRol.includes(rol.id));
    if (!verilenRol) return;
  
    let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    if (message.member.roles.cache.some(rol => komut.YetkiliRol.includes(rol.id))  || message.member.permissions.has(8)) {
      if (!üye) return message.reply(AutoRepy.UyeBelirt)
      if(!komut.verilcekRol.some(rol => üye.roles.cache.has(rol))) { 
        üye.roles.add(komut.verilcekRol)
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"}`)
        message.channel.send({ embeds: [new MessageEmbed().setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} Başarılı şekilde ${üye} kişisine ${komut.verilcekRol.map(x => `<@&${x}>`)} rolünü verdim!`)]})
        client.channels.cache.find(a => a.name === "role-log").send({ embeds: [new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 })).setFooter(Settings["Client.Bot.Footer"]).setDescription(`${üye} üyesine rol(ler) **Eklendi**\n\n**Rolü ekleyen kişi:** ${message.author} (\`${message.author.id}\`)\n**Eklenen Rol(ler):** ${komut.verilcekRol.map(x => `<@&${x}>`)} (\`${komut.verilcekRol.map(x => `${x}`)}\`)\n**Eklenme Tarihi:** \`${moment(Date.now()).locale("tr").format("LLL")}\`\n\n \`${Settings.Prefix}rollog ${üye.user.id}\``)]})
  
    } else { 
        üye.roles.remove(komut.verilcekRol)
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"}`)
        message.channel.send({ embeds: [new MessageEmbed().setDescription(`${client.emojis.cache.find(x => x.name === "ravgar_tik") || "Emoji Bulunamadı"} Başarılı şekilde ${üye} kişisinden ${komut.verilcekRol.map(x => `<@&${x}>`)} rolünü aldım!`)]})
        client.channels.cache.find(a => a.name === "role-log").send({ embeds: [new MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, size: 1024 })).setFooter(Settings["Client.Bot.Footer"]).setDescription(`${üye} üyesinden rol(ler) **Alındı**\n\n**Rolü alan kişi:** ${message.author} (\`${message.author.id}\`)\n**Alınan Rol(ler):** ${komut.verilcekRol.map(x => `<@&${x}>`)} (\`${komut.verilcekRol.map(x => `${x}`)}\`)\n**Alınma Tarihi:** \`${moment(Date.now()).locale("tr").format("LLL")}\`\n\n \`${Settings.Prefix}rollog ${üye.user.id}\``)]})
    }
    }
}  
module.exports.conf = {
    name: "messageCreate"
}