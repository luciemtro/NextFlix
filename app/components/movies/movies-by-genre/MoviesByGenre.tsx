"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Genre } from "@/types/genre";
import { Movie } from "@/types/movie";

export default function MoviesByGenre({ genre }: { genre: Genre }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log(
          `📡 Envoi de la requête pour genre: ${genre.name} (ID: ${genre.id})`
        );

        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ genreId: genre.id }),
        };

        console.log("🔍 Requête envoyée :", requestOptions);

        const response = await fetch(
          "/api/tmdb/movies/by-genre",
          requestOptions
        );

        console.log(
          "📡 Response status:",
          response.status,
          response.statusText
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Erreur API: ${response.status} - ${errorMessage}`);
        }

        const data = await response.json();
        console.log("✅ Films reçus :", data);

        setMovies(data);
      } catch (err) {
        console.error("❌ Erreur API TMDB:", err);
        setError("Impossible de charger les films.");
      }
    };

    fetchMovies();
  }, [genre.id]);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold">{genre.name}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-scroll flex space-x-4">
        {movies.length === 0 && (
          <p className="text-gray-500">Aucun film trouvé.</p>
        )}
        {movies.map((movie: Movie) => (
          <div key={movie.id} className="w-40">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={160}
              height={240}
              className="rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
