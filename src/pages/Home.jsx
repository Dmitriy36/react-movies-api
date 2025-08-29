import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]); // so that whenever search results change, it would re-render the component.
  const [error, setError] = useState(null); // for the catch block to keep track.
  const [loading, setLoading] = useState(true); // to keep track of whether it's loading, default is true because starts off loading.

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to load movies...");
      } finally {
        setLoading(false); // whether there was an error or not - it's no longer loading! So, false.
      }
    };

    loadPopularMovies();
  }, []); // if the dependency array is empty, it would just be ran once, on mounting...

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return; // disallow empty spaces search.
    if (loading) return; // won't allow to search while already searching for something.
    setLoading(true);

    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("failed to search movies...");
    } finally {
      setLoading(false);
    }

    // setSearchQuery("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search here..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
