import Link from "next/link";
import { api } from "@/lib/api";
import { Movie } from "@/types/movie";
import { Actor } from "@/types/actor";
import { SearchInput } from "@/components/SearchInput";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

async function getMovies(query?: string): Promise<Movie[]> {
  try {
    const res = await api.get<Movie[]>("/movies", {
      params: { q: query },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

async function getActors(query?: string): Promise<Actor[]> {
  try {
    const res = await api.get<Actor[]>("/actors", {
      params: { q: query },
    });
    return res.data;
  } catch (error) {
    console.error("Failed to fetch actors:", error);
    return [];
  }
}

export default async function HomePage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  const results = await Promise.allSettled([
    getMovies(query),
    getActors(query),
  ]);

  const movies = results[0].status === "fulfilled" ? results[0].value : [];

  const actors = results[1].status === "fulfilled" ? results[1].value : [];

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <SearchInput />

      <section>
        <h2 className="text-2xl font-bold mb-4">Movies</h2>

        {movies.length === 0 ? (
          <p className="text-gray-500">No movies available.</p>
        ) : (
          <ul className="space-y-3">
            {movies.map((movie) => (
              <li key={movie.id} className="border p-4 rounded">
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
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Actors</h2>

        {actors.length === 0 ? (
          <p className="text-gray-500">No actors available.</p>
        ) : (
          <ul className="space-y-3">
            {actors.map((actor) => (
              <li key={actor.id} className="border p-4 rounded">
                <Link
                  href={`/actors/${actor.id}`}
                  className="text-blue-600 font-semibold"
                >
                  {actor.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
