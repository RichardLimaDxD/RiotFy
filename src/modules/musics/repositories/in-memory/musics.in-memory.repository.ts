import { CreateMusicDto } from '../../dtos/create-music.dto';
import { UpdateMusicDto } from '../../dtos/update-music.dto';
import { Music } from '../../entities/music.entity';
import { MusicsRepository } from '../musics.repository';

export class MusicsInMemoryRepository implements MusicsRepository {
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

  async update(id: string, data: UpdateMusicDto): Promise<Music> {
    const music = await this.database.findIndex((musics) => musics.id === id);

    const updateMusic = await { ...this.database[music], ...data };
    this.database[music] = updateMusic;
    return updateMusic;
  }

  async delete(id: string): Promise<void> {
    const music = this.database.findIndex((musics) => musics.id === id);

    await this.database.splice(music, 1);
  }
}
