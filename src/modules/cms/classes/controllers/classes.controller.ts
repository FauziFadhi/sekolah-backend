import { Classes } from '@models/Classes';
import { Body, Controller, Get, Post } from '@nestjs/common';
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
}
