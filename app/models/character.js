var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Character_stats = sequelize.define("character_stats", {
	name: {
		type: Sequelize.STRING
	},
	str: {
		type: Sequelize.INTEGER
	},
	dex: {
		type: Sequelize.INTEGER
	},
	con: {
		type: Sequelize.INTEGER
	},
	wis: {
		type: Sequelize.INTEGER
	},
	inte: {
		type: Sequelize.INTEGER
	},
	cha: {
		type: Sequelize.INTEGER
	}
});

Character_stats.sync();

module.exports = Character_stats;