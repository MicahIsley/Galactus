var Sequelize = require("sequelize");

var sequelize = new Sequelize("galactus_db", "root", "Password123", {
	host: "localhost",
	dialect: "mysql",
	pool: {
		max: 5,
		min: 0,
		idle: 1000
	}
});

module.exports = sequelize;