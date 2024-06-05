const dotenv = require("dotenv");

dotenv.config();

async function getTwitchAccessToken() {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Missing Twitch client ID or client secret.");
  }

  const tokenUrl = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;
  const response = await fetch(tokenUrl, {
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
  });

  if (!response.ok) {
    throw new Error("Failed to get Twitch access token.");
  }

  const data = await response.json();
  const accessToken = data.access_token;
}

module.exports = { getTwitchAccessToken };
