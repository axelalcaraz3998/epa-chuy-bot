const fs = require("fs");
const path = require("node:path");

const dotenv = require("dotenv");
const { Events, Collection } = require("discord.js");

const { client } = require("./configs/client");
const { textMessageCommands } = require("./commands/textCommands");
const { slashCommands } = require("./commands/slashCommands");
const { logger } = require("./services/logger");
const { twitchCronJob } = require("./cronjobs/twitchCronJob");
const { youtubeCronJob } = require("./cronjobs/youtubeCronJob");

// Load environment variables
dotenv.config();

// Load slash commands
client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  if (folder.endsWith(".js")) {
    continue;
  }

  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    // Set a new item in the Collection with the key as the command name and the value as the exported module
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Log when the bot is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Text message event
client.on(Events.MessageCreate, (message) => {
  textMessageCommands(message);
});

// Slash command event
client.on(Events.InteractionCreate, async (interaction) => {
  await slashCommands(interaction);
});

// Voice state update event
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  logger(client, oldState, newState);
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);

// Run cron jobs
twitchCronJob(client);
youtubeCronJob(client);
