require('dotenv').config();

// bot.js
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent, // Needed for message content
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return; // Ignore messages from bots

    // Command: !ping
    if (message.content === '!ping') {
        // Respond with "Pong!", and response time

        // Reponse time starts here
        const responseTime = Date.now();

        // Respond
        message.reply('Pong!').then((reply) => {
            // Response time ends here
            const ping = Date.now() - responseTime;

            // Get API latency
            const APILatency = Math.round(client.ws.ping);

            reply.edit(`Pong! \nLatency: ${ping}ms\nAPI Latency: ${APILatency}ms`);
        });
    }

    // Command: !who
    if (message.content === '!who') {
        message.reply('I am Ivan, the real one!');
    }

    // Command: !quote
    // returns an anime quote from animechan
    if (message.content === '!quote') {
        const response = await fetch('https://api.animechan.io/v1/quotes/random');
        const data = await response.json();
        // console.log(data);
        message.reply(`Quote: "${data.data.content}" \nAnime: -${data.data.anime.name}-`);
    }
});

client.login(process.env.DISCORD_TOKEN);