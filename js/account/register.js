(function($, d) {
	var flag = true;
	document.getElementById("verification").addEventListener("tap", function() {
		if (flag) {
			//计时
			if (true) {
				flag = false;
				var val = document.getElementById("verification")
				val.val = 60;
				var interval = setInterval(settime, 1000);
				setTimeout(function() {
					clearInterval(interval)
					val.innerText = "获取验证码";
					flag = true;
				}, (val.val + 1) * 1000)
			}
		}
	});

	function settime() {
		var val = document.getElementById("verification")
		val.innerText = "重新发送(" + val.val--+")";
	}
})(mui, document)