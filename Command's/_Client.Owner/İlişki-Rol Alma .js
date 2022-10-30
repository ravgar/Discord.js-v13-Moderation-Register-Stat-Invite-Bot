const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = { name: "iliskimenu", aliases: [], category: "Client-owner",  desc: "İliski-Rol-Al Kurulum Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
          client.api.channels(Server.rolAlmaChannel).messages.post({
            data: {
            "content": `Aşağıda bulunan panelden ilişki rolünüzü seçebilirsin. `,
            "components": [{
            "type": 1, "components": [{
            "type": 3, "custom_id": "renks", "options": [
              { "label": "Lovers 💞", "value": "sewvra", "emoji": { "name": "💕" }, },
              { "label": "Alone 💔", "value": "sweyko", "emoji": { "name": "💔" }, },
              { "label": "LGBT 🌈", "value": "gayimbne", "emoji": { "name": "🌈" }, },
            {
            "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" },
            }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
            }],
          }]
        }
      })
      message.reply(`İlişki Rol Alma Menüsü <#${Server.rolAlmaChannel}> kanalına gönderildi.`), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)

    }
  }
}