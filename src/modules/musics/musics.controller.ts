import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dtos/create-music.dto';
import { JwtauthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UpdateMusicDto } from './dtos/update-music.dto';

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
  async findAll() {
    return await this.musicsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.musicsService.findOne(id);
  }

  @Patch('upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
  )
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  async upload(
    @Request() req,
    @UploadedFiles()
    files: { cover_image: Express.Multer.File[]; music: Express.Multer.File[] },
    @Param('id') id: string,
  ) {
    const admin = req.user.admin;

    if (admin === false) {
      throw new ForbiddenException('Insufficient permission');
    }

    const { cover_image, music } = files;
    return this.musicsService.update(cover_image[0], music[0], id);
  }

  @Patch(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  async updateMusic(
    @Param('id') id: string,
    @Body() updateMusicDto: UpdateMusicDto,
    @Request() req,
  ) {
    const admin = req.user.admin;

    if (admin === false) {
      throw new ForbiddenException('Insufficient permission');
    }

    return await this.musicsService.updateMusic(id, updateMusicDto);
  }

  @Delete(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  remove(@Request() req, @Param('id') id: string) {
    return this.musicsService.remove(id, req.user.admin);
  }
}
