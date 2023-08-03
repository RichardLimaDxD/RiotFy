import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { MusicsRepository } from './repositories/musics.repository';

@Injectable()
export class MusicsService {
  constructor(private musicsRepository: MusicsRepository) {}
  async create(data: CreateMusicDto, userId: string) {
    return await this.musicsRepository.create(data, userId);
  }

  async findAll() {
    return await this.musicsRepository.findAll();
  }

  async findOne(id: string) {
    const music = await this.musicsRepository.findOne(id);
    if (!music) {
      throw new NotFoundException('Music not found!');
    }
    return music;
  }
}
