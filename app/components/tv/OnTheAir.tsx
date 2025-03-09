"use client";
// components/OnTheAir.tsx
// Ce composant affiche la liste des séries actuellement en cours de diffusion avec l'API TMDB.

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import { TvShow } from "@/types/tv";

export default function OnTheAir() {
  const [tvShows, setTvShows] = useState<TvShow[]>([]);
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    const fetchOnTheAir = async () => {
      try {
        const response = await fetch("/api/tmdb/tv/on-the-air", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ language: selectedLanguage }),
        });

        if (!response.ok) throw new Error("Erreur API");

        const data = await response.json();
        setTvShows(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des séries en cours de diffusion :",
          error
        );
      }
    };

    fetchOnTheAir();
  }, [selectedLanguage]);

  return (
    <div>
      <h2 className="text-xl font-bold">🎬 Séries en cours de diffusion</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tvShows.length > 0 ? (
          tvShows.map((tv) => (
            <div key={tv.id} className="bg-gray-800 p-2 rounded-lg">
              <Image
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                width={200}
                height={300}
                className="w-full rounded-md"
              />
              <h3 className="text-sm mt-2">{tv.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-400">Aucune série en cours de diffusion.</p>
        )}
      </div>
    </div>
  );
}
