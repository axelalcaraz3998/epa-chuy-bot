const { Events, MessageFlags, Collection } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    // Get the command from the client's commands collection
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    // Get the cooldowns from the client's cooldowns collection
    const cooldowns = interaction.client.cooldowns;

    // If cooldown has not been saved to the collection, append it
    if (!cooldowns.has(command.data.name)) {
      cooldowns.set(command.data.name, new Collection());
    }

    // Get timestamp and cooldown duration
    const now = Date.now();
    const timestamps = cooldowns.get(command.data.name);
    const defaultCooldownDuration = 3;
    const cooldownAmount =
      (command.cooldown ?? defaultCooldownDuration) * 1_000;

    // Check if user is in cooldown
    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        return interaction.reply({
          content: `Please wait, you are on a cooldown for \`${command.data.name}\` command.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    }

    // Update cooldown timestamp
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    // Call the comand's execute() method. In case something goes wrong, catch the exception and log it to the console
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};
