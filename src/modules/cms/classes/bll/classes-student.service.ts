import { ClassesStudent } from '@models/ClassesStudent';
import { Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize/types';

import { ClassStudentCreateDTO, ClassStudentUpdateDTO } from '../dto/class-student.dto';

@Injectable()
export class ClassesStudentService {

  async create(dto: ClassStudentCreateDTO, transaction?: Transaction) {
    return await ClassesStudent.create(dto, { transaction })
  }

  async addStudent(dto: ClassStudentCreateDTO, transaction?: Transaction) {
    const classStudent = await ClassesStudent.find({ where: { isDeleted: false, classId: dto.classId } })
    if (!classStudent)
      return await ClassesStudent.create(dto, { transaction })
    const studentIds = [...new Set([...dto.studentIds, classStudent.studentIds])]
    return await classStudent.update({ studentIds }, { transaction })
  }

  async update(dto: ClassStudentUpdateDTO, transaction?: Transaction) {
    return await ClassesStudent.update({ studentIds: dto.studentIds }, { transaction, where: { isDeleted: false, classId: dto.classId } })
  }

  async getClassStudent(classId: number) {
    return await ClassesStudent.find({
      where: { classId },
      attributes: ['studentIds']
    })
  }
}
