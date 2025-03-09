# 🎬 NextFlix - Clone de Netflix avec TMDB

[![NextFlix](https://img.shields.io/badge/Next.js-Framework-blue)](https://nextjs.org/)
[![TMDB API](https://img.shields.io/badge/TMDB-API-green)](https://developer.themoviedb.org/docs)

🚀 **NextFlix** est une copie de **Netflix**, développée avec **Next.js** et utilisant **l'API The Movie Database (TMDB)** pour afficher des films, des séries et permettre aux utilisateurs de se connecter avec leur compte TMDB.

🔗 **Démo en ligne** : [nextflix-luciemtro.vercel.app](https://nextflix-luciemtro.vercel.app)

---

## 🎯 **Fonctionnalités**
✅ Interface inspirée de **Netflix** avec affichage des films et séries populaires.  
✅ **Authentification via TMDB** avec `session_id`.  
✅ **Ajout aux favoris** et **notation de films**.  
✅ **Gestion des utilisateurs en temps réel** sans rechargement de page.  

---

## 📌 **Authentification avec TMDB**
L'authentification utilise le système de **`session_id`** de TMDB pour permettre aux utilisateurs de gérer leurs favoris, noter des films et interagir avec leur compte TMDB.

### 🔄 **Processus d'authentification**
1️⃣ L'utilisateur clique sur **"Se connecter avec TMDB"**, ce qui génère un `request_token`.  
2️⃣ Il est redirigé vers **TMDB pour autoriser l'accès**.  
3️⃣ Une fois validé, TMDB renvoie un `request_token` qui est transformé en **`session_id`**.  
4️⃣ **Le `session_id` est stocké dans `localStorage`** et permet d'afficher l'état de connexion **sans recharger la page**.  

---

## 🔑 **Utilisation de l'API TMDB**
Une fois connecté, le **`session_id`** permet de faire des requêtes API personnalisées.

### ➕ **Ajouter un film aux favoris**
```ts
await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite?api_key=${apiKey}&session_id=${sessionId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ media_type: "movie", media_id: 550, favorite: true }),
});
```

### ⭐ **Noter un film**
```ts
await fetch(`https://api.themoviedb.org/3/movie/550/rating?api_key=${apiKey}&session_id=${sessionId}`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ value: 8.5 }),
});

```

### 📌 **Récupérer les films favoris**
```ts
await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}`)
});
```

## 🎬 **Aperçu du Projet**
🔗 **Voir la démo ici** : [NextFlix](https://nextflix-luciemtro.vercel.app)

---

## 📜 **Documentation**
- 📘 **API TMDB** : [developer.themoviedb.org](https://developer.themoviedb.org/docs)  
- 📘 **Next.js** : [nextjs.org/docs](https://nextjs.org/docs)  

---

## 🤝 **Contribuer**
🎉 **Les PRs sont les bienvenues !**  
Si tu veux proposer des améliorations ou corriger des bugs, **forke le repo et ouvre une pull request !** 🚀  

