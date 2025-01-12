const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Rolls a 6-sided die."),
  async execute(interaction) {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;

    await interaction.reply(
      `User ${interaction.user.username} rolled a ${randomDiceNumber}!`
    );
  },
};
