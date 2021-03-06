import { ERROR_MSG } from '@constants/error-message';
import { Classes } from '@models/Classes';
import { ClassesStudent } from '@models/ClassesStudent';
import { Student } from '@models/Student';
import { IAbsence, StudentAbsence } from '@models/StudentAbsence';
import { BadRequestException, Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { Transaction } from 'sequelize/types';

import { AbsenceCreateDTO } from '../dto/absence.dto';


@Injectable()
export class AbsenceService {

  async list(classId: number) {
    return await StudentAbsence.findAll({
      attributes: ['absences', 'studentId'],
      where: {
        isDeleted: false,
        classId: classId,
      },
    })
  }

  /**
   * create course for class
   * @param param0 
   * @returns 
   */
  async create({ studentId, classId, type, week }: AbsenceCreateDTO, transaction1?: Transaction): Promise<StudentAbsence> {

    return await DB.transaction(async (transaction2) => {
      const transaction = transaction1 || transaction2
      const [studentAbsence, classStudent] = await Promise.all([
        StudentAbsence.find({ where: { isDeleted: false, classId, studentId } }),
        ClassesStudent.find({ isThrow: true, where: { classId } }),
        Classes.findById(classId, { isThrow: true }),
        Student.findById(studentId, { isThrow: true }),
      ])

      const studentIdsOfClass = classStudent.studentIds
      if (!studentIdsOfClass.some(id => id == studentId))
        throw new BadRequestException(ERROR_MSG.NO_STUDENT_IN_CLASS)

      if (!studentAbsence) {
        return await StudentAbsence.create({
          absences: [{
            type,
            week,
          }],
          classId,
          studentId,
        }, { transaction })
      }

      return await this.update(studentAbsence, { week, type }, transaction)
    })

  }

  /**
   * update absensi 
   * @param dto 
   * @param transaction 
   */
  async update({ studentId, classId, type, week }: AbsenceCreateDTO, transaction?: Transaction)
  async update(studentAbsence: StudentAbsence, { type, week }: IAbsence, transaction?: Transaction)
  async update(...args): Promise<StudentAbsence> {
    let studentAbsence: StudentAbsence = null
    let selectedAbsence: IAbsence = null

    if (args[0] instanceof StudentAbsence) {
      studentAbsence = args[0]
      selectedAbsence = args[1]
    }
    else {
      studentAbsence = await StudentAbsence.find({ isThrow: true, where: { studentId: args[0].studentId, classId: args[0].classId } })
      selectedAbsence = {
        type: args[0].type,
        week: args[0].week
      }
    }

    const absences = studentAbsence.absences
    let weekExists = false
    const newAbsences = absences.map((absence) => {
      if (absence.week == selectedAbsence.week) {
        weekExists = true
        absence.type = selectedAbsence.type
      }
      return absence
    });

    if (!weekExists)
      newAbsences.push(selectedAbsence)

    await StudentAbsence.update({ absences: newAbsences }, { transaction: args.pop(), where: { studentId: studentAbsence.studentId, classId: studentAbsence.classId } })
    return studentAbsence
  }

}
