const { Schema, model } = require("mongoose");

const schema = new Schema({
  guildID: { type: String, default: "" },
  userID: { type: String, default: "" },
  inviter: { type: String, default: "" },
  date: { type: Number},
  inviteCode: {type: String}
});

module.exports = model("inviteMember", schema);
