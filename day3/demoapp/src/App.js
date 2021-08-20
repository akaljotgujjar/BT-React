import { useEffect, useState } from "react";
import "./App.css";
import { getMoviesBySearchTerm } from "./utils"; // notice how we don't have to include .js extension

// import MovieCard from "./components/MovieCard";
// import MovieDetails from "./components/MovieDetails";
import Spinner from "./components/Spinner";
import MovieList from "./components/MovieList";
import Modal from "./components/Modal";

function App() {
  const [searchTerm, setSearchTerm] = useState("lion");
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  // Since fetch api is something that happens outside of the function where it's invoked, it's considered
  // a side effect, so we need to use inside a useEffect hook
  useEffect(() => {
    setIsLoading(true);

    getMoviesBySearchTerm(searchTerm)
      .then((movies) => {
        console.log(movies);

        setMovies(movies);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setMovies([]);
        console.error("Error:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // empty array, means never execute the effect again, do it only once and that's it

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="App">
      <h1>Movie App</h1>

      <MovieList movies={movies} />
      <Modal />


    </div>
  );

  //     {/* Using the MovieCard component */}
  //     { <MovieCard
  //       title={movie.Title}
  //       type={movie.Type}
  //       posterUrl={movie.Poster}
  //     /> }

  //     <div className="h-100"></div>

  //     {/* Using the MovieDetails component */}
  //     {/* <MovieDetails
  //       posterUrl={movie.Poster}
  //       title={movie.Title}
  //       rated={movie.Rated}
  //       runtime={movie.Runtime}
  //       genre={movie.Genre}
  //       plot={movie.Plot}
  //       actors={movie.Actors}
  //       rating={movie.Rating}
  //     /> */}
  //   </div>
  // );
}

export default App;
