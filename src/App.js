import { useState, useEffect } from "react";
import "./App.css";


const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getMovies(API_URL);
  }, []);

  async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results);
  }

  function handleSearch(e) {
    e.preventDefault();

    if (searchTerm && searchTerm.trim() !== "") {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    } else {
      getMovies(API_URL);
    }
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  function getClassByRate(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }

  return (
    <div className="App">
      <header>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            className="search"
            placeholder="Search"
          />
        </form>
      </header>

      <main>
        {movies.map((movie) => {
          const { id, title, poster_path, vote_average, overview } = movie;

          return (
            <div className="movie" key={id}>
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
}

export default App;
