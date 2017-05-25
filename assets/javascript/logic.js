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
	var newId = (id+"1");
	console.log(newId);
	$("#"+newId).show();
})



$("#search").click(function(){
	var search = $("#searchForm").val().trim();
	$(".learn").remove();
	console.log(search);
	$(".spell").hide();
	$('.'+search).show();
	if($(".spell").is(":visible")){
		$(".spell").append("<button class='learn'>Learn</button>");
	}
})

$(".choose").click(function(){
	var userA = this.id;
	character = userA.replace("A", "");
	console.log(character);
})

$(document).on("click", ".learn", function(){
	pushSpells();
	var newId = ($(this).parent().attr('id'));
	var newSpell = newId.replace("1", "");
	if($(this).parent().hasClass("cantrip")){
		if(character == "fenla"){
			var fenlaCantrips = fenlaSpells.cantrips;
			arrayLength = $(fenlaCantrips).length;
			if(fenlaSpells.cantrips[0] == "empty"){
				database.ref("/fenla/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="regina"){
			var reginaCantrips = reginaSpells.cantrips;
			arrayLength = $(reginaCantrips).length;
			if(reginaSpells.cantrips[0] == "empty"){
				database.ref("/regina/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="alea"){
			var aleaCantrips = aleaSpells.cantrips;
			arrayLength = $(aleaCantrips).length;
			if(aleaSpells.cantrips[0] == "empty"){
				database.ref("/alea/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="fannar"){
			var fannarCantrips = fannarSpells.cantrips;
			arrayLength = $(fannarCantrips).length;
			if(fannarSpells.cantrips[0] == "empty"){
				database.ref("/fannar/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="scepter"){
			var scepterCantrips = scepterSpells.cantrips;
			arrayLength = $(scepterCantrips).length;
			if(scepterSpells.cantrips[0] == "empty"){
				database.ref("/scepter/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="syndir"){
			var syndirCantrips = syndirSpells.cantrips;
			arrayLength = $(syndirCantrips).length;
			if(syndirSpells.cantrips[0] == "empty"){
				database.ref("/syndir/spells/cantrips").set({
					0: newSpell
				})		
			}else{			
				database.ref("/"+character+"/spells/cantrips").update({
					[arrayLength]: newSpell
				})
			}
		}else{}
		
	} else if($(this).parent().hasClass("one")){
		if(character == "fenla"){
			var fenlaOne = fenlaSpells.lvl1;
			arrayLength = $(fenlaOne).length;
			if(fenlaSpells.lvl1[0] == "empty"){
				database.ref("/fenla/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="regina"){
			var reginaOne = reginaSpells.lvl1;
			arrayLength = $(reginaOne).length;
			if(reginaSpells.lvl1[0] == "empty"){
				database.ref("/regina/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="alea"){
			var aleaOne = aleaSpells.lvl1;
			arrayLength = $(aleaOne).length;
			if(aleaSpells.lvl1[0] == "empty"){
				database.ref("/alea/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="fannar"){
			var fannarOne = fannarSpells.lvl1;
			arrayLength = $(fannarOne).length;
			if(fannarSpells.lvl1[0] == "empty"){
				database.ref("/fannar/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="scepter"){
			var scepterOne = scepterSpells.lvl1;
			arrayLength = $(scepterOne).length;
			if(scepterSpells.lvl1[0] == "empty"){
				database.ref("/scepter/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="syndir"){
			var syndirOne = syndirSpells.lvl1;
			arrayLength = $(syndirOne).length;
			if(syndirSpells.lvl1[0] == "empty"){
				database.ref("/syndir/spells/lvl1").set({
					0: newSpell
				})		
			}else{
				database.ref("/"+character+"/spells/lvl1").update({
					[arrayLength]: newSpell
				})
			}
		}

	} else if($(this).parent().hasClass("two")){
		if(character == "fenla"){
			var fenlaTwo = fenlaSpells.lvl2;
			arrayLength = $(fenlaTwo).length;
			if(fenlaSpells.lvl2[0] == "empty"){
				database.ref("/fenla/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="regina"){
			var reginaTwo = reginaSpells.lvl2;
			arrayLength = $(reginaTwo).length;
			if(reginaSpells.lvl2[0] == "empty"){
				database.ref("/regina/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="alea"){
			var aleaTwo = aleaSpells.lvl2;
			arrayLength = $(aleaTwo).length;
			if(aleaSpells.lvl2[0] == "empty"){
				database.ref("/alea/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="fannar"){
			var fannarTwo = fannarSpells.lvl2;
			arrayLength = $(fannarTwo).length;
			if(fannarSpells.lvl2[0] == "empty"){
				database.ref("/fannar/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="scepter"){
			var scepterTwo = scepterSpells.lvl2;
			arrayLength = $(scepterTwo).length;
			if(scepterSpells.lvl2[0] == "empty"){
				database.ref("/scepter/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}else if(character=="syndir"){
			var syndirTwo = syndirSpells.lvl2;
			arrayLength = $(syndirTwo).length;
			if(syndirSpells.lvl2[0] == "empty"){
				database.ref("/syndir/spells/lvl2").set({
					0: newSpell
				})		
			}else{	
				database.ref("/"+character+"/spells/lvl2").update({
					[arrayLength]: newSpell
				})
			}
		}
	}				
})	


$(".character").click(function(){
	$(".spell").hide();
	cantrips = [];
	lvl1 = [];
	lvl2 = [];
	character = this.id
	console.log(character);
	$(".fenla, .clithsbee, .scepter, .alea, .fannar, .regina, .syndir, .franco").hide();
	$("."+character).show();
	pushSpells();
})

$(".cantripPanel").click(function(){
	console.log(cantrips);
	if( !$.trim( $("#"+character+"CantripBody").html() ).length ){
		for(i=0; i<cantrips.length; i++){
			var readableName = cantrips[i].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
			var firstCan = ("<h2 class='spellName' id='"+cantrips[i]+"'>"+readableName+"</h2>");
			console.log(firstCan);
			$("#"+character+"CantripBody").append(firstCan);
		}
	} else{}
})

$(".onePanel").click(function(){
	if( !$.trim( $("#"+character+"OneBody").html() ).length ){
		for(i=0; i<lvl1.length; i++){
			var readableName = lvl1[i].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
			var firstSpell = ("<h2 class='spellName' id='"+lvl1[i]+"'>"+readableName+"</h2>");
			console.log(firstSpell);
			$("#"+character+"OneBody").append(firstSpell);
		}
	} else{}
})

$(".twoPanel").click(function(){
	if( !$.trim( $("#"+character+"TwoBody").html() ).length ){
		for(i=0; i<lvl2.length; i++){
			var readableName = lvl2[i].replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })
			var firstSpell = ("<h2 class='spellName' id='"+lvl2[i]+"'>"+readableName+"</h2>");
			console.log(firstSpell);
			$("#"+character+"TwoBody").append(firstSpell);
		}
	} else{}
})
function pushSpells(){
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
}

$("#deleteSpells").click(function(){
	console.log(character+"delete");
	if(character == "fenla"){
		console.log("hey")
		database.ref("fenla/spells/lvl1").set({
			0: "empty"
		})
		database.ref("fenla/spells/lvl2").set({
			0: "empty"
		})
		console.log(fenlaSpells.lvl1);
	}else if(character == "regina"){
		database.ref("regina/spells/lvl1").set({
			0: "empty"
		})
		database.ref("regina/spells/lvl2").set({
			0: "empty"
		})
	}else if(character == "alea"){
		database.ref("alea/spells/lvl1").set({
			0: "empty"
		})
		database.ref("alea/spells/lvl2").set({
			0: "empty"
		})
	}else if(character == "fannar"){
		database.ref("fannar/spells/lvl1").set({
			0: "empty"
		})
		database.ref("fannar/spells/lvl2").set({
			0: "empty"
		})
	}else if(character == "scepter"){
		database.ref("scepter/spells/lvl1").set({
			0: "empty"
		})
		database.ref("scepter/spells/lvl2").set({
			0: "empty"
		})
	}else if(character == "syndir"){
		database.ref("syndir/spells/lvl1").set({
			0: "empty"
		})
		database.ref("syndir/spells/lvl2").set({
			0: "empty"
		})
	}else{}

	$("#deleteMessage").text((character.charAt(0).toUpperCase())+(character.slice(1))+"'s spells deleted").delay(1500).fadeOut(200);
});

database.ref().on("value", function(snapshot){
	spellObject = snapshot.val();
	fenlaSpells = spellObject.fenla.spells;
	reginaSpells = spellObject.regina.spells;
	aleaSpells = spellObject.alea.spells;
	fannarSpells = spellObject.fannar.spells;
	syndirSpells = spellObject.syndir.spells;
	scepterSpells = spellObject.scepter.spells;

})	

