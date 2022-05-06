//Importing
import Configuration from "../GUI/HSBC_GUI";
import { stonkGhostBlockPlayerInteract, stonkGhostBlocksTick } from "../Features/GhostBlock/StonkGhostBlock";
import { GhostBlocks } from "../Features/GhostBlock/GhostBlock";
import { GhostBlock } from "../Manager/KeybindManager";
import { BP, C08PacketPlayerBlockPlacement } from "../Constants/Packets";
import { checkVersion } from "../Handlers/RequestHandlers";
import { GuiOpenButton, LockBind } from "../Manager/KeybindManager";
import { changeLockBindStatus } from "../Features/LockBind/changeBindStatus";
import { Storage } from "../Handlers/StorageHandler";
const listOfFunctions = [
    "getConfig",
    "openGUI",
    "registerListener",
    "registerProperty",
    "addDependency",
    "hideProperty",
    "hidePropertyIf",
    "setCategoryDescription",
    "setSubcategoryDescription",
    "save"
];


let slayer = {
    spawned: false,
    spawnedAt: false
};

let cooldowns = {
    lowHealth: false
};
//Declaring
let AlreadyObtained = false;
let sentWelcome = false;
let powerOrbs = {
    radiant: {
        timeout: [],
        placed: [],
        currentIndex: 0
    },
    manaflux: {
        timeout: [],
        placed: [],
        currentIndex: 0
    },
    overflux: {
        timeout: [],
        placed: [],
        currentIndex: 0
    },
    plasmaflux: {
        timeout: [],
        placed: [],
        currentIndex: 0
    }
};

//Registering listeners.
register("worldLoad", () => {
    if (Configuration.autoApiNew && !AlreadyObtained) {
        AlreadyObtained = true;
        ChatLib.command('api new');
    };
    checkVersion(ChatLib)

    if (!sentWelcome) {
        ChatLib.chat(`&6----------[HSBC]----------&r\n&7Welcome to&r&6 HSBC&r&7!\n&r&7Do&r&a /hsbc&r&7 for all of&r&6 HSBC&r&7's features or do &a/hsbc help&r&7 for all the commands.\n&6--------------------------&r`);
        sentWelcome = true;
    };

    const KeyedConfigs = Object.keys(Configuration);

    KeyedConfigs.forEach((config) => {
        if (listOfFunctions.includes(config)) return;
        let alreadyExist = false;
        let index;
        Storage.settings.forEach((obj) => {
            if (obj.name?.toLowerCase() === config?.toLowerCase()) alreadyExist = true;
        });
        if (alreadyExist) index = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == config?.toLowerCase());

        if (alreadyExist && index && index !== -1) {
            Storage.settings[index].value = Configuration[config];
            Storage.save();
        };

        if (!alreadyExist && (!index || index === -1)) {
            Storage.settings.push(
                {
                    name: config,
                    value: Configuration[config]
                }
            );
            Storage.save();
        };
    });
});

register("packetReceived", (packet, event) => {
    // ChatLib.chat(packet.class?.getSimpleName());
    //Anti KB Packet Cancelller
    if (packet.class?.getSimpleName() == 'S12PacketEntityVelocity' && Configuration.antiKB) {
        //Cancels the Knockback Packet so the player doesn't take Knockback
        cancel(event);
    };

    if (packet.class?.getSimpleName() ==  "S2APacketParticles" && Configuration.noParticle) {
        cancel(event);
    };
});

register("renderHealth", (args) => {
    if (!Configuration.renderHealthBar) cancel(args);
});

register("renderExperience", (args) => {
    if (!Configuration.renderXPBar) cancel(args);
});

register("renderArmor", (args) => {
    if (!Configuration.renderArmorBar) cancel(args);
});

register("renderFood", (args) => {
    if (!Configuration.renderFoodBar) cancel(args);
});

register("renderCrosshair", (args) => {
    if (!Configuration.renderCrosshair) cancel(args);
});

register("renderEntity", (name, vector, pt, event) => {
    if (!Configuration.renderPlayers) {
        if (name.name === "Armor Stand") cancel(event);
        if (name.name === Player.getName()) return;
        TabList.getUnformattedNames().forEach((temp) => {
            if (name.name === temp) cancel(event)
        });
    }
});

register("renderScoreboard", (args) => {
    if (!Configuration.renderScoreboard) cancel(args);
});

//Power orb place listener
register("playerInteract", (action, pos, event) => {
    if (Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Radiant Power Orb") && Configuration.powerOrbAlert && !powerOrbs['radiant'].placed[powerOrbs['radiant'].currentIndex]) {
        powerOrbs['radiant'].placed[powerOrbs['radiant'].currentIndex] = true;
        powerOrbs['radiant'].timeout[powerOrbs['radiant'].currentIndex] = 30000;
        function radiantTimeout(index) {
            setTimeout(() => {
                if (!powerOrbs['radiant'].placed[index]) return;
                Client.showTitle("&7Your&r&a Radiant Power Orb&r&7 has expired.&r", "", 2, 40, 2);
                if (powerOrbs['radiant'].currentIndex === index) powerOrbs['radiant'].currentIndex++;
            }, powerOrbs['radiant'].timeout[index]);
        };
        radiantTimeout(powerOrbs['radiant'].currentIndex);
    };

    if (Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Mana Flux Power Orb") && Configuration.powerOrbAlert && !powerOrbs['manaflux'].placed[powerOrbs['manaflux'].currentIndex]) {
        powerOrbs['manaflux'].placed[powerOrbs['manaflux'].currentIndex] = true;
        powerOrbs['manaflux'].timeout[powerOrbs['manaflux'].currentIndex] = 30000;
        function radiantTimeout(index) {
            setTimeout(() => {
                if (!powerOrbs['manaflux'].placed[index]) return;
                Client.showTitle("&7Your&r&9 Mana Flux Power Orb&r&7 has expired.&r", "", 2, 40, 2);
                if (powerOrbs['manaflux'].currentIndex === index) powerOrbs['manaflux'].currentIndex++;
            }, powerOrbs['radiant'].timeout[index]);
        };
        radiantTimeout(powerOrbs['manaflux'].currentIndex);
    };

    if (Configuration.stonkGB) {
        stonkGhostBlockPlayerInteract(action, pos, event);
    };
});

//Power orb change listener

register("chat", () => {
    if (!Configuration.powerOrbAlert) return;
        powerOrbs['radiant'].placed[powerOrbs['radiant'].currentIndex] = false;
        powerOrbs['radiant'].currentIndex++;
        powerOrbs['radiant'].placed[powerOrbs['radiant'].currentIndex] = true;
        powerOrbs['radiant'].timeout[powerOrbs['radiant'].currentIndex] = 30000;
        function radiantTimeout(index) {
            setTimeout(() => {
                if (!powerOrbs['radiant'].placed[index]) return;
                Client.showTitle("&7Your&r&a Radiant Power Orb&r&7 has expired.&r", "", 2, 40, 2);
                if (powerOrbs['radiant'].currentIndex === index) powerOrbs['radiant'].currentIndex++;
            }, powerOrbs['radiant'].timeout[index]);
        };
        radiantTimeout(powerOrbs['radiant'].currentIndex);
}).setCriteria("Your previous Radiant Power Orb was removed!").setExact();

register("step", () => {
    if (GhostBlock.isKeyDown()) GhostBlocks();
    if (Configuration.stonkGB) stonkGhostBlocksTick();
});

register("tick", () => {
    try {
        const scoreboardLine = Scoreboard.getLines()?.length < 2 ? false : Scoreboard.getLineByIndex(2) ? ChatLib.removeFormatting(Scoreboard.getLineByIndex(2)) : false;
    if (scoreboardLine) {
        if (scoreboardLine?.includes("Slay the boss!") && !slayer.spawned && !slayer.spawnedAt) slayer.spawned = true, slayer.spawnedAt = Date.now();
        if ((scoreboardLine?.includes("Kills") || scoreboardLine?.includes("Combat XP")) && slayer.spawned && slayer.spawnedAt) {
            let lastUpdated = (Date.now() - slayer.spawnedAt) / 1000;
            slayer.spawned = false;
            slayer.spawnedAt = false;

            if (lastUpdated > 86400 && typeof lastUpdated === 'number') lastUpdated = lastUpdated / 86400 > 1 ? `${(lastUpdated / 86400).toFixed(2)} days` : `${(lastUpdated / 86400).toFixed(2)} day`;
            else if (lastUpdated > 3600 && typeof lastUpdated === 'number') lastUpdated = lastUpdated / 3600 > 1 ? `${(lastUpdated / 3600).toFixed(2)} hours` : `${(lastUpdated / 3600).toFixed(2)} hour`;
            else if (lastUpdated > 60 && typeof lastUpdated === 'number') lastUpdated = lastUpdated / 60 > 1 ? `${(lastUpdated / 60).toFixed(2)} minutes` : `${(lastUpdated / 60).toFixed(2)} minute`;
            else lastUpdated = lastUpdated > 1 ? `${lastUpdated.toFixed(2)} seconds` : `${lastUpdated.toFixed(2)} second`;


            ChatLib.chat(`&6[HSBC]&r&a Slayer took ${lastUpdated} to kill.`);
        };
    };
    } catch (err) { ChatLib.chat(`&6[HSBC]&r&c HSBC has ran into an error while calculating slayer kill time: ${JSON.stringify(err)}`); };
    
    if (GuiOpenButton.isPressed()) GUI.openGUI();
    if (LockBind.isPressed()) changeLockBindStatus();

    const playerHealth = Player.getHP();
    if (playerHealth < 10 && Configuration.lowHealthAlert) {
        if (cooldowns.lowHealth) return;
        Client.showTitle("&cYou're low on health!", "", 2, 40, 2);
        World.playSound("random.orb", 100.0, 0);
        cooldowns.lowHealth = true;
        setTimeout(() => {
            cooldowns.lowHealth = false;
        }, 5000);
    };

    Player.setTabDisplayName(new TextComponent(!Configuration.tabName ? 'None' : Configuration.tabName));
    Player.setNametagName(new TextComponent(!Configuration.playerNametag ? 'None' : Configuration.playerNametag));
});

register("attackEntity", () => {
    
});

register("playerInteract", (action, pos, event) => {
    if (Configuration.betterShortbow && (Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Terminator") || Player.getHeldItem()?.getName()?.removeFormatting()?.includes("Juju"))) {
        Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(Player.getHeldItemIndex()).getItemStack(), 0, 0, 0));
        cancel(event);
    };
});

register("gameUnload", () => {
    const KeyedConfigs = Object.keys(Configuration);

    KeyedConfigs.forEach((config) => {
        if (listOfFunctions.includes(config)) return;
        let alreadyExist = false;
        let index;
        Storage.settings.forEach((obj) => {
            if (obj.name?.toLowerCase() === config?.toLowerCase()) alreadyExist = true;
        });
        if (alreadyExist) index = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == config?.toLowerCase());

        if (alreadyExist && index && index !== -1) {
            Storage.settings[index].value = Configuration[config];
            Storage.save();
        };

        if (!alreadyExist && (!index || index === -1)) {
            Storage.settings.push(
                {
                    name: config,
                    value: Configuration[config]
                }
            );
            Storage.save();
        };
    });
});