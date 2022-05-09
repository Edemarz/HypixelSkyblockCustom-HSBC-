import Configuration from "../GUI/HSBC_GUI";
let alreadyUsed = false;
const pickaxeNames = [
    "pickaxe",
    "pickonimbus",
    "stonk",
    "gauntlet",
    "drill"
];

let noMore = false;

let alr = false;
import sleep from "../../../sleep/index";
import { C08PacketPlayerBlockPlacement, BP } from "../Constants/Packets";
import { Storage } from "../Handlers/StorageHandler";

const maddoxAnswers = [
    "✆ Hello? [OPEN MENU]",
    "✆ Someone answers! [OPEN MENU]",
    "✆ How does a lobster answer? Shello! [OPEN MENU]",
    "✆ Hey what do you need? [OPEN MENU]",
    "✆ You hear the line pick up... [OPEN MENU]",
    "✆ You again? What do you want this time? [OPEN MENU]"
];

register("chat", (api_key) => {
    ChatLib.chat(`&6[HSBC]&r&e HSBC has updated your API key configuration to:&r&b ${api_key}`);
    Configuration.apiKey = api_key;
}).setCriteria("Your new API key is ${api_key}").setExact();

register("chat", (rank, name, guildRank, message, event) => {
    if (!rank || !name || !guildRank || !message || !Configuration.guildMessageFormat) return;
    if (!Configuration.guildMessageFormat?.includes("{rank}") || !Configuration.guildMessageFormat?.includes("{name}") || !Configuration.guildMessageFormat?.includes("{guildRank}") ||  !Configuration.guildMessageFormat?.includes("{message}")) return ChatLib.chat("&6[HSBC]&r&c The guild message formatting config must have the &r&a{rank}, {name}, {guildRank}, and {message}&r&c fields.&r");
    ChatLib.chat(Configuration.guildMessageFormat?.replace(/{rank}/gim, rank)?.replace(/{name}/gim, name)?.replace(/{guildRank}/gim, guildRank)?.replace(/{message}/gim, message));
    cancel(event);
}).setCriteria("Guild > ${rank} ${name} ${guildRank}: ${message}").setParameter("contains");

register("chat", () => {
    if (Configuration.miningSpeedBoostAlert) {
    Client.showTitle("&aYour &r&6Mining Speed Boost&r&a is available.&r", `${Configuration.advancedTooltips && !Configuration.autoMiningSpeedBoost ? '&aYou can enable&r&6 Mining Speed Boost&r&a to automatically use your pickaxe ability.' : ''}`, 2, 40, 2);
    if (Configuration.autoMiningSpeedBoost) {
        if (!Player.getHeldItem()) return;
        if (alreadyUsed) return;
    let holdingPickaxe = false;
    pickaxeNames.forEach((pickaxe) => {
        if (Player?.getHeldItem()?.getName()?.removeFormatting()?.toLowerCase()?.includes(pickaxe)) holdingPickaxe = true;
    });
    if (!holdingPickaxe && holdingPickaxe !== true) return;
    else Client.sendPacket(new C08PacketPlayerBlockPlacement(new BP(-1, -1, -1), 255, Player.getInventory().getStackInSlot(Player.getHeldItemIndex()).getItemStack(), 0, 0, 0));
    };
};
}).setCriteria("Mining Speed Boost is now available!").setExact()

register("chat", (cooldown, event) => {
    if (Configuration.hideCooldownMessage) cancel(event);
}).setCriteria("This ability is on cooldown for ${cooldown}.").setExact();

register("chat", (event) => {
    if (Configuration.hideBlocksInTheWay) cancel(event);
}).setCriteria("There are blocks in the way!").setExact();

register("chat", (event) => {
    if (Configuration.hideBlocksInTheWay) cancel(event);
}).setCriteria("There're blocks in the way!").setExact();

register("chat", () => {
    if (!alreadyUsed) alreadyUsed = true;
}).setCriteria("You used your Mining Speed Boost Pickaxe Ability!").setExact();

register("chat", () => {
    if (alreadyUsed) alreadyUsed = false;
}).setCriteria("Your Mining Speed Boost has expired!").setExact();

register("chat", () => {
    Client.showTitle("&cYour Hitshield has broken!", "&r&6Your Voidling's Stronghold Buff is now active for the next &a15 seconds!", 2, 60, 2)
}).setCriteria("Your Hitshield have broken! Your Voidling's Stronghold Buff is now active for the next 20 seconds!").setExact();

register("chat", (msg, event) => {
    Storage.messages.push(msg);
    Storage.save();

    if (Configuration.hideBfMessage) {
        if (ChatLib.removeFormatting(msg)?.startsWith("[BOSS] Sadan")) cancel(event);
    };
}).setCriteria("${msg}");

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    ChatLib.say(ChatLib.removeFormatting(`RARE DROP! ${drop} ${magicFind}`));
}).setCriteria("RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    ChatLib.say(ChatLib.removeFormatting(`VERY RARE DROP! ${drop} ${magicFind}`));
}).setCriteria("VERY RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    ChatLib.say(ChatLib.removeFormatting(`CRAZY RARE DROP! ${drop} ${magicFind}`));
}).setCriteria("CRAZY RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", (drop, magicFind) => {
    if (!Configuration.autoRareDrops) return;
    ChatLib.say(ChatLib.removeFormatting(`INSANE RARE DROP! ${drop} ${magicFind}`));
}).setCriteria("INSANE RARE DROP! ${drop} ${magicFind}").setExact();

register("chat", () => {
    Client.showTitle("&aA &r&5voidling's altar&r&a has spawned!", "", 2, 70, 2);
    World.playSound("random.orb", 100.0, 0);
}).setCriteria("A wild Voidling's Altar approached! Do you want to challenge it? SHIFT and walk across the altar to summon the boss! The Altar will despawn in 30s").setExact();

register("chat", (event) => {
    cancel(event);
}).setCriteria("<none>").setExact();

register("chat", (msg, event) => {
    ChatLib.chat(`&c[Senior Developer] Edemarz&r: &r&f${msg}`);
    cancel(event);
}).setCriteria("[JR.MEDIA] Edemarz: ${msg}").setExact();

const convo2 = "&6Professor";
const convo1 = `&a${Player?.getName()}`;

register("command", (args) => {
    if (noMore) return;
    noMore = true;
    ChatLib.chat(`${convo2}&r&7 >&r&f I heard you're a retard...`);
    sleep(2000, () => {
        ChatLib.chat(`${convo1}&r&7 >&r&f Yes... I am... sadly... a retard...`);
        sleep(3000, () => {
            ChatLib.chat(`${convo2}&r &7>&r&f I see.....`);
            sleep(3000, () => {
                ChatLib.chat(`${convo2}&r &7>&r&f Good for you i am a retarded professor that helps retarded people!`);
                sleep(3000, () => {
                    ChatLib.chat(`${convo2}&r &7>&r&f And i have an offer for you...`);
                    sleep(3000, () => {
                        ChatLib.chat(`${convo1}&r &7>&r&f What kind of offer?`);
                        sleep(3000, () => {
                            ChatLib.chat(`${convo2} &r&7>&r&f An offer that can either change your life &cpermanently&r&f by removing your &cretardness&r&f or...`);
                            sleep(4000, () => {
                                ChatLib.chat(`${convo1} &r&7>&r&f or... what?`);
                                sleep(4000, () => {
                                    ChatLib.chat(`${convo2} &r&7>&r&f or..... it could &4kill&r&f you...`);
                                    sleep(3000, () => {
                                        ChatLib.chat(`&7&oYou're currently thinking about it...`);
                                        sleep(1000, () => {
                                            const message = new Message(
                                                new TextComponent("&2&l[DO THE SURGERY]&r ").setClick("run_command", "/continue1"),
                                                new TextComponent("&4&l[DECLINE THE OFFER]&r").setClick("run_command", "/continue2")
                                            );

                                            ChatLib.chat(message);
                                            noMore = false;
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}).setName("imaretard");

register("command", (args) => {
    if (alr) return;
    alr = true;
    sleep(1000, () => {
        ChatLib.chat("&7&oYou chose to do the surgery...");
        sleep(3000, () => {
            ChatLib.chat(`${convo2} &r&7>&r&f So... what's your decision?`);
            sleep(3000, () => {
                ChatLib.chat(`${convo1} &r&7>&r&f I'm...`);
                sleep(3000, () => {
                    ChatLib.chat(`${convo1} &r&7>&r&f I'm gonna take your offer and do the surgery.`);
                    sleep(3000, () => {
                        ChatLib.chat(`${convo2} &r&7>&r&f Good choice young man.`);
                        sleep(3000, () => {
                            ChatLib.chat(`${convo2} &r&7>&r&f When do you want your surgery?`);
                            sleep(3000, () => {
                                ChatLib.chat(`&7&oYou're currently thinking when's a good time to have your surgery...`);
                                sleep(3000, () => {
                                    ChatLib.chat(`${convo1} &r&7>&r&f I think tommorow is a good time`);
                                    sleep(3000, () => {
                                        ChatLib.chat(`${convo2} &r&7>&r&f Are you sure?`);
                                        sleep(3000, () => {
                                            ChatLib.chat(`&7&oYou're reconsidering it...`);
                                            sleep(3000, () => {
                                                ChatLib.chat(`${convo1} &r&7>&r&f Yeah, i think tommorow is a good time`);
                                                sleep(3000, () => {
                                                    ChatLib.chat(`${convo2} &r&7>&r&f Well, okay then`);
                                                    sleep(3000, () => {
                                                        ChatLib.chat(`${convo2} &r&7>&r&f See you tomorrow and have a good day!`);
                                                        sleep(5000, () => {
                                                            ChatLib.chat(`&7&o1 day has passed.`);
                                                            sleep(3000, () => {
                                                                ChatLib.chat(`&7&oYou entered the professor's office.`);
                                                                sleep(3000, () => {
                                                                    ChatLib.chat(`${convo2} &r&7>&r&f Shall we start the surgery now?`);
                                                                    sleep(3000, () => {
                                                                        ChatLib.chat(`${convo1} &r&7>&r&f Sure... i just need a couple of seconds to prepare myself`);
                                                                        sleep(3000, () => {
                                                                            ChatLib.chat(`${convo2} &r&7>&r&f All good...`);
                                                                            sleep(3000, () => {
                                                                                ChatLib.chat(`&7&oYou're currently thinking about all the possible outcomes from this surgery.`);
                                                                                sleep(5000, () => {
                                                                                    ChatLib.chat(`${convo1} &r&7>&r&f Ok, i'm ready.`);
                                                                                    sleep(3000, () => {
                                                                                        ChatLib.chat(`&7&oA nurse is bringing you to the operating room...`);
                                                                                        sleep(3000, () => {
                                                                                            ChatLib.chat(`&7&oYou have arrived and you're now in the operating room.`);
                                                                                            sleep(3000, () => {
                                                                                                ChatLib.chat(`${convo2} &r&7>&r&f Ok, I'm gonna put you under anesthesia and you should wake up in 2h if everything goes well`);
                                                                                                sleep(3000, () => {
                                                                                                    ChatLib.chat(`${convo1} &r&7>&r&f Okay...`);
                                                                                                    sleep(3000, () => {
                                                                                                        ChatLib.chat(`&7&oYou're suddenly feeling sleepy...`);
                                                                                                        sleep(5000, () => {
                                                                                                            ChatLib.chat(`&7&oYou fell asleep...`);
                                                                                                            sleep(3000, () => {
                                                                                                                ChatLib.chat(`&7&oYou're hearing faint clicking noises...`);
                                                                                                                sleep(5000, () => {
                                                                                                                    ChatLib.chat(`&7&oYou feel like your skull is being crushed...`);
                                                                                                                    sleep(5000, () => {
                                                                                                                        ChatLib.chat(`&7&oYou're hearing a faint voice...`);
                                                                                                                        sleep(2000, () => {
                                                                                                                            ChatLib.chat(`${convo2}&r&7 >&r&7 OH NO`);
                                                                                                                            sleep(3000, () => {
                                                                                                                                ChatLib.chat(`${convo2}&r&7 >&r&7 I've accidently cutted the neural synapse that connects his brain to the spinal cord...`);
                                                                                                                                sleep(3000, () => {
                                                                                                                                    ChatLib.chat(`${convo2}&r&7 >&r&7 Well atleast he will never wake so he cant sue us...`);
                                                                                                                                    World.playSound("random.orb", 100.0, 0);
                                                                                                                                    sleep(3000, () => {
                                                                                                                                        World.playSound("random.orb", 100.0, 0);
                                                                                                                                        ChatLib.chat(`&aNurse&r&7 >&r&f Professor he's dying!!!!!!!!!`);
                                                                                                                                        World.playSound("random.orb", 100.0, 0);
                                                                                                                                        sleep(3000, () => {
                                                                                                                                            ChatLib.chat(`&7&oYou died during the operation...`);
                                                                                                                                            Client.Companion.disconnect();
                                                                                                                                            alr = false;
                                                                                                                                        });
                                                                                                                                    });
                                                                                                                                });
                                                                                                                            });
                                                                                                                        });
                                                                                                                    });
                                                                                                                });
                                                                                                            });
                                                                                                        });
                                                                                                    });
                                                                                                });
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });
                                                                        });
                                                                    });
                                                                });
                                                            });
                                                        });
                                                    });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}).setName("continue1");

register("command", (args) => {
    ChatLib.chat("&7&oYou chose to not take the risks of the surgery and go back home without saying a word...")
    sleep(3000, () => {
        ChatLib.chat(`&7&oYou're currently crossing a road.`);
        sleep(3000, () => {
            ChatLib.chat(`&7&oYou have been hit by a car since you're a retard...`);
            sleep(3000, () => {
                ChatLib.chat(`You died...`);
                Client.Companion.disconnect();
            });
        });
    });
}).setName("continue2");