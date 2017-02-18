/*
This code is incredibly long... however, I used only what we had available at this point in the
course to build this interactive animation. Feel free to use any part of it for experimentation.
What I want you to do is NOT to READ every line... but to grasp only the clues. With the right
visual idea map or interaction flow diagram, even the hardest project can be easy.
*/


//******* cursor vars **********
//fun cursor interval timer!!!
var cursorRate = 800;
var cursorTimer = null;
var cursorBlack = false;

//******* scene vars **********
//clue: I'm using this array to have a global way of accessing all the timers for a full reset later
var sceneTimers = [];
//clue: keeps track of which scene the script is in
var scene = 1;

//******* text vars **********
var textRate = 150;
var textLetterMinRate = 1;
var textLetterMaxRate = 3;

var ananthTextLength = 0;
var ananthText = "";
var julianTextLength = 0;
var julianText = "";
var cursorText = "<span class='cursor'>|</span>";
var ananthTextTimer = null;
var julianTextTimer = null;

//clue: function to create circuit timers or "smart interval timers"
function createCircuitTimer(timeInterval){
	return {
		time: timeInterval
		, interval: null
		, rotation: 0
		, running: false
		, start: function(callMe){
			//clue: remember the booleans!!!
			if(this.running !== true){
				this.interval = setInterval(callMe, this.time);
				this.running = true;
			}
		}
		, stop: function(){
			//clue: remember the booleans!!!
			if(this.running === true){
				clearInterval(this.interval);
				this.running = false;
			}
		}
	};
};
//function to create simple timers or "simply smart timers"
function createSimpleTimer(timeInterval){
	return {
		time: timeInterval
		, timer: null
		, running: false
		, start: function(callMe){
			if(this.running !== true){
				this.timer = setTimeout(callMe, this.time);
				this.running = true;
			}
		}
		, stop: function(){
			if(this.running === true){
				clearTimeout(this.timer);
				this.running = false;
			}
		}
	};
};

//function to reset the scene
function resetScene(){
	//clue: notice here that I have a global way of seeing all dynamic timers
	//this is an incredibly efficient way to go through questions... i mean object timers
	for(var i = 0; i < sceneTimers.length; i++){
		//clue: I can stop all timers in this global array
		sceneTimers[i].stop();
	}
	//clue: this allows for a safe reset of all timers
	sceneTimers = [];
	$(".overlay").html('');
	$(".overlay").removeAttr('style');
	ananthText = "";
	julianText = "";
	sceneComplete = false;
	$('#julian-text').html(cursorText);
	$('#ananth-text').html(cursorText);
	ananthTextLength = 0;
	julianTextLength = 0;
}

//function to get random integers between two numbers min and max
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//4-5-6 timer switch
function set456Timer0(){
	sceneTimers[0] = createCircuitTimer(250);
	sceneTimers[0].start(function(){
		sceneTimers[0].rotation++;
		if(sceneTimers[0].rotation > 2){
			sceneTimers[0].rotation = 0;
		}
		if(sceneTimers[0].rotation === 0){
			$('#overlay4').animate({
				opacity: 1
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay5').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay6').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
		}
		else if(sceneTimers[0].rotation === 1){
			$('#overlay4').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay5').animate({
				opacity: 1
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay6').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
		}
		else if(sceneTimers[0].rotation === 2){
			$('#overlay4').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay5').animate({
				opacity: 0
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
			$('#overlay6').animate({
				opacity: 1
			}, sceneTimers[0].time/2, function(){
				//Animation Complete
			});
		}
	});
}

//7-8 timer switch
function set78Timer1(){
	sceneTimers[1] = createCircuitTimer(800);
	sceneTimers[1].start(function(){
		sceneTimers[1].rotation++;
		if(sceneTimers[1].rotation > 1){
			sceneTimers[1].rotation = 0;
		}
		if(sceneTimers[1].rotation === 0){
			$('#overlay7').animate({
				opacity: 1
			}, sceneTimers[1].time/2, function(){
				//Animation Complete
			});
			$('#overlay8').animate({
				opacity: 0
			}, sceneTimers[1].time/2, function(){
				//Animation Complete
			});
		}
		else if(sceneTimers[1].rotation === 1){
			$('#overlay7').animate({
				opacity: 0
			}, sceneTimers[1].time/2, function(){
				//Animation Complete
			});
			$('#overlay8').animate({
				opacity: 1
			}, sceneTimers[1].time/2, function(){
				//Animation Complete
			});
		}
		
	});
}

//puts TAs in the scene
function setTAscene(){
	$('#overlay0').html("<img src='assets/images/ananth.png' class='img-responsive'>");
	$('#overlay1').html("<img src='assets/images/julian.png' class='img-responsive'>");
	$('#overlay4').html("<img src='assets/images/juliantie1.png' class='img-responsive'>");
	$('#overlay5').html("<img src='assets/images/juliantie2.png' class='img-responsive'>");
	$('#overlay5').css("opacity", "0");
	$('#overlay6').html("<img src='assets/images/juliantie3.png' class='img-responsive'>");
	$('#overlay6').css("opacity", "0");
	set456Timer0();
}

function scene1(){
	resetScene();
	ananthText = "I am a visual coder... I like to use objects all the time to help conceptualize my code";
	
	//title screen
	$('#overlay4').html("<img src='assets/images/visual1.png' class='img-responsive'>");
	$('#overlay5').html("<img src='assets/images/visual2.png' class='img-responsive'>");
	//clue: notice how i can fade in and out things using opacity
	$('#overlay5').css("opacity", "0");
	$('#overlay6').html("<img src='assets/images/visual3.png' class='img-responsive'>");
	$('#overlay6').css("opacity", "0");
	set456Timer0();

	//see objects
	setTimeout(function(){
		$('#overlay0').html("<img src='assets/images/visual4.png' class='img-responsive'>");
	}, 5000);
	//see objects underlined
	setTimeout(function(){
		$('#overlay1').html("<img src='assets/images/visual5.png' class='img-responsive'>");
	}, 6500);

	//see objects underlined
	setTimeout(function(){
		resetScene();
		ananthText = "At times, the objects will be the only thing I am manipulating.  Drawing the objects on a small piece of paper is necessary to keep ideas simple and efficient.";
		$('#overlay4').html("<img src='assets/images/visual6.png' class='img-responsive'>");
		$('#overlay5').html("<img src='assets/images/visual7.png' class='img-responsive'>");
		$('#overlay5').css("opacity", "0");
		$('#overlay6').html("<img src='assets/images/visual8.png' class='img-responsive'>");
		$('#overlay6').css("opacity", "0");
		set456Timer0();
		//clue: notice how i force the scene to finish before I allow the scene to complete
		//this allows me to enable the user to go to the next scene
		setTimeout(function(){
			julianText = "I also love to visualize at the same time. This helps keeps my thoughts focused and my code clean. I like drawing my ideas in Google Slides/Presentation or directly on paper.";
		}, 1000);

		sceneComplete = true;
	}, 8000);
}



function scene2(){
	resetScene();
	ananthText = "Introducing... Ananth";
	julianText = "Introducing... Julian";
	setTAscene();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}
function scene2(){
	resetScene();
	ananthText = "Introducing... Ananth";
	julianText = "Introducing... Julian";
	setTAscene();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}
function scene3(){
	resetScene();
	ananthText = "";
	julianText = "How are we going to teach them visualization?";
	setTAscene();
	$('#overlay9').html("<img src='assets/images/bubble1.png' class='img-responsive'>");
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene4(){
	resetScene();
	ananthText = "not sure...";
	julianText = "";
	setTAscene();
	$('#overlay9').html("<img src='assets/images/bubble2.png' class='img-responsive'>");
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}
function scene5(){
	resetScene();
	ananthText = "";
	julianText = "I know. It is tough for someone who hasnt done it before.";
	setTAscene();
	$('#overlay7').html("<img src='assets/images/bubble3a.png' class='img-responsive'>");
	$('#overlay8').html("<img src='assets/images/bubble3b.png' class='img-responsive'>");
	$('#overlay8').css("opacity", "0");
	set78Timer1();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene6(){
	resetScene();
	ananthText = "Maybe we have tell them to draw a picture?";
	julianText = "";
	setTAscene();
	$('#overlay9').html("<img src='assets/images/bubble4.png' class='img-responsive'>");
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene7(){
	resetScene();
	ananthText = "";
	julianText = "The class is so awesome. I think that may work!";
	setTAscene();
	$('#overlay9').html("<img src='assets/images/bubble5.png' class='img-responsive'>");
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene8(){
	resetScene();
	ananthText = "Of course it will. ";
	julianText = "";
	setTAscene();
	$('#overlay7').html("<img src='assets/images/bubble6a.png' class='img-responsive'>");
	$('#overlay8').html("<img src='assets/images/bubble6b.png' class='img-responsive'>");
	$('#overlay8').css("opacity", "0");
	set78Timer1();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene9(){
	resetScene();
	ananthText = "";
	julianText = "Why is the instructor going off script?";
	setTAscene();
	$('#overlay7').html("<img src='assets/images/bubble6a.png' class='img-responsive'>");
	$('#overlay8').html("<img src='assets/images/bubble6b.png' class='img-responsive'>");
	$('#overlay8').css("opacity", "0");
	set78Timer1();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}

function scene10(){
	resetScene();
	ananthText = "Meh...";
	julianText = "";
	setTAscene();
	$('#overlay7').html("<img src='assets/images/bubble6a.png' class='img-responsive'>");
	$('#overlay8').html("<img src='assets/images/bubble6b.png' class='img-responsive'>");
	$('#overlay8').css("opacity", "0");
	set78Timer1();
	setTimeout(function(){
		sceneComplete = true;
	}, 1000);
}
function scene11(){
	resetScene();
	ananthText = "";
	julianText = "So yeah, lets make assignment to draw bubble sort and then discuss the thought bubbles code for Visual Coder skit in groups.";
	setTAscene();
	$('#overlay7').html("<img src='assets/images/bubble6a.png' class='img-responsive'>");
	$('#overlay8').html("<img src='assets/images/bubble6b.png' class='img-responsive'>");
	$('#overlay8').css("opacity", "0");
	set78Timer1();
	setTimeout(function(){
		ananthText = "The thought bubbles script may be hard, but it would be good to extract clues on how to approach the current homework.";
	}, 15000);

	setTimeout(function(){
		sceneComplete = true;
	}, 16000);
}

//clue: make sure HTML DOM is fully loaded so we can place script in the head
//we want all globals outside of this script.
//only our code that starts to change things on the page goes here.
$(document).ready(function(){
	//begin cursor timer
	cursorTimer = createCircuitTimer(cursorRate);
	cursorTimer.start(function(){
		if(!cursorBlack){
			cursorBlack = true;
			//console.log($('.cursor').length);
			$('.cursor').animate({
				opacity: 1
			}, cursorRate/2, function(){
				//Animation Complete
			});
		}
		else{
			cursorBlack = false;
			$('.cursor').animate({
				opacity: 0
			}, cursorRate/2, function(){
				//Animation Complete
			});
		}
	});

	//create "polling" text type simulator
	ananthTextTimer = createCircuitTimer(textRate);
	ananthTextTimer.start(function(){
		if(ananthTextLength < ananthText.length){
			ananthTextLength += getRandomInt(textLetterMinRate, textLetterMaxRate);
			if(ananthTextLength > ananthText.length){
				ananthTextLength = ananthText.length;
			}
			$('#ananth-text').html(ananthText.substring(0, ananthTextLength) + cursorText);
		}
		if(ananthTextLength > ananthText.length){
			ananthTextLength = 0;
			$('#ananth-text').html(cursorText);
		}
	});

	//create "polling" text type simulator
	julianTextTimer = createCircuitTimer(textRate);
	julianTextTimer.start(function(){
		if(julianTextLength < julianText.length){
			julianTextLength += getRandomInt(textLetterMinRate, textLetterMaxRate);
			if(julianTextLength > julianText.length){
				julianTextLength = julianText.length;
			}
			$('#julian-text').html(julianText.substring(0, julianTextLength) + cursorText);
		}
		if(julianTextLength > julianText.length){
			julianTextLength = 0;
			$('#julian-text').html(cursorText);
		}
	});
	$('#overlay9').on('click', function(){
		if(sceneComplete){
			scene++;
			//clue: this is what happens when your code is too linear and does not use objects
			//an object for-loop may be one way of optimizing this section...
			if(scene === 2){
				//resetScene();
				scene2();
			}
			else if(scene === 3){
				//resetScene();
				scene3();
			}
			else if(scene === 4){
				//resetScene();
				scene4();
			}

			else if(scene === 5){
				//resetScene();
				scene5();
			}

			else if(scene === 6){
				//resetScene();
				scene6();
			}

			else if(scene === 7){
				//resetScene();
				scene7();
			}

			else if(scene === 8){
				//resetScene();
				scene8();
			}

			else if(scene === 9){
				//resetScene();
				scene9();
			}

			else if(scene === 10){
				//resetScene();
				scene10();
			}

			else if(scene === 11){
				//resetScene();
				scene11();
			}
			else{
				scene11();
			}
		}
	});
	$('#start-button').on("click", function(){
		//clue: theater is shown on a button click!
		$('.theater').show();
		$('.start').hide();
		scene1();
	});

});


