import { IsArray, IsNotEmpty } from 'class-validator';

import { ClassStudentCreateDTO } from '../dto/class-student.dto';

export class ClassStudentAddRequest implements Omit<ClassStudentCreateDTO, 'classId'> {
  @IsNotEmpty()
  @IsArray()
  studentIds: number[];

}