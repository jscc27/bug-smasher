// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.getElementById("game").appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/leaf.jpg";

// Bug image
var bugReady = false;
var bugImage = new Image();
bugImage.onload = function () {
	bugReady = true;
};
bugImage.src = "images/bug.png";

// Game objects
var bug = {};
var bugsCaught = 0;
var speedCount = 0;
var interval = 5000 - (100 * speedCount);
var timer;
function changePosition() {
	var x1 = Math.random();
	var y1 = Math.random();
	bug.x = 32 + (x1 * (canvas.width - 64));
	bug.y = 32 + (y1 * (canvas.height - 64));
};
function runTimer() {
	if (interval > 100) {
		interval = 5000 - (100 * speedCount);
	}
	else {
		interval = 100;
	}
	changePosition();
	timer = setInterval(changePosition, interval);
}

function render() {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (bugReady) {
		ctx.drawImage(bugImage, bug.x, bug.y);
	}
};
function getPosition(event) {
	var rect = event.target.getBoundingClientRect();
	var clickX = event.clientX - rect.left;
	var clickY = event.clientY - rect.top;

		if (
		clickX <= (bug.x + 32)
		&& bug.x <= (clickX + 32)
		&& clickY <= (bug.y + 32)
		&& bug.y <= (clickY + 32)
	) {
		++bugsCaught;
		++speedCount;
		clearInterval(timer);
		runTimer();
	}
}

function main() {	
	render();
	requestAnimationFrame(main);
	document.getElementById("score").innerHTML = "Score: " + bugsCaught;
	document.getElementById("speed").innerHTML = "Game speed: " + speedCount;
};

function resetSpeed() {
	speedCount = 0;
	clearInterval(timer);
	runTimer();
}
function resetScore(){
	bugsCaught = 0;
}
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

runTimer();
main();
document.getElementById("resetSpeedBtn").addEventListener("click", resetSpeed, false);
document.getElementById("resetScoreBtn").addEventListener("click",resetScore,false);
document.getElementById("game").addEventListener("click", getPosition, false);