// Components/movies-and-tv/GenreFilter.tsx

"use client";

import { useState, useEffect } from "react";
import { Genre } from "@/types/genre";

interface GenreFilterProps {
  onGenreSelect: (genreId: number | null) => void;
}

export default function GenreFilter({ onGenreSelect }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("❌ Erreur API Genres :", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="mb-4">
      <label className="text-lg font-bold">🎭 Filtrer par Genre :</label>
      <select
        onChange={(e) =>
          onGenreSelect(e.target.value ? Number(e.target.value) : null)
        }
        className="bg-gray-800 text-white p-2 rounded-md w-full mt-2"
      >
        <option value="">Tous les genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}
