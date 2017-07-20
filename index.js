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
		let dt = time.create();
		let fr = dt.format("Y-m-d");

		fs.appendFile(`${message.author.id}.txt`, `[${message.createdAt.toUTCString()}] ${message.author.tag}: ${message.cleantContent}\r\n`, function (err) {
			if (err) throw err;
		});

		if (!fs.existsSync(fr)) {
			fs.mkdirSync(fr);
		}

		fs.move(`${message.author.id}.txt`, __dirname + fr, function (err) {
			if (err) throw err;
		});
	}
});

client.login("MzE2MzY0MTg1NDMwOTE3MTIy.DAVOdA.Fma_7_tAUCkeoQhVVlS8KE9RS50"); // nts: remove token