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
var person = "";
var character = "";
var characterLearn;
var spellObject;
var cantrips = [];
var lvl1 = [];
var lvl2 = [];
var fenlaSpells;
var reginaSpells;
var aleaSpells;
var fannarSpells;
var syndirSpells;
var scepterSpells;
var user;
var arrayLength;


$(document).on("click", ".spellName", function(){
	$(".spell").hide();
	var id = this.id;
	console.log(id);
	var newId = ("#" +id + "1");
	console.log(newId);
	$(newId).show();
})

$("#search").click(function(){
	var search = $("#searchForm").val().trim().toLowerCase();
	$(".learn").remove();
	console.log(search);
	$(".spell").hide();
	$('.'+search).show();
	if($(".spell").is(":visible")){
		$(".panel-heading").append("<button class='learn'>Learn</button>");
	}
})

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
});


$(".character").click(function(){
	$(".spell").hide();
	character = this.id
	console.log(character);
	$(".fenla, .clithsbee, .scepter, .alea, .fannar, .regina, .syndir, .franco").hide();
	$("."+character).show();
	$.get("/api/character_stats/" + character, function(data) {
		renderStats(data);
	})
})

$(".cantripPanel").click(function(){
	console.log(cantrips);
	$("#cantripBody").empty();
	$.get("api/spells/" + character, function(data) {
		for(var i =0; i <data.length; i++) {
			if(data[i].level == "cantrip"){
				var readableName = data[i].name.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$("#cantripBody").append(spellName);
				$("#cantripBody").append("<button class='delete' id='" + data[i].id + "'>Delete Spell</button>");
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
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$("#oneBody").append(spellName);
				$("#oneBody").append("<button class='delete' id='" + data[i].id + "'>Delete Spell</button>");
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
				var spellName = $("<div>");
				spellName.addClass("spellName");
				spellName.attr("id", data[i].name);
				spellName.append("<h2>"+readableName+"</h2>");
				$("#twoBody").append(spellName);
				$("#twoBody").append("<button class='delete' id='" + data[i].id + "'>Delete Spell</button>");
			}else{}
		}
	});
})
/*function pushSpells(){
	if(character=="fenla"){
		console.log(fenlaSpells.cantrips);
		var fenlaCantrips = fenlaSpells.cantrips;
		for(i=0; i<fenlaCantrips.length; i++){
			console.log(fenlaCantrips[i]);
			cantrips.push(fenlaSpells.cantrips[i]);
		}
		var fenlaLvl1 = fenlaSpells.lvl1;
		for(i=0; i<fenlaLvl1.length; i++){
			console.log(fenlaLvl1[i]);
			lvl1.push(fenlaSpells.lvl1[i]);
		}
		var fenlaLvl2 = fenlaSpells.lvl2;
		for(i=0; i<fenlaLvl2.length; i++){
			console.log(fenlaLvl2[i]);
			lvl2.push(fenlaSpells.lvl2[i]);
		}	
	}else if(character=="regina"){
		console.log(reginaSpells);
		var reginaCantrips = reginaSpells.cantrips;
		for(i=0; i<reginaCantrips.length; i++){
			console.log(reginaCantrips[i]);
			cantrips.push(reginaSpells.cantrips[i]);
		}
		var reginaLvl1 = reginaSpells.lvl1;
		for(i=0; i<reginaLvl1.length; i++){
			console.log(reginaLvl1[i]);
			lvl1.push(reginaSpells.lvl1[i]);
		}
		var reginaLvl2 = reginaSpells.lvl2;
		for(i=0; i<reginaLvl2.length; i++){
			console.log(reginaLvl2[i]);
			lvl2.push(reginaSpells.lvl2[i]);
		}
	}else if(character=="alea"){
		console.log(aleaSpells);
		var aleaCantrips = aleaSpells.cantrips;
		for(i=0; i<aleaCantrips.length; i++){
			console.log(aleaCantrips[i]);
			cantrips.push(aleaSpells.cantrips[i]);
		}
		var aleaLvl1 = aleaSpells.lvl1;
		for(i=0; i<aleaLvl1.length; i++){
			console.log(aleaLvl1[i]);
			lvl1.push(aleaSpells.lvl1[i]);
		}
		var aleaLvl2 = aleaSpells.lvl2;
		for(i=0; i<aleaLvl2.length; i++){
			console.log(aleaLvl2[i]);
			lvl2.push(aleaSpells.lvl2[i]);
		}
	}else if(character=="fannar"){
		console.log(fannarSpells);
		var fannarCantrips = fannarSpells.cantrips;
		for(i=0; i<fannarCantrips.length; i++){
			console.log(fannarCantrips[i]);
			cantrips.push(fannarSpells.cantrips[i]);
		}
		var fannarLvl1 = fannarSpells.lvl1;
		for(i=0; i<fannarLvl1.length; i++){
			console.log(fannarLvl1[i]);
			lvl1.push(fannarSpells.lvl1[i]);
		}
		var fannarLvl2 = fannarSpells.lvl2;
		for(i=0; i<fannarLvl2.length; i++){
			console.log(fannarLvl2[i]);
			lvl2.push(fannarSpells.lvl2[i]);
		}
	}else if(character=="syndir"){
		console.log(syndirSpells);
		var syndirCantrips = syndirSpells.cantrips;
		for(i=0; i<syndirCantrips.length; i++){
			console.log(syndirCantrips[i]);
			cantrips.push(syndirSpells.cantrips[i]);
		}
		var syndirLvl1 = syndirSpells.lvl1;
		for(i=0; i<syndirLvl1.length; i++){
			console.log(syndirLvl1[i]);
			lvl1.push(syndirSpells.lvl1[i]);
		}
		var syndirLvl2 = syndirSpells.lvl2;
		for(i=0; i<syndirLvl2.length; i++){
			console.log(syndirLvl2[i]);
			lvl2.push(syndirSpells.lvl2[i]);
		}
	}else if(character=="scepter"){
		console.log(scepterSpells);
		var scepterCantrips = scepterSpells.cantrips;
		for(i=0; i<scepterCantrips.length; i++){
			console.log(scepterCantrips[i]);
			cantrips.push(scepterSpells.cantrips[i]);
		}
		var scepterLvl1 = scepterSpells.lvl1;
		for(i=0; i<scepterLvl1.length; i++){
			console.log(scepterLvl1[i]);
			lvl1.push(scepterSpells.lvl1[i]);
		}
		var scepterLvl2 = scepterSpells.lvl2;
		for(i=0; i<scepterLvl2.length; i++){
			console.log(scepterLvl2[i]);
			lvl2.push(scepterSpells.lvl2[i]);
		}
	}else{}
}*/

$(".chapter").click(function(){
	$(".chapterText").hide();
	var chapterId = this.id;
	var findChapter = (chapterId+"Content");
	$("#"+findChapter).show();
});

$(document).on("click", ".delete", function(){
	var spellId = parseInt(this.id);
	$.ajax({
		method: "DELETE",
		url: "api/delete/" + spellId
	})
	.done(function(deldata) {
		console.log(deldata);
		console.log("Deleted Successfully!");
	});
});
database.ref().on("value", function(snapshot){
	spellObject = snapshot.val();
	fenlaSpells = spellObject.fenla.spells;
	reginaSpells = spellObject.regina.spells;
	aleaSpells = spellObject.alea.spells;
	fannarSpells = spellObject.fannar.spells;
	syndirSpells = spellObject.syndir.spells;
	scepterSpells = spellObject.scepter.spells;

});

function renderStats(data) {
	$("#abilityScores").empty();
	$("#abilityScores").show();

	var div = $("<div>");

	div.append("<tr><th>Strength " + data.str + "</th></tr>");
	div.append("<tr><th>Dexterity " + data.dex + "</th></tr>");
	div.append("<tr><th>Constitution " + data.con + "</th></tr>");
	div.append("<tr><th>Wisdom " + data.wis + "</th></tr>");
	div.append("<tr><th>Intelligence " + data.inte + "</th></tr>");
	div.append("<tr><th>Charisma " + data.cha + "</th></tr>");

	$("#abilityScores").append(div);
}


