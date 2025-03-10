import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { genreId, language = "fr-FR" } = await req.json();

    if (!genreId) {
      return NextResponse.json({ error: "Genre ID requis" }, { status: 400 });
    }

    const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
    if (!TMDB_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Clé API TMDB absente" },
        { status: 500 }
      );
    }

    const [moviesRes, tvRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=${language}`,
        {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
        }
      ),
      fetch(
        `https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&language=${language}`,
        {
          headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
        }
      ),
    ]);

    if (!moviesRes.ok || !tvRes.ok) {
      throw new Error(`Erreur API TMDB`);
    }

    const movies = await moviesRes.json();
    const tvShows = await tvRes.json();

    return NextResponse.json([...movies.results, ...tvShows.results]); // ✅ On mélange tout
  } catch (error) {
    console.error("❌ Erreur API TMDB:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
