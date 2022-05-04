import GUI from "../GUI/HSBC_GUI";
import { GuiOpenButton, LockBind } from "../Manager/KeybindManager";
import { changeLockBindStatus } from "../Features/LockBind/changeBindStatus";

register("tick", () => {
    if (GuiOpenButton.isPressed()) return GUI.openGUI();
    if (LockBind.isPressed()) changeLockBindStatus();
});  