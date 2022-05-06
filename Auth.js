import { request } from "./Structures/Modules/request/request";
import Configuration from "./Structures/GUI/HSBC_GUI";
const pUuid = Player.getUUID();
const headers = {
    "User-Agent": "Mozilla/5.0@HypixelSkyblockCustom"
};
let authenticated = false;

(function () {
request({
    url: `https://s.edemarz.repl.co/whitelisted/${pUuid}`,
    json: false,
    connectTimeout: 10000,
    headers: headers
}).then((resp) => {
    const whitelisted = JSON.parse(resp["body"])["whitelisted"];
    if (!whitelisted) return ChatLib.chat("&6[HSBC]&r&c You are not whitelisted, therefore you cannot use HSBC.&r&a Please wait for a public release.&r");
    import "./Index";
    ChatLib.chat("&6[HSBC]&r&a You have been successfuly authenticated.&r");
    if (Configuration.autoApiNew) ChatLib.command('api new');
    ChatLib.chat(`&6---------------------[HSBC]----------------------&r\n&7Welcome to&r&6 HSBC&r&7!\n&r&7Do&r&a /hsbc&r&7 for all of&r&6 HSBC&r&7's features or do &a/hsbc help&r&7 for all the commands.\n&6------------------------------------------------&r`);
}).catch((err) => {
    ChatLib.chat(`&6[HSBC]&r&c HSBC has ran into an error while authenticating user, we are sorry for the inconvenience.`);
    });
})();

export { authenticated };