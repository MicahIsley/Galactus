'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skills = sequelize.define('Skills', {
    name: DataTypes.STRING,
    acro: DataTypes.BOOLEAN,
    anim: DataTypes.BOOLEAN,
    arca: DataTypes.BOOLEAN,
    athl: DataTypes.BOOLEAN,
    dece: DataTypes.BOOLEAN,
    hist: DataTypes.BOOLEAN,
    insi: DataTypes.BOOLEAN,
    inti: DataTypes.BOOLEAN,
    inve: DataTypes.BOOLEAN,
    medi: DataTypes.BOOLEAN,
    natu: DataTypes.BOOLEAN,
    perc: DataTypes.BOOLEAN,
    perf: DataTypes.BOOLEAN,
    pers: DataTypes.BOOLEAN,
    reli: DataTypes.BOOLEAN,
    slei: DataTypes.BOOLEAN,
    stea: DataTypes.BOOLEAN,
    surv: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Skills;
};