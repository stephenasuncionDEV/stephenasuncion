import { useEffect, useState } from "react";

import supabase from "@/common/db/supabase";

import { v4 } from "uuid";

type Cursor = {
  id: string;
  x: number;
  y: number;
  color: string;
};

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
        [payload.id]: payload,
      }));
    });

    channel.subscribe();

    const handleMove = (e: MouseEvent) => {
      const cursor = {
        id: userData.id,
        x: e.clientX,
        y: e.clientY,
        color: userData.color,
      };
      channel.send({
        type: "broadcast",
        event: "cursor",
        payload: cursor,
      });
      setCursors((prev) => ({ ...prev, [userData.id]: cursor }));
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

  return {
    cursors: Object.fromEntries(
      Object.entries(cursors).filter(([id]) => id !== userData?.id),
    ),
  };
};
