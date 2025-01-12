const fs = require("node:fs");
const path = require("node:path");

const { REST, Routes } = require("discord.js");

require("dotenv").config({
  path: `${__dirname}/.env`,
});

// Load env variables
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;

// Commands array
const commands = [];

// Retrieve command files and append them to the commands array
const commandsFoldersPath = path.join(__dirname, "commands");
const commandsFolders = fs.readdirSync(commandsFoldersPath);

for (const folder of commandsFolders) {
  const commandsPath = path.join(commandsFoldersPath, folder);
  const commandsFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // If a command file is missing either the data or execute property, log a warning to the console, otherwise append it to the commands array
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.warn(
        `The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// Create instance of REST module
const rest = new REST().setToken(DISCORD_TOKEN);

// Deploy commands
(async () => {
  try {
    console.log(`Started refresing ${commands.length} application commands.`);

    const data = await rest.put(
      Routes.applicationCommands(DISCORD_APPLICATION_ID),
      { body: commands }
    );

    console.log(`Succesfully reloaded ${data.length} application commands.`);
  } catch (error) {
    console.error(error);
  }
})();
