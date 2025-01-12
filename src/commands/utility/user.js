const { SlashCommandBuilder, userMention } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides information about the user."),
  async execute(interaction) {
    const user = userMention(interaction.user.id);

    await interaction.reply(
      `This command was run by ${user}, who joined on \`${interaction.member.joinedAt}\`.`
    );
  },
};
