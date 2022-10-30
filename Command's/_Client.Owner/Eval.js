const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const Discord = require("discord.js")
const util = require("util")
module.exports = { name: "eval", aliases: [], category: "Client-owner",  desc: "------------",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        if (Settings["Bot.Owner"].some(member => message.author.id === member)) {
          if (!args.length) return 
          let code = args.join(" ");
          try { let evaled = clean(await eval(code)); 
          if(evaled.includes(client.token)) return message.reply(`Kusura bakmada başını alırsın.`)
          message.channel.send(evaled, {code: "js", split: true});} catch(err) {
          message.channel.send(err, {code: "js", split: true}) } return;} else return;}}
        function clean(text) {
          if (typeof text !== 'string')
          text = require('util').inspect(text, { depth: 0 })
          text = text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
        };
        