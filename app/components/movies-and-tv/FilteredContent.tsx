"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie, TvShow } from "@/types/media";

interface FilteredContentProps {
  genreId: number | null;
}

export default function FilteredContent({ genreId }: FilteredContentProps) {
  const [content, setContent] = useState<(Movie | TvShow)[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Champ de recherche toujours visible

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let response;
        if (genreId) {
          response = await fetch("/api/tmdb/by-genre", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ genreId }),
          });
        } else {
          // ✅ Charger les tendances si aucun genre sélectionné
          const moviesRes = await fetch("/api/tmdb/movies/popular");
          const tvRes = await fetch("/api/tmdb/tv/popular");

          if (!moviesRes.ok || !tvRes.ok) throw new Error("Erreur API");

          const movies = await moviesRes.json();
          const tvShows = await tvRes.json();
          setContent([...movies, ...tvShows]); // 🔥 Fusion des films et séries populaires
          return;
        }

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error(
          "❌ Erreur lors de la récupération des contenus filtrés :",
          error
        );
      }
    };

    fetchContent();
  }, [genreId]);

  // ✅ Filtrage dynamique en fonction du texte entré
  const filteredContent = content.filter((item) =>
    ("title" in item ? item.title : item.name)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-xl font-bold">🎭 Rechercher un film ou une série</h2>

      {/* 🔍 Input de recherche toujours affiché */}
      <input
        type="text"
        placeholder="Rechercher un film ou une série..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-gray-800 text-white p-2 rounded-md w-full mt-2"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-4">
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
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
