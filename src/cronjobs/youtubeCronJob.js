const { getYoutubeVideos } = require("../services/getYoutubeVideos");
const { getYoutubeLive } = require("../services/getYoutubeLive");
const {
  NOTIFICATIONS_CHANNEL_ID,
  NOTIFICATIONS_ROLE_ID,
} = require("../configs/config");
const { notificationMessages } = require("../configs/notificationMessages");

const INTERVAL = 1000 * 60;

async function youtubeCronJob(client) {
  console.log("Running Youtube cron job...");
  let latestVideoUrl = await getYoutubeVideos();
  let isAlreadyStreaming = true;

  setInterval(async () => {
    const currentDate = new Date().toISOString();
    const videoUrl = await getYoutubeVideos();
    const liveData = await getYoutubeLive();

    if (latestVideoUrl === videoUrl) {
      console.log(`${currentDate}: No new videos.`);
    } else {
      latestVideoUrl = videoUrl;

      client.channels.cache
        .get(NOTIFICATIONS_CHANNEL_ID)
        .send(
          `<@&${NOTIFICATIONS_ROLE_ID}> ${notificationMessages.youtube}\n\n${videoUrl}`
        );

      console.log(`${currentDate}: New video detected.`);
    }

    if (liveData.items.length === 0) {
      isAlreadyStreaming = false;
      console.log(`${currentDate}: The streamer is not live.`);

      return;
    }

    if (isAlreadyStreaming) {
      console.log(`${currentDate}: The streamer is already live.`);

      return;
    }

    if (!isAlreadyStreaming) {
      isAlreadyStreaming = true;

      client.channels.cache
        .get(NOTIFICATIONS_CHANNEL_ID)
        .send(
          `<@&${NOTIFICATIONS_ROLE_ID}> ${notificationMessages.youtube}\n\n${videoUrl}`
        );

      console.log(`${currentDate}: The streamer is live.`);
    }
  }, INTERVAL);
}

module.exports = { youtubeCronJob };
