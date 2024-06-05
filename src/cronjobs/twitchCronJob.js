const { getTwitchLive } = require("../services/getTwitchLive");
const {
  NOTIFICATIONS_CHANNEL_ID,
  NOTIFICATIONS_ROLE_ID,
} = require("../configs/config");
const { notificationMessages } = require("../configs/notificationMessages");

const INTERVAL = 1000 * 60;

function twitchCronJob(client) {
  let isStreaming = true;

  setInterval(async () => {
    console.log("Running Twitch cron job...");

    const data = await getTwitchLive();
    if (data.data.length === 0) {
      isStreaming = false;
      console.log("The streamer is not live.");

      return;
    }

    if (data.data[0].type !== "live") {
      isStreaming = false;
      console.log("The streamer is not live.");

      return;
    }

    if (isStreaming) {
      console.log("The streamer is already live.");

      return;
    }

    if (!isStreaming) {
      console.log("The streamer is live.");
      client.channels.cache
        .get(NOTIFICATIONS_CHANNEL_ID)
        .send(
          `<@&${NOTIFICATIONS_ROLE_ID}> ${notificationMessages.twitch}\n\nhttps://www.twitch.tv/${process.env.TWITCH_USER_LOGIN}`
        );

      // client.channels.cache.forEach((channel) => {
      //   if (channel.id === "epa-chuy-notifications") {
      //     channel.send(
      //       `<@&${NOTIFICATIONS_ROLE_ID}> ${notificationMessages.twitch}\n\nhttps://www.twitch.tv/${process.env.TWITCH_USER_LOGIN}`
      //     );
      //   }
      // });
    }
  }, INTERVAL);
}

module.exports = { twitchCronJob };