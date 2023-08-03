import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dtos/create-music.dto';
import { JwtauthGuard } from '../auth/jwt-auth.guard';

@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}

  @Post()
  @UseGuards(JwtauthGuard)
  async create(@Body() data: CreateMusicDto, @Request() req) {
    return await this.musicsService.create(data, req.user.id);
  }

  @Get()
  @UseGuards(JwtauthGuard)
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtauthGuard)
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(id);
  }
}
