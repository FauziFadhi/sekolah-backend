import { Student } from '@models/Student';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { queryPaginationSort } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { LoggedUser } from 'components/decorator/logged-user.decorator';
import { Page } from 'components/decorator/page.decorator';
import { Sequelize } from 'sequelize-typescript';
import { FindOptions, Op, WhereOptions } from 'sequelize/types';

import { StudentService } from '../bll/student.service';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/student')
export class StudentController {

  constructor(
    private studentService: StudentService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'student'))
  async list(@Query() query: any, @Page() pagination) {

    const whereOptions: WhereOptions = {
      [Op.and]: [
        Sequelize.literal(`lower(Student.name) like '%${query.search}%'`)
      ],
    }

    const orders = queryPaginationSort(query.sort, field => field)

    const findOptions: FindOptions = {
      ...pagination,
      where: {
        isDeleted: false,
        ...whereOptions,
      },
      order: [
        ...orders,
        ['id', 'desc'],
      ],
    }

    return await Student.findAndCountAll(findOptions)
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @LoggedUser() loggedUser) {
    const a = await Student.findById(id, {
      isThrow: true,
    })

    return a
  }

  @Post()
  async create(@Body() body: any) {
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
