import { TUnfilledAtt } from '@constants/app';
import { IScoreAttr } from '@models/Score';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ScoreViewModel implements Omit<IScoreAttr, TUnfilledAtt> {
  id: number;
  classId: number;
  teacherId: number;
  courseId: number;
  studentId: number;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  type: number;

  @IsNumber()
  @IsNotEmpty()
  @Expose()
  sequence: number;

  @Expose()
  course: { name: string, id: string }

}