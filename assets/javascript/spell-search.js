//Global Variables

var characterLearn;

//Search Function 

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

// Pick who is learning spell

$(".choose").click(function(){
	var userA = this.id;
	characterLearn = userA.replace("A", "");
	console.log(character);
	$(".choose").css("background", "white")
	$(this).css("background", "#46ce46");
})

//Post new spell to database

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