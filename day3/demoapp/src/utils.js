// http://www.omdbapi.com/

const apiKey = process.env.REACT_APP_OMDB_KEY; // Tip: typically you'll want to keep any keys out of git
const baseApiURL = `http://www.omdbapi.com/?apikey=${apiKey}&`;

/* Write an arrow function called getMoviesBySearchTerm that takes a search string as
input and uses fetch and async/await to get an array of movies with a matching title from OMDb API. */

export const getMoviesBySearchTerm = async (searchTerm, queryOptions) => {
  const extraQueryStrings = new URLSearchParams(queryOptions).toString();

  const searchURL = `${baseApiURL}s=${searchTerm}&${extraQueryStrings}`; // based on the omdbapi docs we need to use s query string

  console.log(searchURL);

  const response = await fetch(searchURL);

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const result = await response.json();

  if (result.Response === "True") {
    return result;
  }

  return {};
};

/* Write another arrow function called getMovieDetailsById that takes a valid OMDb movie id as input and
uses fetch and async/await to get an object of detailed information about the specified movie. */

export const getMovieDetailsById = async (searchId) => {
  const searchURL = `${baseApiURL}i=${searchId}`; // based on the omdbapi docs we need to use i query string

  const response = await fetch(searchURL);

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const result = await response.json();

  if (result) {
    return result;
  }

  return {};
};
