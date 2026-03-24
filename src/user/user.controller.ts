import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  gettest() {
    return this.userService.test();
  }

  @Get()
  fildAll(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Query('fields') fields?: string) {
    return this.userService.findOne(id, fields);
  }

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
