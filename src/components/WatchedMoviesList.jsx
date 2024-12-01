import { WatchedMovie } from "./WatchedMovie";

export function WatchedMoviesList({ watched, onRemoveWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onRemoveWatched={onRemoveWatched}
        />
      ))}
    </ul>
  );
}
