const Database = require("../../Helper's/MongooseSchema/Member")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "afk", aliases: ["afkyım", "afkol"],  category: "User", desc: "Afk'ya Geçme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let reason = args.join(" ") || "Sebeb belirtilmedi!";
    let Embed = new MessageEmbed().setColor("RANDOM");
if(message.member.displayName.includes("[AFK]")) return
    if (reason.includes("discord.gg") || reason.includes("@everyone") || reason.includes("@here") || reason.includes(message.mentions.roles.first())) {
        message.delete({timeout: 10});
        message.reply({ embeds: [Embed.setDescription(`Afk moduna giriş yaparken afk sebebine rol veya link belirtemezsin`,{ disableMentions: "everyone" })] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`)
        return;};
Database.findOne({memberID: message.author.id}, (err, res)  => {
    if(!res) {
    new Database({Afk: true, Reason: reason, datenow: Date.now(), memberID: message.author.id}).save()
    } else {
        res.Reason = reason
        res.datenow = Date.now()
        res.save()
    }
    if ((message.author.manageable) && (message.author.displayName.length < 28)) author.setNickname(`[AFK] ${author.displayName}`).catch(err => message.channel.send(err.message));
    message.reply({ embeds: [Embed.setDescription(`${victim} başarılı bir şekilde afk moduna giriş yaptın. [ \`${reason}\` ]`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`)

    })    
 }
}