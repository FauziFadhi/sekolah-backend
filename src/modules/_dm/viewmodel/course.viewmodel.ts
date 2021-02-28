import { ICourseAttr } from '@models/DmCourse';
import { Expose } from 'class-transformer';

export class CourseViewModel implements Pick<ICourseAttr, 'name' | 'createdAt'> {
  @Expose() id: number
  @Expose() name: string;
  @Expose() createdAt?: Date;
}