import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  test(): IUser[] {
    return [];
  }

  findAll(): IUser[] {
    const rawData = fs.readFileSync('data/users.json', 'utf-8');

    return JSON.parse(rawData) as IUser[];
  }

  findOne(id: string, fields?: string): Partial<IUser> {
    const users = this.findAll();

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException();
    }

    if (!fields) {
      return user;
    }

    const fieldsArray = fields.split(',');

    const filterUser: Partial<IUser> = {};

    fieldsArray.forEach((field) => {
      const key = field.trim() as keyof IUser;

      if (user[key] !== undefined) {
        filterUser[key] = user[key];
      }
    });
    return filterUser;
  }
}
