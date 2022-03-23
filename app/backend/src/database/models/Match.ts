import { DataTypes, Model } from 'sequelize';
import Club from './Club';
import sequelize from '.';

class Match extends Model {
  public id: number;
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    homeTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeam: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'Match',
    tableName: 'matchs',
  },
);

Club.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatchs' });
Club.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatchs' });

Match.belongsTo(Club, { foreignKey: 'homeTeam', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'awayTeam', as: 'awayClub' });

export default Match;