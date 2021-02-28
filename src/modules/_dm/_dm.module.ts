import { Module } from '@nestjs/common';

import { CourseController } from './controllers/course.controller';
import { MajorController } from './controllers/major.controller';

@Module({
  controllers: [CourseController, MajorController]
})
export class DmModule { }
