import { CreateMusicDto } from '../dtos/create-music.dto';
import { UpdateMusicDto } from '../dtos/update-music.dto';
import { Music } from '../entities/music.entity';

export abstract class MusicsRepository {
  abstract create(
    data: CreateMusicDto,
    userId: string,
    isAdmin: boolean,
  ): Promise<Music>;
  abstract findAll(): Promise<Music[]>;
  abstract findOne(id: string): Promise<Music>;
  abstract update(data: UpdateMusicDto, id: string): Promise<Music>;
  abstract updateMusic(id: string, data: UpdateMusicDto): Promise<Music>;
  abstract delete(id: string, isAdmin: boolean): Promise<void>;
}
