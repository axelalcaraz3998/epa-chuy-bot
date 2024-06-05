async function getTwitchLive() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const accessToken = process.env.TWITCH_ACCESS_TOKEN;
  const userLogin = process.env.TWITCH_USER_LOGIN;

  if (!clientId || !accessToken) {
    throw new Error("Missing Twitch client ID or access token.");
  }

  const tokenUrl = `https://api.twitch.tv/helix/streams?user_login=${userLogin}`;
  const response = await fetch(tokenUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-ID": clientId,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get Twitch Streams.");
  }

  const data = await response.json();

  return data;
}

module.exports = { getTwitchLive };
