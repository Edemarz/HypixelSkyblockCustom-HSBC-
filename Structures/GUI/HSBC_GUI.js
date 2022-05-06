import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from "Vigilance";
import { Storage } from "../Handlers/StorageHandler";

@Vigilant("HypixelSkyblockCustom", "HypixelSkyblockCustom", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["General", "QOL"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})

class Settings {
    @TextProperty({
        name: "API Key",
        description: "A hypixel api key, required for most features, to get your API key do &a/api new&r and we'll do the rest!",
        category: "Configuration",
        placeholder: "API Key"
    })
    apiKey = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "apikey") === -1 ? "" : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "apikey")]?.value;

    @SwitchProperty({
        name: "Advanced Tooltips",
        description: "Show the tooltips of certain mods.",
        category: "Configuration"
    })
    advancedTooltips = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "advancedtooltips") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "advancedtooltips")]?.value;
    
    @SwitchProperty({
        name: "Auto API New",
        description: "Automatically obtain a new Hypixel API Key, this feature is to save you from constantly having to do &a/api new&r everytime you reload this mod.\n&c&lNote: You might have to change the API Key configuration on other mods.&r",
        category: "Configuration"
    })
    autoApiNew = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autoapinew") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autoapinew")]?.value;

    @SwitchProperty({
        name: "Render Vanilla Health Bar",
        description: "Toggle whether or not to render the vanilla health bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderHealthBar = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderhealthbar") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderhealthbar")]?.value;

    @SwitchProperty({
        name: "Render Vanilla XP Bar",
        description: "Toggle whether or not to render the vanilla xp bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderXPBar = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderxpbar") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderxpbar")]?.value;

    @SwitchProperty({
        name: "Render Vanilla Armor Bar",
        description: "Toggle whether or not to render the vanilla armor bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderArmorBar = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderarmorbar") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderarmorbar")]?.value;

    @SwitchProperty({
        name: "Render Vanilla Food Bar",
        description: "Toggle whether or not to render the vanilla food bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderFoodBar = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderfoodbar") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderfoodbar")]?.value;

    @SwitchProperty({
        name: "Render Crosshair",
        description: "Toggle whether or not to render the crosshair.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderCrosshair = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "rendercrosshair") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "rendercrosshair")]?.value;

    @SwitchProperty({
        name: "Render Players",
        description: "Toggle whether or not to render the players around you.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderPlayers = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderplayers") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderplayers")]?.value;

    @SwitchProperty({
        name: "Render Scoreboard",
        description: "Toggle whether or not to render the scoreboard.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderScoreboard = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderscoreboard") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "renderscoreboard")]?.value;

    @SwitchProperty({
        name: "Mining Speed Boost Alert",
        description: "Alerts you when your &6Mining Speed Boost&r pickaxe ability can be used again.",
        category: "Alerts"
    })
    miningSpeedBoostAlert = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "miningspeedboostalert") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "miningspeedboostalert")]?.value;

    @SwitchProperty({
        name: "Auto Mining Speed Boost",
        description: "Automatically use your &6Mining Speed Boost&r pickaxe ability when it's available if you're holding your pickaxe.",
        category: "Macros"
    })
    autoMiningSpeedBoost = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autominingspeedboost") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autominingspeedboost")]?.value;

    @SwitchProperty({
        name: "Hide Cooldown Messages",
        description: "Hide cooldown messages such as '&cThis ability is on cooldown for 30s.&r'.",
        category: "QOL",
        subcategory: "Messages"
    })
    hideCooldownMessage = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "hidecooldownmessage") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "hidecooldownmessage")]?.value;

    @SwitchProperty({
        name: "Hide Blocks In The Way Messages",
        description: "Hide blocks in the way messages such as '&cThere are blocks in the way!&r'.",
        category: "QOL",
        subcategory: "Messages"
    })
    hideBlocksInTheWay = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "hideblocksintheway") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "hideblocksintheway")]?.value;

    @SwitchProperty({
        name: "Power Orb Alert",
        description: "Alerts you when your Power Orb (&aRadiant&r, &9Manaflux&r, &5Overflux&r, &6Plasmaflux&r) expire.",
        category: "Alerts"
    })
    powerOrbAlert = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "powerorbalert") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "powerorbalert")]?.value;

    @SwitchProperty({
        name: "Anti Knockback",
        description: "Removes the user's knockback",
        category: "Hacks"
    })
    antiKB = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "antikb") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "antikb")]?.value;

    @SwitchProperty({
        name: "Ghost Block",
        description: "Determines wether or not to enable the &6Ghost Blocks&r feature.",
        category: "Ghost Blocks"
    })
    stonkGB = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "stonkgb") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "stonkgb")]?.value;
    
    @SelectorProperty({
        name: "Stonk Ghost Block",
        description: "Select on which click ghost blocks are created.",
        category: "Ghost Blocks",
        options: ["Right Click", "Left Click"]
    })
    stonkGBType = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "stonkgbtype") === -1 ? 0 : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "stonkgbtype")]?.value;

    @TextProperty({
        name: "Guild Message Format",
        description: "Change how guild messages are formatted must have the &a{rank}, {name}, {guildRank}, and {message}&r fields, for example: &2Guild > &r&a[VIP&r&6+&r&a] Edemarz &r&9[Skyblock Sweats]&r&f: I'm a developer! (and a hypixel sb nolife.).",
        category: "Chat Formatting",
        subcategory: "Guild",
        placeholder: "Guild Message Format"
    })
    guildMessageFormat = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "guildmessageformat") === -1 ? '&2Guild > {rank} {name} {guildRank}: {message}' : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "guildmessageformat")]?.value;

    @SwitchProperty({
        name: "No Particles",
        description: "Removes all particles from your game!",
        category: "QOL"
    })
    noParticle = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "noparticle") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "noparticle")]?.value;

    @SwitchProperty({
        name: "Low Health Alert",
        description: "&rAlerts you when you're low on health or you're health is below 25%!",
        category: "Alerts"
    })
    lowHealthAlert = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "lowhealthalert") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "lowhealthalert")]?.value;

    @SwitchProperty({
        name: "Better Shortbow",
        description: "Removes the bow pullback from bows that have the Shortbow ability such as &cTerminator&r and &6Juju Bow&r.",
        category: "SkySim"
    })
    betterShortbow = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "bettershortbow") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "bettershortbow")]?.value;

    @TextProperty({
        name: "Player Tablist Name",
        description: "Changes your tablist name to whatever you desire!",
        category: "Miscellanious",
        placeholder: `${Player.getName()}`
    })
    tabName = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "tabname") === -1 ? `${Player.getName()}` : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "tabname")]?.value;

    @TextProperty({
        name: "Player Nametag",
        description: "Changes your nametag to whatever you desire!",
        category: "Miscellanious",
        placeholder: `${Player.getName()}`
    })
    playerNametag = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "playernametag") === -1 ? `${Player.getName()}` : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "playernametag")]?.value;

    @SwitchProperty({
        name: "Voidgloom's Stronghold Alert",
        description: "Alerts you when your Voidgloom's Stronghold Hitshield has broken!",
        category: "SkySim"
    })
    strongholdAlert = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "strongholdalert") === -1 ? true : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "strongholdalert")]?.value;

    @SwitchProperty({
        name: "Auto Broadcast Rare Drops",
        description: "Automatically broadcast rare drops.\n&c&lNote: Might get you kicked for spamming.&r",
        category: "QOL"
    })
    autoRareDrops = Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autoraredrops") === -1 ? false : Storage.settings[Storage.settings.findIndex((obj) => obj?.name?.toLowerCase() == "autoraredrops")]?.value;

    constructor() {
        //Initializing
        this.initialize(this);
        //Setting categories
        this.setCategoryDescription("General", "The general features of HSBC.");
        this.setCategoryDescription("Dwarven Mines", "Features related to the Dwarven Mines will be listed here.");
        this.setCategoryDescription("Miscellanious", "The miscellanious features of HSBC.");
        this.setCategoryDescription("Configuration", "The configuration of HSBC.");
        this.setCategoryDescription("QOL", "The QOL Features of HSBC.");
        this.setCategoryDescription("Miscellaneous", "The miscellaneous features of HSBC.");
        this.setCategoryDescription("Macros", "The macro features of HSBC.");
        this.setCategoryDescription("Hacks", "Features listed under here can get you &c&lbanned&r use at your own risk.");
        this.setCategoryDescription("Alerts", "Features listed under here are alerts such as alerting you when you can use your &6Mining Speed Boost&r again.");
        this.setCategoryDescription("Ghost Blocks", "Features listed under here can create ghost blocks to make it easier to stonk through blocks.");
        this.setCategoryDescription("Chat Formatting", "Change how specific messages is formatted.");
        this.setCategoryDescription("SkySim", "A special subcategory where features for the server &6SkySim&r is listed.")
        //Setting subcategories
        this.setSubcategoryDescription("QOL", "Rendering", "");
        this.setSubcategoryDescription("QOL", "Inventory", "");
        this.setSubcategoryDescription("QOL", "Messages", "");
        this.setSubcategoryDescription("Chat Formatting", "Guild", "");
    };
};

export default new Settings();