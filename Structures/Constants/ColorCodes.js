const profileColorCodes = {
    Apple: '&c',
    Banana: '&e',
    Blueberry: '&9',
    Coconut: '&7',
    Cucumber: '&a',
    Grapes: '&5',
    Kiwi: '&2',
    Lemon: '&e',
    Lime: '&a',
    Mango: '&e',
    Orange: '&6',
    Papaya: '&c',
    Pear: '&f',
    Peach: '&c',
    Pineapple: '&e',
    Pomegranate: '&4',
    Raspberry: '&c',
    Strawberry: '&c',
    Tomato: '&4',
    Watermelon: '&a',
    Zucchini: '&2'
};

const bingoColorCodes = [
    ["&a", "&9", "&5"],
    {
        BingoNone: '&8',
        BingoOne: '&a',
        BingoTwo: '&9',
        BingoThree: '&5'
    }
];

const rarityColors = {
    common: '&f',
    uncommon: '&a',
    rare: '&9',
    epic: '&5',
    legendary: '&6',
    mythic: '&d',
    divine: '&b',
    special: '&c',
    very_special: '&c'
};

const potionColors = {
    true_defense: '&f',
    strength: '&4',
    regeneration: '&4',
    enchanting_xp_boost: '&a',
    stun: '&8',
    experience: '&9',
    rabbit: '&a',
    magic_find: '&b',
    night_vision: '&5',
    water_breathing: '&9',
    combat_xp_boost: '&a',
    fire_resistance: '&c',
    jump_boost: '&b',
    resistance: '&a',
    fishing_xp_boost: '&a',
    agility: '&5',
    archery: '&b',
    critical: '&4',
    speed: '&9',
    farming_xp_boost: '&a',
    adrenaline: '&c',
    spelunker: '&b',
    dodge: '&9',
    spirit: '&b',
    pet_luck: '&b',
    mining_xp_boost: '&a',
    haste: '&e',
    burning: '&6',
    mana: '&9',
    foraging_xp_boost: '&a',
    alchemy_xp_boost: '&a',
    jerry_candy: '&a',
    absorption: '&6',
    invisibility: '&8',
    weakness: '&7'
};

let mcColorCodes = [];

["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
    "d", "e", "f", "k", "l", "m", "n", "o", "r"].forEach((code) => mcColorCodes.push(`§${code}`));

export { profileColorCodes, bingoColorCodes, rarityColors, potionColors, mcColorCodes };