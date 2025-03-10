// app/api/tmdb/movies/[id]/route.ts
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const movieId = params.id;

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos`,
      {
        headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
      }
    );

    if (!response.ok) {
      throw new Error("Erreur API TMDB");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur API TMDB :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
