import { Module } from '@nestjs/common';

import { ClassesModule } from './classes/classes.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    ClassesModule,
  ],
})
export class CmsModule { }
