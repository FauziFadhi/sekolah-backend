import { Student } from '@models/Student';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Op } from 'database/config';

import { ClassesStudentService } from '../bll/classes-student.service';
import { ClassStudentAddRequest } from '../requests/class-student.request';

@Controller('v1/cms/classes/:classId/students')
export class ClassStudenController {
  constructor(
    private readonly classesStudentService: ClassesStudentService,
  ) {

  }

  @Get()
  async list(@Param('classId') classId: number) {
    const classStudent = await this.classesStudentService.getClassStudent(classId)

    if (!classStudent) return []

    console.log(classStudent.studentIds);
    return await Student.findAndCountAll({
      attributes: ['name'],
      where: {
        id: {
          [Op.in]: classStudent.studentIds
        }
      },
      order: ['name']
    })

  }

  @Post()
  async create(@Body() body: ClassStudentAddRequest, @Param('classId') classId: number) {
    return await this.classesStudentService.addStudent({ ...body, classId })
  }
}
