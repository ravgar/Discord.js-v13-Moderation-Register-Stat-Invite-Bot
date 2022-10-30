const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  channelID: String,
  channelWeekly: String,
  twoWeeklyStat: { type: Number, default: 0 },
  channelData: { type: Number, default: 0 },
});

module.exports = model("voiceUserChannel", schema);
