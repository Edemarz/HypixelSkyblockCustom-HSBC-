import { LockBindStatus } from "./changeBindStatus";

function checkLockedBind(event) {
    const index = Number(Player.getHeldItemIndex());

    if (LockBindStatus.lockedBinds[index] === true) return cancel(event), ChatLib.chat("&6[HSBC]&r&c You cannot drop this item since you have locked the inventory slot.&r");
};

export { checkLockedBind };