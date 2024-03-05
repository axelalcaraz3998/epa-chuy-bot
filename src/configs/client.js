const {
  Client,
  IntentsBitField,
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
