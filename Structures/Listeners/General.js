//Importing
import Configuration from "../GUI/HSBC_GUI";
import { stonkGhostBlockPlayerInteract, stonkGhostBlocksTick } from "../Features/GhostBlock/StonkGhostBlock";
import { GhostBlocks } from "../Features/GhostBlock/GhostBlock";
import { GhostBlock } from "../Manager/KeybindManager";
import { checkLockedBind } from "../Features/LockBind/lockBind";
import { ParticlePacket } from "../Constants/Packets";
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

    if (!sentWelcome) {
        ChatLib.chat(`&6----------[HSBC]----------&r\n&7Welcome to&r&6 HSBC&r&7!\n&r&7Do&r&a /hsbc&r&7 for all of&r&6 HSBC&r&7's features.\n&6--------------------------&r`)
        sentWelcome = true;
    };
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

//Slot locking
register("dropItem", (event) => {
    checkLockedBind(event);
});

register("tick", () => {
    const playerHealth = Player.getHP();

    ChatLib.chat(playerHealth);
    if (playerHealth < 10 && Configuration.lowHealthAlert) {
        if (cooldowns.lowHealth) return;
        Client.showTitle("&cYou're low on health!", "", 2, 40, 2);
        World.playSound("random.orb", 100.0, 0);
        cooldowns.lowHealth = true;
        setTimeout(() => {
            cooldowns.lowHealth = false;
        }, 5000);
    };
});