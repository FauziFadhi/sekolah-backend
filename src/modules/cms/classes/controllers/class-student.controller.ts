import { Student } from '@models/Student';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
    return await Student.findAndCountAll({
      attributes: ['name'],
      order: ['name'],
      include: [
        {
          attributes: [],
          association: 'classes',
          where: {
            id: classId,
          }
        }
      ]
    })

  }

  @Post()
  async create(@Body() body: ClassStudentAddRequest, @Param('classId') classId: number) {
    return await this.classesStudentService.create({ ...body, classId })
  }
}
