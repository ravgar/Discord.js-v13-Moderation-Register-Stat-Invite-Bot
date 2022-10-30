const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
module.exports = { name: "ping", aliases: ["gecikme"], category: "Client-owner",  desc: "Ping Kontrol Etme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
message.reply(`Botun Pingi **${client.ws.ping}** olarak hesaplandı.`)
        } else return;

}
}