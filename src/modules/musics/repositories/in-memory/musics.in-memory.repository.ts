import { CreateMusicDto } from '../../dtos/create-music.dto';
import { UpdateMusicDto } from '../../dtos/update-music.dto';
import { Music } from '../../entities/music.entity';
import { MusicsRepository } from '../musics.repository';

export class MusicsInMemoryRepository implements MusicsRepository {
  update(data: UpdateMusicDto, id: string): Promise<Music> {
    throw new Error('Method not implemented.');
  }
  private database: Music[] = [];

  async create(data: CreateMusicDto): Promise<Music> {
    const newMusic = new Music();
    Object.assign(newMusic, {
      ...data,
    });
    this.database.push(newMusic);

    return newMusic;
  }
  async findAll(): Promise<Music[]> {
    return this.database;
  }
  async findOne(id: string): Promise<Music> {
    const music = this.database.find((music) => music.id === id);
    return music;
  }

  async updateMusic(id: string, data: UpdateMusicDto): Promise<Music> {
    const musicIndex = this.database.findIndex((music) => music.id === id);

    const updatedMusic = { ...this.database[musicIndex], ...data };
    this.database[musicIndex] = updatedMusic;

    return updatedMusic;
  }

  async delete(id: string): Promise<void> {
    const music = this.database.findIndex((musics) => musics.id === id);

    await this.database.splice(music, 1);
  }
}
