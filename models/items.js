'use strict';
module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define('Items', {
    owner: DataTypes.STRING,
    item: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Items;
};