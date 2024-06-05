const { SlashCommandBuilder } = require("discord.js");
const { notificationMessages } = require("../../configs/notificationMessages");
const { EVERYONE_ROLE_ID } = require("../../configs/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("displaymessage")
    .setDescription("Display the notification messages"),

  async execute(interaction) {
    await interaction.reply(
      `<@&${EVERYONE_ROLE_ID}> ` +
        notificationMessages.twitch +
        "\n\n https://www.youtube.com/watch?v=ft5S8g7UvJ8"
    );
  },
};
