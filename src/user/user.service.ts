import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  test(): IUser[] {
    return [];
  }

  async findAll(): IUser[] {
    const rawData = fs.readFileSync('data/users.json', 'utf-8');

    return JSON.parse(rawData) as IUser[];
  }
}
