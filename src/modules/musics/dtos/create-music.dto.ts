import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateMusicDto {
  @ApiProperty({
    description: 'Music name',
    default: 'Lightbringer',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Music album',
    default: 'PENTAKILL',
    type: String,
  })
  @IsString()
  album: string;

  @ApiProperty({
    description: 'Artist name',
    default: 'Riot Games',
    type: String,
  })
  @IsString()
  artist: string;

  @ApiProperty({
    description: 'Music genre',
    default: 'Rock/Metal',
    type: String,
  })
  @IsString()
  genre: string;

  @ApiProperty({
    description: 'Music year',
    default: '2022',
    type: String,
  })
  @IsString()
  year: string;

  @ApiProperty({
    description: 'Image',
    default:
      'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcanaltech.com.br%2Fgames%2Flol-pentakill-retorna-com-novo-album-lost-chapter-193502%2F&psig=AOvVaw2ANOfH7vFMCilACVA4a0_-&ust=1691801365833000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJDpxq2x04ADFQAAAAAdAAAAABAE',
    type: String,
  })
  @IsOptional()
  @IsString()
  cover_image: string | null;

  @ApiProperty({
    description: 'Music url',
    default: 'music url...',
    type: String,
  })
  @IsOptional()
  @IsString()
  music_url: string | null;
}
