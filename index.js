// @author:      nil
// @date:        20/7/17
// @description: index.js for the log-bot

const Discord = require("discord.js");
const fs	  = require("fs-extra");
const time	  = require("node-datetime");

const client = new Discord.Client();
const gid    = "320775847671758851"; // ugliest variable name ever

client.on("ready", () => {
	console.log("[log-bot] connected!");
});

client.on("message", message => {
	if (message.channel.type == "dm" || message.channel.type == "group") return;
	if (message.guild.id == gid) {
		let dt = time.create();
		let fr = dt.format("Y-m-d");

		// create the directory first
		if (!fs.existsSync(fr)) {
			fs.mkdirSync(fr);
		}

		// for efficiency purposes
		let cdir = `${__dirname}/${message.author.id}.txt`;

		// we're assuming the file doesn't exist, but if it does then correct it
		if (fs.existsSync(`${__dirname}/${fr}/${message.author.id}.txt`)) {
			cdir = `${__dirname}/${fr}/${message.author.id}.txt`;
		}

		// append to the file with the message data
		fs.appendFile(cdir, `[${message.createdAt.toUTCString()}] ${message.author.tag}: ${message.cleanContent}\r\n`, function (err) {
			if (err) throw err;
			// if the log file is in the root directory then move it
			if (cdir == `${__dirname}/${message.author.id}.txt`) {
				// finally, move the file if it wasn't already in the directory
				fs.move(`${message.author.id}.txt`, `./${fr}/${message.author.id}.txt`, function (err) {
					if (err) throw err;
				});
			}
		});
	}
});

client.login(); // nts: remove token