import { DmCourse } from '@models/DmCourse';
import { TeacherCourse } from '@models/TeacherCourse';
import { Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { TeacherCourseService } from 'modules/cms/teacher/bll/teacher-couse.service';
import { Transaction } from 'sequelize/types';

@Injectable()
export class CourseService {

  constructor(
    private readonly teacherCourseService: TeacherCourseService,
  ) {

  }

  /**
   * delete course and straight to delete teacher course
   * @param courseId 
   * @param transaction1 
   */
  async delete(courseId: number, transaction1?: Transaction) {
    const course = await DmCourse.findById(courseId, {
      isThrow: true,
    });
    return await DB.transaction(async (transaction2) => {
      const transaction = transaction1 || transaction2

      await Promise.all([
        /** delete course */
        course.update({ isDeleted: true }, { transaction }),

        /** delete teacher course */
        TeacherCourse.destroy({ where: { courseId: course.id }, transaction })
      ])
    })
  }
}
