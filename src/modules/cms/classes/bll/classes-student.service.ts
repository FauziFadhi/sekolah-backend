import { ClassesStudent } from '@models/ClassesStudent';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';

import { ClassStudentBulkCreateDTO, ClassStudentCreateDTO } from '../dto/class-student.dto';

@Injectable()
export class ClassesStudentService {

  async create(dto: ClassStudentCreateDTO, transaction?: Transaction) {
    return await ClassesStudent.create(dto, { transaction })
  }

  async bulkCreate(dto: ClassStudentBulkCreateDTO, transaction?: Transaction) {
    const records = dto.studentIds.map((id) => ({ classId: dto.classId, studentId: id }))
    return await ClassesStudent.bulkCreate(records, { transaction })
  }
}
