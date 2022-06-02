import { Client, Intents } from 'discord.js';
import configs from '../configs/config.js';
import xorChecker from '../tensorflow/xorChecker.js';


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
        else if (command === 'xor') {
            const question = args.join(' ');
            const query = question.split(' ').map(x => parseInt(x));
            if (query.length !== 2) {
                message.reply('Please enter two numbers.');
                return;
            }
            if (query[ 0 ] > 1 || query[ 1 ] > 1) {
                message.reply('Please enter two binary numbers.');
                return;
            }
            const result = await xorChecker(query);
            message.reply(`${message.author.username} asked for XOR value of: ${question} \nThe answer is: ${result.value} \nAccurate Answer: ${result.accuracy}`);
        }
        else {
            message.reply('Unknown command.');
        }
    }
});

export default discordClient;