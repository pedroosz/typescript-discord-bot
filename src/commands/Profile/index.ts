import { Client, EmbedBuilder, Message } from "discord.js"
import { CommandOptions } from "../../utils/commands"
import { database } from "../../utils/database"

const CommandHandler = (client: Client, args: string[], message: Message) => {
    
    const UserData = database.Users.get(message.author.id);

    const embed = new EmbedBuilder()
    .setColor("#3178c6")
    .setTitle(`${message.author.tag} profile.`)
    .addFields({
        name: "Bio", value: UserData.bio
    })

    return message.reply({ embeds: [embed]});
}

export const CommandInfo: CommandOptions = {
    name: "profile",
    permission: "user",
    cooldown: 10,
    handler: CommandHandler
}