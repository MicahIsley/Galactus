var damageDealt;
var heroSpeed;
var enemySpeed;
var currentEnemy;
var number;
var typeOfEnemy;
var currentHero = fenla;

function Hero(race, role, hp, strength, constitution, dexterity, intelligence, wisdom, charisma){
	this.race = race;
	this.role = role;
	this.hp = hp;
	this.strength = strength;
	this.constitution = constitution;
	this.dexterity = dexterity;
	this.intelligence = intelligence;
	this.wisdom = wisdom;
	this.charisma = charisma;

}

function Enemy(name, hp, strength){
	this.name = name;
	this.hp = hp;
	this.strength = strength;
}

Hero.prototype.attack = function() {
	damageDealt = Math.ceil(Math.random() * this.strength);
	console.log("Hero Dmg: " + damageDealt);
}

Hero.prototype.speed = function() {
	var attackSpeed = Math.floor(Math.random() * this.dexterity);
	if(attackSpeed >= 10){
		heroSpeed = 2;
	}else{
		heroSpeed = 1;
	}
}



Enemy.prototype.attack = function() {
	damageDealt = Math.ceil(Math.random() * this.strength);
	console.log("Enemy Dmg: " + damageDealt);

}

var fenla = new Hero("gnome", "druid", 30, 10, 13, 15, 12, 16, 9);
	fenla.fireball = function(){
		damageDealt = ((Math.ceil(Math.random() * this.wisdom)) + 10);
		for(i = 0; i < 3; i++){
			number = parseInt(i);
			console.log(number);
			console.log(typeOfEnemy[i]);
			typeOfEnemy[i].hp -= damageDealt;
			$("#"+i).find(".hpDisplay").text("Hp: " + typeOfEnemy[i].hp);
			checkMassDeath(typeOfEnemy[i], i);
		}

	}
var moro = new Hero("human", "monk", 28, 8, 14, 16, 10, 11, 13);
var goblin = new Enemy("goblin", 14, 6);
var ogre = new Enemy("ogre", 15, 11);

function combat(hero, enemy){
	console.log(enemy);
	if(hero.hp > 0 && enemy.hp > 0){
		hero.speed();
		console.log("Speed: " + heroSpeed);
		function heroAttack(x){
			if (x < heroSpeed){
				x ++;
				hero.attack();
				enemy.hp -= damageDealt;
				enemyLoseLife();
				$("#"+number).find(".hpDisplay").text("Hp: " + enemy.hp);
				checkIndividualDeath(hero, enemy);
				setTimeout(function(){
					heroAttack(x);
				}, 500);	
			}
		}
		heroAttack(0);
	}else{}
}

function checkIndividualDeath(hero, enemy){
	console.log("hey");
	if(enemy.hp <= 0){
		$("#"+number).find(".hpDisplay").text("Hp: 0");
		setTimeout(function(){
			$("#"+number).remove();
		},1000);
	}else if(hero.hp <= 0 && enemy.hp >0){
		console.log("You Lose...");
	}else if (hero.hp > 0 && enemy.hp <=0){
		console.log("You Win!!");
	}else {}
}

function checkMassDeath(enemy, i){
	if(enemy.hp <= 0) {
		$("#"+i).find(".hpDisplay").text("Hp: 0");
		setTimeout(function(){
			$("#"+i).remove();
		},1000);
	}
}


$("#startButton").click(function(){
	$("#titleScreen").hide();
	$("#combatScreen").show();
	$("#heroHp").text(fenla.hp);
	$(".enemyHp").text(ogre.hp);
})

$("#adventureButton").click(function(){
	$("#titleScreen").hide();
	$("#adventureScreen").show();
})

$("#attackButton").click(function(){

})

$("#socialTesting").click(function(){
	$("#titleScreen").hide();
	$("#socialScreen").show();
})

$(document).on("click", ".generated", function(){
	number = parseInt(this.id);
	combat(fenla, typeOfEnemy[number]);
	setTimeout(function(){
		enemyCombat(fenla, typeOfEnemy[number]);
	}, 1000);	
})

function enemyLoseLife(){
	$(".damageTaken").empty();
	var damageNumber = $("<div class='damageAnimate'>" + damageDealt + "</div>");
	$("#"+number).find(".damageTaken").append(damageNumber);
	damageNumber.animate({ top: "-=15"}, "slow").delay(50).fadeOut(100);
}

function heroLoseLife(){
	$(".damageTaken").empty();
	var damageNumber = $("<div class='damageAnimate'>" + damageDealt + "</div>");
	$("#hero").find(".damageTaken").append(damageNumber);
	damageNumber.animate({ top: "-=15"}, "slow").delay(50).fadeOut(100);
}

$(document).keydown(function(e) {
    var hero = $("#playerHero");   
	switch(e.which) {
        case 37:
        	hero.animate({ left:"-=50px"}, "fast");
        break;

        case 38:
        	hero.animate({ top:"-=50"}, "fast");
        break;

        case 39:
        	hero.animate({ left:"+=50"}, "fast");
        break;

        case 40:
        	hero.animate({ top:"+=50"}, "fast");
        break;       
    }  
});

function summonEnemies(name, number){
	typeOfEnemy = name;
	for(i=0; i<number; i++){
		randHp = ((Math.floor(Math.random() * name.hp)) + 10);
		name[i] = new Enemy(name.name, randHp, name.strength);
		console.log(name[i]);
		var newObject = $("<div>").attr("class", "generated").attr("id", i);
		console.log(newObject);
		var statBox = $("#enemy").append(newObject);
		var enemyName = name.name.toUpperCase();
		$("#"+i).html("<div class='enemyName'>"+enemyName+"</div>").append("<span class='hpDisplay'>Hp: "+name[i].hp+"</span>").append("<span class='damageTaken'></span>");
	}

}

function doSetTimeout(i) {
  setTimeout(function() { 
  	typeOfEnemy[i].attack();
  	console.log(fenla.hp);
	fenla.hp -= damageDealt;
	heroLoseLife();
	$("#heroHp").text("Hp: " + fenla.hp);
	checkIndividualDeath(hero, enemy); }, i * 2000);
}

function enemyCombat(hero, enemy){
	//if(enemy.hp > 0){
		var enemyLength = $("#enemy > div").length;
		for(i=0; i<enemyLength; i++){
			doSetTimeout(i);

		}	
		$("#heroHp").text("Hp: " + hero.hp);
		$("#"+number).find(".hpDisplay").text("Hp: " + enemy.hp);
	//}
}

$("#specialButton").click(function(){
	fenla.fireball();
})

summonEnemies(goblin, 3);


