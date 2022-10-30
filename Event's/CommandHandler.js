const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const moment = require('moment');
const ms = require("ms")
const data = require("../Helper's/MongooseSchema/Komut-engel")
module.exports = async (message) => {  
    if (message.author.bot) return;
    if(!message.guild) return;
    if (Settings.Prefix && !message.content.startsWith(Settings.Prefix)) return;
    

    
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    const author = message.author
    const channel = message.channel
    const guild = message.guild
    const ClientEmbed = new MessageEmbed()
        .setColor("RANDOM")
        .setFooter((Settings["Client.Bot.Footer"]))
        .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true, size: 2048 }))

      
    if (cmd) {

        cmd.execute(client, message, args, author, channel, ClientEmbed, guild);
    }
    if(!cmd) return;
    client.channels.cache.find(a => a.name === "cmd-log").send(`[\`${moment(Date.now()).locale("tr").format("LLL")}\`] :wrench: \`${message.author.tag}\` adlı üye \`${message.channel.name}\` adlı kanalda \`${cmd.name}\` isimli komutu kullandı kullandı. | Kullanım => \`${message.content}\` `)
}
module.exports.conf = {
    name: "message"
}