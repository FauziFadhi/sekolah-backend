import { Student } from '@models/Student';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { LoggedUser } from 'components/decorator/logged-user.decorator';
import { Page } from 'components/decorator/page.decorator';

import { StudentService } from '../bll/student.service';
import { StudentListFilter } from '../filters/student-list.filter';
import { StudentCreateRequest } from '../requests/student.request';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/student')
export class StudentController {

  constructor(
    private studentService: StudentService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'student'))
  async list(@Query() query: any, @Page() pagination, @StudentListFilter() filter) {

    return await Student.findAndCountAll(filter)
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @LoggedUser() loggedUser) {
    const a = await Student.findById(id, {
      isThrow: true,
    })

    return a
  }

  @Post()
  async create(@Body() body: StudentCreateRequest) {
    return await this.studentService.create(body)
  }

  @Put(':id')
  async update(@Body() body: any, @Param('id') id: number, @LoggedUser() loggedUser) {
    const student = await Student.findById(id, {
      isThrow: true,
    })

    return student.update(body)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number, @LoggedUser() loggedUser) {
    return await this.studentService.delete(id)
  }
}
