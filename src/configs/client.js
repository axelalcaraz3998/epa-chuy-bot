const {
  Client,
  IntentsBitField,
  GatewayIntentBits,
  ActivityType,
  PresenceUpdateStatus,
} = require("discord.js");

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates,
    GatewayIntentBits.Guilds,
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

module.exports = {
  client,
};
