import axios from "axios";
import { Actor } from "@/types/actor";
import { Movie } from "@/types/movie";

async function getActor(id: string): Promise<Actor> {
  const res = await axios.get<Actor>(
    `${process.env.NEXT_PUBLIC_API_URL}/actors/${id}`,
  );
  return res.data;
}

async function getMoviesByActor(id: string): Promise<Movie[]> {
  const res = await axios.get<Movie[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/actors/${id}/movies`,
  );
  return res.data;
}

export default async function ActorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [actor, movies] = await Promise.all([
    getActor(id),
    getMoviesByActor(id),
  ]);

  return (
    <main className="p-6 max-w-4xl mx-auto text-black">
      <h1 className="text-2xl font-bold">{actor.name}</h1>

      <section className="mt-6">
        <h2 className="font-semibold text-lg">Movies</h2>

        {movies.length === 0 ? (
          <p className="mt-2">No movies found</p>
        ) : (
          <ul className="list-disc ml-6">
            {movies.map((movie) => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
