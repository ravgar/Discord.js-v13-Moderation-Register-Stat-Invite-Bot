# Discord-Moderasyon-Stat-Invite-Log-Register-Botu-V13

**•** Wexle Mod Halini Paylaştığımız Botun İnvite/Stat Eklenmiş Halini Paylaştım.

**•** Bot Hem Ekip Hem Publara Kurulacak Düzendedir.

**•** Log Hatalarını Bitirdikten Sonra .setup booster Yaparak Botu Başlat .kur/.kurulum Yaparak Menüden Emojileri Logları Kur.

**•** npm i Yaz modüllleri İndir

**•** Start Dosyasına Basarak Botu Çalıştır


-------------------------------------------------------------------------------------------------------------------------------

**•** Botu2 Çevirmek İçin ecosystem.config.js dosyası oluşturun

**•** Kendinize Göre Botu Klasörleyin ve Aşağıdaki Düzen Gibi Dosyanın İçini Düzenleyerek Komutu Atın ve ( pm2 start ) yazarak botu başlatın

const Sunucu_1 = "ravgar";
module.exports = {
    apps: [
        {
 name: "mainBot",
        script: 'main.js',
        watch: false,
        exec_mode: "cluster",
        max_memory_restart: "2G",
        cwd: "./Main.js"
