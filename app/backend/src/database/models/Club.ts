import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

class Club extends Model {
  public id: number;
  public club_name: string;
}

Club.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'Club',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS: 
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Club.hasMany(Match, { foreignKey: 'id', as: 'matchs' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'clubs' });

export default Club;
