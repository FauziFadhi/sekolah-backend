import { ICourseCreateAttr } from '@models/DmCourse';
import { IsNotEmpty } from 'class-validator';
import { BaseQuery } from 'components/base/base.query';

export class CourseCreateRequest implements ICourseCreateAttr {
  @IsNotEmpty()
  name: string;
}

export class CourseUpdateRequest extends CourseCreateRequest {
}


export class ListCourseQuery extends BaseQuery {
  search: string
}