import { ENUM_GENDER } from '@constants/enum';
import { Migration } from 'database/config';
import { DataTypes } from 'sequelize';


export const up: Migration = async ({
  context: queryInterface
}) => {

  await queryInterface.createTable('student', {
    name: DataTypes.STRING,
    nipd: DataTypes.STRING,
    gender: DataTypes.ENUM({ values: Object.values(ENUM_GENDER) }),
  })

};
export const down: Migration = async ({
  context: queryInterface
}) => {

  await queryInterface.dropTable('student')

};
