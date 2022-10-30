const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
module.exports = { name: "ec-rolal", aliases: [], category: "Client-owner",  desc: "Rol-Alma Kurulum Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
          const rowcuk = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('etkinnlikKatilimcisi')
            .setLabel(`Etkinlik Katılımcısı`)
            .setStyle('SUCCESS')
            .setEmoji("904403680449667122"),
            new MessageButton()
            .setCustomId('cekilisKatilimcisi')
            .setLabel(`Çekiliş Katılımcısı`)
            .setStyle('DANGER')
            .setEmoji("740684333370703923"),)
            
            client.channels.cache.get("1023197463160561676").send({ components: [rowcuk], content: `Selamlar, **${message.guild.name}** Üyeleri\nÇekiliş katılımcısı alarak ${client.emojis.cache.find(x => x.name === "ravgar_nitro")} ${client.emojis.cache.find(x => x.name === "ravgar_netfix")} **Nitro**, **Exxen**, **BluTV** gibi çekilişlere katılıp ödüllerin sahibi olabilirsiniz.\nEtkinlik katılımcısı alarak çeşitli etkinliklerin yapıldığı anlarda herkesten önce haberdar olabilirsiniz ve çekilişlere önceden katılma hakkı kazanabilirsiniz.\n> \`NOT:\` Kayıtlı , kayıtsız olarak hepiniz bu kanalı görebilmektesiniz. Bu sunucumuzda everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.\n\n__Aşağıda ki butonlara basarak siz de bu ödülleri kazanmaya hemen başlayabilirsiniz!__`})
            message.reply(`Etkinlik,Çekiliş Katılımcısı Rol Alma Menüsü <#1023197463160561676> kanalına gönderildi.`), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)

          }}
      }