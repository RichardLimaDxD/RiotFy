import { IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @IsString()
  name: string;

  @IsString()
  album: string;

  @IsString()
  artist: string;

  @IsString()
  genre: string;

  @IsString()
  year: string;

  @IsOptional()
  cover_image: string | null;

  @IsOptional()
  music_url: string | null;

  @IsString()
  user_id: string;
}
