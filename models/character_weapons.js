'use strict';
module.exports = function(sequelize, DataTypes) {
  var Character_weapons = sequelize.define('Character_weapons', {
    name: DataTypes.STRING,
    weapon: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Character_weapons;
};