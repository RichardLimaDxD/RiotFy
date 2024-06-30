import { BadRequestException, Module } from '@nestjs/common';
import { MusicsController } from './musics.controller';
import { MusicsService } from './musics.service';
import { MusicsRepository } from './repositories/musics.repository';
import { MusicsPrismaRepository } from './repositories/prisma/musics.prisma.repository';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PrismaService } from '../../database/prisma.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './tmp',
        filename: (_, file, cb) => {
          cb(null, file.originalname);
        },
      }),
      fileFilter: (_, file, cb) => {
        if (
          file.mimetype === 'image/jpeg' ||
          file.mimetype === 'image/webp' ||
          file.mimetype === 'audio/mpeg'
        ) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException('Only jpeg && webp format allowed'),
            false,
          );
        }
      },
    }),
  ],
  controllers: [MusicsController],
  providers: [
    MusicsService,
    PrismaService,
    {
      provide: MusicsRepository,
      useClass: MusicsPrismaRepository,
    },
  ],
})
export class MusicsModule {}
