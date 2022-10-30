const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
module.exports = { name: "yılbaşı", aliases: [], category: "Client-owner",  desc: "Yılbaşı Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
    if(!args[0]) return message.channel.send({ content: `Selam! Yılbaşı sunucu ayarına hoş geldin! Sunucunu yılbaşı ağacı ile (🎄) süslemek için \`.yılbaşı süsle\` - kaldırmak için \`.yılbaşı süskaldır\``})
    if(args[0] == "süsle") {
      message.guild.channels.cache.forEach(st => {
        st.setName(`🎄 ${st.name}`)})
        message.channel.send({ content: ` Sunucu yılbaşı ağacı ile süslenmeye başlandı!`})} else if (args[0] == "süskaldır") {
        message.guild.channels.cache.forEach(st => {
        st.setName(`${st.name.replace("🎄", "")}`)})
        message.channel.send({ content: ` Sunucu yılbaşı süsleri kaldırılmaya başlandı!`})}
        } else return;}}