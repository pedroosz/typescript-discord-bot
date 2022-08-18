import Enmap from "enmap";

export const UserDefaultData = {
    bio: "..."
}

export const GuildDefaultData = {
    prefix: "ts!"
}

const Users = new Enmap({
    name: "users",
    fetchAll: false,
});

const Guilds = new Enmap({
    name: "guilds",
    fetchAll: false
});

export const database = { Users, Guilds };