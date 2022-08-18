import { Client, Message } from "discord.js"
import { CommandOptions } from "../../utils/commands"

const CommandHandler = (client: Client, args: string[], message: Message) => {
    message.reply(`Client ms: ${Math.floor(client.ws.ping)}ms`);
}

export const CommandInfo: CommandOptions = {
    name: "ping",
    permission: "user",
    cooldown: 10,
    handler: CommandHandler
}