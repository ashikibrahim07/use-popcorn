import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";
import { IoArrowBackOutline } from "react-icons/io5";

import { KEY } from "../App";
import { Loader } from "./Loader";
import StarRating from "./StarRating";
import { usekey } from "../hooks/useKey";

Modal.setAppElement("#root");

export function MovieDetails({
  selectedId,
  handleCloseMovie,
  onAddWatched,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie = {
      ratingCountBeforeRender: countRef.current,
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Released: released,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  usekey("Escape", handleCloseMovie);

  return (
    <Modal
      isOpen={!!selectedId}
      onRequestClose={handleCloseMovie}
      contentLabel="Movie Details"
      className={isLoading ? "test" : "modal"}
      overlayClassName="overlay"
    >
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              <IoArrowBackOutline />
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} size={24} onSet={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>You rated this movie {watchedUserRating}🌟</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>
              <em>Starring {actors}</em>
            </p>
            <p>
              <em>Directed by {director}</em>
            </p>
          </section>
        </div>
      )}
    </Modal>
  );
}
