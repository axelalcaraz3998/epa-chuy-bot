const { Events } = require("discord.js");

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Client ready, logged in as: ${client.user.tag}`);
  },
};
