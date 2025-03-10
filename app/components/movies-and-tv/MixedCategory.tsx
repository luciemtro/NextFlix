// components/movies-and-tv/MixedCategory.tsx
// Compare this snippet from app/components/movies-and-tv/GenreFilter.tsx:

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie, TvShow } from "@/types/media";

interface MixedCategoryProps {
  title: string;
  movieEndpoint: string;
  tvEndpoint: string;
}

export default function MixedCategory({
  title,
  movieEndpoint,
  tvEndpoint,
}: MixedCategoryProps) {
  const [content, setContent] = useState<(Movie | TvShow)[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, tvRes] = await Promise.all([
          fetch(movieEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language: "fr-FR" }),
          }),
          fetch(tvEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language: "fr-FR" }),
          }),
        ]);

        if (!moviesRes.ok || !tvRes.ok) throw new Error("Erreur API");

        const movies = await moviesRes.json();
        const tvShows = await tvRes.json();

        // Mélanger les résultats
        const mixedContent = [...movies, ...tvShows].sort(
          () => Math.random() - 0.5
        );
        setContent(mixedContent);
      } catch (error) {
        console.error(
          `Erreur lors de la récupération des données pour ${title} :`,
          error
        );
      }
    };

    fetchData();
  }, [movieEndpoint, tvEndpoint]);

  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {content.map((item) => (
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
        ))}
      </div>
    </div>
  );
}
