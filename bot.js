//Discord Bot: AAA Battery Bot

const Discord = require('discord.js');
const prefix = "!";
const bot = new Discord.Client();

const bot_token = process.env.BOT_TOKEN;
console.log("bot token ONLINE");
const giphy_token = process.env.GIPHY_TOKEN;
console.log("giphy token ONLINE");

//require("./bot.js");

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphy_token)

bot.once('ready', () => {
    console.log("AAA Battery ONLINE")
})

bot.on('message', message => {
    console.log(message.content);
    //logs all messages sent to console

    if (message.content.startsWith(`${prefix}help`)) {
        message.channel.send("> List of available commands:" + " \n" +
            "> \n" + "> !gif (random gif)" +
            "\n" + "> !cat (random cat gif)" +
            "\n" + "> !bird (random bird gif)" +
            "\n" + "> !dice (roll a dice)" +
            "\n" + "> !coin (flip a coin)" +
            "\n" + "> !number (generate a number between 0 and 100)" +
            "\n" + "> !help");
    }

    if (message.content.startsWith(`${prefix}cat`)) {
        giphy.search('gifs', { "q": "cat" })
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

    if (message.content.startsWith(`${prefix}dice`)) {
        let number = Math.floor(Math.random() * 6) + 1;
        message.channel.send("Rolling a die...");
        message.channel.send(number);
    }

    if (message.content.startsWith(`${prefix}coin`)) {
        let coin = Math.floor(Math.random() * 2);
        message.channel.send("Flipping a coin...");
        if (coin === 1) {
            message.channel.send("Heads!");
        } else {
            message.channel.send("Tails!");
        }
    }

    if (message.content.startsWith(`${prefix}number`)) {
        let number = Math.floor(Math.random() * 100);
        message.channel.send("Generating a random number...");
        message.channel.send(number);
    }

    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']))
    //kick only works with ppl who have kick and ban perms
    {
        if (message.content.startsWith(`${prefix}kick`)) {
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

    if (message.content.startsWith(`${prefix}h`) || message.content.startsWith(`${prefix}he`) || message.content.startsWith(`${prefix}hel`)) {
        message.channel.send("Did you mean !help?");
    }

    if (message.content === "owo" || message.content === "OWO" || message.content === "Owo" || message.content === "OWo" || message.content === "oWo" || message.content === "oWO") {
        message.channel.send("what's this?");
    }

    if (message.content === "ping" || message.content === "Ping") {
        message.channel.send("Pong!");
    }

    if (message.content.includes("rood") || message.content.includes("r00d") || message.content.includes("rOOd")) {
        message.channel.send(":p")
    }
})

bot.login(bot_token);