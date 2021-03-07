import { IsNotEmpty, IsNumber } from 'class-validator';

import { ScoreCreateDTO } from '../dto/score.dto.';

export class StudentScoreCreateRequest implements Omit<ScoreCreateDTO, 'classId' | 'studentId'> {
  @IsNotEmpty()
  @IsNumber()
  teacherId: number;

  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @IsNotEmpty()
  @IsNumber()
  score: number;

  @IsNotEmpty()
  @IsNumber()
  type: number;

  @IsNotEmpty()
  @IsNumber()
  sequence: number;


}