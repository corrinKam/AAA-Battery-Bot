//Discord bot name: AAA Battery

const Discord = require('discord.js');
const { prefix, token, giphyToken } = require('./config.json');
const bot = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

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

        message.channel.send("> List of available commands:" + " \n" + "> \n" + "> -gif (random gif)" + "\n" + "> -cat (random cat gif)" + "\n" + "> -kick (PERMS only :eyes:)" + "\n" + "> -help");
    }

    if (message.content.startsWith(`${prefix}cat`)) {
        giphy.search('gifs', { "q": "cat" })
            .then((response) => {
                var totalResponses = response.data.length;
                //all the gif results
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                //gives random number
                var responseFinal = response.data[responseIndex];
                //gives single result

                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                }).catch(() => {
                    message.channel.send('> !ERROR!');
                })
            })
    }

    if (message.content.startsWith(`${prefix}gif`)) {
        giphy.search('gifs', { "q": "random" })
            .then((response) => {
                var totalResponses = response.data.length;
                //all the gif results
                var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                //gives random number
                var responseFinal = response.data[responseIndex];
                //gives single result

                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                }).catch(() => {
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
                        var totalResponses = response.data.length;
                        //all the gif results
                        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                        //gives random number
                        var responseFinal = response.data[responseIndex];
                        //gives single result

                        message.channel.send(":wave: " + "User: '" + member.displayName + "' has been kicked!", {
                            files: [responseFinal.images.fixed_height.url]
                        })
                    }).catch(() => {
                        message.channel.send('> !ERROR!');
                    })
            })
        }
    }

    if (message.content === "owo") {
        message.channel.send("what's this?");
    }
})

bot.login(token);