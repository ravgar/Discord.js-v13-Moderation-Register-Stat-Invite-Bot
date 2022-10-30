const client = global.client;
const { MessageEmbed } = require("discord.js");
const Settings = require("../Helper's/Settings.json");
const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const moment = require('moment');
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const YasaklıTag = require("../Helper's/MongooseSchema/YasaklıTag")
const Users = require("../Helper's/MongooseSchema/YetkiliVer")
const data = require("../Helper's/MongooseSchema/YasaklıTag")
module.exports = async (old, nev) => {
    let AlınmayacakRoller = [""] // alınmyacak rollerin idlerini giriniz.
    let Tag = ""; // tagınız
    let TagRole = ""; // tag rol id
    let SunucuİD = ""; // sunucu id
  
    //let Kayıtsız =""; - eğer üye tagı bıraktıktan sonra kayıtsıza atılmasını istiyorsanız baştaki "//" silin. 

      if (old.username === nev.username) return;
      if (nev.username.includes(Tag)){
      if (old.username.includes(Tag)) return;
    client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.add(TagRole).catch(console.error);//DEVELOPED BY RAVGAR/WEX
    client.channels.cache.get("taglogid").send(`${nev} İsmine \`tagı yaz\` Alarak Ailemize Katıldı!`)
    } else {
      if (!old.username.includes(Tag)) return;
      client.guilds.cache.get(SunucuİD).members.cache.get(old.id).roles.cache.filter(r => r.id !== client.guilds.cache.get(SunucuİD).id && !AlınmayacakRoller.includes(r.id)).forEach(r => {
        client.guilds.cache.get(SunucuİD).members.cache.get(old.id).roles.remove(r.id)
      })      
      client.channels.cache.get("taglogid").send(`${nev} İsminden \`tagı yaz\` Çıkartarak Ailemizden Ayrıldı!`)
      client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.remove(TagRole).catch(console.error);

    //client.guilds.cache.get(SunucuİD).members.cache.get(nev.id).roles.add(Kayıtsız).catch(console.error); -eğer üye tagı bıraktıktan sonra kayıtsıza atılmasını istiyorsanız baştaki "//" silin. 
       };
}
module.exports.conf = {
    name: "userUpdate"
}
//ZTN DATADA 1 ADET TAG GİREBİLİRSİNİZ --> (.setup tag ...) ÇOĞALTMAK İÇİN BU DOSYALARI DOLDURABİLİRSİNİZ 

//BU KOMUTU ÇOĞALTARAK DAHA FAZLA TAG GİREBİLİRSİNİZ