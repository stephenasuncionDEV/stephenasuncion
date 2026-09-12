import type { Context } from "../context";

import { getGitHubStats } from "@/common/github";

import axios from "axios";

import { publicProcedure, router } from "../header";

type SpotifyPlayback = {
  status: "playing" | "paused" | "idle" | "unavailable";
  isPlaying: boolean;
  song: {
    name: string;
    href: string | null;
    artists: { name: string; href: string }[];
    album: { name: string; images: { url: string }[] };
    durationMs: number;
    progressMs: number;
    isExplicit: boolean;
  } | null;
};

const SPOTIFY_RECORD_ID = "68a2a6ddd29a4b03ad668abb";
const unavailable: SpotifyPlayback = {
  status: "unavailable",
  song: null,
  isPlaying: false,
};

let playbackCache: { expiresAt: number; value: SpotifyPlayback } | null = null;
let playbackRequest: Promise<SpotifyPlayback> | null = null;

async function readPlayback(ctx: Context): Promise<SpotifyPlayback> {
  if (!process.env.MONGODB_DATABASE_URL || !process.env.SPOTIFY_CLIENT_ID) {
    return unavailable;
  }

  try {
    let spotifyData = await ctx.prisma.spotify.findUnique({
      where: { id: SPOTIFY_RECORD_ID },
      select: { accessToken: true, refreshToken: true, expiresAt: true },
    });
    if (!spotifyData) return unavailable;

    if (spotifyData.expiresAt.getTime() < Date.now() + 30000) {
      if (!process.env.SPOTIFY_CLIENT_SECRET) return unavailable;
      const response = await axios.post<{
        access_token: string;
        refresh_token?: string;
        expires_in: number;
      }>(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: spotifyData.refreshToken,
        }),
        {
          timeout: 5000,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
            ).toString("base64")}`,
          },
        },
      );

      const refreshed = response.data;
      if (
        !refreshed.access_token ||
        !Number.isFinite(refreshed.expires_in) ||
        refreshed.expires_in <= 0
      ) {
        return unavailable;
      }

      spotifyData = await ctx.prisma.spotify.update({
        where: { id: SPOTIFY_RECORD_ID },
        data: {
          accessToken: refreshed.access_token,
          refreshToken: refreshed.refresh_token || spotifyData.refreshToken,
          expiresAt: new Date(Date.now() + refreshed.expires_in * 1000),
        },
      });
    }

    const playback = await ctx
      .spotify(spotifyData)
      .player.getCurrentlyPlayingTrack();
    const item = playback?.item;
    if (!item || !("artists" in item) || !("album" in item)) {
      return { status: "idle", song: null, isPlaying: false };
    }

    return {
      status: playback.is_playing ? "playing" : "paused",
      isPlaying: playback.is_playing,
      song: {
        name: item.name,
        href: item.external_urls?.spotify || null,
        artists: item.artists.map((artist) => ({
          name: artist.name,
          href: artist.external_urls?.spotify || artist.href,
        })),
        album: { name: item.album.name, images: item.album.images },
        durationMs: item.duration_ms,
        progressMs: playback.progress_ms || 0,
        isExplicit: item.explicit,
      },
    };
  } catch {
    return unavailable;
  }
}

export const coreRouter = router({
  getGitHubStats: publicProcedure.query(() => getGitHubStats()),
  getSpotifyPlayback: publicProcedure.query(async ({ ctx }) => {
    if (playbackCache && playbackCache.expiresAt > Date.now())
      return playbackCache.value;
    if (!playbackRequest) {
      playbackRequest = readPlayback(ctx)
        .then((value) => {
          playbackCache = {
            value,
            expiresAt:
              Date.now() + (value.status === "unavailable" ? 30000 : 10000),
          };
          return value;
        })
        .finally(() => {
          playbackRequest = null;
        });
    }
    return playbackRequest;
  }),
});

export type CoreRouter = typeof coreRouter;
