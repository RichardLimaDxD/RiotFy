import { UpdateMusicDto } from './dtos/update-music.dto';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMusicDto } from './dtos/create-music.dto';
import { MusicsRepository } from './repositories/musics.repository';

@Injectable()
export class MusicsService {
  constructor(private musicsRepository: MusicsRepository) {}
  async create(data: CreateMusicDto, userId: string, isAdmin: boolean) {
    if (isAdmin === false) {
      throw new UnauthorizedException('Only admins can create songs');
    }

    return await this.musicsRepository.create(data, userId, isAdmin);
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

  async update(id: string, updateMusicDto: UpdateMusicDto, isAdmin: boolean) {
    const findMusic = await this.musicsRepository.findOne(id);

    if (isAdmin === false) {
      throw new ForbiddenException('Insufficient permission');
    }

    if (!findMusic) {
      throw new NotFoundException('Music not found!');
    }

    return this.musicsRepository.update(id, updateMusicDto, isAdmin);
  }

  async remove(id: string, isAdmin: boolean) {
    const findMusic = await this.musicsRepository.findOne(id);

    if (isAdmin === false) {
      throw new ForbiddenException('Insufficient permission');
    }

    if (!findMusic) {
      throw new NotFoundException('Music not found!');
    }

    return this.musicsRepository.delete(id, isAdmin);
  }
}
