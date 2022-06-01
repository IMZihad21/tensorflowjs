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
            message.reply('Pong!');
        }
    }
});

export default discordClient;