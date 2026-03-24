import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs/promises';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  test(): IUser[] {
    return [];
  }

  async findAll(): Promise<IUser[]> {
    const rawData = await fs.readFile('./data/users.json', 'utf-8');

    return JSON.parse(rawData) as IUser[];
  }
}
