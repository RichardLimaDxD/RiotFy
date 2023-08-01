import { Module } from '@nestjs/common';
import { MusicsModule } from './modules/musics/musics.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [MusicsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
