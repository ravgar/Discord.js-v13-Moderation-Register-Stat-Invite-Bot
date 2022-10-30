const Settings = require("../../Helper's/Settings.json")
const AutoReply = require("../../Helper's/AutoRepy")
const YasaklıTag = require("../../Helper's/MongooseSchema/YasaklıTag")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const {Discord, MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const { MessageEmbed } = require("discord.js");
module.exports = { name: "sil", aliases: ["temizle"],  category: "Co-owner", desc: "Kanaldaki Mesajları Silme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!member) {
        if (!args[0] || (args[0] && isNaN(args[0])) || Number(args[0]) < 1 || Number(args[0]) > 100) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi")).catch(() => { })

        message.channel.bulkDelete(Number(args[0])).then(msg => message.channel.send(`${message.channel} Kanalından **${msg.size}** adet mesaj temizlendi!`)).catch(() => { }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
    } else {

        if (!args[1] || (args[1] && isNaN(args[1])) || Number(args[1]) < 1 || Number(args[1]) > 100) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi")).catch(() => { })

        let messages = message.channel.messages.fetch({ limit: args[1] })

        let memberMessage = (await messages).filter((s) => s.author.id === member.id)

        await message.channel.bulkDelete(memberMessage).then(msg => message.channel.send(`${member} Kullanıcısına ait **${msg.size}** adet mesaj temizlendi!`)).catch(() => { }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

    }



}
}