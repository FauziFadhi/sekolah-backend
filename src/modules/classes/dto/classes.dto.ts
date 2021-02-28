import { IClassesCreateAttr } from '@models/Classes';

export interface ClassesCreateDTO extends IClassesCreateAttr {
  studentIds: number[]
}

export interface ClassesUpdateDTO extends IClassesCreateAttr {
  id: number
}