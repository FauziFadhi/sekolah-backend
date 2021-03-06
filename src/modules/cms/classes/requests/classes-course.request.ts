import { IsNotEmpty, IsNumber } from 'class-validator';

import { ClassCourseDTO } from '../dto/class-course.dto';

export class ClassesCourseRequest implements Omit<ClassCourseDTO, 'classId'> {
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

}