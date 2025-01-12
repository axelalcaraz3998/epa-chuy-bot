const fs = require("node:fs");
const path = require("node:path");

const { Client, GatewayIntentBits, Collection } = require("discord.js");

require("dotenv").config({
  path: `${__dirname}/.env`,
});

// Load env variables
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// Create client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Add a commands collection to the client instance
client.commands = new Collection();

// Retrieve command files and append them to the client's commands collection
const commandsFoldersPath = path.join(__dirname, "commands");
const commandsFolders = fs.readdirSync(commandsFoldersPath);

for (const folder of commandsFolders) {
  const commandsPath = path.join(commandsFoldersPath, folder);
  const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // If a command file is missing either the data or execute property, log a warning to the console, otherwise append it to the collection
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.warn(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Retrieve event files and register the event listeners
const eventsPath = path.join(__dirname, "events");
const eventsFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventsFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord
client.login(DISCORD_TOKEN);
