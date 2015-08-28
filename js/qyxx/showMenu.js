(function($, d) {
	document.querySelector(".editor").addEventListener("tap", function() {
		var show = document.querySelector(".show-choose");
		//			console.log(show.className);
		if (show.className === "show-choose") {
			show.className += " mui-hidden";
		} else {
			show.className = "show-choose";
		}
	});
})(mui, document)