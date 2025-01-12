const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Flips a coin."),
  async execute(interaction) {
    const randomNumber = Math.random();
    const faceCoin = randomNumber < 0.5 ? "heads" : "tails";

    await interaction.reply(
      `User ${interaction.user.username} flips a coin, and it lands ${faceCoin} up!`
    );
  },
};
