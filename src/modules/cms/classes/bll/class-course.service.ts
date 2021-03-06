import { ClassCourse } from '@models/ClassCourse';
import { Classes } from '@models/Classes';
import { DmCourse } from '@models/DmCourse';
import { Teacher } from '@models/Teacher';
import { TeacherCourse } from '@models/TeacherCourse';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';

import { ClassCourseDTO } from '../dto/class-course.dto';

@Injectable()
export class ClassCourseService {


  /**
   * create course for class
   * @param param0 
   * @returns 
   */
  async create({ courseId, classId, teacherId }: ClassCourseDTO, transaction?: Transaction): Promise<ClassCourse> {

    const [teacherCourse] = await Promise.all([
      TeacherCourse.find({ where: { isDeleted: false, teacherId, courseId }, isThrow: true }),
      Classes.findById(classId, { where: { isDeleted: false }, isThrow: true }),
      DmCourse.findById(courseId, { where: { isDeleted: false }, isThrow: true }),
      Teacher.findById(teacherId, { where: { isDeleted: false }, isThrow: true }),
    ])

    return await ClassCourse.create({
      courseId, teacherId, classId, teacherCourseId: teacherCourse.id,
    }, { transaction })

  }

}
