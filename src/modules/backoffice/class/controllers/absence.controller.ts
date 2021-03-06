import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { AbsenceService } from '../bll/absence.service';
import { AbsenceRequest } from '../request/absence.request';

@Controller('v1/bo/classes/:classId/absence')
export class AbsenceController {
  constructor(
    private readonly absenceService: AbsenceService,
  ) {

  }

  @Get()
  async list(@Param('classId') classId: number) {
    return await this.absenceService.list(classId)
  }

  @Post()
  async create(@Body() body: AbsenceRequest, @Param('classId') classId: number) {
    return await this.absenceService.create({ ...body, classId })
  }
}
