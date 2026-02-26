import Link from "next/link";
import { api } from "@/lib/api";
import { Movie } from "@/types/movie";
import { Actor } from "@/types/actor";
import { SearchInput } from "@/components/SearchInput";

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

async function getMovies(query?: string): Promise<Movie[]> {
  const res = await api.get<Movie[]>("/movies", {
    params: { q: query },
  });
  return res.data;
}

async function getActors(query?: string): Promise<Actor[]> {
  const res = await api.get<Actor[]>("/actors", {
    params: { q: query },
  });
  return res.data;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = q ?? "";

  const [movies, actors] = await Promise.all([
    getMovies(query),
    getActors(query),
  ]);

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-10">
      <SearchInput />

      <section>
        <h2 className="text-2xl font-bold mb-4">Movies</h2>
        <ul className="space-y-3">
          {movies.map((movie) => (
            <li key={movie.id} className="border p-4 rounded">
              <Link
                href={`/movies/${movie.id}`}
                className="text-blue-600 font-semibold"
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Actors</h2>
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
      </section>
    </main>
  );
}
