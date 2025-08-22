import { PlaybackState } from "@spotify/web-api-ts-sdk";
import axios from "axios";

import { router } from "../header";
import { publicProcedure } from "../header";

export const coreRouter = router({
  getSpotifyPlayback: publicProcedure.query(async ({ ctx }) => {
    // get spotify token data
    let spotifyData = await ctx.prisma.spotify.findUnique({
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

      spotifyData = await ctx.prisma.spotify.update({
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

    const currentlyPlayingTrack = (await ctx
      .spotify(spotifyData)
      .player.getCurrentlyPlayingTrack()) as PlaybackState & {
      item: PlaybackState["item"] & {
        artists: { name: string; href: string }[];
        album: { name: string; images: { url: string }[] };
      };
    };

    return {
      song: {
        name: currentlyPlayingTrack.item.name,
        artists: currentlyPlayingTrack.item.artists.map((a) => ({
          name: a.name,
          href: a.href,
        })),
        album: {
          name: currentlyPlayingTrack.item.album.name,
          images: currentlyPlayingTrack.item.album.images,
        },
        durationMs: currentlyPlayingTrack.item.duration_ms,
        progressMs: currentlyPlayingTrack.progress_ms,
        isExplicit: currentlyPlayingTrack.item.explicit,
      },
      isPlaying: currentlyPlayingTrack.is_playing,
    };
  }),
});

export type CoreRouter = typeof coreRouter;
