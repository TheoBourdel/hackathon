'use strict';
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../config/database.js';
import User from './user.js';

class ReportModel extends Model {

}

ReportModel.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'Report',
});

ReportModel.belongsTo(User, {
  foreignKey: 'userId', // clé étrangère dans le modèle Report qui référence l'utilisateur
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
  as: 'User',
});

export default ReportModel;
