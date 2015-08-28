var aniShow = "slide-in-right";
//关于backbutton和menubutton两个按键的说明，在iOS平台不存在，故需隐藏
if (!mui.os.android) {
	aniShow = "pop-in";
}
function listentHref(c, opt) { //传递主类，并且点击的链接加上class=open
	if (!opt) {
		opt = function() {
			return {}
		};
	}
	mui.plusReady(function() {
		c.on('tap', '.open', function() {
			var e = this;
			var id = this.getAttribute("data-href");
			var href = this.getAttribute("data-href");
			
			console.log(id)
			if (id) {
				mui.openWindow({
					id: id,
					url: href,
					styles: {
						popGesture: "close"
					},
					show: {
						aniShow: aniShow
					},
					waiting: {
						//						autoShow: false
					},
					extras: opt(e)
				});
			}
		});
	})

}