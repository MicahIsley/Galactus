var Character_stats = require("../../../models/")["Character_stats"];
var Spells = require("../../../models/")["Spells"];

module.exports = function(app) {

	app.get("/api/character_stats/all", function(req, res) {
		Character_stats.findAll({}).then(function(results) {
			res.json(results);
		});
	});

	app.get("/api/character_stats/:character", function(req, res) {
		if (req.params.character) {
			Character_stats.findOne({
				where: {
					name: req.params.character
				}
			}).then(function(results) {
				res.json(results);
			});
		}	
	});

	app.get("/api/spells/:character", function(req, res) {
		Spells.findAll({
			where: {
				character: req.params.character
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.delete("/api/delete/:id", function(req, res) {
		Spells.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.post("/api/new", function(req, res) {
		Spells.create({
			name: req.body.name,
			level: req.body.level,
			character: req.body.character
		});
	});
};