import { Module } from '@nestjs/common';

import { AbsenceService } from './bll/absence.service';
import { AbsenceController } from './controllers/absence.controller';

@Module({
  providers: [AbsenceService],
  controllers: [AbsenceController],
})
export class ClassModule { }
