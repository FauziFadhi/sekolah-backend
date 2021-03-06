import { IsNotEmpty, IsNumber } from 'class-validator';

export class TeacherCourseCreateRequest {
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

}