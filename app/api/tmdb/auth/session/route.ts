// api/tmdb/session/route.ts
// Cette route permet de créer une session TMDB.
// Elle est appelée par la page TMDBCallback.

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { request_token } = await req.json();

    if (!request_token) {
      return NextResponse.json(
        { error: "Token de requête manquant" },
        { status: 400 }
      );
    }

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN; // ✅ La bonne variable d'environnement

    const response = await fetch(
      `https://api.themoviedb.org/3/authentication/session/new`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, // ✅ Utilisation correcte
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ request_token }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error("Échec de la création de la session TMDB");
    }

    return NextResponse.json({ session_id: data.session_id });
  } catch (error) {
    console.error("Erreur lors de la création de la session TMDB :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
