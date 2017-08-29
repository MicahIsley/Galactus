var Character_stats = require("../../models/")["Character_stats"];
var Spells = require("../../models/")["Spells"];
var Skills = require("../../models/")["Skills"];
var Notes = require("../../models/")["Notes"];
var Items = require("../../models/")["Items"];

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

	app.get("/api/skills/:character", function(req, res) {
		Skills.findOne({
			where: {
				name: req.params.character
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.delete("/api/deleteSpell/:id", function(req, res) {
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

	app.get("/api/notes/:character", function(req, res) {
		Notes.findAll({
			where: {
				character: req.params.character
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.post("/api/new_note", function(req, res) {
		Notes.create({
			note: req.body.note,
			category: req.body.category,
			character: req.body.character
		});
	});

	app.delete("/api/deleteNote/:id", function(req, res) {
		Notes.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.put("/api/updateNote/:id", function(req, res) {
		Notes.update(req.body,
		{
			where: {
				id: req.params.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.get("/api/items/:character", function(req, res) {
		Items.findAll({
			where: {
				owner: req.params.character
			}
		}).then(function(results) {
			res.json(results);
		});
	});

	app.post("/api/new/item", function(req, res) {
		Items.create({
			item: req.body.item,
			description: req.body.description,
			owner: req.body.owner
		});
	});

	app.delete("/api/deleteItem/:id", function(req, res) {
		Items.destroy({
			where: {
				id: req.params.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});

	app.put("/api/updateItem/:id", function(req, res) {
		Items.update({
			owner: req.body.owner
		}, {
			where: {
				id: req.body.id
			}
		}).then(function(result) {
			res.json(result);
		});
	});
};