import { Student } from '@models/Student';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { LoggedUser } from 'components/decorator/logged-user.decorator';

import { StudentService } from '../bll/student.service';
import { StudentListFilter } from '../filters/student-list.filter';
import { StudentCreateRequest } from '../requests/student.request';
import { StudentViewModel } from '../viewmodel/student.viewmodel';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/student')
export class StudentController {

  constructor(
    private studentService: StudentService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'student'))
  async list(@StudentListFilter() filter) {

    const { count, rows } = await Student.findAndCountAll(filter)
    return { count, rows: generateViewModel(StudentViewModel, rows) }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @LoggedUser() loggedUser) {
    const student = await Student.findById(id, {
      isThrow: true,
    })

    generateViewModel(StudentViewModel, student)
  }

  @Post()
  async create(@Body() body: StudentCreateRequest) {
    const student = await this.studentService.create(body)

    return generateViewModel(StudentViewModel, student)
  }

  @Put(':id')
  async update(@Body() body: any, @Param('id') id: number, @LoggedUser() loggedUser) {
    const student = await Student.findById(id, {
      isThrow: true,
    })

    generateViewModel(StudentViewModel, await student.update(body))
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number, @LoggedUser() loggedUser) {
    return await this.studentService.delete(id)
  }
}
