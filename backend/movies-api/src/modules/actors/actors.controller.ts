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
import { ActorsService } from './actors.service';
import { CreateActorDto } from '../../dto/actors/create-actor.dto';
import { UpdateActorDto } from '../../dto/actors/update-actor.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('actors')
export class ActorsController {
  constructor(private readonly actorsService: ActorsService) {}

  @Get()
  findAll(@Query('q') q?: string) {
    return this.actorsService.findAll(q);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.actorsService.findOne(id);
  }

  @Get(':id/movies')
  getMoviesByActor(@Param('id') id: number) {
    return this.actorsService.findMoviesByActor(Number(id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() dto: CreateActorDto) {
    return this.actorsService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateActorDto) {
    return this.actorsService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.actorsService.remove(id);
  }
}
