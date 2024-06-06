async function getYoutubeLive() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    throw new Error("Missing YouTube API key or channel ID.");
  }

  const tokenUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(tokenUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get YouTube live videos.");
  }

  const data = await response.json();

  return data;
}

module.exports = { getYoutubeLive };
