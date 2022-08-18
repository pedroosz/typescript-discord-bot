import { Client } from "discord.js";
import { readdirSync } from "fs"
import { resolve, join } from "path"
import { client } from "..";

export interface EventOptions {
    name: string,
    handler(client: Client, ...args: any[]): void
}

interface Event {
    EventInfo: EventOptions
}

const EventFiles = readdirSync(resolve(join(__dirname, "..", "events"))).filter(file => file.endsWith('.ts'));

for (let i = 0; i < EventFiles.length; i++) {
    const EventFile: Event = require(resolve(join(__dirname, "..", "events", EventFiles[i])));

    client.on(EventFile.EventInfo.name, (...args) => EventFile.EventInfo.handler(client, ...args))

    console.log(`[EVENTS] -> ${EventFile.EventInfo.name} loaded with success.`);
}