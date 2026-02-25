import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../entities/movie.entity';
import { Actor } from '../../entities/actor.entity';
import { CreateMovieDto } from '../../dto/movies/create-movie.dto';
import { UpdateMovieDto } from '../../dto/movies/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['actors', 'ratings'] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['actors', 'ratings'],
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const movie = this.movieRepository.create({
      title: dto.title,
      description: dto.description,
      releaseYear: dto.releaseYear,
    });

    if (dto.actorIds?.length) {
      movie.actors = await this.actorRepository.findByIds(dto.actorIds);
    }

    return this.movieRepository.save(movie);
  }

  async update(id: number, dto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);

    Object.assign(movie, dto);

    if (dto.actorIds) {
      movie.actors = await this.actorRepository.findByIds(dto.actorIds);
    }

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const result = await this.movieRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Movie not found');
    }
  }
}
