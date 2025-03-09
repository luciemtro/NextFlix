"use client";

import { useEffect, useState } from "react";
import { Genre } from "@/types/genre";

export default function GenreSelector({
  onSelect,
}: {
  onSelect: (genreId: number) => void;
}) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/tmdb/movies/genres");
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Erreur API:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="mb-4">
      <select
        value={selectedGenre || ""}
        onChange={(e) => {
          const genreId = Number(e.target.value);
          setSelectedGenre(genreId);
          onSelect(genreId);
        }}
        className="p-2 border rounded"
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
