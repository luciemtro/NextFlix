"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { Genre } from "@/types/genre";

interface MoviesByGenreProps {
  genre: Genre;
}

export default function MoviesByGenre({ genre }: MoviesByGenreProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/by-genre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            genreId: genre.id,
          }),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des films :", error);
      }
    };

    fetchMoviesByGenre();
  }, [genre.id, selectedLanguage]);

  return (
    <div>
      <h2 className="text-xl font-bold">🎬 {genre.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-2 rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={200}
                height={300}
                className="w-full rounded-md"
              />
              <h3 className="text-sm mt-2">{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aucun film trouvé.</p>
        )}
      </div>
    </div>
  );
}
