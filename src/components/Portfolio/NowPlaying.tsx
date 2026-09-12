import { trpc } from "@/common/trpc";

import { FaSpotify } from "@react-icons/all-files/fa/FaSpotify";
import { ArrowUpRight } from "lucide-react";

export { NowPlaying };

export default function NowPlaying() {
  const playback = trpc.core.getSpotifyPlayback.useQuery(undefined, {
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true,
    retry: false,
    staleTime: 15000,
  });
  const song = playback.data?.song;
  const isPlaying = playback.data?.isPlaying === true;
  const status = playback.isError
    ? "unavailable"
    : playback.data?.status || "loading";

  return (
    <div className="now-playing" data-playing={isPlaying} data-status={status}>
      <span className="now-playing-icon" aria-hidden="true">
        <FaSpotify />
      </span>
      <div className="now-playing-copy" aria-live="polite" aria-atomic="true">
        <span className="now-playing-label">
          {isPlaying ? "On the speakers" : "The soundtrack"}
        </span>
        {song ? (
          <>
            {song.href ? (
              <a
                className="now-playing-track"
                href={song.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen to ${song.name} on Spotify (opens in a new tab)`}
              >
                {song.name}
                <ArrowUpRight size={13} aria-hidden="true" />
              </a>
            ) : (
              <span className="now-playing-track">{song.name}</span>
            )}
            <span className="now-playing-artist">
              {song.artists.map((artist) => artist.name).join(", ")}
              {!isPlaying ? " · Paused" : ""}
            </span>
          </>
        ) : (
          <span className="now-playing-idle">
            {status === "loading"
              ? "Tuning in to Spotify…"
              : status === "unavailable"
                ? "Spotify is quiet for now"
                : "Between tracks"}
          </span>
        )}
      </div>
      <span className="now-playing-bars" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}
