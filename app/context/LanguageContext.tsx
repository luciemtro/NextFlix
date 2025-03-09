"use client";

// context/LanguageContext.tsx
// Ce contexte permet de gérer la langue de l'application.
// Il récupère les langues disponibles depuis l'API TMDB et permet de sélectionner une langue.

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

interface LanguageContextProps {
  languages: Language[];
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("fr-FR"); // Langue par défaut

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/configuration/languages?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
        );
        setLanguages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des langues :", error);
      }
    };
    fetchLanguages();
  }, []);

  return (
    <LanguageContext.Provider
      value={{ languages, selectedLanguage, setSelectedLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé dans un LanguageProvider");
  }
  return context;
};
