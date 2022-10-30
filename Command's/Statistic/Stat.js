const moment = require("moment");
require("moment-duration-format");
moment.locale('tr');
const mbLimit = new Map();
const AutoReply = require("../../Helper's/AutoRepy")
const Kategorilerr = require("../../Helper's/MongooseSchema/StatisticSchema/ParentsVoice")
const messageUserChannel = require("../../Helper's/MongooseSchema/StatisticSchema/messageUserChannelsSchema");
const voiceUserChannel = require("../../Helper's/MongooseSchema/StatisticSchema/voiceUserChannelSchema");
const messageUser = require("../../Helper's/MongooseSchema/StatisticSchema/messageUserSchema");
const voiceUser = require("../../Helper's/MongooseSchema/StatisticSchema/voiceUserSchema");
const sunucuVeri = require("../../Helper's/MongooseSchema/_setup")
const voiceUserParent = require("../../Helper's/MongooseSchema/StatisticSchema/voiceUserParent");
const Settings = require("../../Helper's/Settings.json")
const kategori = require("../../Helper's/MongooseSchema/StatisticSchema/ParentsVoice")
const Register = require("../../Helper's/MongooseSchema/Registeryy")
const inviterSchema = require("../../Helper's/MongooseSchema/İnviter");
const inviteMemberSchema = require("../../Helper's/MongooseSchema/İnviteMember");
const ms = require("ms")
const { MessageActionRow, MessageSelectMenu, MessageButton, MessageEmbed } = require('discord.js');
module.exports = { name: "stat", aliases: ["me"],   category: "User", desc: "Sunucu içerisindeki istatistiklerini görüntüle",
    execute: async (client, message, args, ClientEmbed, FlatEmbed) => { 
        let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
        let embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setFooter(`${Settings["Client.Bot.Footer"]}`).setColor("RANDOM");

        const convert = async (parentsArray) => {
            const data = await voiceUserParent.find({ guildID: message.guild.id, userID: message.author.id });
            const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
            let voiceStat = 0;
            for (var i = 0; i <= voiceUserParentData.length; i++) {
                voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
            }
           return moment.duration(voiceStat).format("H [saat], m [dakika]");
        };

        let loading = await message.channel.send("Stat veriler yükleniyor..")
        const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
        const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
        let voiceTop;
        let messageTop;
        Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : x.channelID }: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Mesaj Verisi Bulunamadı.";
        Active2.length > 0 ? voiceTop = Active2.splice(0, 5).map(x => `${message.guild.channels.cache.get(x.channelID) ? message.guild.channels.cache.get(x.channelID).name : x.channelID }: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join("\n") : voiceTop = "Ses Verisi Bulunamadı.";
        
        const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
        const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
        
        const messageDaily = messageData ? messageData.dailyStat : 0;
        const messageWeekly = messageData ? messageData.weeklyStat : 0;
        
        const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");
        const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
        
        const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.id });
        const totalinvite = inviterData ? inviterData.total : 0;
        const regular = inviterData ? inviterData.regular : 0;
        const bonus = inviterData ? inviterData.bonus : 0;
        const leave = inviterData ? inviterData.leave : 0;
        const fake = inviterData ? inviterData.fake : 0;
        const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.id });
        const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
        const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;    


        const filteredParents = message.guild.channels.cache.filter((x) =>
        x.type === "convert" &&
        !Settings.PublicParents.includes(x.id) && !Settings.RegisterParents.includes(x.id) && !Settings.PrivateParent.includes(x.id) && !Settings.SolvingParent.includes(x.id) && !Settings.TerapiParent.includes(x.id) && !Settings.StreamerParent.includes(x.id) && !Settings.VKDCParent.includes(x.id)
        );
                const row = new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                      .setPlaceholder('Aşağıdaki Panel ile Sunucu İstatistiklerini Görüntüle!')
                      .setCustomId('kurulumselect')
                      .addOptions([
                      {
                            label: "Genel İstatistikler",
                            description: "Tüm Zamanları İçeren İstatistiklerini Görüntüle.",
                            value: "genelStat",
                            emoji: "956213043572920330"
                      },
                      { 
                          label: "Haftalık & Günlük İstatistikler",
                          description: "Haftalık & Günlük Zamanları İçeren İstatistiklerini Görüntüle.",
                          value: "weeklyStat",
                          emoji: "956213043572920330"
        
                      },
                      { 
                        label: "Kayıt ve Davet Bilgileri",
                        description: "Kayıt ve Davet İstatistiklerin Hakkında Bilgi Sahibi Ol.",
                        value: "InviteRegisterStat",
                        emoji: "956213043572920330"
        
                      },
                      { 
                        label: "Kapat",
                        description: "Menüyü Kapat.",
                        value: "closeMenu",
                        emoji: "728939059480756267"
                      }
                    ])
                    );
        
                        const Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("RANDOM");
                        const PublicKategori = `${Settings.PublicParenName}: \`${await convert(Settings.PublicParents)}\``
                        const RegiterKategori = `${Settings.RegisterParentName}: \`${await convert(Settings.RegisterParents)}\``
                        const SorunCözmeKategori = `${Settings.SolvingParentName}: \`${await convert(Settings.SolvingParent)}\``
                        const TerapiKategori = `${Settings.TerapiParentName}: \`${await convert(Settings.TerapiParent)}\``
                        const PrivateKategori = `${Settings.PrivateParentName}: \`${await convert(Settings.PrivateParent)}\``
                        const VkDcKategori = `${Settings.VKDCParentName}: \`${await convert(Settings.VKDCParent)}\``
                        const StreamerKaegori = `${Settings.StreamerParentName}: \`${await convert(Settings.StreamerParent)}\``
                        const diğerKategori = `${Settings.DigerParentName}: \`${await convert(filteredParents.map(x => x.id))}\``		
                        Embed.addField(`${client.emojis.cache.find(x => x.name === "ravgar_ses")} Önemli Kategori Listesi`, `${PublicKategori} \n${RegiterKategori}\n${SorunCözmeKategori}\n${TerapiKategori}`, true)
                        Embed.addField(`Diğer Kategori Listesi`, `\n${PrivateKategori}\n${VkDcKategori}\n${StreamerKaegori}\n${diğerKategori}`, true)
                        Embed.addField(`${client.emojis.cache.find(x => x.name === "ravgar_mesaj")} Genel Mesaj Listesi`, `${messageTop}`)
                        Embed.setDescription(`${member} üyesinin \`${message.guild.name}\` sunucusunda tüm zamanları içeren genel ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
                        loading.delete()
                        let msg = await message.channel.send({ components: [row], embeds: [Embed] })
                        message.react(`${client.emojis.cache.find(x => x.name === "ravgar_tik")}`);
                         msg.awaitMessageComponent({ filter: (component) => component.user.id === message.author.id, componentType: 'SELECT_MENU',}).then(async (interaction) => {
                         if(interaction.values[0] == "genelStat") {
                            const Embed = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("RANDOM");
                            Embed.addField(`${client.emojis.cache.find(x => x.name === "ravgar_ses")} Önemli Kategori Listesi`, `${PublicKategori} \n${RegiterKategori}\n${SorunCözmeKategori}\n${TerapiKategori}`, true)
                            Embed.addField(`Diğer Kategori Listesi`, `\n${PrivateKategori}\n${VkDcKategori}\n${StreamerKaegori}\n${diğerKategori}`, true)
                            Embed.addField(`${client.emojis.cache.find(x => x.name === "ravgar_mesaj")} Genel Mesaj Listesi`, `${messageTop}`)
                            Embed.setDescription(`${member} üyesinin \`${message.guild.name}\` sunucusunda tüm zamanları içeren genel ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
        
                        interaction.update({ components: [row], embeds: [Embed] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}		 
                         if(interaction.values[0] == "weeklyStat") {
                            const EmbedWeekly = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("RANDOM");
                            EmbedWeekly.addField(`Mesaj İstatistiği`, `${messageTop}\n\n───────────────\n> Günlük Mesaj: ${messageDaily}\n> Haftalık Mesaj: ${messageWeekly} \n`, true)
                            EmbedWeekly.addField(`Haftalık Ses İstatistiği`, `${voiceTop}\n\n───────────────\n> Günlük Ses: ${voiceDaily}\n> Haftalık Ses: ${voiceWeekly}`, true)
                            EmbedWeekly.setDescription(`${member} üyesinin \`${message.guild.name}\` sunucusunda son haftayı içeren genel ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
            
                            interaction.update({ components: [row], embeds: [EmbedWeekly] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))}
                            if(interaction.values[0] == "InviteRegisterStat") {
                                let register = await Register.findOne({guildID: message.guild.id,execID: member.id})
                                const DisRegister = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("RANDOM");
                                DisRegister.addField(`Davet İstatistikleri`, ` Toplam **${totalinvite}** davetin var!\n(**${regular}** gerçek\n**${leave}** ayrılmış\n**${fake}** fake\n**${weekly}** haftalık)`, true)
                                DisRegister.addField(`Kayıt İstatistikleri`, `Kayıt İstatistikleri Bulunamadı.`, true)
                                if(!register) return interaction.update({ components: [row], embeds: [DisRegister] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                                let erkek = register.erkek || 0
                                let kari = register.kari || 0
                                let total = register.erkek + register.kari || 0
                                const EmbedWeekly = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setThumbnail(message.author.avatarURL({dynamic: true})).setColor("RANDOM");
                                EmbedWeekly.addField(`Davet İstatistikleri`, ` Toplam **${totalinvite}** davetin var!\n**${regular}** gerçek\n**${leave}** ayrılmış\n**${fake}** fake\n**${weekly}** haftalık`, true)
                                EmbedWeekly.addField(`Kayıt İstatistikleri`, `Toplam Kayıt: \`${total}\`\nErkek: \`${erkek}\`\nKadın: \`${kari}\``, true)
                                EmbedWeekly.setDescription(`${member} üyesinin \`${message.guild.name}\` sunucusunda kayıt ve davet bilgileri aşağıda belirtilmiştir.`)
                
                                interaction.update({ components: [row], embeds: [EmbedWeekly] }).then(e => setTimeout(() => interaction.message.delete().catch(() => { }), 30000))
                            }                                
                                if(interaction.values[0] == "closeMenu") {
                                    interaction.message.delete()					
                                    }
                            
        
                                
                            
                                })
            
            }
        }