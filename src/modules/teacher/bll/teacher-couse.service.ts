import { DmCourse } from '@models/DmCourse';
import { Teacher } from '@models/Teacher';
import { TeacherCourse } from '@models/TeacherCourse';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';

@Injectable()
export class TeacherCourseService {

  /**
   * create teacher what course is he/she lecture
   * @param dto 
   * @param transaction 
   */
  async create(dto: { teacherId: number, courseId: number }, transaction?: Transaction) {

    const [teacher, course] = await Promise.all([
      /** find teacher */
      Teacher.findById(dto.teacherId, { isThrow: true }),
      /** find course */
      DmCourse.findById(dto.courseId, { isThrow: true }),
    ])

    await TeacherCourse.create({
      teacherId: dto.teacherId,
      courseId: dto.courseId,
    }, { transaction })

    return { ...teacher.toJSON(), course }
  }
}
