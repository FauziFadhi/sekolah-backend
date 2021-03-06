import { ClassesStudent } from '@models/ClassesStudent';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';

import { ClassStudentCreateDTO, ClassStudentUpdateDTO } from '../dto/class-student.dto';

@Injectable()
export class ClassesStudentService {

  async create(dto: ClassStudentCreateDTO, transaction?: Transaction) {
    return await ClassesStudent.create(dto, { transaction })
  }

  async update(dto: ClassStudentUpdateDTO, transaction?: Transaction) {
    return await ClassesStudent.update({ studentIds: dto.studentIds }, { transaction, where: { isDeleted: false, classId: dto.classId } })
  }
}
