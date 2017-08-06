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
var characterLearn;
var currentHp;

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
	var level = $("#levelSearch").val().trim();
	console.log(level);
	$(".learn").remove();
	console.log(search);
	$(".spell").hide();
	$("." + search + "." + level).show();
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
	console.log(this);
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

$(document).on("click", ".delete", function(){
	var spellId = parseInt(this.id);
	$(this).text("Deleted");
	$.ajax({
		method: "DELETE",
		url: "api/delete/" + spellId
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
	$("#abilityScores").empty();
	$("#abilityScores").show();
	$("#maxHp").text(data.hp);
	currentHp = data.hp;
	console.log(currentHp);
	var div = $("<div>");
	div.append("<tr><th></th><th></th><th>Mod</th></tr>");
	div.append("<tr><th>Strength</th><th>" + data.str + "</th><th> " + Math.floor((data.str-=10)/2) + "</th></tr>");
	div.append("<tr><th>Dexterity</th><th>" + data.dex + "</th><th> " + Math.floor((data.dex-=10)/2) + "</th></tr>");
	div.append("<tr><th>Constitution</th><th>" + data.con + "</th><th> " + Math.floor((data.con-=10)/2) + "</th></tr>");
	div.append("<tr><th>Wisdom</th><th>" + data.wis + "</th><th> " + Math.floor((data.wis-=10)/2) + "</th></tr>");
	div.append("<tr><th>Intelligence</th><th>" + data.inte + "</th><th> " + Math.floor((data.inte-=10)/2) + "</th></tr>");
	div.append("<tr><th>Charisma</th><th>" + data.cha + "</th><th> " + Math.floor((data.cha-=10)/2) + "</th></tr>");
	$("#abilityScores").append(div);
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