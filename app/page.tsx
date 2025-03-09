"use client";

// Ce composant de page affiche les films et séries par genre en utilisant l'API TMDB.
// Il affiche également les tendances, les plus populaires, les mieux notés, etc.

import { useState, useEffect } from "react";
import { Genre } from "@/types/genre";
import MoviesByGenre from "@/components/movies/MoviesByGenre";
import TvByGenre from "@/components/tv/TvByGenre";
import Nav from "@/components/Nav";
import TrendingMovies from "@/components/movies/TrendingMovies";
import PopularMovies from "@/components/movies/PopularMovies";
import NowPlayingMovies from "@/components/movies/NowPlayingMovies";
import TopRatedMovies from "@/components/movies/TopRatedMovies";
import UpcomingMovies from "@/components/movies/UpcomingMovies";
import PopularTv from "@/components/tv/PopularTv";
import TopRatedTv from "@/components/tv/TopRatedTv";
import AiringToday from "@/components/tv/AiringToday";
import OnTheAir from "@/components/tv/OnTheAir";

export default function Home() {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [selectedMovieGenre, setSelectedMovieGenre] = useState<number | null>(
    null
  );
  const [selectedTvGenre, setSelectedTvGenre] = useState<number | null>(null);

  // Récupération des genres pour les films
  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/genres");
        const data = await response.json();
        setMovieGenres(data);
      } catch (error) {
        console.error("❌ Erreur API Genres Films:", error);
      }
    };

    fetchMovieGenres();
  }, []);

  // Récupération des genres pour les séries TV
  useEffect(() => {
    const fetchTvGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/tv/genres");
        const data = await response.json();
        setTvGenres(data);
      } catch (error) {
        console.error("❌ Erreur API Genres Séries TV:", error);
      }
    };

    fetchTvGenres();
  }, []);

  return (
    <main>
      {/* Barre de navigation avec sélection des genres */}
      <Nav
        onMovieGenreSelect={setSelectedMovieGenre}
        onTvGenreSelect={setSelectedTvGenre}
      />

      {/* Affichage des films selon le genre sélectionné */}
      {selectedMovieGenre ? (
        movieGenres
          .filter((g) => g.id === selectedMovieGenre)
          .map((genre) => <MoviesByGenre key={genre.id} genre={genre} />)
      ) : (
        <>
          <TrendingMovies />
          <PopularMovies />
          <NowPlayingMovies />
          <TopRatedMovies />
          <UpcomingMovies />
          {movieGenres.map((genre) => (
            <MoviesByGenre key={genre.id} genre={genre} />
          ))}
        </>
      )}

      {/* Affichage des séries TV selon le genre sélectionné */}
      {selectedTvGenre ? (
        tvGenres
          .filter((g) => g.id === selectedTvGenre)
          .map((genre) => <TvByGenre key={genre.id} genre={genre} />)
      ) : (
        <>
          <PopularTv />
          <TopRatedTv />
          <AiringToday />
          <OnTheAir />
          {tvGenres.map((genre) => (
            <TvByGenre key={genre.id} genre={genre} />
          ))}
        </>
      )}
    </main>
  );
}
