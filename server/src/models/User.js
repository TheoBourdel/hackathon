'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
// import ReportModel from './reportModel.js';

class User extends Model {
}

User.init({
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
});

// User.hasMany(ReportModel, {
//   foreignKey: 'userId', // clé étrangère dans le modèle Report qui référence l'utilisateur
//   onDelete: 'SET NULL',
//   onUpdate: 'CASCADE',
//   as: 'reports',
// });

export default User;
