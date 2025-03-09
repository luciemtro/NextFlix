// api/tmdb/movies/by-genre/route.ts
// Cette route permet de récupérer les films d'un genre donné depuis l'API TMDB.
// Elle est utilisée par le composant `MoviesByGenre` pour afficher les films d'un genre.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("📡 Requête reçue en `POST` sur /api/tmdb/movies/by-genre");

    const { genreId } = await req.json();

    if (!genreId) {
      console.error("❌ Genre ID manquant !");
      return NextResponse.json({ error: "Genre ID requis" }, { status: 400 });
    }

    console.log(`📡 Requête pour le genre ${genreId} envoyée à TMDB...`);

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    if (!TMDB_ACCESS_TOKEN) {
      console.error("❌ TMDB_ACCESS_TOKEN manquant !");
      return NextResponse.json({ error: "Clé API absente" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=fr-FR`,
      {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      }
    );

    console.log("📡 Réponse TMDB:", response.status, response.statusText);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erreur API TMDB" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("✅ Films reçus depuis TMDB :", data.results);

    return NextResponse.json(data.results);
  } catch (error) {
    console.error("❌ Erreur API TMDB:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
