const { SlashCommandBuilder } = require("discord.js");
const { getTwitchLive } = require("../../services/getTwitchLive");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gettwitchstatus")
    .setDescription("Gets the status of the Twitch streamer"),

  async execute(interaction) {
    const data = await getTwitchLive();
    console.log(data);

    if (data.data.length === 0) {
      await interaction.reply("The streamer is not live.");

      return;
    }

    if (data.data[0].type !== "live") {
      await interaction.reply("The streamer is not live.");

      return;
    }

    await interaction.reply("The streamer is live.");
  },
};
