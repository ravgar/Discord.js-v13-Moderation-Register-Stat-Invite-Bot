const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
module.exports = { name: "yasaklitag", aliases: ["yasaklıtag", "ytag"],  category: "Owner", desc: "Yasaklı Tag Komutu",
    execute: async (client, message, args, author, channel, guild) => {
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        if(!message.member.permissions.has("8") && !Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoRepy.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        let Embedcik = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
          let cmd = args[0]
          let data = await YasaklıTag.find({ guildID: message.guild.id })
          if (cmd === 'ekle') {
              let hedef = args[1]
              if (!hedef ) return message.reply(`${AutoRepy.YasaklıTagBelirt}`)
              if (data && data.some(s => s.Tag === hedef)) return message.reply(`${AutoRepy.TagZatenVar}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
              let x = new YasaklıTag({
                  guildID: message.guild.id,
                  adminID: message.member.id,
                  Tag: hedef,
                  Date: Date.now()
              })
              x.save().then(s => {
                message.reply({ embeds: [Embedcik.setDescription(`\`${hedef}\` Tagı Başarılı Bir Şekilde Yasaklı-Tag kategorisine Eklendi \`${hedef}\` Tagında Bulunan \`${client.users.cache.filter(s => s.username.includes(hedef)).size}\` kişiye Yasaklı-Tag Rolünü Tanımlıyorum.`)] })
                  message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                      await m.roles.set([Server.bannedTagRole]).catch(e => {});
                      await m.setNickname('Yasaklı | Tag').catch(e => {})
                  })
              })
          } else if (cmd === 'liste') {
              if (!data) return message.reply(`Sunucuya ait yasaklı tag verisi bulunamadı!`)
              let map = data.length > 0 ? data.map((value, index) => `\`${value.Tag}\` -  \`${client.users.cache.filter(s => s.username.includes(value.Tag)).size} Kişi.\``).join('\n') : "Sunucuya ait veri bulunamadı."
              message.reply({ embeds: [Embedcik.setDescription(`Aşağıda belirtilen taglar ${message.guild.name} sunucusunda yasaklı durumdadır.
  ${map}
`)] })

          } else if (cmd === 'sil') {
              if (!data && !data.length) return message.reply({ embeds: [Embedcik.setDescription(`Yasaklı-Tag kategorisinde Hiçbir Yasaklanmış Tag bulunmadığı için işlem iptal edildi.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
              let hedef = args[1]
              if (!hedef) return;
              if (!data.some(s => s.Tag === hedef)) return message.reply({ embeds: [Embedcik.setDescription(`Belirttiğin Tag Yasaklı-Tag kategorisinde zaten bulunmuyor.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
  
              await YasaklıTag.deleteOne({ Tag: hedef }).then(s => {
                  message.reply({ embeds: [Embedcik.setDescription(`\`${hedef}\` tagı başarılı bir şekilde Yasaklı-Tag kategorisinden kaldırıldı.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

                  message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).forEach(async m => {
                      await m.roles.set("").catch(e => {});
                      await m.roles.add(Server.unregisterRole).catch(e => {});
                      await m.setNickname('• İsim | Yaş')
                  })
              }).catch(err => console.error('Silinemedi!'))

            } else if (cmd === 'bilgi') {
                let hedef = args[1]
                if (!hedef) return;
                if (!data.map(s => s.Tag).includes(hedef)) return message.channel.send(embed.setDescription(`Belirttiğiniz tag yasaklı listede bulunmamakta!`)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
                message.channel.send({ embeds: [Embedcik.setDescription(`
    **${hedef}** tagı ile ilgili bilgiler;
    Tagdaki üye sayısı: **${message.guild.members.cache.filter(s => s.user.tag.toLowerCase().includes(hedef)).size}**`)] })
    } else {
       
        message.channel.send(`${AutoRepy.İslemBelirtyTag}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    }  
    }
}    