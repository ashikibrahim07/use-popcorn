export function WatchedMovie({ movie, onRemoveWatched }) {
  return (
    <li className="watched-movie">
      <img
        className="movie-poster"
        src={movie.poster}
        alt={`${movie.title} poster`}
      />
      <h3 className="movie-title">{movie.title}</h3>
      <div className="movie-details">
        <p className="movie-rating">
          <span className="rating-star">⭐️</span>
          <span className="imdb-rating">{movie.imdbRating}</span>
        </p>
        <p className="movie-rating">
          <span className="rating-star">🌟</span>
          <span className="user-rating">{movie.userRating}</span>
        </p>
        <p className="movie-runtime">
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onRemoveWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
