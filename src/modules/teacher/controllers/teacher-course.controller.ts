import { CourseViewModel } from '@dm/viewmodel/course.viewmodel';
import { DmCourse } from '@models/DmCourse';
import { TeacherCourse } from '@models/TeacherCourse';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseInterceptors } from '@nestjs/common';
import { TeacherWithCourseViewModel } from '@teacher/viewmodel/teacher.viewmodel';
import { generateViewModel } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';

import { TeacherCourseService } from '../bll/teacher-couse.service';
import { TeacherCourseListFilter } from '../filters/teacher-course-list.filter';
import { TeacherCourseCreateRequest } from '../requests/teacher-course.request';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/teacher/:teacherId/course')
export class TeacherCourseController {
  constructor(
    private readonly teacherCourseService: TeacherCourseService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'course'))
  async list(@TeacherCourseListFilter() filter) {
    const { count, rows } = await DmCourse.findAndCountAll(filter)

    return { count, rows: generateViewModel(CourseViewModel, rows) }
  }

  @Post()
  async create(@Body() { courseId }: TeacherCourseCreateRequest, @Param('teacherId') teacherId: number) {
    const teacherCourse = await this.teacherCourseService.create({ courseId, teacherId })

    return generateViewModel(TeacherWithCourseViewModel, teacherCourse)
  }

  @Delete(':courseId')
  @HttpCode(204)
  async delete(@Param('courseId') courseId: number, @Param('teacherId') teacherId: number) {
    await TeacherCourse.destroy({ where: { teacherId, courseId } })
  }
}
