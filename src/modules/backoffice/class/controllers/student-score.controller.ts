import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';

import { StudentScoreService } from '../bll/student-score.service';
import { StudentScoreCreateRequest } from '../request/student-score.request';
import { StudentScoreViewModel } from '../viewmodel/student-class.viewmodel';

@Controller('v1/bo/classes/:classId/student/:studentId/score')
export class StudentScoreController {
  constructor(
    private readonly scoreService: StudentScoreService,
  ) {

  }

  @Get()
  async list(@Param('classId') classId: number, @Param('studentId') studentId: number) {
    const studentScore = await this.scoreService.list({ classId, studentId })

    return generateViewModel(StudentScoreViewModel, studentScore)
  }

  @Post()
  async create(@Body() body: StudentScoreCreateRequest, @Param('classId') classId: number, @Param('studentId') studentId: number) {
    const studentScore = await this.scoreService.create({ ...body, classId, studentId })
    return generateViewModel(StudentScoreViewModel, studentScore)
  }
}
