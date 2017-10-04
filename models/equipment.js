'use strict';
module.exports = function(sequelize, DataTypes) {
  var Equipment = sequelize.define('Equipment', {
    name: DataTypes.STRING,
    damage: DataTypes.STRING,
    properties: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Equipment;
};