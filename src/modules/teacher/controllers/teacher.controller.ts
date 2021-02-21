import { Student } from '@models/Student';
import { Teacher } from '@models/Teacher';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { queryPaginationSort } from '@utils/helpers';
import { LoggedUser } from 'components/decorator/logged-user.decorator';
import { Page } from 'components/decorator/page.decorator';
import { FindOptions, WhereOptions } from 'sequelize/types';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/teacher')
export class TeacherController {

  @Get()
  async list(@Query() query, @Page() pagination) {

    const whereOptions: WhereOptions = {

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

    return await Teacher.findAndCountAll(findOptions)
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @LoggedUser() loggedUser) {
    const a = await Teacher.findOne()
    a.id
    const b = await Student.findOne()
    b.id
    // const c = await Student.find()
  }

  @Post()
  async create(@Body() body: any) {
    return await Teacher.create(body)
  }

  @Put(':id')
  async update(@Body() body: any, @Param('id') id: number, @LoggedUser() loggedUser) {
    const teacher = await Teacher.findOne({
      // isThrow: true,
      where: {
        id,
      },
    })

    return teacher.update(body)
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Body() body: any, @Param('id') id: number, @LoggedUser() loggedUser) {
    const teacher = await Teacher.findOne({
      // isThrow: true,
      where: {
        id,
      },
    })

    return teacher.update({ isDeleted: true })
  }
}
