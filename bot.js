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

        // Response time starts here
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

    // Command: !randomAK
    // return a random arknights character 
    // params: star 1-6
    // example: !randomAK star 5
    if (message.content.startsWith('!randomAK')) {
        // Remove the command prefix and split the rest by comma
        const args = message.content.slice('!randomAK'.length).trim().split(',');

        // default
        let star = null;

        const tags = [];

        args.forEach((arg) => {
            const trimmedArg = arg.trim();
            const starMatch = trimmedArg.match(/^star\s+(\d+)$/i);

            if (starMatch) {
                star = parseInt(starMatch[1]);
            }
            else if (trimmedArg) {
                tags.push(trimmedArg);
            }
        });

        try {
            const response = await fetch(`https://api.rhodesapi.com/api/search?rarity=${star}`);

            if (!response.ok) {
                message.reply('Invalid arguments. Usage: !randomAK [star] [tag1, tag2, ...], or it broke.');
                throw new Error('Failed to fetch character data.');
            }

            const data = await response.json();

            // Get a random character by index
            const randomCharacter = data[Math.floor(Math.random() * data.length)];
    
            const embed = {
                title: randomCharacter.name,
                description: randomCharacter.biography,
            };
    
            // console.log(embed);
            // console.log(star);
            // console.log(tags);
    
            message.channel.send({ embeds: [embed] });

        }
        catch (error) {
            console.error(error);
            return;
        }

    }
});

client.login(process.env.DISCORD_TOKEN);