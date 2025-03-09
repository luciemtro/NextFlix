"use client";

import { useEffect, useState } from "react";
import { redirectToTMDBAuth } from "@/lib/tmdbAuth";

export default function LoginButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const sessionId = localStorage.getItem("tmdb_session_id");
      setIsLoggedIn(!!sessionId);
    };

    checkLogin();

    // Écoute les événements de connexion/déconnexion pour mettre à jour le bouton de connexion
    window.addEventListener("storage", checkLogin);
    window.addEventListener("tmdb-login", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("tmdb-login", checkLogin);
    };
  }, []);

  function logout() {
    localStorage.removeItem("tmdb_session_id");
    setIsLoggedIn(false);

    // Déclenche un event pour informer React que l'utilisateur s'est déconnecté
    window.dispatchEvent(new Event("tmdb-login"));
  }

  return (
    <button
      onClick={isLoggedIn ? logout : redirectToTMDBAuth}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
    >
      {isLoggedIn ? "Se déconnecter" : "Se connecter avec TMDB"}
    </button>
  );
}
