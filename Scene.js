{
	var fpsLabel;

	var boids = [];

	function Scene() {
		createFPS();

		spawnBoid(canvas.width / 2, canvas.height / 2);

		addEventListener("click", function(event) {
			spawnBoid(event.x, event.y);
		});
	}

	Scene.prototype.update = function() {
		updateFPS();

		for (let boid of boids)
			boid.update();
	}

	Scene.prototype.draw = function() {
		//boid.draw();
	}

	function spawnBoid(x, y) {
		boids.push(new Boid(x, y));

		console.log('Boids in scene: ' + boids.length);
	}

	function createFPS() {
		var text = 'FPS:\n';

		fpsLabel = new createjs.Text(text, '18px Playfair Display', '#000');

		fpsLabel.x = 10;
		fpsLabel.y = 10;

		stage.addChild(fpsLabel);
	}

	function updateFPS() {
		var text = 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS()) + '\n';

		fpsLabel.text = text;

		stage.setChildIndex(fpsLabel, stage.numChildren - 1);
	}

}
