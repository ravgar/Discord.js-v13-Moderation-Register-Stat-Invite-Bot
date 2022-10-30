const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const moment = require('moment');
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const YasaklıTag = require("../Helper's/MongooseSchema/YasaklıTag")

const data = require("../Helper's/MongooseSchema/YasaklıTag")
module.exports = async (member) => {

    if(member.user.bot) return

        client.channels.cache.find(a => a.name === "giris-cikis-log-basit").send(`:x: ${member} (\`${member.user.tag}\` - \`${member.id}\`) isimli üye sunucudan ayrıldı!`)

    }
        

module.exports.conf = {
    name: "guildMemberRemove"
}
