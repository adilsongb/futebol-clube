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
    allowNull: false,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'Club',
  tableName: 'clubs',
});


Club.hasMany(Match, { foreignKey: 'id', as: 'matchs' });
Match.belongsTo(Club, { foreignKey: 'id', as: 'clubs' });

/* Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });
Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayClub' });
 */
export default Club;
