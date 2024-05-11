import { useState, useLayoutEffect, useEffect } from "react";

const useSafeLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useMediaQuery(query: string | string[]) {
  const queries = Array.isArray(query) ? query : [query];
  const isSupported = typeof window !== "undefined" && "matchMedia" in window;

  const [matches, setMatches] = useState(
    queries.map((query) =>
      isSupported ? !!window.matchMedia(query).matches : false,
    ),
  );

  useSafeLayoutEffect(() => {
    if (!isSupported) return undefined;

    const mediaQueryList = queries.map((query) => window.matchMedia(query));

    const listenerList = mediaQueryList.map(() => {
      const listener = () => {
        const isEqual = (prev: boolean[], curr: boolean[]) =>
          prev.length === curr.length &&
          prev.every((elem, idx) => elem === curr[idx]);

        const currentMatches = mediaQueryList.map(
          (mediaQuery) => mediaQuery.matches,
        );

        if (!isEqual(matches, currentMatches)) {
          setMatches(currentMatches);
        }
      };

      window.addEventListener("resize", listener);

      return listener;
    });

    return () => {
      mediaQueryList.forEach((_, index) => {
        window.removeEventListener("resize", listenerList[index]);
      });
    };
  }, [queries]);

  return matches;
}
