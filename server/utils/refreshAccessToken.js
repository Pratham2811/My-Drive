import axios from "axios";

export async function refreshAccessToken(integration) {
  const response = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    refresh_token: integration.refreshToken,
    grant_type: "refresh_token",
  });

  const data = response.data;
  return {
    accessToken: data.access_token,
    expiresIn: data.expires_in,
  };
}
