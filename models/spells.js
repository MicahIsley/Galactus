'use strict';
module.exports = function(sequelize, DataTypes) {
  var Spells = sequelize.define('Spells', {
    name: DataTypes.STRING,
    level: DataTypes.INTEGER,
    character: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Spells;
};