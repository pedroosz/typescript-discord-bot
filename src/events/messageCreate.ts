import { Client, Message } from "discord.js"
import { Commands } from "../utils/commands";
import { isInCooldown, setCooldown } from "../utils/cooldowns";
import { database, GuildDefaultData, UserDefaultData } from "../utils/database";
import { EventOptions } from "../utils/events"

const EventHandler = async (client: Client, message: Message) => {
    if(message.author.id == client.user?.id || message.author.bot) return;

    const UserData = await database.Users.ensure(message.author.id, { 
        ...UserDefaultData, 
        id: message.author.id 
    });

    //@ts-expect-error
    const GuildData = await database.Guilds.ensure(message.guildId, {
        ...GuildDefaultData,
        id: message.guild?.id
    });

    if(!message.content.startsWith(GuildData.prefix)) return;

    const command = message.content.split(" ")[0].toLowerCase();
    const args = message.content.split(" ").slice(1)

    let CommandFile = Commands.get(command.slice(GuildData.prefix.length));

    if(!CommandFile) return;

    if(isInCooldown(message.author.id, CommandFile.CommandInfo.name)) {
        return;
    }

    setCooldown(message.author.id, CommandFile.CommandInfo.name);

    CommandFile.CommandInfo.handler(client, args, message);
}

export const EventInfo: EventOptions = {
    name: "messageCreate",
    handler: EventHandler
}