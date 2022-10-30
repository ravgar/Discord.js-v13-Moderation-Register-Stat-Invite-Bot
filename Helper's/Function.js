const moment = require("moment")
const wexcik = require("pretty-ms");

module.exports = (client) => {
    client.format = sure => {
        return moment(sure).format("D [gün,] H [saat,] m [dakika,] s [saniye.]");
    };

    client.turkishDate = (date) => {
        if (!date || typeof date !== "number") return
        let convert = wexcik(date, { verbose: true })
          .replace("minutes", "dakika")
          .replace("minute", "dakika")
          .replace("hours", "saat")
          .replace("hour", "saat")
          .replace("seconds", "saniye")
          .replace("second", "saniye")
          .replace("days", "gün")
          .replace("day", "gün")
          .replace("years", "yıl")
          .replace("year", "yıl");
        return convert
      }
  
}
