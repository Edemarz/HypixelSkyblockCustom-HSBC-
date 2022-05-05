import { Storage } from "../Handlers/StorageHandler";
const requiredArguments = 1;

function help({ args, chat }) {
    return chat.chat("&6[HSBC]&r&e /copy <Number (Ascending)>");
};

function run({ args, chat }) {
    if (!args[0]) return help({ args, chat });
    if (isNaN(args[0]) && typeof args !== 'number') return chat.chat("&6[HSBC]&r&c The argument must be a Number!&r");
    const index = Number(args);
    if (index === 0) return chat.chat("&6[HSBC]&r&c You have to input number above 0!")
    const storageLength = Storage.messages.length;

    if (index > storageLength) return chat.chat(`&6[HSBC]&r&c You cannot copy that message since it is more than how much message HSBC has stored!`);
    const message = Storage.messages[Storage.messages.length - index];

    if (!message) return chat.chat(`&6[HSBC]&r&c You cannot copy that message since it is more than how much message HSBC has stored!`);
    chat.say(ChatLib.removeFormatting(message));
    return chat.chat("&6[HSBC]&r&a Message successfuly sent.");
};

export { run, help, requiredArguments };