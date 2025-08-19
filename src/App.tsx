import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import MovieDetailModal from "./MovieDetailModal";
import SearchIcon from "./assets/search.svg";
import {
  Movie,
  MovieDetail,
  MovieSearchResponse,
  MovieError,
  API_CONFIG,
  buildSearchUrl,
  buildDetailUrl,
} from "./types";
import "./index.css";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Movie detail modal state
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    searchMovies(API_CONFIG.DEFAULT_SEARCH);
  }, []);

  const searchMovies = async (title: string): Promise<void> => {
    if (!title.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(buildSearchUrl(title));
      const data: MovieSearchResponse | MovieError = await response.json();

      if ("Error" in data) {
        setError(data.Error);
        setMovies([]);
      } else if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieDetails = async (imdbId: string): Promise<void> => {
    try {
      const response = await fetch(buildDetailUrl(imdbId));
      const data: MovieDetail | MovieError = await response.json();

      if ("Error" in data) {
        setError(data.Error);
        setIsModalOpen(false);
      } else {
        setSelectedMovie(data);
        setIsModalOpen(true);
      }
    } catch (err) {
      setError("Failed to fetch movie details. Please try again.");
      setIsModalOpen(false);
    }
  };

  const handleMovieClick = (movie: Movie): void => {
    fetchMovieDetails(movie.imdbID);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = (): void => {
    searchMovies(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for movies"
          disabled={loading}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={handleSearch}
          style={{ cursor: loading ? "not-allowed" : "pointer" }}
        />
      </div>

      {loading && <div className="loading">Searching...</div>}

      {error && <div className="error">{error}</div>}

      {!loading && !error && movies.length > 0 && (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onClick={handleMovieClick}
            />
          ))}
        </div>
      )}

      {!loading && !error && movies.length === 0 && searchTerm && (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

      {/* Movie Detail Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  ); 
};

export default App;
