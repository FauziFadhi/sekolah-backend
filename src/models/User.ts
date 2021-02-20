import { Column, Model } from 'sequelize-typescript';

export class User extends Model {
  @Column
  name: string

}