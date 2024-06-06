const { SlashCommandBuilder } = require("discord.js");
const { getYoutubeVideos } = require("../../services/getYoutubeVideos");
const { getYoutubeLive } = require("../../services/getYoutubeLive");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getyoutube")
    .setDescription("Gets the status of YouTube channel"),

  async execute(interaction) {
    const url = await getYoutubeVideos();
    const liveData = await getYoutubeLive();

    if (liveData.items.length === 0) {
      await interaction.reply("The streamer is not live.");
      await interaction.followUp(url);

      return;
    }

    await interaction.reply("The streamer is live.");
    await interaction.followUp(url);
  },
};
