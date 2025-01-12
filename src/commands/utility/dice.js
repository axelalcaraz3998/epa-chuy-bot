const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Rolls a 6-sided die."),
  async execute(interaction) {
    const randomDiceNumber = Math.floor(Math.random() * 6) + 1;
    const user = userMention(interaction.user.id);

    await interaction.reply(`${user} rolled a ${randomDiceNumber}!`);
  },
};
