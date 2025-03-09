"use client";

import MovieGenreSelector from "./movies/GenreSelector";
import TvGenreSelector from "./tv/GenreSelector";

interface NavProps {
  onMovieGenreSelect: (genreId: number) => void;
  onTvGenreSelect: (genreId: number) => void;
}

export default function Nav({ onMovieGenreSelect, onTvGenreSelect }: NavProps) {
  return (
    <nav className="p-4 bg-gray-900 text-white">
      <h2 className="text-lg font-bold mb-2">🎭 Filtrer par Genre</h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Sélecteur de genre pour les films */}
        <div>
          <h3 className="text-md font-semibold">🎬 Films</h3>
          <MovieGenreSelector onGenreSelect={onMovieGenreSelect} />
        </div>

        {/* Sélecteur de genre pour les séries */}
        <div>
          <h3 className="text-md font-semibold">📺 Séries</h3>
          <TvGenreSelector onGenreSelect={onTvGenreSelect} />
        </div>
      </div>
    </nav>
  );
}
