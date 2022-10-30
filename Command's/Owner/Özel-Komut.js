const { MessageEmbed } = require("discord.js");
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const talentPerms = require("../../Helper's/MongooseSchema/talentPerm")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const moment = require("moment") 
module.exports = { name: "özelkomut", aliases: ["permkurulum", "talent-perm"],  category: "Owner", desc: "---------",
    execute: async (client, message, args, author, channel, guild) => {
        let embed = new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }));
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        if (!Settings["Bot.Owner"].some(x => x === message.author.id)) return
        if(!args[0]) return message.channel.send((`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} \`Hatalı İşlem\` Bir Argüman Belirt \`(ekle,sil,list)\` `))
        if (args[0] === "oluştur" || args[0] === "ekle") {
          let komutAd = args[1];
          if (!komutAd) return message.reply({ embeds: [embed.setDescription(` Bir komut adı belirlemelisin!`)]})
          let args2 = args.splice(2).join(" ").split(" - ");
          if(!args2) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} \`Hatalı İşlem\` Komutu örnekteki gibi kullanın \`${Settings}permkurulum KomutAdı Verilecek Rol - Yetkili Rol\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
          let roller = args2[0].split(" ").map(rol => message.guild.roles.cache.get(rol.replace("<@&", "").replace(">", "")));
          if (!roller) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} \`Hatalı İşlem\` Komutu örnekteki gibi kullanın \`${Settings}permkurulum KomutAdı Verilecek Rol - Yetkili Rol\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
          let yetkiliRol = args2[1].split(" ").map(rol => message.guild.roles.cache.get(rol.replace("<@&", "").replace(">", "")));
          if (!yetkiliRol) return message.channel.send(`${client.emojis.cache.find(x => x.name === "ravgar_carpi") || "Emoji Bulunamadı"} \`Hatalı İşlem\` Komutu örnekteki gibi kullanın \`${Settings}permkurulum KomutAdı Verilecek Rol - Yetkili Rol\``).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
          let talents = await talentPerms.findOne({
              guildID: message.guild.id, komutAd: komutAd});
          if (talents) return message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`Bu isimde bir komut zaten mevcut!`)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
          let newData = talentPerms({ guildID: message.guild.id, komutAd: komutAd,verilcekRol: roller,YetkiliRol: yetkiliRol,EkleyenYetkili: message.author.id});
          newData.save();
          client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(Date.now()).locale("tr").format("LLL")}\`] :wrench: \`${message.author.tag}\` adlı üye \`${komutAd}\` isimli bir özel komut oluşturdu.`)
          message.channel.send({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(` \`${komutAd}\` adlı komut başarılı bir şekilde oluşturuldu.\nVerilecek Rol: ${roller}\nKomut İzni Olan Roller: ${yetkiliRol}`)] })
      } else if (args[0] === "list" || args[0] === "list" || args[0] === "incele" || args[0] === "bilgi") {
        let data = await talentPerms.find({});
        let data2 = await talentPerms.findOne({guildID: message.guild.id, komutAd: args[1]});
        if (!data2) return message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`Lütfen Bir Komut Adı Belirterek Yeniden Dene.\n\nKomutlar Sıraysıyla aşağıda listlenmiştir.\n\`${data.map(x => x.komutAd).join("\n")}\``)]}).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
        message.channel.send({ embeds: [embed.setDescription(`\nKomut adı : \`${data2.komutAd}\`\nVerilerek Olan Rol(ler): ${data2.verilcekRol.length > 0 ? data2.verilcekRol.map(x => `<@&${x}>`) : "Kayıtlı Bir Rol Bulunamadı."}\nomut İzni Olaran Yetkilil Rol(ler) : ${data2.YetkiliRol.length > 0 ? data2.YetkiliRol.map(x => `<@&${x}>`) : "Kayıtlı Bir Rol Bulunamadı."}\nKomutu Ekleyen Kullanıcı: <@${data2.EkleyenYetkili}> (\`${data2.EkleyenYetkili}\`)`)]})
      } else if (args[0] === "sil" || args[0] === "kaldır") {
        let data = await talentPerms.find({});
        let data2 = await talentPerms.findOne({ guildID: message.guild.id, komutAd: args[1]})
        if(!data2) return message.reply({ embeds: [embed.setFooter(Settings["Client.Bot.Footer"]).setDescription(`Silmek İstediği Komutu Belirt.\n\nKomutlar;\n\`${data.map(x => x.komutAd).join("\n")}\``)]})
        await talentPerms.deleteOne({ guildID: message.guild.id, komutAd: args[1]})
        await message.channel.send(` \`${args[1]}\` isimli komut başarılı bir şekilde silindi!`)}}}
