"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie, TvShow } from "@/types/media";

interface FilteredContentProps {
  genreId: number | null;
}

export default function FilteredContent({ genreId }: FilteredContentProps) {
  const [content, setContent] = useState<(Movie | TvShow)[]>([]);

  useEffect(() => {
    if (!genreId) return;

    const fetchContent = async () => {
      try {
        const response = await fetch("/api/tmdb/by-genre", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ genreId }),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setContent(data); // ✅ On stocke les films et séries ensemble
      } catch (error) {
        console.error(
          "❌ Erreur lors de la récupération des contenus filtrés :",
          error
        );
      }
    };

    fetchContent();
  }, [genreId]);

  return (
    <div>
      <h2 className="text-xl font-bold">🎭 Résultats du filtre</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {content.length > 0 ? (
          content.map((item) => (
            <div key={item.id} className="bg-gray-800 p-2 rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={"title" in item ? item.title : item.name}
                width={200}
                height={300}
                className="w-full rounded-md"
              />
              <h3 className="text-sm mt-2">
                {"title" in item ? item.title : item.name}
              </h3>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aucun résultat.</p>
        )}
      </div>
    </div>
  );
}
