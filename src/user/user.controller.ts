import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from './user.interface';

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
}
