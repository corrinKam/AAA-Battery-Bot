//Discord Bot: AAA Battery Bot

const Discord = require('discord.js');
const prefix = "!";
const bot = new Discord.Client();

const bot_token = process.env.BOT_TOKEN;
console.log("bot token ONLINE");
const giphy_token = process.env.GIPHY_TOKEN;
console.log("giphy token ONLINE");

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphy_token)

bot.once('ready', () => {
    console.log("AAA Battery ONLINE")
})

bot.on('message', message => {
    console.log(message.content);
    //logs all messages sent to console

    client.user.setStatus('online', 'type !help');

    if (message.content.startsWith(`${prefix}help`) && message.content === "!help") {
        /*message.channel.send("> List of available commands:" + " \n" +
            "> \n" + "> !gif (random gif)" +
            "\n" + "> !cat (random cat gif)" +
            "\n" + "> !dog (random dog gif)" +
            "\n" + "> !bird (random bird gif)" +
            "\n" + "> !dice (roll a dice)" +
            "\n" + "> !coin (flip a coin)" +
            "\n" + "> !number (generate a number between 0 and 100)" +
            "\n" + "> !help");*/

        message.channel.send({embed: new Discord.RichEmbed()
            .setTitle(`Commands`)
            .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
            .setDescription("!gif (random gif)" +
            "\n" + "!cat (random cat gif)" +
            "\n" + "!dog (random dog gif)" +
            "\n" + "!bird (random bird gif)" +
            "\n" + "!dice (roll a dice)" +
            "\n" + "!coin (flip a coin)" +
            "\n" + "!number (generate a number between 0 and 100)" +
            "\n" + "!help")
        });
    }

    if (message.content.startsWith(`${prefix}cat`) && message.content === "!cat") {
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

                /*message.channel.send({embed: new Discord.RichEmbed()
                    .setTitle(`Cat`)
                    .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
                    .setDescription(responseFinal.images.fixed_height.url)
                });*/
            })
    }

    if (message.content.startsWith(`${prefix}dog`) && message.content === "!dog") {
        giphy.search('gifs', { "q": "dog" })
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

    if (message.content.startsWith(`${prefix}bird`) && message.content === "!bird") {
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

    if (message.content.startsWith(`${prefix}gif`) && message.content === "!gif") {
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

    if (message.content.startsWith(`${prefix}dice`) && message.content === "!dice") {
        //message.channel.send("Rolling a die...");
        //message.channel.send("...");

        let number = Math.floor(Math.random() * 6) + 1;
        //message.channel.send(number);

        message.channel.send({embed: new Discord.RichEmbed()
            .setTitle(`Roll a die`)
            .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
            .setDescription(number)
        });
    }

    if (message.content.startsWith(`${prefix}coin`) && message.content === "!coin") {
        //message.channel.send("Flipping a coin...");
        //message.channel.send("...");

        var coinResult;

        let coin = Math.floor(Math.random() * 2);
        if (coin === 1) {
            coinResult = "Heads!";
            //message.channel.send("Heads!");
        } else {
            coinResult = "Tails!";
            //message.channel.send("Tails!");
        }

        message.channel.send({embed: new Discord.RichEmbed()
            .setTitle(`Flip a coin`)
            .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
            .setDescription(coinResult)
        });
    }

    if (message.content.startsWith(`${prefix}number`) && message.content === "!number") {
        let number = Math.floor(Math.random() * 100);
        /*message.channel.send("Generating a random number...");
        message.channel.send("...");
        message.channel.send(number);*/

        message.channel.send({embed: new Discord.RichEmbed()
            .setTitle(`Random number`)
            .setColor([Math.floor(Math.random()*256), Math.floor(Math.random()*256), Math.floor(Math.random()*256)])
            .setDescription(number)
        });
    }

    if (message.content.startsWith(`${prefix}git`)) {
        message.channel.send("https://github.com/corrinKam/AAA-Battery-Bot");
    }

    if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS']))
    //kick only works with ppl who have kick and ban perms
    {
        if (message.content.startsWith(`${prefix}kick`)) {
            let member = message.mentions.members.first();

            if (!member) {
                return message.reply('mention a user to kick with @')
            }

            if (!member.kickable) {
                return message.reply('This user cannot be kicked')
            }

            return member
                .kick()
                .then(() => message.reply(`${member.user.tag} was kicked`))
                .catch(error => message.reply("!ERROR!"))

            /*member.kick().then((member) => {
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
            })*/
        }
    }

    if (message.content === "!h" || message.content === "!he" || message.content === "!hel") {
        message.channel.send("Did you mean !help?");
    }

    if (message.content.toLowerCase() === "owo") {
        message.channel.send("what's this?");
    }

    if (message.content.toLowerCase() === "ping") {
        message.channel.send("Pong!");
    }

    if (message.content.toLowerCase() === "pong") {
        message.channel.send("Ping??");
    }

    if (message.content.toLowerCase() === "rood") {
        message.channel.send(":p");
    }
})

bot.login(bot_token);