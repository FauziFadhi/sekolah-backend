import { IMajorCreateAttr } from '@models/DmMajor';
import { IsNotEmpty } from 'class-validator';
import { BaseQuery } from 'components/base/base.query';

export class MajorCreateRequest implements IMajorCreateAttr {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  code: string;
}

export class MajorUpdateRequest extends MajorCreateRequest {
}

export class ListMajorQuery extends BaseQuery {
  search?: string
}