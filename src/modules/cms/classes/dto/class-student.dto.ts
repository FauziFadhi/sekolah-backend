import { IClassesStudentCreateAttr } from '@models/ClassesStudent';

export interface ClassStudentCreateDTO extends IClassesStudentCreateAttr {

}
export interface ClassStudentUpdateDTO extends ClassStudentCreateDTO {

}

export interface ClassStudentBulkCreateDTO extends Omit<IClassesStudentCreateAttr, 'studentId'> {
  studentIds: number[]
}