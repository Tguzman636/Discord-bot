const fetch = require('cross-fetch');
require("dotenv").config()

const { Client } = require("discord.js");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const PREFIX = "$";
const SBuuid = 'https://api.hypixel.net/player?key=';
const SBCollections = 'https://api.hypixel.net/resources/skyblock/collections?key=';
//const SBSkills = 'https://api.hypixel.net/resources/skyblock/skills?key=';
const SBSkills = 'https://api.hypixel.net/skyblock/profiles?key='

client.on('ready', () => {
    console.log(`${client.user.tag}`, 'has logged in');
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        switch (CMD_NAME) {
            case 'ping':
                message.channel.send('pong');
                break;
            case 'tag':
                message.channel.send(`${message.author.tag}`);
                break;
            case 'id':
                message.channel.send(`${message.author.id}`);
                break;
            case 'collections':
                fetch(SBuuid + process.env.MCTOKEN + '&name=' + args[0])
                    .then(response => response.json())
                    .then(data => uuid = (data['player']['uuid']))
                    .catch(error => console.log("Network Error", error))
                fetch(SBCollections + process.env.MCTOKEN + '&name=' + args[0])
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Network Error", error))
                break;
            case 'skills':
                var uuid;
                fetch(SBuuid + process.env.MCTOKEN + '&name=' + args[0])
                    .then(response => response.json())
                    .then(data => uuid = (data['player']['uuid']))
                    .catch(error => console.log("Network Error", error))
                console.log(uuid)
                fetch(SBSkills + process.env.MCTOKEN + '&uuid=' + uuid)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log("Network Error", error))
                break;
        }
    }
})

client.login(process.env.TOKEN);