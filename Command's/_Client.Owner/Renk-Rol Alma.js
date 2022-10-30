const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');

module.exports = { name: "renk", aliases: [], category: "Client-owner",  desc: "Renk-Rol-Alma Komutus",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
          client.api.channels("1023197463160561676").messages.post({
            data: {
            "content": `Aşağıda bulunan panelden dilediğiniz renk rolünü seçebilirsin. `,
            "components": [{
            "type": 1, "components": [{
            "type": 3, "custom_id": "renks", "options": [
              { "label": "Yesil", "value": "yesil", "emoji": { "name": "🍏" }, },
              { "label": "Kırmızı", "value": "kirmizi", "emoji": { "name": "🍓" }, },
              { "label": "Sarı", "value": "sari", "emoji": { "name": "🍋" }, },
              { "label": "Mor", "value": "mor", "emoji": { "name": "🍇" }, },
              { "label": "Turuncu", "value": "turuncu", "emoji": { "name": "🍑" }, },
              { "label": "Kahverengi", "value": "kahverengi", "emoji": { "name": "🥥" }, },

            {
            "label": "Rol İstemiyorum", "value": "rolsil", "emoji": { "name": "🗑️" },
            }], "placeholder": "Renk Rolleri", "min_values": 1, "max_values": 1
            }],
          }]
        }
      })
      message.reply(`Renk Rol Alma Menüsü <#${"1023197463160561676"}> kanalına gönderildi.`), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    }
  }
}