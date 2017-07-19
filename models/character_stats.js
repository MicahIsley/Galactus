'use strict';
module.exports = function(sequelize, DataTypes) {
  var Character_stats = sequelize.define('Character_stats', {
    name: DataTypes.STRING,
    str: DataTypes.INTEGER,
    dex: DataTypes.INTEGER,
    con: DataTypes.INTEGER,
    wis: DataTypes.INTEGER,
    inte: DataTypes.INTEGER,
    cha: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Character_stats;
};