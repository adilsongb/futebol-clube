import { DataTypes, Model } from 'sequelize';
import sequelize from '.'; // ve oq faz
import db from '.';

class User extends Model {
  public id: number;
  public username: string;
  public password: string;
  public email: string;
  public role: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'User',
  tableName: 'users',
});

export default User;
