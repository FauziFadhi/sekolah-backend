import { Module } from '@nestjs/common';

import { TeacherService } from './bll/teacher.service';
import { TeacherController } from './controllers/teacher.controller';

@Module({
  providers: [TeacherService],
  controllers: [TeacherController]
})
export class TeacherModule { }
