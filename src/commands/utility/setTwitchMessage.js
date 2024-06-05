const { SlashCommandBuilder } = require("discord.js");
const { notificationMessages } = require("../../configs/notificationMessages");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("settwitchmessage")
    .setDescription("Sets a new Twitch message")
    .addStringOption((option) =>
      option.setName("input").setDescription("Set a new message")
    ),

  async execute(interaction) {
    const newMessage = interaction.options.getString("input");
    notificationMessages.twitch = newMessage;

    await interaction.reply("Twitch message updated!");
  },
};
