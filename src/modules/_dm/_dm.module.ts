import { Module } from '@nestjs/common';
import { TeacherModule } from 'modules/teacher/teacher.module';

import { CourseService } from './bll/course.service';
import { CourseController } from './controllers/course.controller';
import { MajorController } from './controllers/major.controller';

@Module({
  imports: [
    TeacherModule,
  ],
  providers: [CourseService],
  controllers: [CourseController, MajorController]
})
export class DmModule { }
