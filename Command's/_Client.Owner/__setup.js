const _setup = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const { MessageEmbed, Discord } = require("discord.js");
module.exports = { name: "setup", aliases: [], category: "Client-owner", desc: "Kurulum Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    let Server = await _setup.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
    if (!Settings["Bot.Owner"].some(x => x === message.author.id)) return
    
if(args[0] === "public" || args[0] === "publickategori") {
    let select = args[1];
    if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
    await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { publicCategory: select } }, { upsert: true }).exec();
    message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 

             //
    if(args[0] === "registerkategori" || args[0] === "register") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { RegisterCategory: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "soruncözme" || args[0] === "terapi") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { solvingterapiCategory: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "private" || args[0] === "secret") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { privateCategory: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "streamer" || args[0] === "stkategori") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { streamerCategory: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "vkdckategori" || args[0] === "vkdc") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { vkdcCategory: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "sunucu" || args[0] === "server") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { guildID: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "tag2" || args[0] === "TAG2") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { sunucuTag2: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)} 
    if(args[0] === "tag" || args[0] === "TAG") {
        let select = args[1];
        if (!select) return message.react(client.emojis.cache.find(res => res.name === "ravgar_carpi"));
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { sunucuTag: select } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
     
    if(args[0] === "banlog" || args[0] === "banbilgi") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { banLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Ban Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "cpuanlog" || args[0] === "cezapuanlog") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { cezapuanLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Cezapuan Log\` kanalı ${channel} olarak ayarlandı!`)}    
    if(args[0] === "vmutelog" || args[0] === "vmutebilgi") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { voiceMuteLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Voice-Mute Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "meeting" || args[0] === "toplantı") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { meetingChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Toplantı\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "cmutelog" || args[0] === "cmutebilgi") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { chatMuteLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Chat-Mute Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "jaillog" || args[0] === "jailbilgi") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { jailLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Jail Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "guardlog" || args[0] === "guardbilgi") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { guardLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Guard Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "rolalma" || args[0] === "rol-alma") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { rolAlmaChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Rol-Alma\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "basvurulog" || args[0] === "başvurulog") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { basvuruLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Başvuru-Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "başvurukanal" || args[0] === "başvuruchannel") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { basvuruChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Başvuru-Kanal\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "BotSes" || args[0] === "botses") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { BotSes: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Bot Ses\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "denetimlog" || args[0] === "denetim-log") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { denetimLog: channel.id } }, { upsert: true }).exec();}
    if(args[0] === "taglog" || args[0] === "tag-log") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { tagLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Tag-Log\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "yttaglog" || args[0] === "yttag-log") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { yttagLog: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Yetki-Tag-Log\` kanalı ${channel} olarak ayarlandı!`)}

    if(args[0] === "rolsecim" || args[0] === "rolseçim") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { rolsecimChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Rol-Seçim\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "kpanel" || args[0] === "kullanıcıpanel") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { kpanelChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Kullanıcı-Panel\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "kurallar" || args[0] === "rules") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { kurallarchannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Kurallar\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "komutkanalar" || args[0] === "commandchannel" || args[0] === "komutkanal") { let Roles;
       if(message.mentions.channels.size >= 1)
       channels = message.mentions.channels.map(role => role.id);
       else channels = args.splice(1).filter(role => message.guild.channels.cache.some(channels2 => channels == channels2.id));
       if(channels.length <= 0) return message.reply(`Bir Kanal Belirt ve Tekrar Dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { komutChannels: channels } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
        if(args[0] === "chat" || args[0] === "genelchat") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { chatChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Genel-Chat\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "register-chat" || args[0] === "registerchat") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { registerChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`Register-Chat\` kanalı ${channel} olarak ayarlandı!`)}
    if(args[0] === "invite-log" || args[0] === "invitelog") {
        let channel = message.guild.channels.cache.get(args.splice(1)[0]) || message.mentions.channels.first();
        if(!channel) return message.reply(`Bir Kanal Belirt ve Tekrar dene.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { inviteLogChannel: channel.id } }, { upsert: true }).exec();
        message.reply(`${client.emojis.cache.find(x => x.name === "ravgar_onay")} \`İnvite-Log\` kanalı ${channel} olarak ayarlandı!`)}
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(args[0] === "erkekrol" || args[0] === "erkek" || args[0] === "man") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { manRole: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "kadınrol" || args[0] === "kadın" || args[0] === "woman") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { womanRole: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}
    if(args[0] === "unregister" || args[0] === "kayıtsız") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { unregisterRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "team" || args[0] === "taglırol" || args[0] === "family") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { familyRole: rol } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "yetkilialıdm" || args[0] === "ytalım" || args[0] === "ytalımdm") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { yetkialımdm: rol } }, { upsert: true }).exec();
        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
        if(args[0] === "booster" || args[0] === "zengin" || args[0] === "rich") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { boosterRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "vip" || args[0] === "special" || args[0] === "vipperson") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { specialRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "katıldı" || args[0] === "toplantıkatıldı" || args[0] === "meetingkatıldı") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { katılıdRol: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "muted" || args[0] === "cmuted" || args[0] === "chatmute") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { mutedRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "vmuted" || args[0] === "voicemuted" || args[0] === "voicemute") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { vmutedRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "cezalı" || args[0] === "jailed" || args[0] === "cezalırol") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { jailedRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "yasaklıtag" || args[0] === "ytagrol" || args[0] === "bannedtag") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { bannedTagRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "şüpheli" || args[0] === "suspicious" || args[0] === "suspiciouss") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { suspiciousRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "ability" || args[0] === "clownRole" || args[0] === "clown") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { clownRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "botkomut" || args[0] === "globalrol" || args[0] === "enaltyt") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { botCommand: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "transport") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { transportStaff: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "etkinlikkatılımcısı") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { EventsRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
    if(args[0] === "çekilişkatılımcısı") {
        let rol =message.mentions.roles.first() || message.guild.roles.cache.get(args.splice(1)[0]) || message.guild.roles.cache.find(r=>r.name===args.splice(1).join(''));
        if(!rol) return message.reply(`Bir rol belirtmelisin.`)
        await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { GiveawaRole: rol } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}      
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    if(args[0] === "voicemuteyetki" || args[0] === "vmutestaff" || args[0] === "vmuteyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { voiceMuteStaff: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "chatmuteyetki" || args[0] === "cmutestaff" || args[0] === "cmuteyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { chatMuteStaff: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "jailyetki" || args[0] === "jailstaff" || args[0] === "cezalıyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { jailStaff: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "banyetki" || args[0] === "banstaff" || args[0] === "yasaklamayetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { banStaff: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "registeryetki" || args[0] === "registerstaff" || args[0] === "kayıtyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { regisyterStaff: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "yönetimroles" || args[0] === "ytroles" || args[0] === "yönetimler") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { yönetimRoles: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "ownerroles" || args[0] === "ownroles" || args[0] === "ownerlar") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ownerRoles: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "baslangıcyetkileri" || args[0] === Settings["Guild.Yetki.Baslangıc"]|| args[0] === "basyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ilkyetkiler: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   

    if(args[0] === "2yetkiler" || args[0] === Settings["Guild.Yetki.2.Yetki"]|| args[0] === "ikinciyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ikinciyetkiler: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "3yetkiler" || args[0] === Settings["Guild.Yetki.3.Yetki"]|| args[0] === "ücüncüyetki") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { ucuncuyetkiler: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    if(args[0] === "yasaklırol" || args[0] === "bannedrol"|| args[0] === "rolveralbannedrol") { let Roles;
       if(message.mentions.roles.size >= 1)
       Roles = message.mentions.roles.map(role => role.id);
       else Roles = args.splice(1).filter(role => message.guild.roles.cache.some(role2 => role == role2.id));
       if(Roles.length <= 0) return message.reply(`Bir Rol Belirt ve Tekrar dene.`)
       await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { rolverYasaklıRoller: Roles } }, { upsert: true }).exec();
       message.react(`${client.emojis.cache.find(x => x.name === "ravgar_onay")}`)}   
    
       
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------




}      

       
    
        
}