import { useEffect, useState } from "react";

import supabase from "@/common/db/supabase";

import { v4 } from "uuid";

type Cursor = {
  id: string;
  x: number;
  y: number;
  color: string;
  lastSeen: number;
};

const MAX_IDLE_TIME_MS = 30000;

export const useLiveCursor = () => {
  const [userData, setUserData] = useState<{
    id: string;
    color: string;
  } | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [cursors, setCursors] = useState<Record<string, Cursor>>({});

  // initialize userId on first render
  useEffect(() => {
    if (isMounted) return;

    setUserData({
      id: v4(),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    });
    setIsMounted(true);
  }, [isMounted]);

  // join supabase channel and handle cursor updates
  useEffect(() => {
    if (!userData) return;

    const channel = supabase.channel("cursors", {
      config: { broadcast: { self: true } },
    });

    channel.on("broadcast", { event: "cursor" }, ({ payload }) => {
      setCursors((prev) => ({
        ...prev,
        [payload.id]: {
          ...payload,
          lastSeen: Date.now(),
        },
      }));
    });

    channel.subscribe();

    const handleMove = (e: MouseEvent) => {
      const cursor = {
        id: userData.id,
        x: (e.clientX + window.scrollX) / document.documentElement.scrollWidth,
        y: (e.clientY + window.scrollY) / document.documentElement.scrollHeight,
        color: userData.color,
      };

      channel.send({
        type: "broadcast",
        event: "cursor",
        payload: cursor,
      });

      setCursors((prev) => ({
        ...prev,
        [userData.id]: { ...cursor, lastSeen: Date.now() },
      }));
    };

    const handleDisconnect = () => {
      channel.unsubscribe();
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("beforeunload", handleDisconnect);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("beforeunload", handleDisconnect);
      channel.unsubscribe();
    };
  }, [userData]);

  // remove cursor that is idle
  useEffect(() => {
    const interval = setInterval(() => {
      setCursors((prev) => {
        const now = Date.now();
        return Object.fromEntries(
          Object.entries(prev).filter(
            ([, cursor]) => now - cursor.lastSeen < MAX_IDLE_TIME_MS,
          ),
        );
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // update cursor positions on window resize
  useEffect(() => {
    const handleResize = () => setCursors((prev) => ({ ...prev }));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    cursors: Object.fromEntries(
      Object.entries(cursors).filter(([id]) => id !== userData?.id),
    ),
  };
};
