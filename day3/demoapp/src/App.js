import { useEffect, useState } from "react";
import "./App.css";
import { getMovieDetailsById } from "./utils"; // notice how we don't have to include .js extension

import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movie, setMovie] = useState({});

  // Since fetch api is something that happens outside of the function where it's invoked, it's considered
  // a side effect, so we need to use inside a useEffect hook
  useEffect(() => {
    getMovieDetailsById("tt0110357")
      .then((movie) => {
        console.log(movie);

        const rating = movie.Ratings?.[0]?.Value;
        const decimalRating = rating.split('/')?.[0] || rating;

        setMovie({ ...movie, Rating: decimalRating }); // update state for movie
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []); // empty array, means never execute the effect again, do it only once and that's it

  return (
    <div className="App">
      <h1>Movie App</h1>


      {/* Using the MovieCard component */}
      <MovieCard
        title={movie.Title}
        type={movie.Type}
        posterUrl={movie.Poster}
      />

      <div className="h-100"></div>

      {/* Using the MovieDetails component */}
      <MovieDetails
        posterUrl={movie.Poster}
        title={movie.Title}
        rated={movie.Rated}
        runtime={movie.Runtime}
        genre={movie.Genre}
        plot={movie.Plot}
        actors={movie.Actors}
        rating={movie.Rating}
      />
    </div>
  );
}

export default App;
