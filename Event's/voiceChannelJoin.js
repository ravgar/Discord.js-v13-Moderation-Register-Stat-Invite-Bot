const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Settings = require("../Helper's/Settings.json")
const Database = require("../Helper's/MongooseSchema/ExecutorModel")
module.exports = (member, channel) => {
        if(!client.channelTime.has(member.id)) {
        client.channelTime.set(member.id, {channel: channel.id, time: Date.now()})
        }}
module.exports.conf = { name: "voiceChannelJoin"}