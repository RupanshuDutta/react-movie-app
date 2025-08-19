import { MovieDetail } from "./types";

interface MovieDetailModalProps {
  movie: MovieDetail | null;
  isOpen: boolean;
  onClose: () => void;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({
  movie,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !movie) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatRating = (rating: string) => {
    return rating === "N/A" ? "Not available" : rating;
  };

  const formatMoney = (amount: string) => {
    if (amount === "N/A") return "Not available";
    return amount;
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="movie-detail">
          <div className="movie-detail-header">
            <div className="movie-poster">
              <img
                src={
                  movie.Poster !== "N/A"
                    ? movie.Poster
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.Title}
              />
            </div>

            <div className="movie-info">
              <h1>{movie.Title}</h1>
              <div className="movie-meta">
                <span className="year">{movie.Year}</span>
                <span className="rated">{movie.Rated}</span>
                <span className="runtime">{movie.Runtime}</span>
                <span className="genre">{movie.Genre}</span>
              </div>

              {movie.imdbRating !== "N/A" && (
                <div className="rating">
                  <span className="rating-label">IMDB Rating:</span>
                  <span className="rating-value">⭐ {movie.imdbRating}/10</span>
                  <span className="rating-votes">
                    ({movie.imdbVotes} votes)
                  </span>
                </div>
              )}

              <div className="plot">
                <h3>Plot</h3>
                <p>{movie.Plot}</p>
              </div>
            </div>
          </div>

          <div className="movie-detail-body">
            <div className="detail-section">
              <h3>Cast & Crew</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Director:</strong> {formatRating(movie.Director)}
                </div>
                <div className="detail-item">
                  <strong>Writer:</strong> {formatRating(movie.Writer)}
                </div>
                <div className="detail-item">
                  <strong>Actors:</strong> {formatRating(movie.Actors)}
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3>Release Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <strong>Released:</strong> {formatRating(movie.Released)}
                </div>
                {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
                  <div className="detail-item">
                    <strong>Box Office:</strong> {formatMoney(movie.BoxOffice)}
                  </div>
                )}
                {movie.Production && movie.Production !== "N/A" && (
                  <div className="detail-item">
                    <strong>Production:</strong> {movie.Production}
                  </div>
                )}
              </div>
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="detail-section">
                <h3>Ratings</h3>
                <div className="ratings-grid">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="rating-item">
                      <span className="rating-source">{rating.Source}</span>
                      <span className="rating-value">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;
