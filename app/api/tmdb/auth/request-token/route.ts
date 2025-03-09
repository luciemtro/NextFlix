// api/tmdb/request-token/route.ts
// Cette route permet de récupérer un token de requête TMDB.
// Elle est utilisée pour initialiser l'authentification TMDB.
// Cette route est appelée par le composant LoginButton.

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const TMDB_API_KEY = process.env.TMDB_ACCESS_TOKEN;

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/token/new`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Impossible d'obtenir le token de requête TMDB");
    }

    const data = await response.json();
    return NextResponse.json({ request_token: data.request_token });
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
