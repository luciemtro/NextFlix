"use client";

import GenreSelector from "./GenreSelector";

interface NavProps {
  onGenreSelect: (genreId: number) => void; // ✅ Propriété requise
}

export default function Nav({ onGenreSelect }: NavProps) {
  return (
    <nav>
      <GenreSelector onSelect={onGenreSelect} />
    </nav>
  );
}
