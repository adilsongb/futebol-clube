import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id: number;

  username: string;

  role: string;

  email: string;

  password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default User;
