import { Student } from '@models/Student';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClassScoreService {


  async list(classId: number) {
    return await Student.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          association: 'scores',
          attributes: ['score', 'sequence', 'type'],
          where: {
            classId,
          }
        }
      ]
    })
  }
}
