import { Module } from '@nestjs/common';

import { DmModule } from './_dm/_dm.module';
import { ClassesModule } from './classes/classes.module';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    TeacherModule,
    StudentModule,
    ClassesModule,
    DmModule,
  ],
  exports: []
})
export class CmsModule { }
