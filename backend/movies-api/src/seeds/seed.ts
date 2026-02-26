import { DataSource } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { Rating } from '../entities/rating.entity';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Movie, Actor, Rating],
  synchronize: true,
});

async function seed() {
  await dataSource.initialize();

  try {
    // Clear tables safely
    await dataSource.query(
      `TRUNCATE TABLE rating, movie, actor RESTART IDENTITY CASCADE;`,
    );

    const actorRepo = dataSource.getRepository(Actor);
    const movieRepo = dataSource.getRepository(Movie);
    const ratingRepo = dataSource.getRepository(Rating);

    // Actors
    const elijahWood = actorRepo.create({ name: 'Elijah Wood' });
    const christopherLee = actorRepo.create({ name: 'Christopher Lee' });
    await actorRepo.save([elijahWood, christopherLee]);

    // Movies
    const starWars = movieRepo.create({
      title: 'The Star Wars Episode II',
      description: 'Sci-fi Epic',
      releaseYear: 2002,
      actors: [christopherLee],
    });

    const lotr = movieRepo.create({
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      description: 'Fantasy Epic',
      releaseYear: 2001,
      actors: [elijahWood, christopherLee],
    });

    await movieRepo.save([starWars, lotr]);

    // Ratings
    const rating1 = ratingRepo.create({
      score: 4,
      comment: 'Amazing movie',
      movie: starWars,
    });

    const rating2 = ratingRepo.create({
      score: 5,
      comment: 'A classic',
      movie: lotr,
    });

    await ratingRepo.save([rating1, rating2]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding failed', err);
  } finally {
    await dataSource.destroy();
  }
}

void seed();
