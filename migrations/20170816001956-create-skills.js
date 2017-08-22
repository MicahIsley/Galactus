'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Skills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      acro: {
        type: Sequelize.BOOLEAN
      },
      anim: {
        type: Sequelize.BOOLEAN
      },
      arca: {
        type: Sequelize.BOOLEAN
      },
      athl: {
        type: Sequelize.BOOLEAN
      },
      dece: {
        type: Sequelize.BOOLEAN
      },
      hist: {
        type: Sequelize.BOOLEAN
      },
      insi: {
        type: Sequelize.BOOLEAN
      },
      inti: {
        type: Sequelize.BOOLEAN
      },
      inve: {
        type: Sequelize.BOOLEAN
      },
      medi: {
        type: Sequelize.BOOLEAN
      },
      natu: {
        type: Sequelize.BOOLEAN
      },
      perc: {
        type: Sequelize.BOOLEAN
      },
      perf: {
        type: Sequelize.BOOLEAN
      },
      pers: {
        type: Sequelize.BOOLEAN
      },
      reli: {
        type: Sequelize.BOOLEAN
      },
      slei: {
        type: Sequelize.BOOLEAN
      },
      stea: {
        type: Sequelize.BOOLEAN
      },
      surv: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Skills');
  }
};