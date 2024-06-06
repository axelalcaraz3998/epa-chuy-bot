const { SlashCommandBuilder } = require("discord.js");
const { getYoutubeVideos } = require("../../services/getYoutubeVideos");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("getyoutube")
    .setDescription("Gets the status of YouTube channel"),

  async execute(interaction) {
    const url = await getYoutubeVideos();

    await interaction.reply(url);
  },
};
