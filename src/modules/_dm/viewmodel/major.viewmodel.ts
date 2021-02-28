import { IMajorAttr } from '@models/DmMajor';
import { Expose } from 'class-transformer';

export class MajorViewModel implements Omit<IMajorAttr, 'isDeleted' | 'updatedAt'> {
  @Expose() code: string;
  @Expose() id: number;
  @Expose() name: string;
  @Expose() createdAt?: Date;
}