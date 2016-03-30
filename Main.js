var canvas;
var stage;

function init() {
	initCreateJS();

	include(
		'entities/Boid.js',
		'Scene.js',
		'Utilities.js',
		
		function() {
			main();
		});
}

function initCreateJS() {
	// resize event listener
	window.addEventListener('resize', resize, false);

	// create a new stage and point it at our canvas:
	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
}

function main() {
	resize();

	var scene = new Scene();

	// Ticker
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener('tick', tick);

	function tick(event) {
		scene.update();

		// draw the updates to stage:
		stage.update(event);
	}
}

function resize() { 
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
