import { Migration } from 'database/config';
import { DataTypes } from 'sequelize';

import { GENDER } from '../../components/constants/app';

export const up: Migration = async ({
  context: queryInterface
}) => {

  await queryInterface.createTable('student', {
    name: DataTypes.STRING,
    nipd: DataTypes.STRING,
    gender: DataTypes.ENUM({ values: Object.values(GENDER) }),
  })

};
export const down: Migration = async ({
  context: queryInterface
}) => {

  await queryInterface.dropTable('student')

};
