var path = require("path");

module.exports = function(app) {
	app.get("/", function(req, res) {
		res.sendFile(path.join(__dirname + "/../../index.html"));
	});

	app.get("/characters", function(req, res) {
		res.sendFile(path.join(__dirname + "/../../features/characters.html"));
	});

	app.get("/adventure-log", function(req, res) {
		res.sendFile(path.join(__dirname + "/../../features/adventure-log.html"));
	});

	app.get("/spell-list", function(req, res) {
		res.sendFile(path.join(__dirname + "/../../spell-list.html"));
	});
};