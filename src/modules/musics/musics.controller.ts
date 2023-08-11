import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dtos/create-music.dto';
import { JwtauthGuard } from '../auth/jwt-auth.guard';
import { UpdateMusicDto } from './dtos/update-music.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Musics')
@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}

  @Post()
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  async create(@Body() data: CreateMusicDto, @Request() req) {
    return await this.musicsService.create(data, req.user.id, req.user.admin);
  }

  @Get()
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
  ) {
    return this.musicsService.update(id, updateMusicDto, req.user.admin);
  }

  @Delete(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  remove(@Request() req, @Param('id') id: string) {
    return this.musicsService.remove(id, req.user.admin);
  }
}
