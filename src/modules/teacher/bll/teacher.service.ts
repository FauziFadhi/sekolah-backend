import { UserRole } from '@constants/app';
import { ITeacherCreateAttr, Teacher } from '@models/Teacher';
import { TeacherCourse } from '@models/TeacherCourse';
import { IUserLoginCreateAttr, UserLogin } from '@models/UserLogin';
import { Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { Transaction } from 'sequelize/types';

@Injectable()
export class TeacherService {

  constructor(
  ) {

  }

  /**
   * create stundent data and account
   * @param param0
   * @param transaction1
   */
  async create({ account: accountDTO, ...studentDTO }:
    Omit<ITeacherCreateAttr, 'userLoginId'> & { account: Omit<IUserLoginCreateAttr, | 'role'> }, transaction1?: Transaction) {

    return await DB.transaction(async (transaction2) => {

      const transaction = transaction1 || transaction2

      const userLogin = await UserLogin.create({
        role: UserRole.GURU,
        ...accountDTO,
      }, { transaction })

      const teacher = await Teacher.create({ ...studentDTO, userLoginId: userLogin.id }, { transaction })

      return { ...teacher.toJSON(), account: userLogin }
    })
  }

  /**
   * delete student and its account
   */
  async delete(id: number, transaction1?: Transaction) {
    const teacher = await Teacher.findById(id, { isThrow: true, where: { isDeleted: false } })

    return await DB.transaction(async (transaction2) => {
      const transaction = transaction1 || transaction2

      await Promise.all([
        /* delete teacher */
        teacher.update({ isDeleted: true }, { transaction }),

        /* delete teacher course */
        TeacherCourse.destroy({ where: { teacherId: teacher.id }, transaction }),

        /* delete teacher teacher account */
        UserLogin.update({ isDeleted: true }, { where: { id: teacher.userLoginId }, transaction }),
      ])


    })
  }
}
