async function getYoutubeVideos() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    throw new Error("Missing YouTube API key or channel ID.");
  }

  const uploadsPlaylistId = await getChannelUploadsPlaylistId();

  const tokenUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&playlistId=${uploadsPlaylistId}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(tokenUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get YouTube playlist.");
  }

  const data = await response.json();

  const videoId = data.items[1].contentDetails.videoId;
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  return videoUrl;
}

async function getChannelUploadsPlaylistId() {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  const YOUTUBE_CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

  if (!YOUTUBE_API_KEY || !YOUTUBE_CHANNEL_ID) {
    throw new Error("Missing YouTube API key or channel ID.");
  }

  const tokenUrl = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${YOUTUBE_API_KEY}`;
  const response = await fetch(tokenUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get YouTube channel info.");
  }

  const data = await response.json();
  return data.items[0].contentDetails.relatedPlaylists.uploads;
}

module.exports = { getYoutubeVideos };
