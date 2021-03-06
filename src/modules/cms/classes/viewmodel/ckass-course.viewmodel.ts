import { TUnfilledAtt } from '@constants/app';
import { IClassCourseAttr } from '@models/ClassCourse';
import { Expose } from 'class-transformer';

export class ClassCourseViewModel implements Omit<IClassCourseAttr, TUnfilledAtt> {
  id: number;
  classId: number;
  teacherId: number;
  courseId: number;
  teacherCourseId: number;

  @Expose()
  course?: { name: string }

  @Expose()
  teacher?: { name: string }
}