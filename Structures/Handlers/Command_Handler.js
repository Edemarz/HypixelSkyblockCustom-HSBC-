const commandList = [
    "hsbc",
    "playerstats"
];

commandList.forEach((command) => {
    const cmd = require(`../Commands/${command}`);
    register("command", (...args) => {
            cmd.run({
                args: args,
                chat: ChatLib
            });
    }).setName(command);
});