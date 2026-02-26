import { Actor } from "./actor";
import { Rating } from "./rating";

export interface Movie {
  id: number;
  title: string;
  description: string;
  releaseYear: number;
  actors: Actor[];
  ratings: Rating[];
}
