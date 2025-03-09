// types/tv.ts
export interface TvShow {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  vote_average: number;
  first_air_date: string;
}
