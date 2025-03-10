// types/movie.ts
// Ce fichier contient l'interface Movie.
// Cette interface est utilisée pour typer les films récupérés depuis l'API TMDB.

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  backdrop_path: string;
  vote_average: number;
  videos?: {
    results: { key: string; type: string; site: string; official: boolean }[];
  };
}

// types/tv.ts
export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
  videos?: {
    results: { key: string; type: string; site: string; official: boolean }[];
  };
}
