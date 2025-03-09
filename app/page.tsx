import PopularMovies from "./components/movies/popular/PopularMovies";
import NowPlaying from "./components/movies/now-playing/NowPlayingMovies";
import TopRatedMovies from "./components/movies/top-rated/TopRatedMovies";
import UpcomingMovies from "./components/movies/upcoming/UpcomingMovies";

export default function Home() {
  return (
    <main>
      <PopularMovies />
      <NowPlaying />
      <TopRatedMovies />
      <UpcomingMovies />
    </main>
  );
}
