//Global variables

var character = "";
var noteCategory = "other";
var characterLearn;
var currentHp;
var strStat;
var dexStat;
var conStat;
var inteStat;
var wisStat;
var chaStat;
var updateNoteId;
var itemDescriptionToggle = true;
var weaponPropertiesToggle = true;
var transferItemId;

//Character selection

$(".character").click(function(){
	$("#weapons").hide();
	$("#items").hide();
	$("#gold").hide();
	$(".spell").hide();
	character = this.id
	console.log(character);
	$(".fenla, .clithsbee, .scepter, .alea, .fannar, .regina, .syndir, .franco, .minime, .autumn").hide();
	$("."+character).show();
	$.get("/api/character_stats/" + character, function(data) {
		renderStats(data);
	}).then(function() {
		displayHp();
	});
	displayNotes();

});

function renderStats(data) {
	console.log(data);
	strStat = data.str;
	dexStat = data.dex;
	conStat = data.con;
	inteStat = data.inte;
	wisStat = data.wis;
	chaStat = data.cha;
	$("#abilityScores").empty();
	$("#abilityScores").show();
	$("#maxHp").text(data.hp);
	currentHp = data.hp;
	var div = $("<div>");
	div.append("<tr><th></th><th></th><th>Mod</th></tr>");
	div.append("<tr><th>Strength</th><th>" + strStat + "</th><th> " + Math.floor((data.str-10)/2) + "</th></tr>");
	div.append("<tr><th>Dexterity</th><th>" + dexStat + "</th><th> " + Math.floor((data.dex-10)/2) + "</th></tr>");
	div.append("<tr><th>Constitution</th><th>" + conStat + "</th><th> " + Math.floor((data.con-10)/2) + "</th></tr>");
	div.append("<tr><th>Wisdom</th><th>" + wisStat + "</th><th> " + Math.floor((data.wis-10)/2) + "</th></tr>");
	div.append("<tr><th>Intelligence</th><th>" + inteStat + "</th><th> " + Math.floor((data.inte-10)/2) + "</th></tr>");
	div.append("<tr><th>Charisma</th><th>" + chaStat + "</th><th> " + Math.floor((data.cha-10)/2) + "</th></tr>");
	$("#abilityScores").append(div);
	$("#goldDisplay").text("Gold: " + data.gold);
};

//Skills Section

$("#skillsPanel").click(function(){
	$.get("/api/skills/" + character, function(data) {
		renderSkills(data);
	}).then(function() {

	});
});

function renderSkills(data) {
	var strMod = Math.floor((strStat-10)/2);
	var dexMod = Math.floor((dexStat-10)/2);
	var conMod = Math.floor((conStat-10)/2);
	var inteMod = Math.floor((inteStat-10)/2);
	var wisMod = Math.floor((wisStat-10)/2);
	var chaMod = Math.floor((chaStat-10)/2);
	var skillsArray = [data.acro, data.anim, data.arca, data.athl, data.dece, data.hist, data.insi, data.inti, data.inve, data.medi, data.natu, data.perc, data.perf, data.pers, data.reli, data.slei, data.stea, data.surv];
	for(var i=0; i < skillsArray.length; i++) {
		var idString = "#skill_" + [i];
		if(skillsArray[i] === true) {
			if($(idString).hasClass("str") === true){
				$(idString).text(strMod + 2);
			} else if($(idString).hasClass("dex") === true){
				$(idString).text(dexMod + 2);
			} else if($(idString).hasClass("con") === true){
				$(idString).text(conMod + 2);
			} else if($(idString).hasClass("inte") === true){
				$(idString).text(inteMod + 2);
			} else if($(idString).hasClass("wis") === true){
				$(idString).text(wisMod + 2);	
			} else if($(idString).hasClass("cha") === true){
				$(idString).text(chaMod + 2);
			}
		} else{
			if($(idString).hasClass("str") === true){
				$(idString).text(strMod);
			} else if($(idString).hasClass("dex") === true){
				$(idString).text(dexMod);
			} else if($(idString).hasClass("con") === true){
				$(idString).text(conMod);
			} else if($(idString).hasClass("inte") === true){
				$(idString).text(inteMod);
			} else if($(idString).hasClass("wis") === true){
				$(idString).text(wisMod);
			} else if($(idString).hasClass("cha") === true){
				$(idString).text(chaMod);
			} else{}
		}
	}	
};

//Spells Section

$(document).on("click", ".spellName", function(){
	$(".spell").hide();
	var id = this.id;
	console.log(id);
	var newId = ("#" +id + "1");
	console.log(newId);
	$(newId).show();
});

$(".cantripPanel").click(function(){
	$("#cantripBody").empty();
	$.get("api/spells/" + character, function(data) {
		for(var i =0; i <data.length; i++) {
			if(data[i].level == "cantrip"){
				var readableName = data[i].name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
				var spellObject = $("<div class='spellObject'>");
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$(spellObject).append(spellName);
				$(spellObject).append("<button class='delete' id='" + data[i].id + "'>X</button>");
				$("#cantripBody").append(spellObject);
			}else{}
		}
	});
});

$(".onePanel").click(function(){
	$("#oneBody").empty();
	$.get("api/spells/" + character, function(data) {
		for(var i =0; i <data.length; i++) {
			if(data[i].level == "one"){
				var readableName = data[i].name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
				var spellObject = $("<div class='spellObject'>");
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$(spellObject).append(spellName);
				$(spellObject).append("<button class='delete' id='" + data[i].id + "'>X</button>");
				$("#oneBody").append(spellObject);
			}else{}
		}
	});
})

$(".twoPanel").click(function(){
	$("#twoBody").empty();
	$.get("api/spells/" + character, function(data) {
		for(var i =0; i <data.length; i++) {
			if(data[i].level == "two"){
				var readableName = data[i].name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
				var spellObject = $("<div class='spellObject'>");
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$(spellObject).append(spellName);
				$(spellObject).append("<button class='delete' id='" + data[i].id + "'>X</span></button>");
				$("#twoBody").append(spellObject);
			}else{}
		}
	});
});

//Notes Section

$("#addNoteButton").click(function() {
	console.log("am I clicking?");
	var noteText = $("#noteTextArea").val();
	var newNote = {
		note: noteText,
		category: noteCategory,
		character: character
	}
	$.post("api/new_note", newNote)
		.done(function(data) {
			console.log("data");
		});
	displayNotes();
});

$("#allyNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "#e62a2a");
	$("#allyNoteButton").css("background", "#ff6161");
	$(".noteCategoryDisplay").hide();
	$("#allyNoteDisplay").show();
	noteCategory = "ally";
});

$("#enemyNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "#e62a2a");
	$("#enemyNoteButton").css("background", "#ff6161");
	$(".noteCategoryDisplay").hide();
	$("#enemyNoteDisplay").show();
	noteCategory = "enemy";
});

$("#orgNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "#e62a2a");
	$("#orgNoteButton").css("background", "#ff6161");
	$(".noteCategoryDisplay").hide();
	$("#orgNoteDisplay").show();
	noteCategory = "org";
});

$("#backstoryNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "#e62a2a");
	$("#backstoryNoteButton").css("background", "#ff6161");
	$(".noteCategoryDisplay").hide();
	$("#backstoryNoteDisplay").show();
	noteCategory = "backstory";
});

$("#otherNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "#e62a2a");
	$("#otherNoteButton").css("background", "#ff6161");
	$(".noteCategoryDisplay").hide();
	$("#otherNoteDisplay").show();
	noteCategory = "other";
});

$(document).on("click", ".deleteNote", function(){
	var noteId = $(this).parent().attr("id");
	$.ajax({
		method: "DELETE",
		url: "/api/deleteNote/" + noteId
	})
	.done(function(deldata) {
		displayNotes();
	});
});

/*$(document).on("click", ".editNote", function(){
	updateNoteId = $(this).parent().attr("id");
	$("#updateNoteButton").show();
	console.log($(this).parent().text());
	$("#noteTextArea").text($(this).parent().text());
});

$("#updateNoteButton").click(function() { 
	$.ajax({
		method: "PUT",
		url: "/api/updateNote/" + updateNoteId,
		data: {
			note: $("#noteTextArea").text()
		}
	})
	.done(function() {
		displayNotes();
	});
});*/

$(document).on("click", ".delete", function(){
	var spellId = parseInt(this.id);
	$(this).text("Deleted");
	$.ajax({
		method: "DELETE",
		url: "api/deleteSpell/" + spellId
	})
	.done(function(deldata) {
	});
});

function displayNotes() {
	$(".noteCategoryDisplay").empty();
	$.get("api/notes/" + character, function(data) {
		for(i=0; i < data.length; i++) {
			var noteDiv = $("<div class='row'>");
			noteDiv.attr("id", data[i].id);
			noteDiv.attr("class", "appendedNote");
			noteDiv.append("<div class='col-sm-10'>- " + data[i].note + "</div>");
			//noteDiv.append("<div class='editNote'><span class='glyphicon glyphicon-pencil'></span></div>");
			noteDiv.append("<div class='col-sm-1 deleteNote'><span class='glyphicon glyphicon-remove'></span></div>");
			if(data[i].category === "ally") {
				$("#allyNoteDisplay").append(noteDiv);
			} else if(data[i].category === "enemy") {
				$("#enemyNoteDisplay").append(noteDiv);
			} else if(data[i].category === "org") {
				$("#orgNoteDisplay").append(noteDiv);
			} else if(data[i].category === "backstory") {
				$("#backstoryNoteDisplay").append(noteDiv);
			} else if(data[i].category === "other") {
				$("#otherNoteDisplay").append(noteDiv);
			}
		}
	});
}

//Items Section

$("#itemsButton").click(function(){
	$(".inventoryDisplay").hide();
	$("#items").show();
	renderItems()
});

$(document).on("click", ".deleteItemButton", function(){
	var itemId = $(this).parent().attr("id");
	$.ajax({
		method: "DELETE",
		url: "api/deleteItem/" + itemId
	})
	.done(function(deldata) {
		renderItems();
	});
});

$(document).on("click", ".updateOwnerButton", function() {
	$("#itemTransferMenu").show();
	transferItemId = $(this).parent().attr("id");
});

$("#transferButton").click(function() {
	var recipient = $("#itemTransfer").val().trim();
	var newOwner = {
		id: transferItemId,
		owner: recipient};
	$.ajax({
      method: "PUT",
      url: "/api/updateItem/" + transferItemId,
      data: newOwner
    })
    .done(function() {
    	$("#itemTransferMenu").hide();
    	renderItems();
    });
});

$(document).on("click", ".itemName", function(){
	var description = $(this).children().attr("id");
	if(itemDescriptionToggle === true){
		$("#" + description).show();
		itemDescriptionToggle = false;
	}else if(itemDescriptionToggle === false){
		$("#" + description).hide();
		itemDescriptionToggle = true;
	}else{}
});

$("#addItem").click(function(){
	var item = $("#nameField").val().trim();
	var description = $("#descriptionField").val().trim();
	var owner = $("#ownerField").val().trim();
	var newItem = {
		item: item,
		description: description,
		owner: owner
	};
	$.post("/api/new/item", newItem)
		.done(function(data) {
		});
	$("#itemForm").hide();
	$("#itemsDisplayArea").show();
	renderItems();
});

$("#newItemButton").click(function(){
	$("#itemsDisplayArea").hide();
	$("#itemForm").show();
	$("#newItemButton").hide();
});

function renderItems() {
	$("#itemsDisplayArea").empty();
	$.get("api/items/" + character, function(data) {
		for(i=0; i < data.length; i++) {
			var itemDiv = $("<div class='row itemRow'>");
			itemDiv.attr("id", data[i].id);
			itemDiv.append("<div class='col-sm-8 itemName'>" + data[i].item + "<p class='itemHidden' id='itemDescription" + [i] + "'>" + data[i].description + "</p></div>");
			itemDiv.append("<div class='col-sm-1 deleteItemButton'><span class='glyphicon glyphicon-remove'></span></div>");
			itemDiv.append("<div class='col-sm-1 updateOwnerButton'><span class='glyphicon glyphicon-transfer'></span></div>");
			$("#itemsDisplayArea").prepend(itemDiv);
		}
	});
	$("#newItemButton").show();
}

// Hp Section

$("#addHp").click(function(){
	addHp();
});

$("#subHp").click(function(){
	subHp();
});

function displayHp() {
	$("#currentHp").text(currentHp);
}

function addHp() {
	currentHp ++;
	$("#currentHp").text(currentHp);
};

function subHp() {
	currentHp --;
	$("#currentHp").text(currentHp);
};  

//Weapons Section

$("#weaponsButton").click(function(){
	$(".inventoryDisplay").hide();
	$("#weapons").show();
	$("#weapons").empty();
	renderWeapons();
});

$(document).on("click", ".weaponObject", function(){
	var properties = $(this).parent().attr("id");
	if(weaponPropertiesToggle === true){
		$("#weapon" + properties).show();
		weaponPropertiesToggle = false;
	}else if(weaponPropertiesToggle === false){
		$("#weapon" + properties).hide();
		weaponPropertiesToggle = true;
	}else{}
});

function renderWeapons() {
	$.get("/api/weapons/" + character, function(data) {
		getWeaponStats(data)
	});
};

function getWeaponStats(data) {
	for(i=0; i<data.length; i++){
		console.log(data[i].weapon);
		$.get("/api/weaponStats/" + data[i].weapon, function(data) {
			displayWeaponStats(data);
		});
	}
};

function displayWeaponStats(data){
	console.log(data);
	var weaponDiv = $("<div class='row weaponRow'>");
	weaponDiv.attr("id", data.id);
	weaponDiv.append("<div class='row weaponObject'><div class='weaponName'>" + data.name + ":</div><div class='weaponDamage'>" + data.damage + " damage</div></div>");
	weaponDiv.append("<div class='row weaponProperties' id='weapon" + data.id + "'>" + data.properties + "</div>");
	$("#weapons").append(weaponDiv);
}

//Gold Section

$("#goldButton").click(function(){
	$(".inventoryDisplay").hide();
	$("#gold").show();
});

$("#goldSubmit").click(function(){
	var updatedGold = $("#goldField").val().trim();
	var newAmount = {
		name: character,
		gold: updatedGold};
	$.ajax({
      method: "PUT",
      url: "/api/updateGold/" + character,
      data: newAmount
    })
    .done(function() {
    	renderGold();
    	$("#goldField").val(" ");
    })
});

function renderGold() {
	$.get("/api/character_stats/" + character, function(data) {
		$("#goldDisplay").text("Gold: " + data.gold);
	});
};
