import { IUserLoginCreateAttr } from '@models/UserLogin';
import { IsNotEmpty } from 'class-validator';

export class AuthCreateRequest implements Pick<IUserLoginCreateAttr, "username" | "password"> {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

}