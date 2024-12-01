import { useState } from "react";

import { useMovies } from "./hooks/useMovies.js";
import { useLocalStorageState } from "./hooks/useLocalStorageState.js";

import { NavBar } from "./components/NavBar.jsx";
import { Logo } from "./components/Logo.jsx";
import { Search } from "./components/Search.jsx";
import { NumResults } from "./components/NumResults.jsx";
import { Loader } from "./components/Loader.jsx";
import { ErrorMessage } from "./components/ErrorMessage.jsx";
import { Main } from "./components/MainComponent.jsx";
import { Box } from "./components/Box.jsx";
import { MovieList } from "./components/MovieList.jsx";
import { MovieDetails } from "./components/MovieDetails.jsx";
import { WatchedSummary } from "./components/WatchedSummary.jsx";
import { WatchedMoviesList } from "./components/WatchedMoviesList.jsx";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const KEY = import.meta.env.VITE_KEY;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleRemoveWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
