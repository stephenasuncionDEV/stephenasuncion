import { useEffect, type MutableRefObject, type RefObject } from "react";

interface UseOutsideAlerterProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: MutableRefObject<any> | RefObject<HTMLElement>;
  callback?: () => void;
  event?: "click" | "mousedown";
}

export const useOutsideAlerter = ({
  ref,
  callback,
  event = "mousedown",
}: UseOutsideAlerterProps) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      callback && callback();
    }
  };

  useEffect(() => {
    document.addEventListener(event, handleClickOutside);
    return () => {
      document.removeEventListener(event, handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, event]);
};
