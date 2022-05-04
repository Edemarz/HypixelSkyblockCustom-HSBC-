import { BP, ghostBlockExclude } from "../../Constants/Packets";

const GhostBlocks = () => {
        let lookingAt = Player.lookingAt(); 
        if (lookingAt.getClass() === Block) {
                if (!ghostBlockExclude.includes(lookingAt.type.getRegistryName())) {
                    World.getWorld().func_175698_g(new BP(lookingAt.getX(), lookingAt.getY(), lookingAt.getZ()));
                };
        };
};

export { GhostBlocks };