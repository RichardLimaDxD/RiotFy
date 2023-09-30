import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findByEmail(
      createUserDto.email,
    );

    if (findUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersRepository.create(createUserDto);

    return user;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User not found!');
    }

    return findUser;
  }

  async findByEmail(email: string) {
    const findUser = await this.usersRepository.findByEmail(email);

    return findUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto, userId: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (id !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }

    if (!findUser) {
      throw new NotFoundException('User not found!');
    }

    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string, userId: string) {
    const findUser = await this.usersRepository.findOne(id);

    if (id !== userId) {
      throw new ForbiddenException('Insufficient permission');
    }

    if (!findUser) {
      throw new NotFoundException('User not found!');
    }

    return this.usersRepository.delete(id);
  }
}
