import { Client } from "discord.js"
import { EventOptions } from "../utils/events"

const EventHandler = (client: Client, ...args: any[]) => {
    console.log(`[READY] -> ${client.user?.username} online.`)
}

export const EventInfo: EventOptions = {
    name: "ready",
    handler: EventHandler,
}