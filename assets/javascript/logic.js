var config = {
    apiKey: "AIzaSyD3VjM28WcPH62zDqDl_Ftmk9trgbqviQU",
    authDomain: "grimore-c74c2.firebaseapp.com",
    databaseURL: "https://grimore-c74c2.firebaseio.com",
    projectId: "grimore-c74c2",
    storageBucket: "grimore-c74c2.appspot.com",
    messagingSenderId: "814042999572"
  };
  firebase.initializeApp(config);

var database = firebase.database();
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

$(document).on("click", ".spellName", function(){
	$(".spell").hide();
	var id = this.id;
	console.log(id);
	var newId = ("#" +id + "1");
	console.log(newId);
	$(newId).show();
});

$("#search").click(function(){
	var search = $("#searchForm").val().trim().toLowerCase();
	var level = $("#levelSearch").val().trim();
	console.log(level);
	$(".learn").remove();
	console.log(search);
	$(".spell").hide();
	$("." + search + "." + level).show();
	if($(".spell").is(":visible")){
		$(".panel-heading").append("<button class='learn'>Learn</button>");
	}
});

$("#searchForm").keyup(function(event){
    if(event.keyCode == 13){
        $("#search").click();
    }
});

$(".choose").click(function(){
	var userA = this.id;
	characterLearn = userA.replace("A", "");
	console.log(character);
	$(".choose").css("background", "white")
	$(this).css("background", "#46ce46");
})

$(document).on("click", ".learn", function(){
	var nameOfSpell = $(this).parent().parent().attr("id");
	var levelOfSpell = $(this).parent().parent().attr("class").split(" ").pop();
	var editedName = nameOfSpell.slice(0, -1);
	console.log(editedName);
	event.preventDefault();
	var newSpell = {
		name: editedName,
		level: levelOfSpell,
		character: characterLearn
	};

	$.post("/api/new", newSpell)
		.done(function(data) {
			console.log(data);
		});
	$(this).text("Learned");
});

$(".character").click(function(){
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

$("#skillsPanel").click(function(){
	$.get("/api/skills/" + character, function(data) {
		renderSkills(data);
	}).then(function() {

	});
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
})

$(".chapter").click(function(){
	$(".chapterText").hide();
	var chapterId = this.id;
	var findChapter = (chapterId+"Content");
	$("#"+findChapter).show();
});

$("#addNoteButton").click(function() {
	var noteText = $("#noteTextArea").val();
	var newNote = {
		note: noteText,
		category: noteCategory,
		character: character
	}
	$.post("api/new_note", newNote)
		.done(function(data) {
			console.log(data);
			displayNotes();
		});
});

$("#allyNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "white");
	$("#allyNoteButton").css("background", "green");
	$(".noteCategoryDisplay").hide();
	$("#allyNoteDisplay").show();
	noteCategory = "ally";
});

$("#enemyNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "white");
	$("#enemyNoteButton").css("background", "green");
	$(".noteCategoryDisplay").hide();
	$("#enemyNoteDisplay").show();
	noteCategory = "enemy";
});

$("#orgNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "white");
	$("#orgNoteButton").css("background", "green");
	$(".noteCategoryDisplay").hide();
	$("#orgNoteDisplay").show();
	noteCategory = "org";
});

$("#backstoryNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "white");
	$("#backstoryNoteButton").css("background", "green");
	$(".noteCategoryDisplay").hide();
	$("#backstoryNoteDisplay").show();
	noteCategory = "backstory";
});

$("#otherNoteButton").click(function() {
	$(".noteCategoryButton").css("background", "white");
	$("#otherNoteButton").css("background", "green");
	$(".noteCategoryDisplay").hide();
	$("#otherNoteDisplay").show();
	noteCategory = "other";
});

$(document).on("click", ".deleteNote", function(){
	var noteId = $(this).parent().attr("id");
	console.log(noteId);
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
		console.log(deldata);
		console.log("Deleted Successfully!");
	});
});


$("#addHp").click(function(){
	addHp();
});

$("#subHp").click(function(){
	subHp();
});

function renderStats(data) {
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
}

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
}

function displayNotes() {
	$(".noteCategoryDisplay").empty();
	$.get("api/notes/" + character, function(data) {
		for(i=0; i < data.length; i++) {
			var noteDiv = $("<div>");
			noteDiv.attr("id", data[i].id);
			noteDiv.attr("class", "appendedNote");
			noteDiv.append(data[i].note);
			//noteDiv.append("<div class='editNote'><span class='glyphicon glyphicon-pencil'></span></div>");
			noteDiv.append("<div class='deleteNote'><span class='glyphicon glyphicon-remove'></span></div>");
			if(data[i].category === "ally") {
				console.log(data[i].note);
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


function displayHp() {
	$("#currentHp").text(currentHp);
}

function addHp() {
	currentHp ++;
	$("#currentHp").text(currentHp);
}

function subHp() {
	currentHp --;
	$("#currentHp").text(currentHp);
}