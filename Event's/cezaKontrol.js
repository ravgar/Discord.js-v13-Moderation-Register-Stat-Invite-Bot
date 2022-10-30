const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Settings = require("../Helper's/Settings.json")
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
module.exports = () => {
  setInterval(() => {
    voice()
    }, 1000 * 1)
    setInterval(() => {
      mute()
      }, 1000 * 5)
      
      
async function voice() {
  const sunucu = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
  let guild = client.guilds.cache.get(Settings.guildID)
  Database.find({guildID: guild.id, activity: true,Type: "VOICE-MUTE",Temporary: true},async function(err, VoiceMute) {
      if ((!VoiceMute) || (VoiceMute.length < 1)) return null;
      for (var RavgarWex of VoiceMute) {
          let user = guild.members.cache.get(RavgarWex.victimID)
          if(!user)  return null
  if(Date.now() >= RavgarWex.finishDate) {
  if(user.roles.cache.has(sunucu.vmutedRole)) {
      user.roles.remove(sunucu.vmutedRole)
      RavgarWex.activity = false
      RavgarWex.save()}
      if(user.voice.channel) user.voice.setMute(false)
  } else {
      if(!user.voice.serverMute) {
        user.roles.add(sunucu.vmutedRole)
     if(user.voice.channel) user.voice.setMute(true)
    }
  }
  
      }
      })
    
  
  }
      
  async function mute() {
    const sunucu = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })

     let guild = client.guilds.cache.get(Settings.guildID)
     Database.find({guildID: guild.id, activity: true,Type: "CHAT-MUTE",Temporary: true},async function(err, ChatMute) {
         if ((!ChatMute) || (ChatMute.length < 1)) return null;
         for (var RavgarWex of ChatMute) {
             let user = guild.members.cache.get(RavgarWex.victimID)
             if(!user)  return null
     if(Date.now() >= RavgarWex.finishDate) {
     if(user.roles.cache.has(sunucu.mutedRole)) {
         user.roles.remove(sunucu.mutedRole)
         RavgarWex.activity = false
         RavgarWex.save()}
     } else {
         if(!user.roles.cache.has(sunucu.mutedRole)) {
        user.roles.add(sunucu.mutedRole)
}}}})
  }
}
module.exports.conf = { name: "ready"}