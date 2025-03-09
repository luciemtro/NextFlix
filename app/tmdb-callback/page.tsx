"use client";

// tmdb-callback/page.tsx
// Cette page gère le callback de l'authentification avec TMDB
// Elle récupère le token de session et le stocke dans le localStorage
// Elle redirige ensuite l'utilisateur vers la page d'accueil

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
        const response = await fetch("/api/tmdb/auth/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ request_token: requestToken }),
        });

        const data = await response.json();
        if (!response.ok || !data.session_id) {
          throw new Error("Échec de la création de la session TMDB");
        }

        localStorage.setItem("tmdb_session_id", data.session_id);
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
        <p className="text-red-500">Erreur: {error}</p>
      ) : null}
    </div>
  );
}
