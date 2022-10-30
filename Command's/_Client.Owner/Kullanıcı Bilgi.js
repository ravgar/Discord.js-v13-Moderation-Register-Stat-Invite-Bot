const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = { name: "kpanel", aliases: [], category: "Client-owner",  desc: "Kullanıcı Panel Kurulum Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
          const rowcuk = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('serverProfileUser').setLabel(`Sunucu Profili`).setStyle('SECONDARY'),
            new MessageButton().setCustomId('serverNameHistroy').setLabel(`İsim Geçmişi`).setStyle('SECONDARY'),
            new MessageButton().setCustomId('serverStatsUser').setLabel(`Ses & Mesaj İstatistikleri`).setStyle('SECONDARY'),
            new MessageButton().setCustomId('serverDavetUser').setLabel(`Davet İstatistikleri`).setStyle('SECONDARY'),// SECONDARY GRİ BOS BUTON
            new MessageButton().setCustomId('serverSicilUser').setLabel(`Ceza-i İşlem Bilgileri`).setStyle('DANGER')//DANGER KIRMIZI BUTON
            ,)
            client.channels.cache.get("1023197463160561676").send({ components: [rowcuk], content: `Selamlar, **${message.guild.name}** Üyeleri\nAşağıda bulunan panel üzerinden sunucu içerisindeki bilgilerini görüntüleyebilir ve kontrol ederbilirsin.\n\n__Bilgiler Hakkında Hata Oldugunu Düşünüyor isen Bunu Üst Yetkililerimizle Paylaşabilirsin__`})
        }}
      }

