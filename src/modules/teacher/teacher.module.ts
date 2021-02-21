import { Module } from '@nestjs/common';

import { TeacherService } from './bll/teacher.service';

@Module({
  providers: [TeacherService],
  controllers: []
})
export class TeacherModule { }
