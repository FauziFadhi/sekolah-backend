import { Module } from '@nestjs/common';

import { ClassCourseService } from './bll/class-course.service';
import { ClassesStudentService } from './bll/classes-student.service';
import { ClassesService } from './bll/classes.service';
import { ClassesCourseController } from './controllers/class-course.controller';
import { ClassStudenController } from './controllers/class-student.controller';
import { ClassesController } from './controllers/classes.controller';

@Module({
  controllers: [ClassesController, ClassesCourseController, ClassStudenController],
  providers: [ClassesService, ClassesStudentService, ClassCourseService]
})
export class ClassesModule { }
