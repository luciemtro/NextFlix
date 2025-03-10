"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Movie } from "@/types/media";
import { useParams } from "next/navigation";

export default function MoviePage() {
  const { id } = useParams(); // Utilisation de `useParams()` pour accéder à params.id

  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`/api/tmdb/movies/${id}`);
        if (!response.ok) throw new Error("Erreur API");
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("❌ Erreur API Film :", error);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]); // Utilisation de `id` comme dépendance

  if (!movie) return <p className="text-center">Chargement...</p>;

  const trailer = movie.videos?.results.find(
    (video) =>
      video.type === "Trailer" && video.site === "YouTube" && video.official
  );

  return (
    <div className="p-6">
      <div className="relative h-96">
        <Image
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : "/placeholder.jpg"
          }
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      <h1 className="text-4xl font-bold mt-4">{movie.title}</h1>
      <p className="text-gray-400 text-lg">
        ⭐ {movie.vote_average.toFixed(1)}/10
      </p>
      <p className="mt-2 text-lg">{movie.overview}</p>

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
