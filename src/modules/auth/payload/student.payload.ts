import { Student } from '@models/Student';
import { UserLogin } from '@models/UserLogin';

import { IPayload } from './payload.base';

export class StudentPayload implements IPayload {
  id: number;
  username: string;
  role: string;
  userId: number;
  user: { id: number; name: string; };

  constructor({ id, username, role }: UserLogin) {
    this.id = id
    this.username = username
    this.role = role;

    (async () => {
      await this.getUserData()
      return this
    })
  }

  async getUserData() {
    const student = await Student.findByUserLogin(this.id, {
      isThrow: true,
      where: {
        isDeleted: false,
      }
    })

    this.user = {
      name: student.name,
      id: student.id
    }
  }
}