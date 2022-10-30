const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const moment = require('moment');
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const YasaklıTag = require("../Helper's/MongooseSchema/YasaklıTag")
const Users = require("../Helper's/MongooseSchema/YetkiliVer")
const data = require("../Helper's/MongooseSchema/YasaklıTag")
module.exports = async (oldUser, newUser) => {
    let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if (oldUser.username == newUser.username || oldUser.bot || newUser.bot) return;
    let guild = client.guilds.cache.get(Settings.guildID)
    if (!guild) return;
    const member = guild.members.cache.get(oldUser.id);
    let taglog = Server.tagLog? `<#${Server.tagLog}>` : `${Settings.Warning}`
    let yttaglog = Server.yttagLog? `<#${Server.yttagLog}>` : `${Settings.Warning}`
    
    if (Server.tagliAlim === true) { 
        if (oldUser.username.includes(Server.sunucuTag) && !newUser.username.includes(Server.sunucuTag) && !member.permissions.has("ADMINISTRATOR") && !member.roles.cache.has(Settings["Guild.Vip.Name"]) && !member.roles.cache.has(Server.boosterRole) && !member.roles.cache.has(Server.jailedRole) && !member.roles.cache.has(Server.suspiciousRole)) {
            if (Settings.TümYetkiler.some(rol => member.roles.cache.has(rol))) {
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setFooter(Settings["Client.Bot.Footer"])
                .setAuthor(member.user.tag, member.avatarURL({dynamic: true}))
                let taglicik = await Users.findOne({ guildID: Settings.guildID, userID: member.id })
                if (taglicik) await Users.findOneAndUpdate({ guildID: Settings.guildID, userID: member.id }, { $set: { Enabled: false, LeftTime: Date.now(), Auth: taglicik.Auth, Time: taglicik.Time } }, { upsert: true })
                await client.channels.cache.get(Server.yttagLog).send({ embeds: [embed.setDescription(`<@${newUser.id}> adlı yetkiliminiz tagımızı salarak yetkiden ayrıldı.
                ─────────────────────────────
                Kullanıcıdan Alınan Yetkili Rolleri;
              ${Settings.TümYetkiler.filter(a => member.roles.cache.get(a)).map(a => `${client.guilds.cache.get(Settings.guildID).roles.cache.get(a)}`).join("\n")}
                ─────────────────────────────
                Kullanıcıya Yetki Veren Yetkilimiz: \`${member.guild.members.cache.get(taglicik.Auth) ? member.guild.members.cache.get(taglicik.Auth).user.tag : taglicik.Auth || ""}\` (\`${tagli.Auth || ""}\`)`)] })
                await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi hem yetkili olup hemde tagımızı \`${Server.sunucuTag}\` kullanıcı adından çıkardı.` });
                await member.roles.set([Server.unregisterRole]).catch(() => { })
                if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag, Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)).catch(() => { })
                let tagli = await Users.findOne({ guildID: Settings.guildID, userID: member.id })
                if (tagli) await Users.findOneAndUpdate({ guildID: Settings.guildID, userID: member.id }, { $set: { Enabled: false, LeftTime: Date.now(), Auth: tagli.Auth, Time: tagli.Time } }, { upsert: true })
                } else {
                await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi kullanıcı adından tagımızı \`${Server.sunucuTag}\` çıkardı.` });
                await member.roles.set([Server.unregisterRole]).catch(() => { })
                if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag, Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)).catch(() => { })
                let tagli = await Users.findOne({ guildID: Settings.guildID, userID: member.id })
                if (tagli) await Users.findOneAndUpdate({ guildID: Settings.guildID, userID: member.id }, { $set: { Enabled: false, LeftTime: Date.now(), Auth: tagli.Auth, Time: tagli.Time } }, { upsert: true })
                }
        }
        if (!oldUser.username.includes(Server.sunucuTag) && newUser.username.includes(Server.sunucuTag) && !member.roles.cache.has(Server.jailedRoleRole) && !member.roles.cache.has(Server.suspiciousRole) && !member.roles.cache.has(Server.familyRole)) {
            await member.roles.add(Server.familyRole).catch(() => { })
            if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag, Server.sunucuTag))
            await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi \`${Server.sunucuTag}\` tagımızı adına alarak ekibimize katıldı.` });
        }
    } else {
        if (oldUser.username.includes(Server.sunucuTag) && !newUser.username.includes(Server.sunucuTag) && !member.permissions.has("ADMINISTRATOR") && !member.roles.cache.has(Settings["Guild.Vip.Name"]) && !member.roles.cache.has(Server.boosterRole) && !member.roles.cache.has(Server.jailedRole) && !member.roles.cache.has(Server.suspiciousRole)) {
            if (Settings.TümYetkiler.some(rol => member.roles.cache.has(rol))) {
                let data = Settings.TümYetkiler.filter(a => member.roles.cache.has(a))
                let roles = (data)
                let roles2 = (Server.familyRole)
                let embed = new MessageEmbed()
                .setColor("RANDOM")
                .setFooter(Settings["Client.Bot.Footer"])
                .setAuthor(member.user.tag, member.avatarURL({dynamic: true}))
                let tagli = await Users.findOne({ guildID: Settings.guildID, userID: member.id })
                if (tagli) await Users.findOneAndUpdate({ guildID: Settings.guildID, userID: member.id }, { $set: { Enabled: false, LeftTime: Date.now(), Auth: tagli.Auth, Time: tagli.Time } }, { upsert: true })
                await client.channels.cache.get(Server.yttagLog).send({ embeds: [embed.setDescription(`<@${newUser.id}> adlı yetkiliminiz tagımızı salarak yetkiden ayrıldı.
                ─────────────────────────────
                Kullanıcıdan Alınan Yetkili Rolleri;;
                ${Settings.TümYetkiler.filter(a => member.roles.cache.get(a)).map(a => `${client.guilds.cache.get(Settings.guildID).roles.cache.get(a)}`).join("\n")}
                ─────────────────────────────
                Kullanıcıya Yetki Veren Yetkilimiz: \`${member.guild.members.cache.get(tagli.Auth) ? member.guild.members.cache.get(tagli.Auth).user.tag : tagli.Auth || ""}\` (\`${tagli.Auth || ""}\`)`)] })
                await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi hem yetkili olup hemde tagımızı \`${Server.sunucuTag}\` kullanıcı adından çıkardı.` });
                await member.roles.remove(roles).catch(() => { })
                await member.roles.remove(roles2).catch(() => { })  
                if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag, Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)).catch(() => { })
                } else {
                await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi kullanıcı adından tagımızı \`${Server.sunucuTag}\` çıkardı.` });
                await member.roles.remove(Server.familyRole).catch(() => { })
                if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag, Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag)).catch(() => { })
                let tagli = await Users.findOne({ guildID: Settings.guildID, userID: member.id })
                if (tagli) await Users.findOneAndUpdate({ guildID: Settings.guildID, userID: member.id }, { $set: { Enabled: false, LeftTime: Date.now(), Auth: tagli.Auth, Time: tagli.Time } }, { upsert: true })
                }
        }
        if (!oldUser.username.includes(Server.sunucuTag) && newUser.username.includes(Server.sunucuTag) && !member.roles.cache.has(Server.jailedRole) && !member.roles.cache.has(Server.suspiciousRole) && !member.roles.cache.has(Server.familyRole)) {
            await member.roles.add(Server.familyRole).catch(() => { })
            if (member.manageable) await member.setNickname(member.displayName.replace(Server.sunucuTag2 ? Server.sunucuTag2 : Server.sunucuTag, Server.sunucuTag))
            await client.channels.cache.get(Server.tagLog).send({ content: `${member} (${member.id}) kişisi \`${Server.sunucuTag}\` tagımızı adına alarak ekibimize katıldı.` });
        }
    }
}
module.exports.conf = {
    name: "userUpdate"
}
