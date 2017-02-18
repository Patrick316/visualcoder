var timers = [];
function createCircuitTimer(timeInterval){
	return {
		time: timeInterval
		, interval: null
		, running: false
		, start: function(callMe){
			if(this.running !== true){
				this.interval = setInterval(callMe, 1000);
				this.running = true;
			}
		}
		, stop: function(){
			if(this.running === true){
				clearInterval(this.interval);
				this.running = false;
			}
		}
	};
};
var timer = createCircuitTimer(1000);
timer.start(function(){
	console.log("working");
});

