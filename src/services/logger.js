const { LOG_CHANNEL_ID } = require("../configs/config");

function sendMessageToLogsChannel(client, message) {
  client.channels.cache.get(LOG_CHANNEL_ID).send(message);
}

function logger(client, oldState, newState) {
  const { member } = newState;
  const { channel } = newState;

  // Check if the user joined or left a voice channel
  if (oldState.channelId !== newState.channelId) {
    // Get the current date and time
    const actionDate = new Date().toLocaleDateString("en-US");
    const actionTime = new Date().toLocaleTimeString("en-US");

    // If the user joined a voice channel, log the event
    if (channel) {
      sendMessageToLogsChannel(
        client,
        `User \`${member.user.tag}\` joined voice channel: \`${channel.name}\`\n${actionDate} at ${actionTime} (CST Timezone)`
      );
      // If the user left a voice channel, log the event
    } else {
      sendMessageToLogsChannel(
        client,
        `User \`${member.user.tag}\` left voice channel: \`${oldState.channel.name}\`\n${actionDate} at ${actionTime} (CST Timezone)`
      );
    }
  }
}

module.exports = {
  logger,
};
