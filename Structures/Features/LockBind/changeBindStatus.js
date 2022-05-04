import PogData from "PogData";

const LockBindStatus = new PogData("HypixelSkyblockCustom", {
    lockedBinds: [false, false, false, false, false, false, false, false, false]
});

function changeLockBindStatus() {
    const index = Number(Player.getHeldItemIndex());

    LockBindStatus.lockedBinds[index] = LockBindStatus.lockedBinds[index] ? false : true;
    LockBindStatus.save();
    ChatLib.chat(`&6[HSBC]&a The slot ${index} has been ${LockBindStatus.lockedBinds[index] === true ? '&r&clocked&r&a' : 'unlocked'}.&r`)
};

export { LockBindStatus, changeLockBindStatus };