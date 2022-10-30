const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Users = require("../Helper's/MongooseSchema/RegisteryNames")
module.exports = async (oldMember, newMember) => {  
    const sunucu = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if (oldMember.roles.cache.has(sunucu.boosterRole) && !newMember.roles.cache.has(sunucu.boosterRole)) 
    Users.findOne({guildID: newMember.guild.id, victimID: newMember.id}, async (err, res) => {
        let Embed = new MessageEmbed().setAuthor(newMember.guild.name, newMember.guild.iconURL({dynamic: true})).setColor("RANDOM");
        let listed = res.nicknames.reverse()
    const History = listed.map((e, i) => ` ${e.isimler}`).slice(0, 1)
    if (!History) return;
    if (oldMember.roles.cache.has(sunucu.boosterRole) && !newMember.roles.cache.has(sunucu.boosterRole)) {
              let setName = `${History}`;
              await newMember.setNickname(`${setName}`) //DEVELOPED BY RAVGAR/WEX
              client.channels.cache.find(a => a.name === "booster-log").send({embeds: [Embed.setDescription(`${newMember} (\`${newMember.id}\`) adlı üye sunucu üzerindeki boostunu çektiği için ismi eski ismine döndürüldü. \`${History}\``)] })}})}
module.exports.conf = {
    name: "guildMemberUpdate"
}