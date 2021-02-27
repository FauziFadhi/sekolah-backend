import { Teacher } from '@models/Teacher';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { LoggedUser } from 'components/decorator/logged-user.decorator';

import { TeacherService } from '../bll/teacher.service';
import { TeacherListFilter } from '../filters/teacher-list.filter';
import { TeacherCreateRequest } from '../requests/teacher.request';
import { TeacherViewModel } from '../viewmodel/teacher.viewmodel';

// @UseGuards(AuthGuard('uauth'))
@Controller('v1/teacher')
export class TeacherController {
  constructor(
    private readonly teacherService: TeacherService,
  ) {

  }

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'teacher'))
  async list(@TeacherListFilter() filter) {

    const { rows, count } = await Teacher.findAndCountAll(filter)

    return { count, rows: generateViewModel(TeacherViewModel, rows) }
  }

  @Get(':id')
  async getOne(@Param('id') id: number, @LoggedUser() loggedUser) {
    const teacher = await Teacher.findById(id, {
      isThrow: true
    })

    return generateViewModel(TeacherViewModel, teacher)

  }

  @Post()
  async create(@Body() body: TeacherCreateRequest) {
    const teacher = await this.teacherService.create(body)

    return generateViewModel(TeacherViewModel, teacher)
  }

  @Put(':id')
  async update(@Body() body: any, @Param('id') id: number, @LoggedUser() loggedUser) {
    const teacher = await Teacher.findById(id, {
      isThrow: true,
    })

    return generateViewModel(TeacherViewModel, await teacher.update(body))
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
