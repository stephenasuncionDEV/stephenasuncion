import { useEffect, useState } from "react";

import supabase from "@/common/db/supabase";

import { v4 } from "uuid";

export type Cursor = {
  id: string;
  x: number;
  y: number;
  color: string;
  lastSeen: number;
};

type PresenceStatus =
  | "connecting"
  | "connected"
  | "offline"
  | "paused"
  | "unavailable";

const MAX_IDLE_TIME_MS = 30000;
const SEND_INTERVAL_MS = 80;
const CURSOR_COLORS = ["#ac4d31", "#537358", "#7665b0", "#357b9d"];

function isCursorPayload(
  payload: unknown,
): payload is Omit<Cursor, "lastSeen"> {
  if (!payload || typeof payload !== "object") return false;
  const cursor = payload as Record<string, unknown>;
  return (
    typeof cursor.id === "string" &&
    /^[\w-]{1,64}$/.test(cursor.id) &&
    typeof cursor.x === "number" &&
    Number.isFinite(cursor.x) &&
    cursor.x >= 0 &&
    cursor.x <= 1 &&
    typeof cursor.y === "number" &&
    Number.isFinite(cursor.y) &&
    cursor.y >= 0 &&
    cursor.y <= 1 &&
    typeof cursor.color === "string" &&
    /^#[\da-f]{6}$/i.test(cursor.color)
  );
}

export const useLiveCursor = () => {
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});
  const [visitorCount, setVisitorCount] = useState(0);
  const [status, setStatus] = useState<PresenceStatus>(
    supabase ? "connecting" : "unavailable",
  );

  // Synchronize visitor presence and cursors while this tab is active and online.
  useEffect(() => {
    const client = supabase;
    if (!client) return;

    const id = v4();
    const color =
      CURSOR_COLORS[Math.floor(Math.random() * CURSOR_COLORS.length)];
    let channel: ReturnType<typeof client.channel> | null = null;
    let subscribed = false;
    let lastSent = 0;
    let trailingSend: ReturnType<typeof setTimeout> | undefined;
    let pendingCursor: Omit<Cursor, "lastSeen"> | null = null;
    let disposed = false;

    const sendCursor = () => {
      trailingSend = undefined;
      if (!channel || !subscribed || !pendingCursor || document.hidden) return;
      lastSent = Date.now();
      void channel.send({
        type: "broadcast",
        event: "cursor",
        payload: pendingCursor,
      });
      pendingCursor = null;
    };

    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !subscribed || document.hidden)
        return;
      const documentElement = document.documentElement;
      pendingCursor = {
        id,
        color,
        x: Math.min(
          1,
          Math.max(
            0,
            (event.clientX + window.scrollX) / documentElement.scrollWidth,
          ),
        ),
        y: Math.min(
          1,
          Math.max(
            0,
            (event.clientY + window.scrollY) / documentElement.scrollHeight,
          ),
        ),
      };
      const wait = SEND_INTERVAL_MS - (Date.now() - lastSent);
      if (wait <= 0) sendCursor();
      else if (!trailingSend) trailingSend = setTimeout(sendCursor, wait);
    };

    const disconnect = () => {
      subscribed = false;
      clearTimeout(trailingSend);
      trailingSend = undefined;
      pendingCursor = null;
      const previousChannel = channel;
      channel = null;
      if (previousChannel) void client.removeChannel(previousChannel);
      if (!disposed) {
        setCursors({});
        setVisitorCount(0);
      }
    };

    const connect = () => {
      if (disposed || channel || document.hidden || !navigator.onLine) return;
      setStatus("connecting");
      const nextChannel = client.channel("cursors", {
        config: { broadcast: { self: false }, presence: { key: id } },
      });
      channel = nextChannel;

      nextChannel.on("broadcast", { event: "cursor" }, ({ payload }) => {
        if (
          disposed ||
          channel !== nextChannel ||
          !isCursorPayload(payload) ||
          payload.id === id
        )
          return;
        setCursors((previous) => {
          if (!previous[payload.id] && Object.keys(previous).length >= 24)
            return previous;
          return {
            ...previous,
            [payload.id]: { ...payload, lastSeen: Date.now() },
          };
        });
      });

      nextChannel.on("presence", { event: "sync" }, () => {
        if (!disposed && channel === nextChannel) {
          setVisitorCount(Object.keys(nextChannel.presenceState()).length);
        }
      });

      nextChannel.on("presence", { event: "leave" }, ({ key }) => {
        if (disposed || channel !== nextChannel) return;
        setCursors((previous) => {
          if (!previous[key]) return previous;
          const next = { ...previous };
          delete next[key];
          return next;
        });
      });

      nextChannel.subscribe((nextStatus) => {
        if (disposed || channel !== nextChannel) return;
        subscribed = nextStatus === "SUBSCRIBED";
        if (subscribed) {
          setStatus("connected");
          void nextChannel.track({ online_at: new Date().toISOString() });
        } else if (
          nextStatus === "CHANNEL_ERROR" ||
          nextStatus === "TIMED_OUT" ||
          nextStatus === "CLOSED"
        ) {
          setStatus("offline");
          setVisitorCount(0);
          setCursors({});
        }
      });
    };

    const syncVisibility = () => {
      if (document.hidden || !navigator.onLine) {
        disconnect();
        setStatus(document.hidden ? "paused" : "offline");
      } else {
        connect();
      }
    };

    const pruneCursors = setInterval(() => {
      if (document.hidden) return;
      setCursors((previous) => {
        const entries = Object.entries(previous);
        const active = entries.filter(
          ([, cursor]) => Date.now() - cursor.lastSeen < MAX_IDLE_TIME_MS,
        );
        return active.length === entries.length
          ? previous
          : Object.fromEntries(active);
      });
    }, 5000);

    syncVisibility();
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("online", syncVisibility);
    window.addEventListener("offline", syncVisibility);
    document.addEventListener("visibilitychange", syncVisibility);

    return () => {
      disposed = true;
      disconnect();
      clearInterval(pruneCursors);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("online", syncVisibility);
      window.removeEventListener("offline", syncVisibility);
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return { cursors, status, visitorCount };
};
