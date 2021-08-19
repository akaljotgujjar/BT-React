import { useEffect, useState } from "react";
import "./App.css";
import { getMoviesBySearchTerm, getMovieDetailsById } from "./utils"; // notice how we don't have to include .js extension

import MovieCard from "./components/MovieCard";


function App() {
  const [movie, setMovie] = useState({});

  // Since fetch api is something that happens outside of the function where it's invoked, it's considered
  // a side effect, so we need to use inside a useEffect hook
  useEffect(() => {
    // Test import
    // getMoviesBySearchTerm("heat")
    //   .then((movies) => {
    //     console.log("Movies found:", movies);
    //   })
    //   .catch((err) => {
    //     console.error("Error:", err);
    //   });

    // Test import
    getMovieDetailsById("tt0113277")
      .then((movie) => {
        console.log("Movie Info:", movie);

        setMovie(movie); // update state for movie
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []); // empty array, means never execute the effect again, do it only once and that's it

  return (
    <div className="App">
      <h1>Movie App</h1>

      <MovieCard title={movie.Title} type={movie.Type} posterUrl={movie.Poster} />


    </div>
  );
}

export default App;
