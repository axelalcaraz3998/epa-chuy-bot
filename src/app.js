const dotenv = require("dotenv");
const {
  Client,
  Events,
  IntentsBitField,
  ActivityType,
  PresenceUpdateStatus,
} = require("discord.js");

const { textMessageCommands } = require("./commands/textCommands");
const { LOG_CHANNEL_ID } = require("./config/config");

// Load environment variables
dotenv.config();

// Set up discord client
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
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

// TODO: Voice chat logger
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  const { member } = newState;
  const { channel } = newState;

  // Check if the user joined or left a voice channel
  if (oldState.channelId !== newState.channelId) {
    // Get the current date and time
    const actionDate = new Date().toLocaleDateString("en-US");
    const actionTime = new Date().toLocaleTimeString("en-US");

    // If the user joined a voice channel, log the event
    if (channel) {
      client.channels.cache
        .get(LOG_CHANNEL_ID)
        .send(
          `User \`${member.user.tag}\` joined voice channel: \`${channel.name}\`\n${actionDate} at ${actionTime} (CST Timezone)`
        );
      // If the user left a voice channel, log the event
    } else {
      client.channels.cache
        .get(LOG_CHANNEL_ID)
        .send(
          `User \`${member.user.tag}\` left voice channel: \`${oldState.channel.name}\`\n${actionDate} at ${actionTime} (CST Timezone)`
        );
    }
  }
});

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);
