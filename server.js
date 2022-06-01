import configs from "./configs/config.js";
import discordClient from "./discord/client.js";

discordClient.login(configs.botToken);
