const S12KnockbackPacket = Java.type("net.minecraft.network.play.server.S12PacketEntityVelocity");
const Minecraft = Client.getMinecraft();
const Prefix = "&r&6[HSBC]&r";
const C08PacketPlayerBlockPlacement = Java.type("net.minecraft.network.play.client.C08PacketPlayerBlockPlacement");
const C09PacketHeldItemChange = Java.type("net.minecraft.network.play.client.C09PacketHeldItemChange");
const C0APacketAnimation = Java.type("net.minecraft.network.play.client.C0APacketAnimation");
const PlayerESP = Java.type("net.minecraft.entity.player.EntityPlayerMP");
const BP = Java.type("net.minecraft.util.BlockPos");
const DiscordRPC = Java.type("net.arikia.dev.drpc.DiscordRPC");
const DiscordEventHandlers = Java.type("net.arikia.dev.drpc.DiscordEventHandlers");
const DiscordRichPresence = Java.type("net.arikia.dev.drpc.DiscordRichPresence");
const ghostBlockExclude = [
    "minecraft:lever",
    "minecraft:stone_button",
    "minecraft:chest",
    "minecraft:trapped_chest",
    "minecraft:skull",
    "minecraft:command_block",
    "minecraft:air"
];
const Ranks = [
    "VIP",
    "VIP+",
    "MVP",
    "MVP+",
    "MVP++",
    "YouTube",
    "Pig+++",
    "Helper",
    "Moderator",
    "Admin",
    "Game Master",
    "Owner"
];

export {
    S12KnockbackPacket,
    Minecraft,
    Prefix,
    C08PacketPlayerBlockPlacement,
    C09PacketHeldItemChange,
    C0APacketAnimation,
    PlayerESP,
    BP,
    DiscordRPC,
    DiscordEventHandlers,
    DiscordRichPresence,
    ghostBlockExclude,
    Ranks
};