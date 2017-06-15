var damageDealt;
var heroSpeed;
var enemySpeed;
var currentEnemy;

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
				$("#enemyHp").text("Hp: " + enemy.hp);
				checkDeath(hero, enemy);
				setTimeout(function(){
					heroAttack(x);
				}, 500);	
			}
		}
		heroAttack(0);
		if(enemy.hp > 0){
			setTimeout(function(){	
				enemy.attack();
				hero.hp -= damageDealt;
				heroLoseLife();
				$("#heroHp").text("Hp: " + hero.hp);
				checkDeath(hero, enemy);
			}, 1000);
			$("#heroHp").text("Hp: " + hero.hp);
			$(".enemyHp").text("Hp: " + enemy.hp);
		}	
	}else{}
}

function checkDeath(hero, enemy){
	if(hero.hp <= 0 && enemy.hp >0){
		console.log("You Lose...");
	}else if (hero.hp > 0 && enemy.hp <=0){
		console.log("You Win!!");
	}else {}
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

$(document).on("click", ".generated", function(){
	currentEnemy = this.id;
	combat(fenla, currentEnemy);
	console.log(currentEnemy);
})

function enemyLoseLife(){
	$(".damageTaken").empty();
	var damageNumber = $("<div class='damageAnimate'>" + damageDealt + "</div>");
	$("#enemy").find(".damageTaken").append(damageNumber);
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
	for(i=0; i<number; i++){
		randHp = ((Math.floor(Math.random() * name.hp)) + 10);
		name[i] = new Enemy(name.name, randHp, name.strength);
		console.log(name[i]);
		var newObject = $("<div>").attr("class", "generated").attr("id", name.name+"["+i+"]");
		console.log(newObject);
		var statBox = $("#enemy").append(newObject);
		$("#"+name.name+i).html("<span>Hp: "+name[i].hp+"</span>");
		generateEnemyButtons();
	}

}

function generateEnemyButtons(){
	$("#enemyButtonArea").append("<div class='enemyButtons'>"+i);
}

summonEnemies(ogre, 4);
console.log(ogre[1-1]);
