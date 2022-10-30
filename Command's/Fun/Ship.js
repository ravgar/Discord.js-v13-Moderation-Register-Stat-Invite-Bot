
const Settings = require("../../Helper's/Settings.json")
const AutoRepy = require("../../Helper's/AutoRepy")
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
    const snekfetch = require('snekfetch');
const request = require('node-superfetch');
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const {MessageActionRow, MessageSelectMenu, MessageButton} = require("discord.js")
const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
module.exports = { name: "sdasdas", aliases: ["gecikme"], category: "Client-owner",  desc: "Ping Kontrol Etme Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
        let Server = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
        const sayı = Math.floor(Math.random() * 100);
        

        const canvas = Canvas.createCanvas(700, 250);
        const ctx = canvas.getContext("2d")
        const bg = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949078364445081620/hearts.png")
        ctx.drawImage(bg, 0, 0, 700, 250)
        ctx.font = "75px Sans-serif"
        ctx.fillStyle = "#f0f0f0"
        const messageAuthor = await Canvas.loadImage(message.member.displayAvatarURL({ format: "png" }))
        ctx.drawImage(messageAuthor, 100, 25, 200, 200)

        const heart = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787002826762/zadekalp.png")
        const broken = await Canvas.loadImage("https://cdn.discordapp.com/attachments/927571230134009856/975157787678093342/zadekirikkalp.png")
        const think = await Canvas.loadImage("https://cdn.discordapp.com/attachments/731112308134248469/949237394736037938/thnk.png")
        const member = message.mentions.members.first() || message.guild.members.cache.filter(uye => uye.roles.cache.has(Server.womanRole[0] && Server.manRole[0])).random()
        console.log(member)
        const targetMention = await Canvas.loadImage(member.displayAvatarURL({ format: "png" }))
        ctx.drawImage(targetMention, 400, 25, 200, 200)

        let mesaj;
        if(sayı > 1 && sayı < 10) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 10 && sayı < 20) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 20 && sayı < 30) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 30 && sayı < 40) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 40 && sayı < 50) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 50 && sayı < 60) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart::broken_heart:`
        if(sayı > 60 && sayı < 70) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart::broken_heart:`
        if(sayı > 70 && sayı < 80) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart::broken_heart:`
        if(sayı > 80 && sayı < 90) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::broken_heart:`
        if(sayı > 90 && sayı < 100) mesaj = `**${member.user.username}**, **${message.author.username}** seni ne kadar seviyor?\n:cupcake: **%${sayı}**\n\n:heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire::heart_on_fire:`


        if(sayı > 55 && sayı > 75) {
            ctx.drawImage(heart, 275, 60, 150, 150)
            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
            let embed = new Discord.MessageEmbed()
            .setDescription(`${mesaj} ${sayı}`)
            .setImage(`attachment://hearts.png`)
            .setColor('RANDOM')
            message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
            return
        }

        if(sayı > 55 && sayı < 75) {
            ctx.drawImage(think, 275, 60, 150, 150)
            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
            let embed = new Discord.MessageEmbed()
            .setDescription(`${mesaj}  ${sayı}`)
            .setImage(`attachment://hearts.png`)
            .setColor('RANDOM')
            message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
            return
        }

        if(sayı > 0 && sayı < 55) {
            ctx.drawImage(broken, 275, 60, 150, 150)
            let attachment = new Discord.MessageAttachment(canvas.toBuffer(), "hearts.png")
            let embed = new Discord.MessageEmbed()
            .setDescription(`${mesaj} ${sayı}`)
            .setImage(`attachment://hearts.png`)
            .setColor('RANDOM')
            message.channel.send({ content: "<@" + member.id + ">", embeds: [embed], files: [attachment] })
            return;
        }
    }
}