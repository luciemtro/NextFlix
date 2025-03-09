export async function getTMDBRequestToken() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`
  );

  const data = await response.json();
  if (!data.success) {
    throw new Error("Impossible d'obtenir le token de requête TMDB");
  }

  return data.request_token;
}

export async function redirectToTMDBAuth() {
  const requestToken = await getTMDBRequestToken();
  window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${window.location.origin}/tmdb-callback`;
}
