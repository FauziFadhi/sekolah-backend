import { IMajorAttr } from '@models/DmMajor';
import { Expose } from 'class-transformer';

export class MajorViewModel implements Pick<IMajorAttr, 'name' | 'createdAt'> {
  @Expose() name: string;
  @Expose() createdAt?: Date;
}