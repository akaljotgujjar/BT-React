import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getMoviesBySearchTerm, getMovieDetailsById } from "./utils"; // notice how we don't have to include .js extension

function App() {

  // Since fetch api is something that happens outside of the function where it's invoked, it's considered
  // a side effect, so we need to use inside a useEffect hook
  useEffect(() => {
    // Test import
    getMoviesBySearchTerm("heat")
      .then((movies) => {
        console.log("Movies found:", movies);
      })
      .catch((err) => {
        console.error("Error:", err);
      });

    // Test import
    getMovieDetailsById("tt0113277")
      .then((movie) => {
        console.log("Movie Info:", movie);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []); // empty array, means never execute the effect again, do it only once and that's it

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
