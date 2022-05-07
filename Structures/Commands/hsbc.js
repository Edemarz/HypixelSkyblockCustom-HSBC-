import GUI from "../GUI/HSBC_GUI";
import { version } from "../Constants/General";
import { request } from "../Modules/request/request";
const headers = {
    "User-Agent": "Mozilla/5.0@HypixelSkyblockCustom"
};

function run({ args, chat }) {
    const properString = args[0];
    if (!properString) return GUI.openGUI();

    switch (properString?.toLowerCase()) {
        case "help":
            const helpComp = new Message(
                `&6---------------&l[HSBC]&r&6---------------&r\n`,
                new TextComponent("&e/hsbc").setHoverValue("&b/hsbc&r\n&9Open HSBC's GUI&r\n&b/hsbc help&r\n&9Shows all of HSBC's commands.&r\n&b/hsbc version&r\n&9Check your HSBC's client version.&r\n&b/hsbc github&r\n&9Gets HSBC's github link.&r"),
                new TextComponent("\n&e/playerstats").setHoverValue("&b/playerstats <Player Name> [Profile ID] [Profile Name] [Profile String]"),
                new TextComponent("\n&e/copy").setHoverValue("&b/copy <Number (Ascending)>"),
                `\n&6------------------------------------`

            );

            chat.chat(helpComp)
            break;
        case "version":
    let updated;
    request({
        url: "https://raw.githubusercontent.com/Edemarz/HypixelSkyblockCustom/main/metadata.json",
        headers: headers,
        connectTimeout: 10000
    }).then((response) => {
        const version1 = JSON.parse(response["body"])["version"];
        if (!version1) return chat.chat("&6[HSBC]&r&c HSBC has ran into an error while fetching the latest HSBC's version.");
        const numberedVersion = parseFloat(version1);
        const numberedCurrentVersion = parseFloat(version);
        updated = numberedVersion > numberedCurrentVersion ? false : true;
        const msg = new Message(
            `&6[HSBC]&r&c Your HSBC is outdated, the latest version is version &l${numberedVersion}&r&c your current version is version &l${version}&r&c.&r\n&r&aClick&r&a `,
            new TextComponent('&l&ahere&r').setClick("open_url", "https://github.com/Edemarz/HypixelSkyblockCustom"),
            ` &r&ato update your HSBC.`
        );
        chat.chat(!updated ? msg : `&6[HSBC]&r&a Your HSBC's version is up-to-date, your current version is version &l${version}&r&a.`);
    }).catch((err) => chat.chat(`&6[HSBC]&r&c HSBC has ran into an error while fetching the current HSBC's version: ${JSON.stringify(err)}`));
            break;
        case "github":
            const msg = new Message(
                "&aClick ",
                new TextComponent("&lhere&r&a").setClick("open_url", "https://github.com/Edemarz/HypixelSkyblockCustom"),
                " &ato get HSBC's github link."
            );
            ChatLib.chat(msg);
            break;
        default:
            GUI.openGUI();
            break;
    };
};

export { run };