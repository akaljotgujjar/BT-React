import { useEffect, useState } from "react";
import "./App.css";
import { getMoviesBySearchTerm } from "./utils"; // notice how we don't have to include .js extension

// import MovieCard from "./components/MovieCard";
// import MovieDetails from "./components/MovieDetails";
import Spinner from "./components/Spinner";
import MovieList from "./components/MovieList";
// import Modal from "./components/Modal";
import SearchBar from "./components/SearchBar";
import Paginator from "./components/Paginator";

function App() {
  const [searchTerm, setSearchTerm] = useState("batman");
  const [searchType, setSearchType] = useState("");
  const [totalResults, setTotalResults] = useState("-");
  const [totalPages, setTotalPages] = useState("-");
  const [resultPage, setResultPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

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
  }, [searchTerm, searchType, resultPage]); // empty array, means never execute the effect again, do it only once and that's it

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error {error}</div>;
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

      <MovieList movies={movies} />

      <Paginator
        currentPage={resultPage}
        totalPages={totalPages}
        handlePageChange={(direction) => {
          setResultPage(resultPage + direction);
        }}
      />
    </div>
  );
}

export default App;
