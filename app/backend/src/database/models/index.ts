import { Sequelize } from 'sequelize';

const databaseConfig = require('../config/database');

export default new Sequelize(databaseConfig);

export { default as ClubModel } from './Club';
export { default as MatchModel } from './Match';
export { default as UserModel } from './User';
