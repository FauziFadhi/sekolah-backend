import { Classes } from '@models/Classes';
import { ClassesStudent } from '@models/ClassesStudent';
import { Score } from '@models/Score';
import { Student } from '@models/Student';
import { Injectable } from '@nestjs/common';
import { DB } from 'database/config';
import { Transaction } from 'sequelize/types';

import { ScoreCreateDTO, ScoreUpdateDTO } from '../dto/score.dto.';

@Injectable()
export class StudentScoreService {


  async list({ classId, studentId }) {
    return await Student.findById(studentId, {
      attributes: ['name', 'id'],
      join
      include: [
        {
          association: 'scores',
          attributes: ['score', 'type', 'sequence', 'courseId'],
          where: {
            classId,
          },
          include: [{
            association: 'course',
            attributes: ['name', 'id'],
          }]
        }
      ]
    })
  }

  /**
   * create student score
   * @param param0 
   * @param transaction1 
   * @returns 
   */
  async create({ classId, studentId, teacherId, courseId, ...dto }: ScoreCreateDTO, transaction1?: Transaction) {
    return await DB.transaction(async (transaction2) => {
      const transaction = transaction1 || transaction2
      const [score, student, classes] = await Promise.all([
        Score.find({ where: { isDeleted: false, classId, teacherId, courseId, studentId, type: dto.type, sequence: dto.sequence } }),
        Student.findById(studentId, { isThrow: true }),
        Classes.findById(classId, { isThrow: true }),
        ClassesStudent.findStudentInClass({ studentId, classId }, { isThrow: true }),
      ])

      let studentScore = null
      /** make response */
      const result = (studentScore: Score) => {
        return {
          ...student.toJSON(),
          class: classes,
          scores: [studentScore],
        }
      }

      if (!score) {
        studentScore = await Score.create({
          courseId: courseId,
          score: dto.score,
          sequence: dto.sequence,
          teacherId: teacherId,
          type: dto.type,
          classId,
          studentId,
        }, { transaction })

        return result(studentScore)
      }

      studentScore = await this.update(score, { score: dto.score, sequence: dto.sequence, type: dto.type }, transaction)
      return result(studentScore)
    })
  }

  /**
   * update absensi 
   * @param dto 
   * @param transaction 
   */
  async update(dto: ScoreUpdateDTO, transaction?: Transaction)
  async update(score: Score, dto: Pick<ScoreUpdateDTO, 'type' | 'score' | 'sequence'>, transaction?: Transaction)
  async update(...args): Promise<Score> {
    let score: Score = null
    let scoreDTO: Pick<ScoreUpdateDTO, 'type' | 'score' | 'sequence'> = null

    if (args[0] instanceof Score) {
      score = args[0]
      scoreDTO = args[1]
    }
    else {
      score = await Score.find({ where: { isDeleted: false, classId: args[0].classId, teacherId: args[0].teacherId, courseId: args[0].courseId, studentId: args[0].studentId } })
      scoreDTO = {
        type: args[0].type,
        score: args[0].score,
        sequence: args[0].sequence
      }
    }

    return await score.update(scoreDTO, { transaction: args.pop() })
  }

}
