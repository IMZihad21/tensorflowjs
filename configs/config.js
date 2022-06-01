import { config } from "dotenv";

config();

const configs = {
    botToken: process.env.BOT_TOKEN,
    prefix: process.env.PREFIX,
}

export default configs;
