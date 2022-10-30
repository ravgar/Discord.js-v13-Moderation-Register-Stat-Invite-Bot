const AutoReply = require("../../Helper's/AutoRepy")
const Settings = require("../../Helper's/Settings.json")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const boosterLimit = new Map();
const { MessageEmbed, Discord } = require("discord.js");
const ms = require("ms")
const moment = require("moment")
module.exports = { name: "booster", aliases: ["zengin", "rich"],   category: "User", desc: "Booster iseniz Komutla İsim Değiştirme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    const tag = message.member.user.username.includes(Server.sunucuTag) ? Server.sunucuTag : ("⦁" === "" ?  Server.sunucuTag : "⦁");
    if (Settings.boosterLimit > 0 && boosterLimit.has(message.author.id) && boosterLimit.get(message.author.id) == Settings.boosterLimit) return message.reply(`${AutoReply.boosterLimit}`).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    let Embed = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor("RANDOM");
    let isim = args.join(' ')
    if(!isim) return message.reply(AutoReply.BoosterİsimBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
    await message.member.setNickname(`${tag} ${isim}`)
    client.channels.cache.find(a => a.name === "booster-log").send({embeds: [Embed.setDescription(`${message.author} (\`${message.author.id}\`) adlı üye boostunu kullanarak kullanıcı adını \`${tag} ${isim}\` olarak değiştiris.`)] })
    message.channel.send({embeds: [Embed.setDescription(`Tebrikler kullanıcı adını \`${tag} ${isim}\` olarak değiştirdin.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)
    let isiml = `${tag} ${isim}`
    if (Settings.boosterLimit > 0) { if (!boosterLimit.has(message.author.id)) boosterLimit.set(message.author.id, 1);
      else boosterLimit.set(message.author.id, boosterLimit.get(message.author.id) + 1);
      setTimeout(() => { if (boosterLimit.has(message.author.id)) boosterLimit.delete(message.author.id);}, 1000 * 60 * 15)};  
        
        }
        
  }

    
    