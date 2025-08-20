// Movie data types
export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
}

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface MovieError {
  Response: string;
  Error: string;
}

// API configuration
export const API_CONFIG = {
  BASE_URL: "https://www.omdbapi.com/",
  API_KEY: "39ad1701",
  DEFAULT_SEARCH: "Batman",
} as const;

export const buildSearchUrl = (searchTerm: string): string => {
  return `${API_CONFIG.BASE_URL}?s=${encodeURIComponent(searchTerm)}&apikey=${
    API_CONFIG.API_KEY
  }`;
};

export const buildDetailUrl = (imdbId: string): string => {
  return `${API_CONFIG.BASE_URL}?i=${imdbId}&apikey=${API_CONFIG.API_KEY}`;
};
