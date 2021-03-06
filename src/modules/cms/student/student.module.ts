import { Module } from '@nestjs/common';

import { StudentService } from './bll/student.service';
import { StudentController } from './controllers/student.controller';

@Module({
  providers: [StudentService],
  controllers: [StudentController]
})
export class StudentModule { }
