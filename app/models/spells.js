var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Spells = sequelize.define("spells", {
	name: {
		type: Sequelize.STRING
	},
	level: {
		type: Sequelize.INTEGER
	},
	character: {
		type: Sequelize.INTEGER
	},
});

Spells.sync();

module.exports = Spells;