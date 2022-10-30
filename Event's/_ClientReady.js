const sunucuVeri = require("../Helper's/MongooseSchema/_setup")
const Settings = require("../Helper's/Settings.json")
const { joinVoiceChannel } = require("@discordjs/voice");
const data = require("../Helper's/MongooseSchema/Komut-engel")
module.exports = () => {
    const VoiceChannel = client.channels.cache.get(Settings["Client.Voice.Channel"]);
	joinVoiceChannel({
		channelId: VoiceChannel.id,
		guildId: VoiceChannel.guild.id,
		adapterCreator: VoiceChannel.guild.voiceAdapterCreator,
		selfDeaf: true
	});
		client.user.setActivity(Settings["Client.Bot.Activity"], {type: "STREAMING", url: "https://twitch.tv/ravgarcık"})//DEVELOPED BY RAVGAR/WEX
}
module.exports.conf = { name: "ready"}