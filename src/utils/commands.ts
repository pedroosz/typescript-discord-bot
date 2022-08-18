import { Client, Message } from "discord.js";
import { readdirSync, readdir } from "fs";
import { join, resolve } from "path"

export interface CommandOptions {
    name: string,
    permission: string,
    cooldown: number,
    handler(client: Client, args: string[], message?: Message): void 
}

interface Command {
    CommandInfo: CommandOptions
}

export const Commands = new Map<string, Command>();

const CommandsFolder = readdirSync(resolve(join(__dirname, "..", "commands")));

for (let i = 0; i < CommandsFolder.length; i++) {
    const CommandFolder = CommandsFolder[i];
    
    readdir(resolve(join(__dirname, "..", "commands", CommandFolder)), (err, files) => {
        if(err) {
            console.error(err);
        }

        files.filter(x=>x.endsWith(".ts") && x.startsWith("index")).forEach((file) => {
            const Command: Command = require(`../commands/${CommandFolder}/${file}`);

            if(!Command) return;

            Commands.set(Command.CommandInfo.name, Command);

            console.log(`[COMMANDS] -> ${Command.CommandInfo.name} loaded with success.`);
        })
    })
}