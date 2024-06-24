'use strict';

import { Sequelize } from 'sequelize';
import config from './config/config.js';

const sequelize = new Sequelize(config.development);

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectDatabase };
