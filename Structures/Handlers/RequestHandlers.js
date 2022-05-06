import request from "../Modules/request/request";
import Configuration from "../GUI/HSBC_GUI";
import { profileColorCodes, bingoColorCodes, rarityColors, potionColors } from "../Constants/ColorCodes";
import sleep from "../../../sleep/index";
import { version } from "../Constants/General";

const headers = {
    "User-Agent": "Mozilla/5.0@HypixelSkyblockCustom"
};

function stringify(json) { return JSON.stringify(json); };

function abbreviateNumber(number) {
    const SI_SYMBOL = ["", "K", "M", "B", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
};

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function capitalizeName(name) { const a = name.substring(0, 1); const b = name.substring(1, name.length); return a?.toUpperCase() + b?.toLowerCase() };

function validateKey(key) {
    return request({ url: `https://api.hypixel.net/key?key=${key}`, headers: headers, json: false, connectTimeout: 10000 });
};

function getPlayerUUID(playername) {
    return request({ url: `https://playerdb.co/api/player/minecraft/${playername}`, headers: headers, json: false, connectTimeout: 10000 });
};

function getPlayerNameFromUUID(uuid) {
    return request({ url: `https://playerdb.co/api/player/minecraft/${uuid}`, headers: headers, json: false, connectTimeout: 10000 });
};

function getHypixelPlayer(key, uuid) {
    return request({
        url: `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`,
        headers: headers,
        json: true,
        connectTimeout: 10000
    });
};

function getRankColor(rank) {
    switch (rank?.toUpperCase()) {
        case "ADMIN":
            return "&4";
        case "MODERATOR":
            return "&2";
        case "HELPER":
            return "&9";
        case "YOUTUBER":
            return "&c";
        case "MVP++":
            return "&6";
        case "MVP+":
            return "&b";
        case "MVP":
            return "&b";
        case "VIP+":
            return "&a";
        case "VIP":
            return "&a";
        default:
            return "&7"
    };
};

function viewProfiles(key, playername, chat) {
    if (playername?.length < 3 || playername?.length > 16) return chat.chat(`&6[HSBC]&r&c Invalid Username, A username has a maximal length of 16 and minimal length of 3. The provided username's length: ${playername?.length}`);
    chat.chat("&6[HSBC]&r&a Please wait...");
    getPlayerUUID(playername).then((uuidData) => {
        if (Number(uuidData["status"]) === 200 && JSON.parse(uuidData["body"])["code"] === "player.found") {
            const UUID = JSON.parse(uuidData["body"])["data"]["player"]["id"];
            const raw_UUID = JSON.parse(uuidData["body"])["data"]["player"]["raw_id"];

            const username = (JSON.parse(uuidData["body"])["data"]["player"]["username"]);
            request({
                url: `https://api.hypixel.net/skyblock/profiles?key=${key}&uuid=${UUID}`,
                headers: headers,
                json: true,
                connectTimeout: 10000
            }).then((response) => {
                const statusCode = response["status"];

                if (statusCode === 403) return chat.chat("&6[HSBC]&r&c Invalid hypixel api key, Please do&r&a /api new&r&c to get a new api key.");
                else if (statusCode === 429) return chat.chat("&6[HSBC]&r&c The hypixel api key has reached the rate limit, Please do&r&a /api new&r&c to get a new api key.");
                else {
                    if (statusCode === 400) return chat.chat("&6[HSBC]&r&c There is some missing data. Cancelling operation.");
                    let profiles = [];
                    let textComponents = [];
                    if (!response["body"]["profiles"]) return chat.chat(`&6[HSBC]&r&c The player &l${playername}&r&c doesn't have any profiles.`);
                    response["body"]["profiles"].forEach((profile) => {
                        profiles.push({
                            name: profile["cute_name"],
                            profileID: profile["profile_id"],
                            formattedText: `${profileColorCodes[profile["cute_name"]]}${profile["cute_name"]}&r`
                        });
                    });

                    profiles.forEach((prof) => {
                        textComponents.push(new TextComponent(`${prof.formattedText} - &bView Profile&r`).setHoverValue(`&eClick to view&r&b ${username}&r&e's &r${profileColorCodes[prof["name"]]}${prof["name"]}&r&e profile!`).setClick("run_command", `/playerstats ${username} ${prof["profileID"]} ${prof.formattedText} ${raw_UUID}`))
                    });

                    let strips = [];
                    playername.split('').forEach(() => strips.push('-'));

                    chat.chat(`&6----------&b${username}&r&6----------&r`)
                    textComponents.forEach((com) => chat.chat(new Message(com)));
                    chat.chat(`&6----------${strips.join('')}----------&r`);
                }
            }).catch((err) => {
                chat.chat(`&6[HSBC]&r&c Hypixel Skyblock Custom has ran into an error while trying to fetch a player using hypixel's api: ${stringify(err)}`);
            });
        } else {
            chat.chat(`&6[HSBC]&r&c The player with the name &l${playername}&r&c does not exist.`)
        }
    }).catch((err) => {
        console.log(stringify(err));
        if (Number(err["status"]) === 500) return chat.chat(`&6[HSBC]&r&c The player with the name &l${playername}&r&c does not exist.`);
        else return chat.chat(`&6[HSBC]&r&c Hypixel Skyblock Custom has ran into an error while fetching a player: ${stringify(err)}`);
    });
};

function getProfileStats(key, chat, username, profileID, profileString, rUuid) {
    request({
        url: `https://api.hypixel.net/skyblock/profile?key=${key}&profile=${profileID}`,
        headers: headers,
        json: true,
        connectTimeout: 10000
    }).then((response) => {
        if (Number(response["status"]) === 403) return chat.chat("&6[HSBC]&r&c Invalid hypixel API key, Please get a new API key by doing&r&a /api new&r&c !");
        else if (Number(response["status"]) === 429) return chat.chat("&6[HSBC]&r&c The hypixel API key has been ratelimited, Please get a new API key by doing&r&a /api new&r&c !");
        else {
            chat.chat("&6[HSBC]&r&a Please wait...");
            if (Number(response["status"]) === 400) return chat.chat("&6[HSBC]&r&c Some data is missing, The information provided might be inaccurate.");
            if (Number(response["status"]) === 422) return chat.chat("&6[HSBC]&r&c Some data provided by Hypixel API is invalid, The information provided might be inaccurate.");
            let strips = [];
            username.split('').forEach(() => strips.push('-'));
            const ProfileData = response["body"]["profile"];
            const profileMembers_A = [];
            // const PlayerData = {};
            const PlayerRawStats = ProfileData["members"][rUuid];
            let time = 1000;
            const keyedObjects = Object.keys(ProfileData["members"]);
            time = (keyedObjects.length * 2) * 150;

            console.log(stringify(ProfileData));

            keyedObjects.forEach((profileMemberUuid) => {
                let reqTime1 = Date.now()
                getPlayerNameFromUUID(profileMemberUuid).then((profileData) => {
                    time = (time + (Date.now() - reqTime1)) * keyedObjects.length;
                    const parsedData = JSON.parse(profileData["body"]);
                    //i have to do this because .map() functions is not supported on chattrigers yet
                    profileMembers_A.push(`&b${parsedData["data"]["player"]["username"]}&r`);
                });
            });

            let activePet = "&fNone";
            let activeData = {
                heldItem: "&6None"
            };
            let pets = [];

            for (const pet of PlayerRawStats["pets"]) {
                let formattedPetName = [];
                let formattedItem = [];
                let petName = pet.type.replace(/_/gim, ' ');
                petName.split(' ').forEach((name) => formattedPetName.push(capitalizeName(name)));
                if (pet.heldItem && pet.heldItem !== null) {
                    const aItem = pet.heldItem.replace(/_/gim, ' ');

                    aItem.split(' ').forEach((name) => {
                        if (name.match(/pet/gim) || name.match(/item/gim) || name.match(/common/gim) || name.match(/uncommon/gim) ||
                        name.match(/rare/gim) || name.match(/epic/gim) || name.match(/legendary/gim) || name.match(/mythic/gim)) return;
                        else if (name.match(/skill/gim)) {
                            formattedItem.push(capitalizeName(name));
                            formattedItem.push('EXP')
                        } else formattedItem.push(capitalizeName(name))
                    });
                };

                pets.push(`${rarityColors[pet.tier?.toLowerCase()]}${formattedPetName.join(' ')?.toString()}`);
                if (pet.active) {
                    activePet = `${rarityColors[pet.tier?.toLowerCase()]}${formattedPetName.join(' ')?.toString()}&r &7(Hover)`;
                    activeData.heldItem = pet.heldItem === null ? "&6None" : `&6${formattedItem.join(' ')}`;
                };
            };

            const potionEffects = [];

            for (const effect of PlayerRawStats["active_effects"]) {
                const potN = [];
                const potName = effect['effect'].replace(/_/gim, ' ');
                potName.split(' ').forEach((word) => potN.push(capitalizeName(word)));
                const potColor = potionColors[effect['effect']];

                if (!potColor) potionEffects.push(`&f${potN.join(' ')} &4${effect['level']}&r`);
                else potionEffects.push(`${potColor}${potN.join(' ')} ${effect['level']}&r`);
            };

            let bankingData = {
                rawPurse: PlayerRawStats["coin_purse"]
            };
            const essence = `\n&8Wither Essence:&r &7${PlayerRawStats["essence_wither"]}&r\n&6Gold Essence:&r &7${PlayerRawStats["essence_gold"]} Essence&r`;

            let lastUpdated = Math.round((Date.now() - PlayerRawStats["last_save"]) / 1000);

            if (lastUpdated > 86400 && typeof lastUpdated === 'number') lastUpdated = Math.round(lastUpdated / 86400) > 1 ? `${Math.round(lastUpdated / 86400)} days ago.` : `${Math.round(lastUpdated / 86400)} day ago.`;
            else if (lastUpdated > 3600 && typeof lastUpdated === 'number') lastUpdated = Math.round(lastUpdated / 3600) > 1 ? `${Math.round(lastUpdated / 3600)} hours ago.` : `${Math.round(lastUpdated / 3600)} hour ago.`;
            else if (lastUpdated > 60 && typeof lastUpdated === 'number') lastUpdated = Math.round(lastUpdated / 60) > 1 ? `${Math.round(lastUpdated / 60)} minutes ago.` : `${Math.round(lastUpdated / 60)} minute ago.`;
            else lastUpdated = lastUpdated > 1 ? `${lastUpdated} seconds ago.` : `${lastUpdated} second ago`;

            //This is due to chat triggers not supporting  asynchonous functions yet.
            sleep(time, () => {
                const ind = Math.floor(Math.random() * bingoColorCodes[0].length);

                let gamemode = ProfileData["game_mode"];

                if (gamemode && gamemode?.toLowerCase() == "bingo") gamemode = profileMembers_A.length > 1 ? `${bingoColorCodes[0][ind]}Ⓑ Bingo&r &b&lCO-OP&r` : `${bingoColorCodes[0][ind]}Ⓑ Bingo&r`;
                else if (gamemode && gamemode?.toLowerCase() == "ironman") gamemode = profileMembers_A.length > 1 ? `&8Ironman&r &b&lCO-OP&r` : `&8Ironman&r`;
                else if (gamemode && gamemode?.toLowerCase() == "island") gamemode = profileMembers_A.length > 1 ? `&a☀ Stranded&r &b&lCO-OP&r` : `&a☀ Stranded&r`;
                else if (!gamemode && profileMembers_A.length > 1) gamemode = `&eSkyblock&r &b&lCO-OP&r`;
                else if (!gamemode && profileMembers_A.length <= 1) gamemode = `&eSkyblock Solo&r`;

                if (profileMembers_A.length !== keyedObjects.length) chat.chat('&6[HSBC]&r&c An error has occured while fetching the members of a profile, The information field "Profile Members" will be inaccurate.');
                const msg = new Message(
                    `&6----------&b${username}&r&6----------&r\n`,
                    `&7Profile: ${profileString}&r\n`,
                    `&7Profile Gamemode:&r ${gamemode}\n`,
                    `&7Profile Members:&r ${profileMembers_A.join(', ')?.toString()}\n`,
                    `&7Banking:&r &e${abbreviateNumber(bankingData.rawPurse)}&r&7 Coins.&r\n`,
                    `&7Active Pet:&r `,
                    new TextComponent(`${activePet}&r\n`).setHoverValue(`&7Held Item:&r ${activeData.heldItem}&r`),
                    `&7Potion Effects:&r `,
                    new TextComponent(`&7(Hover)\n`).setHoverValue(`${potionEffects.join(', ')}`),
                    `&7Essences: `,
                    new TextComponent(`&7(Hover)&r\n`).setHoverValue(essence),
                    `&7Last Updated:&r &b${lastUpdated}&r`,
                    `\n&6----------${strips.join('')?.toString()}----------&r`
                );
    
                chat.chat(msg);
            });
        };
    }).catch((err) => {
        chat.chat(`&6[HSBC]&r&c Hypixel Skyblock Custom has ran into an error while fetching the profile's data: ${stringify(err)}`);
    });
};

function checkVersion(chat) {
    request({
        url: "https://raw.githubusercontent.com/Edemarz/HypixelSkyblockCustom/main/metadata.json",
        headers: headers,
        connectTimeout: 10000
    }).then((response) => {
        const version1 = JSON.parse(response["body"])["version"];
        if (!version1) return chat.chat("&6[HSBC]&r&c HSBC has ran into an error while fetching the latest HSBC's version.");
        const numberedVersion = parseFloat(version1);
        const numberedCurrentVersion = parseFloat(version);
        if (numberedVersion > numberedCurrentVersion) {
            const msg = new Message(
                `&6[HSBC]&r&c Your HSBC's mod version is outdated! The current latest version is version &l${numberedVersion}&r&c your current version is version &l${numberedCurrentVersion}&r&c!\n&r&aClick `,
                new TextComponent('&r&a&lhere&r').setClick("open_url", 'https://github.com/Edemarz/HypixelSkyblockCustom'),
                ' &r&ato download the latest version!'
            );
            chat.chat(msg);
        };
    }).catch((err) => chat.chat(`&6[HSBC]&r&c HSBC has ran into an error while fetching the current HSBC's version: ${JSON.stringify(err)}`));
};

export { validateKey, getPlayerUUID, viewProfiles, getProfileStats, getHypixelPlayer, stringify, getPlayerNameFromUUID, numberWithCommas, capitalizeName, checkVersion };