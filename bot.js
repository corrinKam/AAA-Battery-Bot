//Discord Bot: AAA Battery Bot

const Discord = require('discord.js');
//const { prefix, bot_token, giphy_token } = require('./config.json');
const prefix = "!";
const bot = new Discord.Client();

const bot_token = process.env.BOT_TOKEN;
console.log(bot_token);
const giphy_token = process.env.GIPHY_TOKEN;
console.log(giphy_token);

require("./bot.js");

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphy_token)

bot.once('ready', () => {
    console.log("Bot ONLINE")
})

bot.on('message', message => {
    console.log(message.content);
    //logs all messages sent to console

    if (message.content.startsWith(`${prefix}help`)) {
        //message.channel.send("> List of available commands");
        //message.channel.send("> gif");
        //message.channel.send("> kick (only if you have perms :eyes:)");
        //message.channel.send("> help");

        message.channel.send("> List of available commands:" + " \n" + "> \n" + "> -gif (random gif)" + "\n" + "> -cat (random cat gif)" + "\n" + "> -bird (random bird gif)" + "\n" + "> -kick (PERMS only :eyes:)" + "\n" + "> -help");
    }

    if (message.content.startsWith(`${prefix}cat`)) {
        giphy.search('gifs', { "q": "cat" })
            .then((response) => {
                let totalResponses = response.data.length;
                //all the gif results
                //let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                let responseIndex = Math.floor(Math.random() * totalResponses);
                //gives random number
                let responseFinal = response.data[responseIndex];
                //gives single result

                /** message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                }).catch(() => {
                    message.channel.send('> !ERROR!');
                })*/
                message.channel.send(responseFinal.images.fixed_height.url).catch(() => {
                    message.channel.send('> !ERROR!');
                })
            })
    }

    if (message.content.startsWith(`${prefix}bird`)) {
        giphy.search('gifs', { "q": "bird" })
            .then((response) => {
                let totalResponses = response.data.length;
                //all the gif results
                let responseIndex = Math.floor(Math.random() * totalResponses);
                //gives random number
                let responseFinal = response.data[responseIndex];
                //gives single result

                message.channel.send(responseFinal.images.fixed_height.url).catch(() => {
                    message.channel.send('> !ERROR!');
                })
            })
    }

    if (message.content.startsWith(`${prefix}gif`)) {
        giphy.search('gifs', { "q": "random" })
            .then((response) => {
                let totalResponses = response.data.length;
                //all the gif results
                let responseIndex = Math.floor(Math.random() * totalResponses);
                //gives random number
                let responseFinal = response.data[responseIndex];
                //gives single result

                message.channel.send(responseFinal.images.fixed_height.url).catch(() => {
                    message.channel.send('> !ERROR!');
                })
            })
    }

    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']))
    //kick only works with ppl who have kick and ban perms
    {
        if (message.content.startsWith(`${prefix}kick`)) {
            //message.channel.send("Kicked")

            let member = message.mentions.members.first();
            //any mentions in the message line above
            member.kick().then((member) => {
                giphy.search('gifs', { "q": "bye" })
                    .then((response) => {
                        let totalResponses = response.data.length;
                        //all the gif results
                        let responseIndex = Math.floor(Math.random() * totalResponses);
                        //gives random number
                        let responseFinal = response.data[responseIndex];
                        //gives single result

                        message.channel.send(":wave: " + "User: '" + member.displayName + "' has been kicked!" + "\n" + responseFinal.images.fixed_height.url)
                    }).catch(() => {
                        message.channel.send('> !ERROR!');
                    })
            })
        }
    }

    if (message.content === "owo") {
        message.channel.send("what's this?");
    }
    if (message.content === "OwO") {
        message.channel.send("wHaT's tHiS?");
    }
    if (message.content === "OWO") {
        message.channel.send("What's this?");
    }

    if (message.content === "ping") {
        message.channel.send("pong");
    }
    if (message.content === "Ping") {
        message.channel.send("Pong");
    }

    if (message.content === "rood") {
        message.channel.send(":p");
    }
    if (message.content === "r00d") {
        message.channel.send(":p");
    }
    if (message.content === "rOOd") {
        message.channel.send(":p");
    }
})

//bot.login(process.env.BOT_TOKEN);
bot.login(bot_token);