import { Controller, Get, Param } from '@nestjs/common';
import { generateViewModel } from '@utils/helpers';

import { ClassScoreService } from '../bll/class-score.service';
import { StudentScoreViewModel } from '../viewmodel/student-class.viewmodel';

@Controller('v1/bo/classes/:classId/score')
export class ClassScoreController {
  constructor(
    private readonly scoreService: ClassScoreService,
  ) {

  }

  @Get()
  async list(@Param('classId') classId: number) {
    const studentScores = await this.scoreService.list(classId)
    return generateViewModel(StudentScoreViewModel, studentScores)
  }
}
