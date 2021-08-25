import React, { useRef } from "react";

function SearchBar({ handleUpdate }) {
  const movieTitleTerm = useRef(null);
  const sourceType = useRef(null);

  function handleMovieSearch(e) {
    e.preventDefault();
    console.log(movieTitleTerm.current.value, sourceType.current.value);
    handleUpdate(movieTitleTerm.current.value, sourceType.current.value);
  }

  return (
    <form onSubmit={handleMovieSearch}>
      <input type="text" ref={movieTitleTerm} />
      <select ref={sourceType}>
        <option value="movie">Movie</option>
        <option value="series">Series</option>
        <option value="episode">Episode</option>
      </select>
      <button>Search</button>
    </form>
  );
}

export default SearchBar;
