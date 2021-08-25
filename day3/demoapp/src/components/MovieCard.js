import React from "react";

function MovieCard({ title, type, posterUrl }) {
  return (
    <article className="MovieCard">
      <img src={posterUrl} alt={`${title} Poster`} width="150" />

      <footer className="MovieCard__footer">
        <h3 className="MovieCard__title" title={title}>
          {title}
        </h3>
        <button className="MovieCard__tag">{type}</button>
      </footer>
    </article>
  );
}

export default MovieCard;
