import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtauthGuard } from '../auth/jwt-auth.guard';
import { UserDecorator } from '../auth/decorators/userRetrieve.decorator';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  findOne(@UserDecorator() user: User) {
    return this.usersService.findOne(user.id);
  }

  @Patch(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtauthGuard)
  @ApiBearerAuth()
  remove(@Request() req, @Param('id') id: string) {
    return this.usersService.remove(id, req.user.id);
  }
}
