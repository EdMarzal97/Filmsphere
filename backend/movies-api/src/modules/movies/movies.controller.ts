import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from '../../dto/movies/create-movie.dto';
import { UpdateMovieDto } from '../../dto/movies/update-movie.dto';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(@Query('q') q?: string) {
    return this.moviesService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.findOne(id);
  }

  @Get(':id/actors')
  getActorsByMovie(@Param('id') id: number) {
    return this.moviesService.findActorsByMovie(Number(id));
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.moviesService.create(dto);
  }

  @UseGuards(ApiKeyGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMovieDto) {
    return this.moviesService.update(id, dto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.remove(id);
  }
}
