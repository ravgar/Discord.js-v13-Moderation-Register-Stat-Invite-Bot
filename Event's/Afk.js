const moment = require("moment")
const parsems = require('parse-ms')
const Database = require("../Helper's/MongooseSchema/Member")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = message => {

    let pms = require('parse-ms')
  if(message.content.startsWith('.afk')) return
    let author = message.author
    Database.findOne({Afk: true}, (err, res) => {
    if(res) {
      let reason =    res.Reason
      let Embed = new MessageEmbed().setColor("RANDOM");
      let süre = pms(Date.now()-res.datenow)
      if (message.mentions.members.filter(x => x.id !== author.id).some(x => res.memberID.includes(x.id))){
        const victim = message.mentions.users.first()
          if(message.author.bot) return
        if (!res) return;
        const sürecik = ""+ client.turkishDate(Date.now() - res.datenow)+""

          message.channel.send({ embeds: [Embed.setDescription(`${victim} adlı üye ${sürecik} önce afk moduna giriş yaptı. [ \`${reason}\` ]`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))
      } else {
        Database.findOne({Afk: true, memberID: message.author.id}, (err, res) => {
          if(!res) return
          res.delete()
          if(message.member.manageable && message.member.displayName.startsWith('[AFK]')) {
            message.member.setNickname(message.member.displayName.replace(/\[AFK\] ?/gi, ''));
          }
          message.reply({ embeds: [Embed.setDescription(`Afk modundan çıkış yaptın.`)] }).then(e => setTimeout(() => e.delete().catch(() => { }), 10000))

        })

  
      }

    }
    })


}

module.exports.conf = { name: "message"}