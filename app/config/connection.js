var Sequelize = require("sequelize");
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	var sequelize = new Sequelize("galactus_db", "root", "Password123", {
		host: "localhost",
		dialect: "mysql",
		pool: {
			max: 5,
			min: 0,
			idle: 1000
		}
	});
}	


module.exports = sequelize;