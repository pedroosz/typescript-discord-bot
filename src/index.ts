require("dotenv").config();

import { Client, GatewayIntentBits } from "discord.js"

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

import "./utils/commands";
import "./utils/events";

client.login(process.env.CLIENT_TOKEN)