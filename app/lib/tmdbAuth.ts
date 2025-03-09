// lib/tmdbAuth.ts
// Cette fonction permet de récupérer un token de requête TMDB.
// Elle est utilisée pour initialiser l'authentification TMDB.
// Cette fonction est appelée par le composant LoginButton.

export async function getTMDBRequestToken() {
  const response = await fetch("/api/tmdb/auth/request-token");
  const data = await response.json();

  if (!response.ok || !data.request_token) {
    throw new Error("Impossible d'obtenir le token de requête TMDB");
  }

  return data.request_token;
}

export async function redirectToTMDBAuth() {
  const requestToken = await getTMDBRequestToken();
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/tmdb-callback`;
}
