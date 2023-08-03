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
  @IsString()
  cover_image: string | null;

  @IsOptional()
  @IsString()
  music_url: string | null;
}
