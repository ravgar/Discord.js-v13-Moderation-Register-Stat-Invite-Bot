const _setup = require("../../Helper's/MongooseSchema/_setup")
const Settings = require("../../Helper's/Settings.json")
const { MessageActionRow, MessageSelectMenu, MessageButton } = require('discord.js');
const { MessageEmbed, Discord } = require("discord.js");
const { Permissions } = require('discord.js');
module.exports = { name: "kur", aliases: ["kurulum"], category: "Client-owner",  desc: "Kurulum Kontrol Komutu",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => {
      if (!Settings["Bot.Owner"].some(x => x === message.author.id)) return
    let Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor("RANDOM");
    let Server = await _setup.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })

    let Booster = Server.boosterRole ? `<@&${Server.boosterRole}>` : `${Settings.Warning}`
let Unregister = Server.unregisterRole ? `<@&${Server.unregisterRole}>` : `${Settings.Warning}`
let ClownRole = Server.clownRole ? `<@&${Server.clownRole}>` : `${Settings.Warning}`
let Şüpheli = Server.suspiciousRole ? `<@&${Server.suspiciousRole}>` : `${Settings.Warning}`
let Cezalı = Server.jailedRole ? `<@&${Server.jailedRole}>` : `${Settings.Warning}`
let Vmuted = Server.vmutedRole ? `<@&${Server.vmutedRole}>` : `${Settings.Warning}`
let Muted = Server.mutedRole ? `<@&${Server.mutedRole}>` : `${Settings.Warning}`
let Team = Server.familyRole ? `<@&${Server.familyRole}>` : `${Settings.Warning}`
let Vip = Server.specialRole ? `<@&${Server.specialRole}>` : `${Settings.Warning}`
let YasaklıTag = Server.bannedTagRole ? `<@&${Server.bannedTagRole}>` : `${Settings.Warning}`
let Komut = Server.botCommand ? `<@&${Server.botCommand}>` : `${Settings.Warning}`
let Ability = Server.vipRol ? `<@&${Server.vipRol}>` : `${Settings.Warning}`
let Transport = Server.vipRol ? `<@&${Server.vipRol}>` : `${Settings.Warning}`
let EtkinlikKatılımcısı = Server.EventsRole ? `<@&${Server.EventsRole}>` : `${Settings.Warning}`
let CekilisKatılımcısı = Server.GiveawaRole ? `<@&${Server.GiveawaRole}>` : `${Settings.Warning}`
let ServerTag = Server.ServerTag ? `${Server.ServerTag}` : `Kapalı`
let ServerTag2 = Server.ServerTag2 ? `${Server.ServerTag2}` : `Kapalı`
let YetkiliAlım = Server.vipRol ? `<@&${Server.yetkialımdm}>` : `${Settings.Warning}`


let erkekrol = Server.manRole ? `${Server.manRole.length > 1 ? Server.manRole.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.manRole.map(x => `<@&${x}>`).slice(-1) : Server.manRole.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let kadınrol = Server.womanRole ? `${Server.womanRole.length > 1 ? Server.womanRole.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.womanRole.map(x => `<@&${x}>`).slice(-1) : Server.womanRole.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let voiceMuteStaff = Server.voiceMuteStaff ? `${Server.voiceMuteStaff.length > 1 ? Server.voiceMuteStaff.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.voiceMuteStaff.map(x => `<@&${x}>`).slice(-1) : Server.voiceMuteStaff.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let chatMuteStaff = Server.chatMuteStaff ? `${Server.chatMuteStaff.length > 1 ? Server.chatMuteStaff.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.chatMuteStaff.map(x => `<@&${x}>`).slice(-1) : Server.chatMuteStaff.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let JailStaff = Server.jailStaff ? `${Server.jailStaff.length > 1 ? Server.jailStaff.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.jailStaff.map(x => `<@&${x}>`).slice(-1) : Server.jailStaff.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let BanStaff = Server.banStaff ? `${Server.banStaff.length > 1 ? Server.banStaff.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.banStaff.map(x => `<@&${x}>`).slice(-1) : Server.banStaff.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let RegisterStaff = Server.regisyterStaff ? `${Server.regisyterStaff.length > 1 ? Server.regisyterStaff.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.regisyterStaff.map(x => `<@&${x}>`).slice(-1) : Server.regisyterStaff.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let ownerRoles = Server.ownerRoles ? `${Server.ownerRoles.length > 1 ? Server.ownerRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ownerRoles.map(x => `<@&${x}>`).slice(-1) : Server.ownerRoles.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let yönetimRoles = Server.yönetimRoles ? `${Server.yönetimRoles.length > 1 ? Server.yönetimRoles.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.yönetimRoles.map(x => `<@&${x}>`).slice(-1) : Server.yönetimRoles.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`

let baslangıcYt = Server.ilkyetkiler ? `${Server.ilkyetkiler.length > 1 ? Server.ilkyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ilkyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ilkyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let ikinciYt = Server.ikinciyetkiler ? `${Server.ikinciyetkiler.length > 1 ? Server.ikinciyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ikinciyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ikinciyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`
let ücüncüYe = Server.ucuncuyetkiler ? `${Server.ucuncuyetkiler.length > 1 ? Server.ucuncuyetkiler.slice(0, -1).map(x => `<@&${x}>`).join(", ") + " ve " + Server.ucuncuyetkiler.map(x => `<@&${x}>`).slice(-1) : Server.ucuncuyetkiler.map(x => `<@&${x}>`).join("")}` : `${Settings.Warning}`


let banlog = Server.banLog ? `<#${Server.banLog}>` : `${Settings.Warning}`
let vmuteLog = Server.voiceMuteLog ? `<#${Server.banLog}>` : `${Settings.Warning}`
let cmutelog = Server.chatMuteLog ? `<#${Server.banLog}>` : `${Settings.Warning}`
let jaillog = Server.jailLog? `<#${Server.banLog}>` : `${Settings.Warning}`
let cpuanlog = Server.cezapuanLog? `<#${Server.banLog}>` : `${Settings.Warning}`
let guardLog = Server.guardLog? `<#${Server.guardLog}>` : `${Settings.Warning}`
let registerChat = Server.registerChannel? `<#${Server.registerChannel}>` : `${Settings.Warning}`
let inviteLog = Server.inviteLogChannel? `<#${Server.inviteLogChannel}>` : `${Settings.Warning}`
let rolAlma = Server.rolAlmaChannel? `<#${Server.rolAlmaChannel}>` : `${Settings.Warning}`
let chat = Server.chatChannel? `<#${Server.chatChannel}>` : `${Settings.Warning}`
let basvuruLog = Server.basvuruLog? `<#${Server.basvuruLog}>` : `${Settings.Warning}`
let basvuruChannel = Server.basvuruChannel? `<#${Server.basvuruChannel}>` : `${Settings.Warning}`
let denetimLog = Server.denetimLog? `<#${Server.denetimLog}>` : `${Settings.Warning}`
let KomutChannel = Server.komutChannels ? `${Server.komutChannels.length > 1 ? Server.komutChannels.slice(0, -1).map(x => `<#${x}>`).join(", ") + " ve " + Server.komutChannels.map(x => `<#${x}>`).slice(-1) : Server.komutChannels.map(x => `<#${x}>`).join("")}` : `${Settings.Warning}`
let BotSes = Server.BotSes? `<#${Server.BotSes}>` : `${Settings.Warning}`
let RolSecim = Server.rolsecimChannel? `<#${Server.rolsecimChannel}>` : `${Settings.Warning}`
let Kpanel = Server.kpanelChannel? `<#${Server.kpanelChannel}>` : `${Settings.Warning}`
let taglog = Server.tagLog? `<#${Server.tagLog}>` : `${Settings.Warning}`
let yttaglog = Server.yttagLog? `<#${Server.yttagLog}>` : `${Settings.Warning}`


    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setPlaceholder('Yetkili Rolü Tanımla!')
          .setCustomId('kurulumselect')
          .addOptions([
          {
                label: "Kanal Kurulumları",
                description: "Kanal Kurulumları Hakkında Detaylı Bilgi.",
                value: "channelSetup"
          },
          { 
              label: "Rol Kurulumları",
              description: "Rol Kurulumları Hakkında Detaylı Bilgi.",
              value: "roleSetup"
          },
          { 
            label: "Stat Kurulumları",
            description: "Rol Kurulumları Hakkında Detaylı Bilgi.",
            value: "statSetup"
          },
          { 
            label: "Otomatik Kurulumlar",
            description: "Otomaravgar_ Kurulumlar Hakkında Detaylı Bilgi.",
            value: "otosetup"
          }
        ])
        );
        if(!args[0]) {
            let msg = await message.channel.send({ components: [row], embeds: [embed.setDescription(`Sunucu Kurulum Paneli
Aşağıdaki Panelden Kurulum Detaylarını Görüntüleyebilirsiniz.

        `).setFooter(`${Settings["Client.Bot.Footer"]}`)] })
        
        msg
        .awaitMessageComponent({
        filter: (component) => component.user.id === message.author.id,
        componentType: 'SELECT_MENU',
        })
        .then(async (interaction) => {
        if(interaction.values[0] == "channelSetup") {
            if(msg) msg.delete();
          const krow = new MessageActionRow().addComponents(
              new MessageSelectMenu()
                .setPlaceholder('Detaylı Bilgi!')
                .setCustomId('rolokeymenu')
                .addOptions([
                  {
                      label: "Kanal Kurumlarını Gör!",
                      description: "Tüm Kurulumu Bitirmeden Açmayınız!",
                      value: "kanalokey"
                  },
                  {
                      label: "Kapat!",
                      description: "Kapat!",
                      value: "kkapat"
                }
              ]),
            );
        
            let kmsg = await interaction.channel.send({ components: [krow], embeds: [embed.setFooter(`${Settings["Client.Bot.Footer"]}`).setDescription(`
        ${message.guild.name} **Kanal Kurulum Ekranı**
        \`\`\`Sunucu İçi Log Kanal Ayarları\`\`\`Ban Log \`(${Settings.Prefix}setup banlog #Kanal/ID)\`
        Jail Log \`(${Settings.Prefix}setup jaillog #Kanal/ID)\`
        ChatMute Log \`(${Settings.Prefix}setup mutelog #Kanal/ID)\` 
        VoiceMute Log \`(${Settings.Prefix}setup mutelog #Kanal/ID)\` 
        Denetim Log \`(${Settings.Prefix}setup denetimlog #Kanal/ID)\` 
        Invite Log \`(${Settings.Prefix}setup invitelog #Kanal/ID)\`
        Ceza Puan Log \`(${Settings.Prefix}setup cpuanlog #Kanal/ID)\` 
        Başvuru Log \`(${Settings.Prefix}setup basvurulog #Kanal/ID)\`
        Tag-Log \`(${Settings.Prefix}setup taglog #Kanal/ID)\`
        Yetkili Tag-Log \`(${Settings.Prefix}setup yttaglog #Kanal/ID)\`
        \`\`\`Sunucu İçi Kanal Ayarları\`\`\`Bot Ses Kanalı \`(${Settings.Prefix}setup botses #Kanal/ID)\`
        Komut Kanalı \`(${Settings.Prefix}setup komutkanal #Kanal/ID)\`
        Genel Sohbet \`(${Settings.Prefix}setup chat #Kanal/ID)\`
        Teyit Kanalı \`(${Settings.Prefix}setup registerhchat #Kanal/ID)\`
        Başvuru Kanal \`(${Settings.Prefix}setup basvurukanal #Kanal/ID)\`        
        \`\`\`Sunucu İçi Guard Log Ayarları\`\`\`Channel Log Kanalı \`(${Settings.Prefix}setup channellog #Kanal/ID)\` 
        Rol-Alma Kanalı \`(${Settings.Prefix}setup rolelog #Kanal/ID)\` 
        Rol-Secim Kanalı \`(${Settings.Prefix}setup rol-secim #Kanal/ID)\` 
        Kullanıcı-Panel Kanalı \`(${Settings.Prefix}setup kpanel #Kanal/ID)\` 
        `)]})
        
        kmsg
        .awaitMessageComponent({
        filter: (component) => component.user.id === message.author.id,
        componentType: 'SELECT_MENU',
        })
        .then(async (interaction) => {
          if(interaction.values[0] === "kanalokey") {
              if(kmsg) kmsg.delete()
              interaction.channel.send({ embeds: [embed.setDescription(`
        \`\`\`Sunucu İçi Log Kanal Ayarları\`\`\`Ban Log \`(${Settings.Prefix}setup banlog #Kanal/ID)\` ${banlog}
        Jail Log \`(${Settings.Prefix}setup jaillog #Kanal/ID)\` ${jaillog}
        ChatMute Log \`(${Settings.Prefix}setup mutelog #Kanal/ID)\` ${cmutelog}
        VoiceMute Log \`(${Settings.Prefix}setup mutelog #Kanal/ID)\` ${vmuteLog}
        Denetim Log \`(${Settings.Prefix}setup denetimlog #Kanal/ID)\` ${denetimLog}
        Invite Log \`(${Settings.Prefix}setup invitelog #Kanal/ID)\` ${inviteLog}
        Ceza Puan Log \`(${Settings.Prefix}setup cpuanlog #Kanal/ID)\` ${cpuanlog}
        Başvuru Log \`(${Settings.Prefix}setup basvurulog #Kanal/ID)\` ${basvuruLog}
        Tag-Log \`(${Settings.Prefix}setup taglog #Kanal/ID)\` ${taglog}
        Yetkili Tag-Log \`(${Settings.Prefix}setup yttaglog #Kanal/ID)\` ${yttaglog}
        \`\`\`Sunucu İçi Kanal Ayarları\`\`\`Bot Ses Kanalı \`(${Settings.Prefix}setup botses #Kanal/ID)\` ${BotSes}
        Komut Kanalı \`(${Settings.Prefix}setup komutkanal #Kanal/ID)\` ${KomutChannel}
        Genel Sohbet \`(${Settings.Prefix}setup chat #Kanal/ID)\` ${chat}
        Teyit Kanalı \`(${Settings.Prefix}setup registerchat #Kanal/ID)\` ${registerChat}
        Başvuru Kanal \`(${Settings.Prefix}setup basvurukanal #Kanal/ID)\` ${basvuruChannel}
        \`\`\`Sunucu İçi Guard Log Ayarları\`\`\`Guard Log Kanalı \`(${Settings.Prefix}setup guardlog #Kanal/ID)\` ${guardLog}  
        Rol-Alma Kanalı \`(${Settings.Prefix}setup rolelog #Kanal/ID)\` ${rolAlma}
        Rol-Secim Kanalı \`(${Settings.Prefix}setup rol-secim #Kanal/ID)\` ${RolSecim}
        Kullanıcı-Panel Kanalı \`(${Settings.Prefix}setup kpanel #Kanal/ID)\` ${Kpanel}
`)]})


          }
          if(interaction.values[0] === "kkapat") {
              if(kmsg) kmsg.delete();
          }
        })
    }
})   
msg
.awaitMessageComponent({
filter: (component) => component.user.id === message.author.id,
componentType: 'SELECT_MENU',
})
.then(async (interaction) => {
if(interaction.values[0] == "roleSetup") {
    if(msg) msg.delete();
  const krow = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setPlaceholder('Detaylı Bilgi!')
        .setCustomId('kanalokeymenu')
        .addOptions([
          {
              label: "Rol Kurumlarını Gör!",
              description: "Tüm Kurulumu Bitirmeden Açmayınız!",
              value: "roleokey"
          },
          {
              label: "Kapat!",
              description: "Kapat!",
              value: "kkapat"
        }
      ]),
    );

    let kmsg = await interaction.channel.send({ components: [krow], embeds: [embed.setFooter(`${Settings["Client.Bot.Footer"]}`).setDescription(`
    ${message.guild.name} **Rol Kontrol Ekranı**
    \`\`\`Yetki Rol Ayarları\`\`\`Ban Hammer Rolleri \`(${Settings.Prefix}setup banyetki @Rol/ID)\`
    Jail Hammer Rolleri \`(${Settings.Prefix}setup jailyetki @Rol/ID)\`
    Voice-Mute Hammer Rolleri \`(${Settings.Prefix}setup vmuteyetki @Rol/ID)\`
    Chat-Mute Hammer Rolleri \`(${Settings.Prefix}setup cmuteyetki @Rol/ID)\`
    Clown Hammer Rolleri \`(${Settings.Prefix}setup clown @Rol/ID)\`  
    Transport Rolleri \`(${Settings.Prefix}setup transport @Rol/ID)\`}  
    Register Hammer Rolleri \`(${Settings.Prefix}setup registeryetki @Rol/ID)\`
    \`\`\`Sunucu İçi Rol Ayarları\`\`\`Vip Rolü \`(${Settings.Prefix}setup vip @Rol/ID)\`  
    Erkek Rolleri \`(${Settings.Prefix}setup man @Rol/ID)\`
    Kadın Rolleri \`(${Settings.Prefix}setup woman @Rol/ID)\`
    Yönetim Rolleri \`(${Settings.Prefix}setup yönetimroles @Rol/ID)\`
    Owner Rolleri \`(${Settings.Prefix}setup ownerroles @Rol/ID)\`
    Kayıtsız Rolü \`(${Settings.Prefix}setup unregister @Rol/ID)\`
    Taglı Rolü \`(${Settings.Prefix}setup team @Rol/ID)\`
    Booster Rolü \`(${Settings.Prefix}setup booster @Rol/ID)\`
    Etkinlik Rolü \`(${Settings.Prefix}setup etkinlikkatılımcısı @Rol/ID)\`
    Çekiliş Rolü \`(${Settings.Prefix}setup çekilişkatılımcısı @Rol/ID)\`
    \`\`\`Cezalı Rol Ayarları\`\`\`Muted Rolü\`(${Settings.Prefix}setup cmuterol @Rol/ID)\`
    V Muted Rolü \`(${Settings.Prefix}setup vnmuted @Rol/ID)\`
    Cezalı Rolü \`(${Settings.Prefix}setup jailed @Rol/ID)\`
    Yasaklı Tag Rolü \`(${Settings.Prefix}setup yasaklıtag @Rol/ID)\`
    Yekili Alım DM Rolü \`(${Settings.Prefix}setup yetkilialimdm @Rol/ID)\`
    En Alt Yetki Rolü \`(${Settings.Prefix}setup botkomut @Rol/ID)\`
    Yeni Hesap Rolü \`(${Settings.Prefix}setup şüpheli @Rol/ID)\`

    `)]})

kmsg
.awaitMessageComponent({
filter: (component) => component.user.id === message.author.id,
componentType: 'SELECT_MENU',
})
.then(async (interaction) => {
  if(interaction.values[0] === "roleokey") {
      if(kmsg) kmsg.delete()
      interaction.channel.send({ embeds: [embed.setDescription(`
    ${message.guild.name} **Rol Kontrol Ekranı**
    \`\`\`Hammer Rol Ayarları\`\`\`Ban Hammer Rolleri \`(${Settings.Prefix}setup banyetki @Rol/ID)\` : ${BanStaff}  
    Jail Hammer Rolleri \`(${Settings.Prefix}setup jailyetki @Rol/ID)\` : ${JailStaff}  
    Voice-Mute Hammer Rolleri \`(${Settings.Prefix}setup vmuteyetki @Rol/ID)\` : ${voiceMuteStaff}  
    Chat-Mute Hammer Rolleri \`(${Settings.Prefix}setup cmuteyetki @Rol/ID)\` : ${chatMuteStaff}  
    Clown Hammer Rolleri \`(${Settings.Prefix}setup clown @Rol/ID)\` : ${ClownRole}  
    Transport Rolleri \`(${Settings.Prefix}setup transport @Rol/ID)\` : ${Transport}  
    Register Hammer Rolleri \`(${Settings.Prefix}setup registeryetki @Rol/ID)\` : ${RegisterStaff}
    \`\`\`Sunucu İçi Rol Ayarları\`\`\`Vip Rolü \`(${Settings.Prefix}setup vip @Rol/ID)\` : ${Vip}  
    Erkek Rolleri \`(${Settings.Prefix}setup man @Rol/ID)\` : ${erkekrol}
    Kadın Rolleri \`(${Settings.Prefix}setup woman @Rol/ID)\` : ${kadınrol}
    Yönetim Rolleri \`(${Settings.Prefix}setup yönetimroles @Rol/ID)\` : ${yönetimRoles}
    Owner Rolleri \`(${Settings.Prefix}setup ownerroles @Rol/ID)\` : ${ownerRoles}
    Kayıtsız Rolü \`(${Settings.Prefix}setup unregister @Rol/ID)\` : ${Unregister}
    Taglı Rolü \`(${Settings.Prefix}setup team @Rol/ID)\` : ${Team}
    Booster Rolü \`(${Settings.Prefix}setup booster @Rol/ID)\` : ${Booster}
    Etkinlik Rolü \`(${Settings.Prefix}setup etkinlikkatılımcısı @Rol/ID)\` : ${EtkinlikKatılımcısı}
    Çekiliş Rolü \`(${Settings.Prefix}setup çekilişkatılımcısı @Rol/ID)\` : ${CekilisKatılımcısı}
    \`\`\`Cezalı Rol Ayarları\`\`\`Muted Rolü\`(${Settings.Prefix}setup cmuterol @Rol/ID)\` : ${Muted}
    V Muted Rolü \`(${Settings.Prefix}setup vnmuted @Rol/ID)\` : ${Vmuted}
    Cezalı Rolü \`(${Settings.Prefix}setup jailed @Rol/ID)\` : ${Cezalı}
    Yasaklı Tag Rolü \`(${Settings.Prefix}setup yasaklıtag @Rol/ID)\` : ${YasaklıTag}
    Yekili Alım DM Rolü \`(${Settings.Prefix}setup yetkilialimdm @Rol/ID)\` : ${YetkiliAlım}
    En Alt Yetki Rolü \`(${Settings.Prefix}setup botkomut @Rol/ID)\` : ${Komut}
    Yeni Hesap Rolü \`(${Settings.Prefix}setup şüpheli @Rol/ID)\` : ${Şüpheli}
    \`\`\`Yetkili Rollerin Ayarları\`\`\`Başlangıç Yetkileri \`(${Settings.Prefix}setup ${Settings["Guild.Yetki.Baslangıc"]} @Rol/ID)\` ${baslangıcYt}
    2. Yetkiler \`(${Settings.Prefix}setup ${Settings["Guild.Yetki.2.Yetki"]} @Rol/ID)\` ${ikinciYt}
    3. Yetkiler \`(${Settings.Prefix}setup ${Settings["Guild.Yetki.3.Yetki"]} @Rol/ID)\` ${ücüncüYe}
`)]})



  }
  if(interaction.values[0] === "kkapat") {
      if(kmsg) kmsg.delete();
  }
})
}
})    

msg
.awaitMessageComponent({
filter: (component) => component.user.id === message.author.id,
componentType: 'SELECT_MENU',
})
.then(async (interaction) => {
if(interaction.values[0] == "otosetup") {
    if(msg) msg.delete();
  const krow = new MessageActionRow().addComponents(
    new MessageButton()
    .setCustomId('logkurulum')
    .setLabel(`Log Kur`)
    .setStyle('PRIMARY'),
    new MessageButton()
    .setCustomId('renkroller')
    .setLabel(`Renk Rolleri Kur`)
    .setStyle('PRIMARY'),
    new MessageButton()
    .setCustomId('emojikurulum')
    .setLabel(`Emoji Kur`)
    .setStyle('PRIMARY'),)
    
    let kmsg = await interaction.channel.send({ components: [krow], embeds: [embed.setFooter(`${Settings["Client.Bot.Footer"]}`).setDescription(`Aşağıdaki butonları kullanarak emoji ve log kurulumlarını yapabilirsiniz.
    `)]})
    const collector = kmsg.createMessageComponentCollector({ filter, time: 30000 })
    var filter = (button) => button.user.id === message.author.id;
collector.on('collect', async (button, user) => {      

  if(button.customId === "logkurulum") {
    kmsg.delete()
    const everyone = message.guild.roles.cache.find(a => a.name === "@everyone");
    message.reply("Log Kanalları Kuruluyor...")
    const Log = await message.guild.channels.create(`${message.guild.name} Log`, {
        type: 'GUILD_CATEGORY',});
    const basitLog = await message.guild.channels.create(`${message.guild.name} Basit Log`, {
        type: 'GUILD_CATEGORY',});
      const cezaislemlog = await message.guild.channels.create(`Ceza-i İslem`, {
        type: 'GUILD_CATEGORY',
      });
      await Log.permissionOverwrites.edit(everyone.id, { VIEW_CHANNEL: false });
      const cmdLog = await message.guild.channels.create(`cmd-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const guardLog = await message.guild.channels.create(`guard-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const roleLog = await message.guild.channels.create(`role-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const sesLog = await message.guild.channels.create(`ses-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const nicknameLog = await message.guild.channels.create(`nickname-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const usernameLog = await message.guild.channels.create(`username-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const streamerLog = await message.guild.channels.create(`steamer-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const girisLog = await message.guild.channels.create(`giris-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const mesajLog = await message.guild.channels.create(`mesaj-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const avatarLog = await message.guild.channels.create(`avatar-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const cezaİslem = await message.guild.channels.create(`ceza-islem-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
      const yetkiverLog = await message.guild.channels.create(`yetki-log`, {
        type: 'GUILD_TEXT',
      }).then(async channel => await channel.setParent(Log, { lockPermissions: true }));
//----------------------------------------------
const roleLogBasit = await message.guild.channels.create(`role-log-basit`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(basitLog, { lockPermissions: true }));
//----------------------------------------------
const boosterLog = await message.guild.channels.create(`booster-log`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(basitLog, { lockPermissions: true }));
const sesLogBasit = await message.guild.channels.create(`ses-log-basit`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(basitLog, { lockPermissions: true }));
const girisCikisLog = await message.guild.channels.create(`giris-cikis-log-basit`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(basitLog, { lockPermissions: true }));
const nicknameaBasit = await message.guild.channels.create(`nickname-log-basit`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(basitLog, { lockPermissions: true }));
//-------------------------------------------------
const voiceMuteLog = await message.guild.channels.create(`voice-mute-bilgi`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(cezaislemlog, { lockPermissions: true }));
const chatMuteLog = await message.guild.channels.create(`chat-mute-bilgi`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(cezaislemlog, { lockPermissions: true }));
const jailLog = await message.guild.channels.create(`cezalı-bilgi`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(cezaislemlog, { lockPermissions: true }));
const banLog = await message.guild.channels.create(`ban-bilgi`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(cezaislemlog, { lockPermissions: true }));
const cezapuanLog = await message.guild.channels.create(`cezapuan-bilgi`, {
  type: 'GUILD_TEXT',
}).then(async channel => await channel.setParent(cezaislemlog, { lockPermissions: true }));
      message.reply("Log Kanalları Kuruldu.")




  }
  if(button.customId === "emojikurulum") {
    button.reply({ content: `Emojiler kurulmaya başlanıyor.`})
    let guild = message.guild;
    let carpiEmoji =     "https://cdn.discordapp.com/emojis/996062052344942702.gif?size=128&quality=lossless";
    let tikEmoji =       "https://cdn.discordapp.com/emojis/911197672453578782.gif?v=1";
    let onayEmoji =      "https://cdn.discordapp.com/emojis/996062024675106886.gif?size=128&quality=lossless";
    let bannedEmoji =    "https://cdn.discordapp.com/emojis/925746073052516404.gif?v=1";
    let chatmuteEmoji =  "https://cdn.discordapp.com/emojis/959385737986445312.png?v=1";
    let voiceMuteEmoji = "https://cdn.discordapp.com/emojis/911197650416721920.png?v=1";
    let jailedEmoji =    "https://cdn.discordapp.com/emojis/946782601862086698.png?v=1";
    let xpEmoji =        "https://cdn.discordapp.com/emojis/950018604357812304.gif?v=1";
    let beyazboncukEmoji = "https://cdn.discordapp.com/emojis/879742271778619402.gif?v=1";
    let warningEmoji = "https://cdn.discordapp.com/emojis/959578978992144485.gif?v=1";
    let baslangıcBosBar = "https://cdn.discordapp.com/emojis/910902792955252746.png?v=1";
    let ortaBosBar = "https://cdn.discordapp.com/emojis/959578971186536528.png?v=1";
    let sonBosBar = "https://cdn.discordapp.com/emojis/959578984910319707.png?v=1";
    let noktaEmoji = "https://cdn.discordapp.com/emojis/959578973250142309.png?v=1";
    let netflixEmoji = "https://cdn.discordapp.com/emojis/922208979990487080.png?v=1"; 
    let blutvEmoji = "https://cdn.discordapp.com/emojis/911728607683027034.png?v=1";
    let spotifyEmoji = "https://cdn.discordapp.com/emojis/936152926857072740.png?v=1"; 
    let nitroEmoji = "https://cdn.discordapp.com/emojis/926900977775288371.gif?v=1";
    let soruİsareti = "https://cdn.discordapp.com/emojis/939182062668247050.gif?v=1";
    let sesEmoji = "https://cdn.discordapp.com/emojis/957139330273513512.gif?v=1";
    let mesajEmoji = "https://cdn.discordapp.com/emojis/950343302195085353.gif?v=1";
    let memberEmoji = "https://cdn.discordapp.com/emojis/922257224250830869.png?v=1";
    let sesEmojicik = "https://cdn.discordapp.com/emojis/926833628791570442.png?v=1";
    let ayarEmoji = "https://cdn.discordapp.com/emojis/922256858939551754.png?v=1";
    let doluson = "https://cdn.discordapp.com/emojis/812591747393650728.gif?v=1";
    let dolubas =  "https://cdn.discordapp.com/emojis/812591747401646100.gif?v=1";
    let doluorta = "https://cdn.discordapp.com/emojis/813380548768563250.gif?v=1";

    guild.emojis.create(carpiEmoji, "ravgar_carpi").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(tikEmoji, "ravgar_tik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(onayEmoji, "ravgar_onay").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(bannedEmoji, "ravgar_banned").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(chatmuteEmoji, "ravgar_muted").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(voiceMuteEmoji, "ravgar_vmuted").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(jailedEmoji, "ravgar_jailed").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(xpEmoji, "ravgar_xp").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(beyazboncukEmoji, "ravgar_beyazboncuk").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(warningEmoji, "ravgar_warning").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(noktaEmoji, "ravgar_nokta").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(netflixEmoji, "ravgar_netflix").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(blutvEmoji, "ravgar_blutv").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(spotifyEmoji, "ravgar_spotify").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(nitroEmoji, "ravgar_nitro").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(soruİsareti, "ravgar_soru").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(mesajEmoji, "ravgar_mesaj").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(sesEmoji, "ravgar_ses").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(memberEmoji, "ravgar_member").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(sesEmojicik, "ravgar_sescik").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);
    guild.emojis.create(ayarEmoji, "ravgar_ayar").then(emoji => message.channel.send(`Başarıyla ${emoji.name} adında emoji oluşturuldu. (${emoji})`)).catch(console.error);;}
  if(button.customId === "renkroller") {
    button.reply({ content: `Renk Rolleri kurulmaya başlanıyor roller kurulurken id'leri databaseye kaydediliyor.`})
    const yesil = await message.guild.roles.create({ name: "🍏", reason: "Kurulum - Yeşil Emoji", color: "7fec14", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, }, message.channel.send(`Başarılıyla Yeşil renk rolü oluşturuldu.`))
const kırmızı = await message.guild.roles.create({ name: "🍓", reason: "Kurulum - Kırmızı Emoji", color: "c71912", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, }, message.channel.send(`Başarılıyla Kırmızı renk rolü oluşturuldu.`))
const sarı = await message.guild.roles.create({ name: "🍋", reason: "Kurulum - Sarı Emoji", color: "dde10f", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, }, message.channel.send(`Başarılıyla Sarı renk rolü oluşturuldu.`))
const mor = await message.guild.roles.create({ name: "🍇", reason: "Kurulum - Mor Emoji", color: "740fe1", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, }, message.channel.send(`Başarılıyla Mor renk rolü oluşturuldu.`)); 
const turuncu = await message.guild.roles.create({ name: "🍑", reason: "Kurulum - Turuncu Emoji", color: "c98d11",}, message.channel.send(`Başarılıyla Turuncu renk rolü oluşturuldu.`))
const kahverengi = await message.guild.roles.create({ name: "🥥", reason: "Kurulum - Kahverengi Emoji", color: "3c2a04", permissions: Permissions.FLAGS.READ_MESSAGE_HISTORY, }, message.channel.send(`Başarılıyla Kahverengi renk rolü oluşturuldu.`))
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkYesil: yesil.id } }, { upsert: true }).exec();
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkKırmızı: kırmızı.id } }, { upsert: true }).exec();
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkSarı: sarı.id } }, { upsert: true }).exec();
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkMor: mor.id } }, { upsert: true }).exec();
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkTuruncu: turuncu.id } }, { upsert: true }).exec();
await _setup.findOneAndUpdate({ guildID: client.guilds.cache.get(Settings.guildID) }, { $set: { renkKahverengi: kahverengi.id } }, { upsert: true }).exec();}})}})
 
       
    
        
}
        }
}