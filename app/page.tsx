// page.tsx
// Ce composant de page affiche les films par genre en utilisant l'API TMDB.
// Il affiche également les films tendances, populaires, en cours de diffusion, les mieux notés et à venir.

"use client";

import { useState, useEffect } from "react";
import { Genre } from "@/types/genre";
import MoviesByGenre from "@/components/movies/movies-by-genre/MoviesByGenre";
import Nav from "@/components/Nav";
import TrendingMovies from "@/components/movies/trending/TrendingMovies";
import PopularMovies from "@/components/movies/popular/PopularMovies";
import NowPlayingMovies from "@/components/movies/now-playing/NowPlayingMovies";
import TopRatedMovies from "@/components/movies/top-rated/TopRatedMovies";
import UpcomingMovies from "@/components/movies/upcoming/UpcomingMovies";

export default function Home() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("❌ Erreur API Genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <main>
      <Nav onGenreSelect={setSelectedGenre} />{" "}
      {selectedGenre ? (
        genres
          .filter((g) => g.id === selectedGenre)
          .map((genre) => <MoviesByGenre key={genre.id} genre={genre} />)
      ) : (
        <>
          <TrendingMovies />
          <PopularMovies />
          <NowPlayingMovies />
          <TopRatedMovies />
          <UpcomingMovies />
          {genres.map((genre) => (
            <MoviesByGenre key={genre.id} genre={genre} />
          ))}
        </>
      )}
    </main>
  );
}
