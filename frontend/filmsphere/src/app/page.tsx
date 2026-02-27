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
    <div className="p-6 max-w-4xl mx-auto space-y-10 text-black">
      <SearchInput />

      <section>
        <h2 className="text-2xl font-bold mb-4">Movies</h2>

        {movies.length === 0 ? (
          <p className="font-semibold">No movies available.</p>
        ) : (
          <ul className="space-y-3">
            {movies.map((movie) => (
              <li key={movie.id} className="py-4">
                <Link href={`/movies/${movie.id}`} className="font-semibold">
                  {movie.title}
                </Link>

                {movie.releaseYear && (
                  <p className="">Release year: {movie.releaseYear}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Actors</h2>

        {actors.length === 0 ? (
          <p className="font-semibold">No actors available.</p>
        ) : (
          <ul className="space-y-3">
            {actors.map((actor) => (
              <li key={actor.id} className="py-4">
                <Link href={`/actors/${actor.id}`} className="font-semibold">
                  {actor.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
