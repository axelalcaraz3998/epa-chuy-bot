const dotenv = require("dotenv");
const {
  Client,
  Events,
  IntentsBitField,
  ActivityType,
  PresenceUpdateStatus,
} = require("discord.js");

const { textMessageCommands } = require("./commands/textCommands");

// Load environment variables
dotenv.config();

// Set up discord client
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  presence: {
    activities: [
      {
        name: "Topando pomo 🍻",
        type: ActivityType.Playing,
      },
    ],
  },
  status: PresenceUpdateStatus.Online,
});

// Log when the bot is ready
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Text message event
client.on(Events.MessageCreate, (message) => {
  textMessageCommands(message);
});

// TODO: Slash command event

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
