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
  const guildID = ""//sunucu
  const roleID = ""//taglırolü
  const tag = ""//tag
  const chat = ''// chat
  const log2 = '' // log kanalı

  const guild = client.guilds.cache.get(guildID)
  const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
  const member = guild.members.cache.get(newUser.id)
 if (newUser.discriminator !== oldUser.discriminator) {
      if (oldUser.discriminator == "ETİKET TAGI GİR" && newUser.discriminator !== "ETİKET TAGI GİR") {
          member.roles.remove(roleID)
          client.channels.cache.get("TAGLOGİD").send(`${newUser} Etiketinden \`ETİKET TAGI GİR\` Çıkartarak Ailemizden Ayrıldı!`)//DEVELOPED BY RAVGAR/WEX
      } else if (oldUser.discriminator !== "ETİKET TAGI GİR" && newUser.discriminator == "ETİKET TAGI GİR") {
          member.roles.add(roleID)
          client.channels.cache.get("TAGLOGİD").send(`${newUser} Etiketine \`ETİKET TAGI GİR\` Alarak Ailemize Katıldı!`)
      }
  }
}
module.exports.conf = {
    name: "userUpdate"
}
//1922 ,¹⁹²²