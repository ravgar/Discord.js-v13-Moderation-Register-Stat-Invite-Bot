const { Schema, model } = require("mongoose");

const schema = Schema({
  guildID: String,
  userID: String,
  TotalCoinYT: Number,
  TotalCoin: Number,
  InvıteCoin: Number,
  RegisterCoin: Number,
  SesCoin: Number,
  MessageCoin: Number
});

module.exports = model("guildCoinSchema", schema);
