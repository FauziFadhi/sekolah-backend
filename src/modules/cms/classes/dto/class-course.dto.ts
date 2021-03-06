import { IClassCourseCreateAttr } from '@models/ClassCourse';

export interface ClassCourseDTO extends Omit<IClassCourseCreateAttr, 'teacherCourseId'> {

}