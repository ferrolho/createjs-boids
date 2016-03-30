{
	var fpsLabel;

	var boids = [];

	function Scene() {
		createFPS();

		boids.push(new Boid(100, 100));

		addEventListener("click", function(event) {
			boids.push(new Boid(event.x, event.y));
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
	}

}
