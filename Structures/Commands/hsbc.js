import GUI from "../GUI/HSBC_GUI";

function run({ args, chat }) {
    const properString = args[0];
    if (!properString) return GUI.openGUI();

    switch (properString?.toLowerCase()) {
        case "help":
            const helpComp = new Message(
                `&6---------------&l[HSBC]&r&6---------------&r\n`,
                new TextComponent("&e/hsbc").setHoverValue("&b/hsbc&r\n&9Open HSBC's GUI&r\n&b/hsbc help&r\n&9Shows all of HSBC's commands.&r"),
                new TextComponent("\n&e/playerstats").setHoverValue("&b/playerstats <Player Name> [Profile ID] [Profile Name] [Profile String]"),
                `\n&6------------------------------------`

            );

            chat.chat(helpComp)
            break;
        default:
            GUI.openGUI();
            break;
    };
};

export { run };