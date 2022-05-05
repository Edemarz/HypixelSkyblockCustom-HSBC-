import { Storage } from "../../Handlers/StorageHandler";

function changeLockBindStatus() {
    const index = Number(Player.getHeldItemIndex());

    Storage.lockedBinds[index] = Storage.lockedBinds[index] ? false : true;
    Storage.save();
    ChatLib.chat(`&6[HSBC]&a The slot ${index} has been ${Storage.lockedBinds[index] === true ? '&r&clocked&r&a' : 'unlocked'}.&r`)
};

export { changeLockBindStatus };