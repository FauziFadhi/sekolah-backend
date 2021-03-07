import { Module } from '@nestjs/common';

import { AbsenceService } from './bll/absence.service';
import { ClassScoreService } from './bll/class-score.service';
import { StudentScoreService } from './bll/student-score.service';
import { AbsenceController } from './controllers/absence.controller';
import { ClassScoreController } from './controllers/class-score.controller';
import { StudentScoreController } from './controllers/student-score.controller';

@Module({
  providers: [AbsenceService, StudentScoreService, ClassScoreService],
  controllers: [AbsenceController, ClassScoreController, StudentScoreController],
})
export class ClassModule { }
