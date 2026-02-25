import {
  Controller,
  Post,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from '../../dto/ratings/create-rating.dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body() dto: CreateRatingDto) {
    return this.ratingsService.create(dto);
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ratingsService.remove(id);
  }
}
