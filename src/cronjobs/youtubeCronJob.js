const { getYoutubeVideos } = require("../services/getYoutubeVideos");
const {
  NOTIFICATIONS_CHANNEL_ID,
  NOTIFICATIONS_ROLE_ID,
} = require("../configs/config");
const { notificationMessages } = require("../configs/notificationMessages");

const INTERVAL = 1000 * 60;

async function youtubeCronJob(client) {
  console.log("Running Youtube cron job...");
  let latestVideoUrl = "await getYoutubeVideos();";

  setInterval(async () => {
    const currentDate = new Date().toISOString();
    const videoUrl = await getYoutubeVideos();

    if (latestVideoUrl === videoUrl) {
      console.log(`${currentDate}: No new videos.`);
      return;
    }

    latestVideoUrl = videoUrl;
    console.log(`${currentDate}: New video detected.`);
    client.channels.cache
      .get(NOTIFICATIONS_CHANNEL_ID)
      .send(
        `<@&${NOTIFICATIONS_ROLE_ID}> ${notificationMessages.youtube}\n\n${videoUrl}`
      );
  }, INTERVAL);
}

module.exports = { youtubeCronJob };
