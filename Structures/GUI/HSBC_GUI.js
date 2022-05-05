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

@Vigilant("HSBC", "HSBC", {
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
    apiKey = "";

    @SwitchProperty({
        name: "Advanced Tooltips",
        description: "Show the tooltips of certain mods.",
        category: "Configuration"
    })
    advancedTooltips = true;
    
    @SwitchProperty({
        name: "Auto API New",
        description: "Automatically obtain a new Hypixel API Key, this feature is to save you from constantly having to do &a/api new&r everytime you reload this mod.\n&c&lNote: You might have to change the API Key configuration on other mods.&r",
        category: "Configuration"
    })
    autoApiNew = true;

    @SwitchProperty({
        name: "Render Vanilla Health Bar",
        description: "Toggle wether or not to render the vanilla health bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderHealthBar = true;

    @SwitchProperty({
        name: "Render Vanilla XP Bar",
        description: "Toggle wether or not to render the vanilla xp bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderXPBar = true;

    @SwitchProperty({
        name: "Render Vanilla Armor Bar",
        description: "Toggle wether or not to render the vanilla armor bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderArmorBar = true;

    @SwitchProperty({
        name: "Render Vanilla Food Bar",
        description: "Toggle wether or not to render the vanilla food bar.",
        category: "QOL",
        subcategory: "Rendering"
    })
    renderFoodBar = true;

    @SwitchProperty({
        name: "Mining Speed Boost Alert",
        description: "Alerts you when your &6Mining Speed Boost&r pickaxe ability can be used again.",
        category: "Alerts"
    })
    miningSpeedBoostAlert = true;

    @SwitchProperty({
        name: "Auto Mining Speed Boost",
        description: "Automatically use your &6Mining Speed Boost&r pickaxe ability when it's available if you're holding your pickaxe.",
        category: "Macros"
    })
    autoMiningSpeedBoost = false;

    @SwitchProperty({
        name: "Hide Cooldown Messages",
        description: "Hide cooldown messages such as '&cThis ability is on cooldown for 30s.&r'.",
        category: "QOL",
        subcategory: "Messages"
    })
    hideCooldownMessage = false;

    @SwitchProperty({
        name: "Hide Blocks In The Way Messages",
        description: "Hide blocks in the way messages such as '&cThere are blocks in the way!&r'.",
        category: "QOL",
        subcategory: "Messages"
    })
    hideBlocksInTheWay = false;

    @SwitchProperty({
        name: "Power Orb Alert",
        description: "Alerts you when your Power Orb (&aRadiant&r, &9Manaflux&r, &5Overflux&r, &6Plasmaflux&r) expire.",
        category: "Alerts"
    })
    powerOrbAlert = false;

    @SwitchProperty({
        name: "Anti Knockback",
        description: "Removes the user's knockback",
        category: "Hacks"
    })
    antiKB = false;

    @SwitchProperty({
        name: "Ghost Block",
        description: "Determines wether or not to enable the &6Ghost Blocks&r feature.",
        category: "Ghost Blocks"
    })
    stonkGB = false;
    
    @SelectorProperty({
        name: "Stonk Ghost Block",
        description: "Select on which click ghost blocks are created.",
        category: "Ghost Blocks",
        options: ["Right Click", "Left Click"]
    })
    stonkGBType = 0;

    @TextProperty({
        name: "Guild Message Format",
        description: "Change how guild messages are formatted must have the &a{rank}, {name}, {guildRank}, and {message}&r fields, for example: &2Guild > &r&a[VIP&r&6+&r&a] Edemarz &r&9[Skyblock Sweats]&r&f: I'm a developer! (and a hypixel sb nolife.).",
        category: "Chat Formatting",
        subcategory: "Guild",
        placeholder: "Guild Message Format"
    })
    guildMessageFormat = '&2Guild > {rank} {name} {guildRank}: {message}';

    @SwitchProperty({
        name: "No Particles",
        description: "Removes all particles from your game!",
        category: "Hacks"
    })
    noParticle = false;

    @SwitchProperty({
        name: "Low Health Alert",
        description: "&rAlerts you when you're low on health or you're health is below 25%!",
        category: "Alerts"
    })
    lowHealthAlert = true;

    @SwitchProperty({
        name: "Better Shortbow",
        description: "Removes the bow pullback from bows that have the Shortbow ability such as &cTerminator&r and &6Juju Bow&r.",
        category: "QOL",
        subcategory: "SkySim"
    })
    betterShortbow = true;

    @TextProperty({
        name: "Player Tablist Name",
        description: "Changes your tablist name to whatever you desire!",
        category: "Miscellanious",
        placeholder: `${Player.getName()}`
    })
    tabName = `${Player.getName()}`;

    @TextProperty({
        name: "Player Nametag",
        description: "Changes your nametag to whatever you desire!",
        category: "Miscellanious",
        placeholder: `${Player.getName()}`
    })
    playerNametag = `${Player.getName()}`;

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
        //Setting subcategories
        this.setSubcategoryDescription("QOL", "Rendering", "");
        this.setSubcategoryDescription("QOL", "Inventory", "");
        this.setSubcategoryDescription("QOL", "Messages", "");
        this.setSubcategoryDescription("QOL", "SkySim", "A special subcategory where features for the server &6SkySim&r is listed.");
        this.setSubcategoryDescription("Chat Formatting", "Guild", "");
    };
};

export default new Settings()