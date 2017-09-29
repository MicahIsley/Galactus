//Chapter function

$(".chapter").click(function(){
	$(".chapterText").hide();
	var chapterId = this.id;
	var findChapter = (chapterId+"Content");
	$("#"+findChapter).show();
});