import { Client } from "discord.js"
import { EventOptions } from "../utils/events"

const EventHandler = (client: Client, ...args: any[]) => {
    console.log(`[READY] -> %s online.`, client.user?.username)
}

export const EventInfo: EventOptions = {
    name: "ready",
    handler: EventHandler,
}