import { UserRole } from '@constants/app';
import { IStudentCreateAttr, Student } from '@models/Student';
import { IUserLoginCreateAttr, UserLogin } from '@models/UserLogin';
import { Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { Transaction } from 'sequelize/types';

@Injectable()
export class StudentService {

  /**
   * create stundent data and account
   * @param param0
   * @param transaction1
   */
  async create({ account: accountDTO, ...studentDTO }:
    Omit<IStudentCreateAttr, 'userLoginId'> & { account: Omit<IUserLoginCreateAttr, | 'role'> }, transaction1?: Transaction) {

    return await DB.transaction(async (transaction2) => {

      const transaction = transaction1 || transaction2

      const userLogin = await UserLogin.create({
        role: UserRole.SISWA,
        ...accountDTO,
      }, { transaction })

      const student = await Student.create({ ...studentDTO, userLoginId: userLogin.id }, { transaction })

      return { ...student.toJSON(), account: userLogin }
    })
  }
}
