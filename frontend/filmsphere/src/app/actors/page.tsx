import { api } from "@/lib/api";
import Link from "next/link";
import { Actor } from "@/types/actor";

async function getActors(): Promise<Actor[]> {
  const res = await api.get<Actor[]>("/actors");
  return res.data;
}

export default async function ActorsPage() {
  const actors = await getActors();

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Actors</h1>

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
    </main>
  );
}
