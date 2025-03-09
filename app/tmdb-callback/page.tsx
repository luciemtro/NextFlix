"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TMDBCallback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function handleCallback() {
      const urlParams = new URLSearchParams(window.location.search);
      const requestToken = urlParams.get("request_token");
      const approved = urlParams.get("approved");

      if (!requestToken || approved !== "true") {
        setError("Authentification TMDB refusée.");
        setLoading(false);
        return;
      }

      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

        // Demande le `session_id` à l'api TMDB, il faut créer un compte et être connecté sur TMDB pour que ça fonctionne
        const response = await fetch(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ request_token: requestToken }),
          }
        );

        const data = await response.json();
        if (!data.success) {
          throw new Error("Échec de la création de la session TMDB");
        }
        localStorage.setItem("tmdb_session_id", data.session_id);
        // Déclenche un event pour informer React que l'auth a changé sinon le bouton de connexion ne se mettra pas à jour
        window.dispatchEvent(new Event("tmdb-login"));
        router.push("/");
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Une erreur inconnue est survenue.");
        }
      } finally {
        setLoading(false);
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading ? (
        <p>Connexion en cours...</p>
      ) : error ? (
        <p>Erreur: {error}</p>
      ) : null}
    </div>
  );
}
