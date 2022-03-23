'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matchs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      home_team: {
        type: Sequelize.INTEGER,
      },
      home_team_goals: {
        type: Sequelize.INTEGER,
      },
      away_team: {
        type: Sequelize.INTEGER,
      },
      away_team_goals: {
        type: Sequelize.INTEGER,
      },
      in_progress: {
        type: Sequelize.BOOLEAN,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
/*
id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      homeTeam: {
        type: Sequelize.INTEGER,
        field: 'home_team',
        references: {
          model: 'clubs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'home_team_goals',
      },
      awayTeam: {
        type: Sequelize.INTEGER,
        field: 'away_team',
        references: {
          model: 'clubs',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      awayTeamGoals: {
        type: Sequelize.INTEGER,
        field: 'away_team_goals',
      },
      inProgress: {
        type: Sequelize.BOOLEAN,
        field: 'in_progress',
      }
*/
