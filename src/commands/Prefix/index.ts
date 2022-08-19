import { Client, Message } from "discord.js"
import { CommandOptions } from "../../utils/commands"
import { database } from "../../utils/database"

const CommandHandler = (client: Client, args: string[], message: Message) => {
    if(!message.member?.permissions.has("Administrator")) {
        return message.reply("You don't have permission to execute this command.")
    }

    //@ts-ignore
    const GuildData = database.Guilds.get(message.guild?.id);

    const newPrefix: string = args[0]

    if(!newPrefix) {
        return message.reply(`This command should be used this way: ${GuildData.prefix}prefix <new prefix>`);
    }

    if(newPrefix.length > 3) {
        return message.reply("Please use a prefix with 3 or less characters.")
    }

    if(GuildData.prefix === newPrefix) {
        return message.reply("Why set the same prefix?");
    }

    //@ts-ignore
    database.Guilds.set(message.guild.id, {
        prefix: newPrefix
    });

    return message.reply(`Prefix updated to **${newPrefix}**`);
}

export const CommandInfo: CommandOptions = {
    name: "prefix",
    permission: "user",
    cooldown: 10,
    handler: CommandHandler
}