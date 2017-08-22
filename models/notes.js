'use strict';
module.exports = function(sequelize, DataTypes) {
  var Notes = sequelize.define('Notes', {
    note: DataTypes.TEXT,
    category: DataTypes.STRING,
    character: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Notes;
};