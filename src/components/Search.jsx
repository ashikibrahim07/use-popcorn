import { useRef } from "react";
import { usekey } from "../hooks/useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  usekey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
