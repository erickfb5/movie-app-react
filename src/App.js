import { useState, useEffect } from "react";

import "./App.css";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  const getMovies = async (url) => {
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results);
  };

  const showMovies = (movies) => setMovies(movies);

  const getClassByRate = (vote) =>
    vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm && searchTerm !== "") {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="App">
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </header>

      <main>
        {movies.map((movie) => {
          const { id, title, poster_path, vote_average, overview } = movie;

          return (
            <div key={id} className="movie">
              <img src={IMG_PATH + poster_path} alt={title} />
              <div className="movie-info">
                <h3>{title}</h3>
                <span className={getClassByRate(vote_average)}>
                  {vote_average}
                </span>
              </div>
              <div className="overview">
                <h3>Overview</h3>
                {overview}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default App;
