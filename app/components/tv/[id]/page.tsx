"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TvShow } from "@/types/media";
import { useParams } from "next/navigation";

export default function TvPage({ params }: { params: { id: string } }) {
  const { id } = useParams();

  const [tvShow, setTvShow] = useState<TvShow | null>(null);

  useEffect(() => {
    const fetchTvShow = async () => {
      try {
        const response = await fetch(`/api/tmdb/tv/${id}`);
        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();
        setTvShow(data);
      } catch (error) {
        console.error("❌ Erreur API Série :", error);
      }
    };

    fetchTvShow();
  }, [params.id]); // Utiliser directement params.id

  if (!tvShow) return <p className="text-center">Chargement...</p>;

  const trailer = tvShow.videos?.results.find(
    (video) =>
      video.type === "Trailer" && video.site === "YouTube" && video.official
  );

  return (
    <div className="p-6">
      <div className="relative h-96">
        <Image
          src={
            tvShow.backdrop_path
              ? `https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`
              : "/placeholder.jpg"
          }
          alt={tvShow.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h1 className="text-4xl font-bold mt-4">{tvShow.name}</h1>
      <p className="text-gray-400 text-lg">
        ⭐ {tvShow.vote_average.toFixed(1)}/10
      </p>
      <p className="mt-2 text-lg">{tvShow.overview}</p>

      {trailer ? (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Bande-annonce</h2>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            frameBorder="0"
            allowFullScreen
            className="mt-2 rounded-lg"
          ></iframe>
        </div>
      ) : (
        <p className="mt-6 text-gray-500">Aucune bande-annonce disponible.</p>
      )}
    </div>
  );
}
