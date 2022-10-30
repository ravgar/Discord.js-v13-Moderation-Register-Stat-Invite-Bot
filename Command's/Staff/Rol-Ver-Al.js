const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const rollogg = require("../../Helper's/MongooseSchema/roleLog");
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "vip", aliases: ["r"],  category: "Staff", desc: "Kullanıcıya Rol Verme/Alma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if(!message.member.permissions.has("8") && !Server.yönetimRoles.some(rol => message.member.roles.cache.has(rol)) &&!Server.ownerRoles.some(rol => message.member.roles.cache.has(rol))) return message.reply(AutoReply.YetersizYetki).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    
    let Embed = new MessageEmbed().setFooter(`${Settings["Client.Bot.Footer"]}`).setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    if (!args[0]) return message.reply(AutoRepy.ArgumanBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
    if(args[0].toLowerCase() === "ver") {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
        if(!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!role) return message.reply(AutoRepy.RolBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        if (Server.rolverYasaklıRoller.some(x => x == role.id)) return message.reply(AutoRepy.yasaklıRol).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        if(role.position >= message.member.roles.highest.position) return message.reply(AutoRepy.YetkindenYüksekRol).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        if(member.roles.cache.has(role.id)) return message.reply(AutoRepy.kullanıcıdaRolMevcuk).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
        member.roles.add(role.id)
        new rollogg({Rol: role.id,ExecID: message.member.id, emoji: "EKLENDİ.",Date: Date.now(),victimID: member.id}).save()
        message.reply({ embeds: [Embed.setDescription(`${member} kişisine ${message.author} tarafından ${role} rolü verildi!`)]})
        client.channels.cache.find(a => a.name === "role-log").send({ embeds: [Embed.setDescription(`${member} kişisine ${message.author} tarafından ${role} rolü verildi!`)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 

    } else if (args[0].toLowerCase() === "al") {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[1])
            if(!member) return message.reply(AutoRepy.UyeBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
            let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
            if(!role) return message.reply(AutoRepy.RolBelirt).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
            if (Server.rolverYasaklıRoller.some(x => x == role.id)) return message.reply(AutoRepy.yasaklıRol).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
            if(role.position >= message.member.roles.highest.position) return message.reply(AutoRepy.YetkindenYüksekRol).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
            if(member.roles.cache.has(!role.id)) return message.reply(AutoRepy.kullanıcıdaRolMevcuk).then(e => setTimeout(() => e.delete().catch(() => { }), 10000)), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_carpi")}`) 
            member.roles.remove(role.id)
            new rollogg({Rol: role.id,ExecID: message.member.id, emoji: "ALINDI. ",Date: Date.now(),victimID: member.id}).save()
            message.reply({ embeds: [Embed.setDescription(`${member} kişisinden ${message.author} tarafından ${role} rolü alındı!`)]})
            client.channels.cache.find(a => a.name === "role-log").send({ embeds: [Embed.setDescription(`${member} kişisinden ${message.author} tarafından ${role} rolü alındı!`)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 


         } else if (args[0].toLowerCase() === "yasaklırol") {
         let yasaklıRolList = Server.rolverYasaklıRoller ? `${Server.rolverYasaklıRoller.length > 1 ? Server.rolverYasaklıRoller.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.rolverYasaklıRoller.map(x => `<@&${x}>`).slice(-1) : Server.rolverYasaklıRoller.map(x => `<@&${x}>`).join("")}` : `Yasaklı Rol Bulunamadı.`
         message.reply({ embeds: [Embed.setDescription(`Sunucumuzda \`rol ver/al\` komutu ile verilmesi yasaklanan roller belirlenmiştir bu rolleri hiç bir kullanıcı komut ile veremez.
**Yasaklı Roller;**
${yasaklıRolList}

\`\`\`Yasaklı rolleri .setup yasaklırol @Rol @Rol2 şeklinde belirtebilirsin.\`\`\``)]}), message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`) 

}  

}
}
