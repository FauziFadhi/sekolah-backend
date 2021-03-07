import { Expose, Type } from 'class-transformer';
import { StudentViewModel } from 'modules/backoffice/viewmodel/student/student.viewmodel';

import { ScoreViewModel } from './class-score.viewmodel';

export class StudentScoreViewModel extends StudentViewModel {

  @Type(() => ScoreViewModel)
  @Expose()
  scores: ScoreViewModel[]

  @Expose()
  class: { name: string }
}