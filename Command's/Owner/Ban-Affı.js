const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
module.exports = { name: "ban-affı", aliases: ["banaffı", "aff"], category: "Owner", desc: "Tüm Banları Kaldırma Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        const banneds = await message.guild.bans.fetch()
        await banneds.forEach(async member => {
          await message.guild.members.unban(member.user.id, `[Toplu Ban Affı] - Yetkili: ${message.author.id} - ${message.author.tag}`) 
          message.reply("Tüm Banlar Açılıyor."), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
        });
        if (message) return;
      }
    }    