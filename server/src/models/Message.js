'use strict';
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../../config/database.js'; 
// Assurez-vous que le chemin est correct

class Message extends Model {
  static associate(models) {
    Message.belongsTo(models.User, { foreignKey: 'userId' });
    Message.belongsTo(models.ReportModel, { foreignKey: 'reportId' });
  }
}

Message.init({
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  reportId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'ReportModel',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  sequelize,
  modelName: 'Message',
});

export default Message;

