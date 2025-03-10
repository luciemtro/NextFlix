"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { TvShow } from "@/types/media";
import { Genre } from "@/types/genre";

interface TvByGenreProps {
  genre: Genre;
}

export default function TvByGenre({ genre }: TvByGenreProps) {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    const fetchTvByGenre = async () => {
      try {
        const response = await fetch("/api/tmdb/by-genre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            language: selectedLanguage,
            genreId: genre.id,
            type: "tv",
          }),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des séries :", error);
      }
    };

    fetchTvByGenre();
  }, [genre.id, selectedLanguage]);

  return (
    <div>
      <h2 className="text-xl font-bold">📺 {genre.name}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tvShows.length > 0 ? (
          tvShows.map((tv) => (
            <div key={tv.id} className="bg-gray-800 p-2 rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name || "Image de la série TV"}
                width={200}
                height={300}
                className="w-full rounded-md"
              />
              <h3 className="text-sm mt-2">{tv.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aucune série trouvée.</p>
        )}
      </div>
    </div>
  );
}
