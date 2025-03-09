"use client";

// components/LanguageSelector.tsx
// Ce composant permet de sélectionner la langue de l'application en utilisant le contexte LanguageContext.
// Il affiche une liste déroulante des langues disponibles dans l'API TMDB.
// Lorsqu'une langue est sélectionnée, le contexte LanguageContext est mis à jour avec la nouvelle langue.

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelector() {
  const { languages, selectedLanguage, setSelectedLanguage } = useLanguage();

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => setSelectedLanguage(e.target.value)}
      className="p-2 border rounded"
    >
      {languages.map((lang) => (
        <option
          className="bg-black"
          key={lang.iso_639_1}
          value={lang.iso_639_1}
        >
          {lang.english_name} ({lang.name})
        </option>
      ))}
    </select>
  );
}
