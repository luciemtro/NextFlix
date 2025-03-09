// types/movie.ts
// Ce fichier contient l'interface Movie.
// Cette interface est utilisée pour typer les films récupérés depuis l'API TMDB.

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
}
