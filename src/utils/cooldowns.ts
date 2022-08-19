import Enmap from "enmap";
import { Commands } from "./commands";

const CooldownData = new Enmap();

export function setCooldown(id: string, command: string) {
    const UserCooldownData = CooldownData.ensure(id, {
        commands: []
    });

    if(UserCooldownData.commands.includes(command)) return;

    const Command = Commands.get(command);

    if(!Command) return;

    CooldownData.push(id, command, "commands");

    setTimeout(() => {
        CooldownData.remove(id, command, "commands");
    }, Command.CommandInfo.cooldown * 1000)
}

export function isInCooldown(id: string, command: string): boolean {
    if(CooldownData.get(id) && CooldownData.get(id).commands.includes(command)) {
        return true;
    }

    return false;
}