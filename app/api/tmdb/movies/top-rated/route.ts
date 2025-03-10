// api/tmdb/movies/top-rated/route.ts
// Cette route permet de récupérer les films les mieux notés.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language } = await req.json();

    if (!language) {
      console.error("❌ Langue manquante dans la requête !");
      return NextResponse.json({ error: "Langue requise" }, { status: 400 });
    }

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    if (!TMDB_ACCESS_TOKEN) {
      console.error("❌ TMDB_ACCESS_TOKEN est vide !");
      return NextResponse.json(
        { error: "Clé API TMDB absente" },
        { status: 500 }
      );
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=${language}`,
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
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("❌ Erreur API TMDB:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
