import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    default: 'mordekaiser',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'User email',
    default: 'mordekaiser@mail.com',
    type: String,
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Is admin user',
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsOptional()
  admin?: boolean;

  @ApiProperty({
    description: 'Password user',
    default: '12345678',
    type: String,
  })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
