const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("coin")
    .setDescription("Flips a coin."),
  async execute(interaction) {
    const randomNumber = Math.random();
    const faceCoin = randomNumber < 0.5 ? "heads" : "tails";
    const user = userMention(interaction.user.id);

    await interaction.reply(
      `${user} flips a coin, and it lands ${faceCoin} up!`
    );
  },
};
