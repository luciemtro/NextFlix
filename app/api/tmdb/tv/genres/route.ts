// api/tmdb/tv/genres/route.ts
// Cette route récupère la liste des genres TV depuis TMDB.

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    if (!TMDB_ACCESS_TOKEN) {
      console.error("❌ TMDB_ACCESS_TOKEN est vide !");
      return NextResponse.json(
        { error: "Clé API TMDB absente" },
        { status: 500 }
      );
    }

    console.log("📡 Récupération des genres TV depuis TMDB...");

    const response = await fetch(
      `https://api.themoviedb.org/3/genre/tv/list?language=fr-FR`,
      {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      }
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error(`❌ Erreur API TMDB: ${response.status} - ${errorMessage}`);
      return NextResponse.json(
        { error: `Erreur API TMDB: ${errorMessage}` },
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
