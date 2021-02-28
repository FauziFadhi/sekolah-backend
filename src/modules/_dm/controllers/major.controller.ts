import { DmMajor } from '@models/DmMajor';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';
import { ResponsePaginationInterceptor } from '@utils/pagination.iterceptor';
import { BaseResource } from 'components/base/base.resource';
import { FindOptions } from 'sequelize/types';

import { MajorListFilter } from '../filters/major-list.filter';
import { MajorCreateRequest, MajorUpdateRequest } from '../requests/major.request';
import { MajorViewModel } from '../viewmodel/major.viewmodel';

@Controller('v1/major')
export class MajorController {

  @Get()
  @UseInterceptors(new ResponsePaginationInterceptor(BaseResource, 'major'))
  async list(@MajorListFilter() filter: FindOptions) {
    const majors = await DmMajor.findAndCountAll(filter)

    const viewModel = generateViewModel(MajorViewModel, majors.rows) as MajorViewModel[]

    return { count: majors.count, rows: viewModel }

  }

  @Post()
  async create(@Body() body: MajorCreateRequest) {
    const major = await DmMajor.create({
      name: body.name,
    })

    return generateViewModel(MajorViewModel, major) as MajorViewModel
  }

  @Get(':id')
  async get(@Param('id') id: number) {
    const major = await DmMajor.findById(id, {
      isThrow: true
    })

    return generateViewModel(MajorViewModel, major) as MajorViewModel
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: MajorUpdateRequest) {
    const major = await DmMajor.findById(id, {
      isThrow: true
    })

    await major.update(body)

    return generateViewModel(MajorViewModel, major) as MajorViewModel
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number) {
    const major = await DmMajor.findById(id, {
      isThrow: true
    })

    await major.update({ isDeleted: true })
  }
}
