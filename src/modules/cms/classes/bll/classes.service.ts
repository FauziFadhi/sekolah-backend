import { Classes } from '@models/Classes';
import { ClassesStudent } from '@models/ClassesStudent';
import { DmMajor } from '@models/DmMajor';
import { Teacher } from '@models/Teacher';
import { Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { Transaction } from 'sequelize/types';

import { ClassesCreateDTO, ClassesUpdateDTO } from '../dto/classes.dto';
import { ClassesStudentService } from './classes-student.service';

@Injectable()
export class ClassesService {

  constructor(
    private readonly classStudentService: ClassesStudentService,
  ) {

  }

  async create({ studentIds, ...classesDTO }: ClassesCreateDTO, transaction1?: Transaction) {

    return await DB.transaction(async (transaction2) => {

      const transaction = transaction1 || transaction2

      const [major, homeTeacher] = await Promise.all([
        /** check major */
        DmMajor.findById(classesDTO.majorId, { isThrow: true }),
        /** check home teacher */
        Teacher.findById(classesDTO.homeTeacherId, { isThrow: true }),
      ])

      const classes = await Classes.create(classesDTO, { transaction })

      if (studentIds.length)
        await this.classStudentService.create({
          classId: classes.id,
          studentIds,
        }, transaction)

      return classes
    });
  }

  async update(dto: ClassesUpdateDTO, transaction?: Transaction) {
    const classes = await Classes.findById(dto.id, { isThrow: true })

    return await classes.update(dto, { transaction })
  }

  async delete(id: number, transaction?: Transaction) {
    const classes = await Classes.findById(id, { isThrow: true })

    await Promise.all([
      classes.update({ isDeleted: true }, { transaction }),
      ClassesStudent.update({ isDeleted: true }, { transaction, where: { isDeleted: false, classId: classes.id } })
    ])
  }
} 
