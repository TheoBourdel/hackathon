'use strict';
import { Model, DataTypes } from 'sequelize';
import {sequelize} from '../../config/database.js'; 

class User extends Model {
  static associate(models) {
    // define association here if needed
  }
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'User',
});

export default User;

