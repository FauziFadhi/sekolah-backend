import { Module } from '@nestjs/common';

import { ClassesStudentService } from './bll/classes-student.service';
import { ClassesService } from './bll/classes.service';
import { ClassesController } from './controllers/classes.controller';

@Module({
  controllers: [ClassesController],
  providers: [ClassesService, ClassesStudentService]
})
export class ClassesModule { }
