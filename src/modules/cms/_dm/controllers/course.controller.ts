import { DmCourse } from '@models/DmCourse';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { CourseService } from 'modules/cms/_dm/bll/course.service';
import { FindOptions } from 'sequelize/types';

import { CourseListFilter } from '../filters/course-list.filter';
import { CourseCreateRequest, CourseUpdateRequest } from '../requests/course.request';
import { CourseViewModel } from '../viewmodel/course.viewmodel';

@Controller('v1/cms/course')
export class CourseController {
  constructor(
    private courseService: CourseService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'course'))
  async list(@CourseListFilter() filter: FindOptions) {
    const courses = await DmCourse.findAndCountAll(filter)

    const viewModel = generateViewModel(CourseViewModel, courses.rows) as CourseViewModel[]

    return { count: courses.count, rows: viewModel }
  }

  @Post()
  async create(@Body() body: CourseCreateRequest) {
    const course = await DmCourse.create({
      name: body.name,
    })

    return generateViewModel(CourseViewModel, course) as CourseViewModel
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const course = await DmCourse.findById(id, {
      isThrow: true
    })

    return generateViewModel(CourseViewModel, course) as CourseViewModel
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CourseUpdateRequest) {
    const course = await DmCourse.findById(id, {
      isThrow: true
    })

    await course.update(body)

    return generateViewModel(CourseViewModel, course) as CourseViewModel
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    await this.courseService.delete(id)
  }
}
