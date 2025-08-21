import { SpotifyApi } from "@spotify/web-api-ts-sdk";

const spotify = ({
  accessToken,
  refreshToken,
  expiresAt,
}: {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}) => {
  if (!process.env.SPOTIFY_CLIENT_ID) {
    throw new Error("Spotify client ID must be set in environment variables.");
  }

  const client = SpotifyApi.withAccessToken(process.env.SPOTIFY_CLIENT_ID, {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: "Bearer",
    expires_in: Math.floor((expiresAt.getTime() - Date.now()) / 1000),
  });

  return client;
};

export default spotify;
