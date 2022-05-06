import Configuration from "../GUI/HSBC_GUI";
let alreadyUsed = false;
const pickaxeNames = [
    "pickaxe",
    "pickonimbus",
    "stonk",
    "gauntlet",
    "drill"
];
import { C08PacketPlayerBlockPlacement, BP } from "../Constants/Packets";
import { Storage } from "../Handlers/StorageHandler";
let cd = {
    rareDrops1: false,
    rareDrops2: false,
    rareDrops3: false,
    rareDrops4: false
};

register("chat", (api_key) => {
    ChatLib.chat(`&6[HSBC]&r&e HSBC has updated your API key configuration to:&r&b ${api_key}`);
    Configuration.apiKey = api_key;
}).setCriteria("Your new API key is ${api_key}").setExact();

register("chat", (rank, name, guildRank, message, event) => {
    if (!rank || !name || !guildRank || !message || !Configuration.guildMessageFormat) return;
    if (!Configuration.guildMessageFormat?.includes("{rank}") || !Configuration.guildMessageFormat?.includes("{name}") || !Configuration.guildMessageFormat?.includes("{guildRank}") ||  !Configuration.guildMessageFormat?.includes("{message}")) return ChatLib.chat("&6[HSBC]&r&c The guild message formatting config must have the &r&a{rank}, {name}, {guildRank}, and {message}&r&c fields.&r");
    ChatLib.chat(Configuration.guildMessageFormat?.replace(/{rank}/gim, rank)?.replace(/{name}/gim, name)?.replace(/{guildRank}/gim, guildRank)?.replace(/{message}/gim, message));
    cancel(event);
}).setCriteria("Guild > ${rank} ${name} ${guildRank}: ${message}").setParameter("contains");

register("chat", () => {
    if (Configuration.miningSpeedBoostAlert) {
    Client.showTitle("&aYour &r&6Mining Speed Boost&r&a is available.&r", `${Configuration.advancedTooltips && !Configuration.autoMiningSpeedBoost ? '&aYou can enable&r&6 Mining Speed Boost&r&a to automatically use your pickaxe ability.' : ''}`, 2, 40, 2);
    if (Configuration.autoMiningSpeedBoost) {
        if (!Player.getHeldItem()) return;
        if (alreadyUsed) return;
    let holdingPickaxe = false;
    pickaxeNames.forEach((pickaxe) => {
        if (Player?.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase()?.includes(pickaxe)) holdingPickaxe = true;
    });
    if (!holdingPickaxe && holdingPickaxe !== true) return;
    else Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(Player.getHeldItemIndex()).getItemStack(), 0, 0, 0));
    };
};
}).setCriteria("Mining Speed Boost is now available!").setExact()

register("chat", (cooldown, event) => {
    if (Configuration.hideCooldownMessage) cancel(event);
}).setCriteria("This ability is on cooldown for ${cooldown}.").setExact();

register("chat", (event) => {
    if (Configuration.hideBlocksInTheWay) cancel(event);
}).setCriteria("There are blocks in the way!").setExact();

register("chat", (event) => {
    if (Configuration.hideBlocksInTheWay) cancel(event);
}).setCriteria("There're blocks in the way!").setExact();

register("chat", () => {
    if (!alreadyUsed) alreadyUsed = true;
}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!").setExact();

register("chat", () => {
    if (alreadyUsed) alreadyUsed = false;
}).setCriteria("Your Mining Speed Boost has expired!").setExact();

register("chat", () => {
    Client.showTitle("&cYour Hitshield has broken!", "&r&6Your Voidling's Stronghold Buff is now active for the next &a15 seconds!", 2, 60, 2)
}).setCriteria("Your Hitshield have broken! Your Voidling's Stronghold Buff is now active for the next 20 seconds!").setExact();

register("chat", (msg) => {
    Storage.messages.push(msg);
    Storage.save();
}).setCriteria("${msg}");

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    if (cd.rareDrops1) setTimeout(() => {
        ChatLib.say(ChatLib.removeFormatting(`RARE DROP! ${drop} ${magicFind}`));
    }, cd.rareDrops1);
    else if (!cd.rareDrops1) {
        ChatLib.say(ChatLib.removeFormatting(`RARE DROP! ${drop} ${magicFind}`));
        cd.rareDrops1 = 500;
        setTimeout(() => {
            cd.rareDrops1 = false;
        }, 500);
    };
}).setCriteria("RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    if (cd.rareDrops2) setTimeout(() => {
        ChatLib.say(ChatLib.removeFormatting(`VERY RARE DROP! ${drop} ${magicFind}`));
    }, cd.rareDrops2);
    else if (!cd.rareDrops2) {
        ChatLib.say(ChatLib.removeFormatting(`VERY RARE DROP! ${drop} ${magicFind}`));
        cd.rareDrops2 = 500;
        setTimeout(() => {
            cd.rareDrops2 = false;
        }, 500);
    };
}).setCriteria("VERY RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    if (cd.rareDrops3) setTimeout(() => {
        ChatLib.say(ChatLib.removeFormatting(`CRAZY RARE DROP! ${drop} ${magicFind}`));
    }, cd.rareDrops3);
    else if (!cd.rareDrops3) {
        ChatLib.say(ChatLib.removeFormatting(`CRAZY RARE DROP! ${drop} ${magicFind}`));
        cd.rareDrops3 = 500;
        setTimeout(() => {
            cd.rareDrops3 = false;
        }, 500);
    };
}).setCriteria("CRAZY RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    if (cd.rareDrops4) setTimeout(() => {
        ChatLib.say(ChatLib.removeFormatting(`INSANE RARE DROP! ${drop} ${magicFind}`));
    }, cd.rareDrops4);
    else if (!cd.rareDrops4) {
        ChatLib.say(ChatLib.removeFormatting(`INSANE RARE DROP! ${drop} ${magicFind}`));
        cd.rareDrops4 = 500;
        setTimeout(() => {
            cd.rareDrops4 = false;
        }, 500);
    };
}).setCriteria("INSANE RARE DROP! ${drop} ${magicFind}").setExact();

// register("command", (args) => {
// }).setName("test");