import axios from "axios";
import { Movie } from "@/types/movie";

async function getMovie(id: string): Promise<Movie> {
  const res = await axios.get<Movie>(
    `${process.env.NEXT_PUBLIC_API_URL}/movies/${id}`,
  );

  return res.data;
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = await getMovie(id);

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{movie.title}</h1>

      {movie.description && (
        <p className="text-gray-700 mt-2">{movie.description}</p>
      )}

      {movie.releaseYear && (
        <p className="text-sm text-gray-500">
          Release year: {movie.releaseYear}
        </p>
      )}

      <section className="mt-6">
        <h2 className="font-semibold text-lg">Actors</h2>
        <ul className="list-disc ml-6">
          {movie.actors.map((actor) => (
            <li key={actor.id}>{actor.name}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="font-semibold text-lg">Ratings</h2>
        <ul className="space-y-2">
          {movie.ratings.map((rating) => (
            <li key={rating.id}>
              ⭐ {rating.score}
              {rating.comment && ` — ${rating.comment}`}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
