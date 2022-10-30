const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Settings = require("../Helper's/Settings.json")
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
const AutoReply = require("../Helper's/AutoRepy")
const moment = require("moment")
const ms = require('ms')
const { MessageEmbed, Discord } = require("discord.js");
let iltifatSayi = 0;
let iltifatlar = [
  "Bir gülüşün etrafa ışıklar saçtığını sen de gördüm.",
  "Bir ışıltı onun baharı seher vakti de açılan gülerin başı hiç bitmez onun aşkı.",
  "Bir insanın gülüşünden cennet mi görünür? Bir gülüyorsun cennetten bir fragman yayınlanıyor sanki.",
  "Bu dünyada bir sürü insan var, kimi mutlu kimi mutsuz, kimi gülüyor kimi ağlıyor, ama iyiliğe ve güzelliklere layık olan tek bir insan var o da şu an mesajımı okuyor…",
  "Bu mesajımı sana kalbimin en şiddetli sesiyle yolluyorum, seni seviyorum…",
  "Bugün yine o kadar güzelsin ki gözlerim kamaştı.",
  "Burası huzur kokmuş buradan geçmişsin belli.",
  "Dünyada pek çok insan var ki bazıları mutlu bazıları mutsuz bazıları sevinçli bazıları değil ama şu dünyada en mutlu en sevinçli bir kişi var oda bu yazıyı okuyan.",
  "Dünyanın 7 harikası bile senin yanında değersiz kalır aşkım, sen benim içimdeki dünyamın tek harikasısın…",
  "Erkeklerin kalbi otobüse benzer, gireni çıkanı belli olmaz. kızların kalbi mezara benzer, giren bir daha çıkamaz.",
  "Etrafımda olduğunda başka bir şeye ihtiyacım olmuyor.",
  "Geceyi aydınlatan ay misali senin parlayan gözlerin ışık saçıyor gönlüme.",
  "Gözlerindeki hayat ışığı dünyamı aydınlatıyor, yaşadığım hayat seni kıskanıyor bebeğim…",
  "Gözlerine bakınca cenneti görüyorum bir tanem, güzel gözlerinden sen sorumlusun…",
  "Gül güzelliğinden utanır solar seni gördüğü zaman.",
  "Güneş mi doğdu yoksa sen mi uyandın?",
  "Güneşe gerek yok, gözlerindeki sıcaklık içimi ısıtıyor.",
  "Ne dil yeter seni anlatmaya, ne göz kıyar sana bakmaya, ne ellerim dayanır sana dokunmaya, ne kollarım uzanır seni sarmaya, hiç ömür yeter mi? bir sen daha b ulmaya bitanesi.",
  "Ne kadar fedakar olursanız olsun, adı gün gelir “yapmasaydın” olur.",
  "gülüşündeki gamze olmak isterim güzelliğine güzellik katmak için… ",
"Öyle güzel gülmelisin ki, insanlar seni ağlatmaya utanmalı.",
"Sabahları görmek istediğim ilk şey sensin.",
"Saçlarının kokusuna alıştım bebeğim sen benim cennetimsin ancak bundan sonra sen benim cehennemim olursun bunu unutma gülüm…",
"Sarı saçların güneşin ışığıyla birleşince saf altın gibisin aşkım, güzel gözlerinle bana bakınca hayata başlıyorum o anda…",
"Sen bir erkeğin isteyip de elde edemediği varlıksın… Sen yalan dünyaya gönderilmiş meleğimsin, tek gerçeğimsin aşkım…",
"Sen bir pınarsın içilen ama kanılmayan, seveni yanıltmayan, sevince yanılmayan, varlığına doyulmayan, yokluğuna dayanılmayan…",
"Sen daha önce hiç yazılamamış bir şiirin en güzel mısrası gibisin. Öyle gizlenmiş, kendine saklanmış, eşsiz.",
"Sen muhteşemin kelime anlamının tam karşılığısın.",
"Sen olmadan nasıl var olacağımı bilmiyorum.",
"Benim için mutluluğun tanımı, seninle birlikteyken geçirdiğim vakittir.",
"Seni gören kelebekler, narinliğin karşısında mest olur.",
"Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.",
"Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.",
"Ateş gibi yakıyorsun ruhun ile beni. Gözlerin adeta ejderha, alev yayıyor etrafa.",
"Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
"Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
"Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
"Bir gamzen var sanki cennette bir çukur.",
"Gecemi aydınlatan yıldızımsın.",
"Ponçik burnundan ısırırım seni",
"Bu dünyanın 8. harikası olma ihtimalin?",
"fıstık naber?",
"Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
"Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
"Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
"Müsaitsen aklım bu gece sende kalacak.",
"Gemim olsa ne yazar liman sen olmadıktan sonra...",
"Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
"Sabahları görmek istediğim ilk şey sensin.",
"Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
"Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
"Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
"Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
"Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
"Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
"Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
"Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
"Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
"Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
"Telaşımı hoş gör, ıslandığım ilk yağmursun.",
"Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
"Yaşanılacak en güzel mevsim sensin.",
"Sıradanlaşmış her şeyi, ne çok güzelleştiriyorsun.",
"Gönlüm bir şehir ise o şehrin tüm sokakları sana çıkar.",
"Birilerinin benim için ettiğinin en büyük kanıtı seninle karşılaşmam.",
"Denize kıyısı olan şehrin huzuru birikmiş yüzüne.",
"Ben çoktan şairdim ama senin gibi şiiri ilk defa dinliyorum.",
"Gece yatağa yattığımda aklımda kalan tek gerçek şey sen oluyorsun.",
"Ne tatlısın sen öyle. Akşam gel de iki bira içelim.",
"Bir gamzen var sanki cennette bir çukur.",
"Gecemi aydınlatan yıldızımsın.",
"Ponçik burnundan ısırırım seni",
"Bu dünyanın 8. harikası olma ihtimalin?",
"fıstık naber?",
"Dilek tutman için yıldızların kayması mı gerekiyor illa ki? Gönlüm gönlüne kaydı yetmez mi?",
"Süt içiyorum yarım yağlı, mutluluğum sana bağlı.",
"Müsaitsen aklım bu gece sende kalacak.",
"Gemim olsa ne yazar liman sen olmadıktan sonra...",
"Gözlerimi senden alamıyorum çünkü benim tüm dünyam sensin.",
"Sabahları görmek istediğim ilk şey sensin.",
"Mutluluk ne diye sorsalar- cevabı gülüşünde ve o sıcak bakışında arardım.",
"Hayatım ne kadar saçma olursa olsun, tüm hayallerimi destekleyecek bir kişi var. O da sensin, mükemmel insan.",
"Bir adada mahsur kalmak isteyeceğim kişiler listemde en üst sırada sen varsın.",
"Sesini duymaktan- hikayelerini dinlemekten asla bıkmayacağım. Konuşmaktan en çok zevk aldığım kişi sensin.",
"Üzerinde pijama olsa bile, nasıl oluyor da her zaman bu kadar güzel görünüyorsun? Merhaba, neden bu kadar güzel olduğunu bilmek istiyorum.",
"Çok yorulmuş olmalısın. Bütün gün aklımda dolaşıp durdun.",
"Çocukluk yapsan da gönlüme senin için salıncak mı kursam?",
"Sen birazcık huzur aradığımda gitmekten en çok hoşlandığım yersin.",
"Hangi çiçek anlatır güzelliğini? Hangi mevsime sığar senin adın. Hiçbir şey yeterli değil senin güzelliğine erişmeye. Sen eşsizsin...",
"Rotanızı geçen her geminin ışığıyla değil, yıldızlara göre ayarlayın.",
"Telaşımı hoş gör, ıslandığım ilk yağmursun.",
"Gülüşün ne güzel öyle- cumhuriyetin gelişi gibi...",
'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
'Huzur kokuyor geçtiğin her yer.',];
  
  module.exports = async (message) => {
    const sunucu = await sunucuVeri.findOne({ guildID: client.guilds.cache.get(Settings.guildID) })
      let iltifat = iltifatlar[Math.floor(Math.random() * iltifatlar.length)];
      if ("1017788458154074173" && message.channel.id === "1017788458154074173" && !message.author.bot) {
          iltifatSayi++;
          if (iltifatSayi >= Settings.İltifatSayı) {
              iltifatSayi = 0;
              message.reply(iltifat);
          };
      };
  };

  
module.exports.conf = { name: "message"}