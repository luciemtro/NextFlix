// api/tmdb/tv/popular/route.ts
// Cette route permet de récupérer les séries populaires.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language } = await req.json();

    if (!language) {
      return NextResponse.json({ error: "Langue requise" }, { status: 400 });
    }

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    const response = await fetch(
      `https://api.themoviedb.org/3/tv/popular?language=${language}`,
      {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur API TMDB");
    }

    const data = await response.json();
    return NextResponse.json(data.results);
  } catch (error) {
    console.error("Erreur API TMDB :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
