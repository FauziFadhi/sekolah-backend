import { Classes } from '@models/Classes';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';

import { ClassesService } from '../bll/classes.service';
import { ClassesCreateRequest } from '../requests/classes.request';

@Controller('v1/cms/classes')
export class ClassesController {
  constructor(
    private readonly classesService: ClassesService,
  ) {

  }

  @Get()
  async list(filter) {
    const { rows, count } = await Classes.findAndCountAll(filter)

    return { count, rows: generateViewModel(undefined, rows) }
  }

  @Post()
  async create(@Body() body: ClassesCreateRequest) {
    return await this.classesService.create(body)
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await Classes.findById(id, {
      isThrow: true,
      attributes: ['name', 'grade', 'schoolYear'],
      include: [
        {
          association: 'homeTeacher',
          attributes: ['name']
        },
        {
          association: 'major',
          attributes: ['name']
        }
      ]

    })
  }
}
