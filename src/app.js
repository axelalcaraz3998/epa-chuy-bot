const dotenv = require("dotenv");
const { Events } = require("discord.js");

const { client } = require("./configs/client");
const { textMessageCommands } = require("./commands/textCommands");
const { logger } = require("./services/logger");

// Load environment variables
dotenv.config();

// Log when the bot is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Text message event
client.on(Events.MessageCreate, (message) => {
  textMessageCommands(message);
});

// TODO: Slash command event

// Voice state update event
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  logger(client, oldState, newState);
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
