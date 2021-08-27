import { useEffect, useState } from "react";

// Components
// import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import Spinner from "./components/Spinner";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import Paginator from "./components/Paginator";
import Modal from "./components/Modal";

// Resources
// import boxStyles from "./styles/box.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import { getMoviesBySearchTerm, getMovieDetailsById } from "./utils"; // notice how we don't have to include .js extension

function App() {
  const [searchTerm, setSearchTerm] = useState("batman");
  const [searchType, setSearchType] = useState("");
  const [totalResults, setTotalResults] = useState("-");
  const [totalPages, setTotalPages] = useState("-");
  const [resultPage, setResultPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState({});

  const [show, setShow] = useState(false);

  // Since fetch api is something that happens outside of the function where it's invoked, it's considered
  // a side effect, so we need to use inside a useEffect hook

  useEffect(() => {
    setIsLoading(true);

    getMoviesBySearchTerm(searchTerm, { type: searchType, page: resultPage })
      .then((result) => {
        console.log(result);

        setMovies(result.Search);
        setTotalResults(result.totalResults);
        setTotalPages(Math.ceil(result.totalResults / 10));

        setError(null);
      })
      .catch((err) => {
        setError(err);
        setMovies([]);
        setTotalResults("-");
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchTerm, searchType, resultPage]);

  useEffect(() => {
    if (selectedMovieId) {
      getMovieDetailsById(selectedMovieId)
        .then((movie) => {
          movie.rating = movie.Ratings?.[0].Value.split("/")[0];

          setSelectedMovie(movie);
          setShow(true);
        })
        .catch((err) => {
          console.error("Whoops");
        });
    }
  }, [selectedMovieId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Whoops! {error}</div>;
  }

  return (
    <div className="App">
      <h1>Movie App</h1>

      <SearchBar
        handleUpdate={(term, type) => {
          setSearchTerm(term);
          setSearchType(type);
        }}
      />

      <MovieList
        movies={movies}
        updateMovie={(movie) => {
          setSelectedMovieId(movie);
        }}
      />

      <Paginator
        currentPage={resultPage}
        totalPages={totalPages}
        handlePageChange={(direction) => {
          setResultPage(resultPage + direction);
        }}
      />

      <Modal
        show={show}
        updateClose={(showStatus) => {
          setShow(showStatus);
        }}
      >
        <MovieDetails
          posterUrl={selectedMovie.Poster}
          title={selectedMovie.Title}
          rated={selectedMovie.Rated}
          runtime={selectedMovie.Runtime}
          genre={selectedMovie.Genre}
          plot={selectedMovie.Plot}
          actors={selectedMovie.Actors}
          rating={selectedMovie.rating}
        />
      </Modal>

    </div>
  );
}

export default App;
