"use client";
// Homepage
// Ce composant affiche les films et séries par genre, ainsi que les tendances et nouveautés mélangées.

import { useState, useEffect } from "react";
import { Genre } from "@/types/genre";
import GenreFilter from "@/components/movies-and-tv/GenreFilter";
import FilteredContent from "@/components/movies-and-tv/FilteredContent";
import MixedCategory from "@/components/movies-and-tv/MixedCategory";
import MoviesByGenre from "@/components/movies/MoviesByGenre";
import TvByGenre from "@/components/tv/TvByGenre";

export default function Home() {
  const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
  const [tvGenres, setTvGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  // Récupération des genres pour les films
  useEffect(() => {
    const fetchMovieGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/genres");
        if (!response.ok) throw new Error("Erreur API Films");
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
        if (!response.ok) throw new Error("Erreur API Séries");
        const data = await response.json();
        setTvGenres(data);
      } catch (error) {
        console.error("❌ Erreur API Genres Séries TV:", error);
      }
    };

    fetchTvGenres();
  }, []);

  return (
    <main className="p-4">
      {/* 🎭 Filtre unique par genre (Netflix-like) */}
      <GenreFilter onGenreSelect={setSelectedGenre} />
      {selectedGenre && <FilteredContent genreId={selectedGenre} />}

      {/* 🔥 Sections mixtes (Tendances, Mieux notés, Nouveautés) */}
      {!selectedGenre && (
        <>
          <MixedCategory
            title="🔥 Tendances"
            movieEndpoint="/api/tmdb/movies/popular"
            tvEndpoint="/api/tmdb/tv/popular"
          />
          <MixedCategory
            title="🌟 Les mieux notés"
            movieEndpoint="/api/tmdb/movies/top-rated"
            tvEndpoint="/api/tmdb/tv/top-rated"
          />
          <MixedCategory
            title="🚀 Nouveautés"
            movieEndpoint="/api/tmdb/movies/upcoming"
            tvEndpoint="/api/tmdb/tv/on-the-air"
          />

          {/* 🎬 Films et séries par genre (affichage dynamique) */}
          {movieGenres.map((genre) => (
            <MoviesByGenre key={genre.id} genre={genre} />
          ))}
          {tvGenres.map((genre) => (
            <TvByGenre key={genre.id} genre={genre} />
          ))}
        </>
      )}
    </main>
  );
}
