import { Client, Intents } from 'discord.js';
import configs from '../configs/config.js';


const discordClient = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES ]
})

discordClient.addListener('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag}!`);
});

discordClient.addListener('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(configs.prefix)) {
        const args = message.content.slice(configs.prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === 'ping') {
            message.reply(`PONG! \n${message.author.username}'s ping is roughly ${Math.round(message.client.ws.ping)}ms.`);
        }
        else if (command === 'ask') {
            const question = args.join(' ');
            message.reply(`${message.author.username} asked: ${question}`);
        }
        else {
            message.reply('Unknown command.');
        }
    }
});

export default discordClient;