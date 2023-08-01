import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dtos/create-music.dto';

@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}

  @Post()
  async create(@Body() data: CreateMusicDto) {
    return await this.musicsService.create(data);
  }

  @Get()
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(id);
  }
}
