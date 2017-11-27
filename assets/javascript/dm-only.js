var currentHp;
var strStat;
var dexStat;
var conStat;
var inteStat;
var wisStat;
var chaStat;
var character = "";

$(".character").click(function(){
	$("#weapons").hide();
	$("#items").hide();
	$("#gold").hide();
	$(".spell").hide();
	character = this.id
	console.log(character);
	$(".humphrey, .moro").hide();
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
	console.log(data.xp);
	$("#xpProgressFill").text(data.xp + "/2700");
	var xpPercentage = (data.xp/2700) * 100;
	$("#xpProgressFill").css("width", xpPercentage + "%");
};

function displayHp() {
	$("#currentHpDM").text(currentHp);
}

function addHp() {
	currentHp ++;
	$("#currentHpDM").text(currentHp);
};

function subHp() {
	currentHp --;
	$("#currentHpDM").text(currentHp);
}; 