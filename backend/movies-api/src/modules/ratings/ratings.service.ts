import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from '../../entities/rating.entity';
import { Movie } from '../../entities/movie.entity';
import { CreateRatingDto } from '../../dto/ratings/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findByMovie(movieId: number) {
    return this.ratingRepository.find({
      where: {
        movie: { id: movieId },
      },
    });
  }

  async findOne(id: number) {
    const rating = await this.ratingRepository.findOne({
      where: { id },
      relations: ['movie'],
    });

    if (!rating) {
      throw new NotFoundException('Rating not found');
    }

    return rating;
  }

  async create(dto: CreateRatingDto): Promise<Rating> {
    const movie = await this.movieRepository.findOne({
      where: { id: dto.movieId },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const rating = this.ratingRepository.create({
      score: dto.score,
      comment: dto.comment,
      movie,
    });

    return this.ratingRepository.save(rating);
  }

  async remove(id: number): Promise<void> {
    const result = await this.ratingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Rating not found');
    }
  }
}
