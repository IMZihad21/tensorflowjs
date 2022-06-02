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
            // message.reply(`PONG! \n${message.author.username}'s ping is roughly ${Math.round(message.client.ws.ping)}ms.`);
            message.reply({
                embeds: [
                    {
                        title: 'PONG!',
                        description: `${message.author.username}'s ping is roughly ${Math.round(message.client.ws.ping)}ms.`,
                        color: 0x00ff00
                    }
                ]
            })
        }
        else if (command === 'xor') {
            const question = args.join(' ');
            const query = question.split(' ').map(x => parseInt(x));
            if (query.length !== 2 || query[ 0 ] > 1 || query[ 1 ] > 1) {
                message.reply({
                    embeds: [
                        {
                            title: 'Invalid query',
                            description: 'Please enter a query of the form "!xor 0 0" and inputs of 0 or 1.',
                            color: 0xff0000
                        }
                    ]
                });
                return;
            }
            const result = await xorChecker(query);
            // message.reply(`${message.author.username} asked for XOR value of: ${question} \nThe answer is: ${result.value} \nAccurate Answer: ${result.accuracy}`);
            message.reply({
                embeds: [
                    {
                        title: `Answer is: ${result.value}`,
                        description: `${message.author.username} asked for XOR value of: ${question} \n\nAccurate Answer: ${result.accuracy}`,
                        color: 0x00ff00
                    }
                ]
            });
        }
        else {
            message.reply('Unknown command.');
        }
    }
});

export default discordClient;