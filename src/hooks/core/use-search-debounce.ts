import { useEffect, useState } from "react";

export function useSearchDebounce(delay = 1000) {
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Publish the search value after typing pauses for the configured delay.
  useEffect(() => {
    const delayFn = setTimeout(() => setSearch(searchQuery), delay);
    return () => clearTimeout(delayFn);
  }, [searchQuery, delay]);

  return {
    search,
    searchQuery,
    setSearch,
    setSearchQuery,
  };
}
