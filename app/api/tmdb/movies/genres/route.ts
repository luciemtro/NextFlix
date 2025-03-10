// api/tmdb/movies/genres/route.ts
// Cette route permet de récupérer les genres de films depuis l'API TMDB.
// Elle est utilisée par la page d'accueil pour afficher les films par genre.

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    if (!TMDB_ACCESS_TOKEN) {
      console.error("❌ Clé API TMDB absente !");
      return NextResponse.json({ error: "Clé API absente" }, { status: 500 });
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?language=fr-FR`,
      {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erreur API TMDB" },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data.genres);
  } catch (error) {
    console.error("❌ Erreur API TMDB:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
