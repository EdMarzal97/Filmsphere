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
    const danielRadcliffe = actorRepo.create({ name: 'Daniel Radcliffe' });
    const timotheeChalamet = actorRepo.create({ name: 'Timothée Chalamet' });
    const daveBautista = actorRepo.create({ name: 'Dave Bautista' });
    await actorRepo.save([
      elijahWood,
      christopherLee,
      danielRadcliffe,
      timotheeChalamet,
      daveBautista,
    ]);

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

    const harryPotter1 = movieRepo.create({
      title: "Harry Potter and the Sorcerer's Stone",
      description: 'Fantasy',
      releaseYear: 2001,
      actors: [danielRadcliffe],
    });

    const dune1 = movieRepo.create({
      title: 'Dune: Part One',
      description: 'Sci-Fi',
      releaseYear: 2021,
      actors: [timotheeChalamet, daveBautista],
    });

    await movieRepo.save([starWars, lotr, harryPotter1, dune1]);

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

    const rating3 = ratingRepo.create({
      score: 4,
      comment: 'Incredible movie',
      movie: lotr,
    });

    const rating4 = ratingRepo.create({
      score: 4,
      comment: 'Amazing for all the family',
      movie: harryPotter1,
    });

    const rating5 = ratingRepo.create({
      score: 5,
      comment: 'Revival of a classic',
      movie: dune1,
    });

    const rating6 = ratingRepo.create({
      score: 4,
      comment: 'A good adaptation of the book after years',
      movie: dune1,
    });

    await ratingRepo.save([
      rating1,
      rating2,
      rating3,
      rating4,
      rating5,
      rating6,
    ]);

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding failed', err);
  } finally {
    await dataSource.destroy();
  }
}

void seed();
