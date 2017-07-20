// @author:      nil
// @date:        20/7/17
// @description: index.js for the log-bot

const Discord = require("discord.js");
const fs	  = require("fs-extra");
const time	  = require("node-datetime");

const client = Discord.Client();
const gid    = "196028709491310602"; // ugliest variable name ever

client.on("ready", () => {
	console.log("[log-bot] connected!");
});

client.on("message", message => {
	if (!message.channel.type == "text") return;
	if (message.guild.id == gid) {

	}
});

client.login(); // nts: remove token