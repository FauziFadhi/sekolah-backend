import { Module } from '@nestjs/common';

import { TeacherCourseService } from './bll/teacher-couse.service';
import { TeacherService } from './bll/teacher.service';
import { TeacherCourseController } from './controllers/teacher-course.controller';
import { TeacherController } from './controllers/teacher.controller';

@Module({
  providers: [TeacherService, TeacherCourseService],
  controllers: [TeacherController, TeacherCourseController],
  exports: [
    TeacherCourseService,
  ]
})
export class TeacherModule { }
