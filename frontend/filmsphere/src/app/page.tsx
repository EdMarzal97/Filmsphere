import { api } from "@/lib/api";
import Link from "next/link";
import { Movie } from "@/types/movie";
import { Actor } from "@/types/actor";

async function getMovies(): Promise<Movie[]> {
  const res = await api.get<Movie[]>("/movies");
  return res.data;
}

async function getActors(): Promise<Actor[]> {
  const res = await api.get<Actor[]>("/actors");
  return res.data;
}

export default async function HomePage() {
  const [movies, actors] = await Promise.all([getMovies(), getActors()]);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <section>
        <h1 className="text-2xl font-bold mb-4">Movies</h1>

        <ul className="space-y-3">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="border p-4 rounded hover:bg-gray-50 transition"
            >
              <Link
                href={`/movies/${movie.id}`}
                className="text-blue-600 font-semibold"
              >
                {movie.title}
              </Link>
              {movie.releaseYear && (
                <p className="text-sm text-gray-600">
                  Release year: {movie.releaseYear}
                </p>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h1 className="text-2xl font-bold mb-4">Actors</h1>

        <ul className="space-y-3">
          {actors.map((actor) => (
            <li
              key={actor.id}
              className="border p-4 rounded hover:bg-gray-50 transition"
            >
              <Link
                href={`/actors/${actor.id}`}
                className="text-blue-600 font-semibold"
              >
                {actor.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
