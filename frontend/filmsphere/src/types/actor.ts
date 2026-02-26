import { Movie } from "./movie";

export interface Actor {
  id: number;
  name: string;
  movies: Movie[];
}
