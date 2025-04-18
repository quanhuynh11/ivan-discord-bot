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

client.on('messageCreate', (message) => {
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

    if (message.content === '!who') {
        message.reply('I am Ivan, the real one!');
    }
});

client.login(process.env.DISCORD_TOKEN);