const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
module.exports = { name: "reload", aliases: ["reboot"], category: "Client-owner",  desc: "Botu Yeniden Başlatma Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
        await message.reply(`${client.user} (\`${client.user.tag}\` - \`${client.user.id}\`) isimli bot **yeninden başlatılıyor.**`)
        process.exit(0)
    } else return;

}
}