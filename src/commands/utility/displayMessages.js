const { SlashCommandBuilder } = require("discord.js");
const { notificationMessages } = require("../../configs/notificationMessages");
const { NOTIFICATIONS_ROLE_ID } = require("../../configs/config");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("displaymessage")
    .setDescription("Display the notification messages"),

  async execute(interaction) {
    await interaction.reply(
      `<@&${NOTIFICATIONS_ROLE_ID}> ` + notificationMessages.youtube
    );
  },
};
