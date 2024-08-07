import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './repositories/users.repository';
import { UserPrismaRepository } from './repositories/prisma/users.prisma.repository';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
