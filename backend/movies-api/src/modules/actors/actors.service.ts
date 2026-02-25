import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../../entities/actor.entity';
import { CreateActorDto } from '../../dto/actors/create-actor.dto';
import { UpdateActorDto } from '../../dto/actors/update-actor.dto';

@Injectable()
export class ActorsService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}

  async findMoviesByActor(actorId: number) {
    const actor = await this.actorRepository.findOne({
      where: { id: actorId },
      relations: ['movies'], // ✅ works even if JoinTable is on Movie
    });

    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    return actor.movies;
  }

  async findAll(search?: string) {
    const query = this.actorRepository.createQueryBuilder('actor');

    if (search) {
      query.where('LOWER(actor.name) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }

  async findOne(id: number): Promise<Actor> {
    const actor = await this.actorRepository.findOne({
      where: { id },
      relations: ['movies'],
    });

    if (!actor) {
      throw new NotFoundException('Actor not found');
    }

    return actor;
  }

  create(dto: CreateActorDto): Promise<Actor> {
    const actor = this.actorRepository.create(dto);
    return this.actorRepository.save(actor);
  }

  async update(id: number, dto: UpdateActorDto): Promise<Actor> {
    const actor = await this.findOne(id);
    Object.assign(actor, dto);
    return this.actorRepository.save(actor);
  }

  async remove(id: number): Promise<void> {
    const result = await this.actorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Actor not found');
    }
  }
}
