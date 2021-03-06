import { ClassCourse } from '@models/ClassCourse';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';

import { ClassCourseService } from '../bll/class-course.service';
import { ClassesCourseRequest } from '../requests/classes-course.request';
import { ClassCourseViewModel } from '../viewmodel/ckass-course.viewmodel';

@Controller('v1/cms/classes/:classId/courses')
export class ClassesCourseController {
  constructor(
    private readonly classCourseService: ClassCourseService,
  ) {

  }

  @Get()
  async courses(@Param('classId') classId: number) {
    const data = await ClassCourse.findAll({
      where: {
        isDeleted: false,
        classId,
      },
      attributes: [],
      include: [
        {
          association: 'teacher',
          attributes: ['name']
        },
        {
          association: 'course',
          attributes: ['name']
        }
      ]
    })

    return generateViewModel(ClassCourseViewModel, data)
  }

  @Post()
  async create(@Body() body: ClassesCourseRequest, @Param('classId') classId: number) {
    return await this.classCourseService.create({ ...body, classId })
  }
}
