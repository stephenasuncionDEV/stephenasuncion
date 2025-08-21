import axios from "axios";

import { router } from "../header";
import { publicProcedure } from "../header";

export const coreRouter = router({
  getSpotifyPlayback: publicProcedure.query(async ({ ctx }) => {
    // get spotify token data
    const spotifyData = await ctx.prisma.spotify.findUnique({
      where: {
        id: "68a2a6ddd29a4b03ad668abb",
      },
      select: {
        accessToken: true,
        refreshToken: true,
        expiresAt: true,
      },
    });
    if (!spotifyData) {
      return null;
    }

    // refresh token if expired
    if (new Date(spotifyData.expiresAt) < new Date()) {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: spotifyData.refreshToken,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(
                process.env.SPOTIFY_CLIENT_ID +
                  ":" +
                  process.env.SPOTIFY_CLIENT_SECRET,
              ).toString("base64"),
          },
        },
      );

      const refreshData = response.data as {
        access_token: string;
        refresh_token: string;
        expires_in: number;
      };

      const { access_token, refresh_token, expires_in } = refreshData;

      await ctx.prisma.spotify.update({
        where: {
          id: "68a2a6ddd29a4b03ad668abb",
        },
        data: {
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: new Date(Date.now() + expires_in * 1000),
        },
      });
    }

    return await ctx.spotify(spotifyData).player.getCurrentlyPlayingTrack();
  }),
});

export type CoreRouter = typeof coreRouter;
