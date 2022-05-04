import { BP, ghostBlockExclude, Minecraft } from "../../Constants/Packets";
import Configuration from "../../GUI/HSBC_GUI";
import { GhostBlocks } from "./GhostBlock";
let lookingAt = Player.lookingAt();

const stonkGhostBlockPlayerInteract = (action, pos, event) => {
    if (Configuration.stonkGBType === 0) {
        if (Player.getHeldItem() !== null) {
            if (Player.getHeldItem().getName().includes("Stonk") || Player.getHeldItem().getName().includes("Golden Pickaxe")) {
                if (lookingAt.getClass() === Block) {
                    if (!ghostBlockExclude.includes(lookingAt.type.getRegistryName())) {
                        if (action.toString() === "RIGHT_CLICK_BLOCK" || action.toString() === "RIGHT_CLICK_AIR") {
                            cancel(event);
                        };
                    };
                };
            };
        };
    } else if (Configuration.stonkGBType === 1) {
        if (Player.getHeldItem() !== null) {
            if (Player.getHeldItem().getName().includes("Stonk") || Player.getHeldItem().getName().includes("Golden Pickaxe")) {
                if (lookingAt.getClass() === Block) {
                    if (!ghostBlockExclude.includes(lookingAt.type.getRegistryName())) {
                        if (action.toString() === "LEFT_CLICK_BLOCK" || action.toString() === "LEFT_CLICK_AIR") {
                            cancel(event);
                        };
                    };
                };
            };
        };
    };
};

const stonkGhostBlocksTick = () => {
    try {
        if (Player.getHeldItem() !== null) {
            if (Player.getHeldItem().getName().includes("Stonk") || Player.getHeldItem().getName().includes("Golden Pickaxe")) {
                if (Configuration.stonkGBType === 0) {
                    if (Minecraft.field_71474_y.field_74313_G.func_151470_d()) {
                        GhostBlocks();
                    }
                } else if (Configuration.stonkGBType === 1) {
                    if (Minecraft.field_71474_y.field_74312_F.func_151470_d()) {
                        GhostBlocks();
                        World.getWorld().func_175698_g(new BP(lookingAt?.getX(), lookingAt?.getY(), lookingAt?.getZ()));
                    };
                };
            };
        };
    } catch (err) { ChatLib.chat(`&6[HSBC]&r&c HSBC has ran into an error while creating ghost blocks: ${err}`) };
};


export { stonkGhostBlockPlayerInteract, stonkGhostBlocksTick };