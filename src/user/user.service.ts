import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import { IUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  test(): IUser[] {
    return [];
  }

  findAll(): IUser[] {
    const rawData = fs.readFileSync('data/users.json', 'utf-8');

    return JSON.parse(rawData) as IUser[];
  }

  findOne(id: string, fields?: string | string[]): Partial<IUser> {
    const users = this.findAll();

    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('Not Found');
    }

    if (!fields) {
      return user;
    }

    const fieldsArray = Array.isArray(fields) ? fields : fields.split(',');

    const filterUser: Partial<IUser> = {};

    fieldsArray.forEach((field) => {
      const key = field.trim() as keyof IUser;

      if (user[key] !== undefined) {
        filterUser[key] = user[key];
      }
    });
    return filterUser;
  }

  create(dto: CreateUserDto): IUser {
    const users = this.findAll();

    // 2. คำนวณหา ID ล่าสุด เพื่อบวก 1 เป็น ID ใหม่ (แปลง string เป็น number ก่อนหา max)
    const maxId =
      users.length > 0 ? Math.max(...users.map((u) => parseInt(u.id, 10))) : 0;
    const newId = (maxId + 1).toString(); // แปลงกลับเป็น String ให้ตรงกับ Interface

    // 3. สร้าง Object ผู้ใช้งานคนใหม่
    const newUser: IUser = {
      id: newId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      username: dto.username,
    };

    // 4. เอาคนใหม่ดันเข้า Array ไปรวมกับคนเก่า
    users.push(newUser);

    // 5. เขียน Array ก้อนใหม่นี้ทับลงไปในไฟล์ users.json (ใช้ JSON.stringify จัดฟอร์แมตให้สวยงาม)
    fs.writeFileSync(
      'data/users.json',
      JSON.stringify(users, null, 2),
      'utf-8',
    );

    // 6. เสิร์ฟข้อมูลคนใหม่ที่เพิ่งสร้างเสร็จกลับไปให้หน้าร้าน
    return newUser;
  }
}
