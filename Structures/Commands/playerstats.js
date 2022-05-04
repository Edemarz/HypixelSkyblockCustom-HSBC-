import Configuration from "../GUI/HSBC_GUI";
import { validateKey, viewProfiles, getProfileStats } from "../Handlers/RequestHandlers";
const requiredArguments = 1;

function help({ args, chat }) {
    return chat.chat("&6[HSBC]&r&e /playerstats <Player Name>");
};

function run({ args, chat }) {
    if (!args[0]) return help({ args, chat });
    if (!Configuration.apiKey) return chat.chat("&6[HSBC]&r&c Invalid Hypixel API Key, Please do&r&a /api new&r&c to get a new api key!")
    validateKey(Configuration.apiKey).then((response) => {
        const statusCode = Number(response["status"]);

        if (statusCode === 403) return chat.chat("&6[HSBC]&r&c The hypixel api key is invalid! Please get a new api key by doing&r&a /api new&r&c and try again.");
        else if (statusCode === 429) return chat.chat("&6[HSBC]&r&c The api key provided has been rate limited, Please get a new api key by doing&r&a /api new&r&c and try again.");
        else if (statusCode === 200) {
            if (args[0] && !args[1]) {
                viewProfiles(Configuration.apiKey, args[0], chat);
            } else if (args[0] && args[1] && args[2] && args[3]) {
                getProfileStats(Configuration.apiKey, chat, args[0], args[1], args[2], args[3]);
            } else help({ args, chat });
        };
    });
};

export { run, help, requiredArguments };