{
	var boids = [];

	function Scene() {
		loadSound();

		createStats();

		spawnBoid(canvas.width / 2, canvas.height / 2);

		addEventListener("click", function(event) {
			spawnBoid(event.x, event.y);
		});
	}

	Scene.prototype.update = function() {
		updateStats();

		for (let boid of boids)
			boid.update();
	}


	/*
	* Sound
	*/

	function loadSound() {
		if (!createjs.Sound.initializeDefaultPlugins()) {
			console.log('No sound!');
			return;
		}

		var audioPath = 'assets/';
		var sounds = [{ id: 'music', src: 'dust-it-off.mp3' }];

		createjs.Sound.addEventListener('fileload', handleLoad);
		createjs.Sound.registerSounds(sounds, audioPath);
	}

	function handleLoad(event) {
		if (event.id === 'music')
			createjs.Sound.play(event.id);
	}


	/*
	* Spawner
	*/

	function spawnBoid(x, y) {
		boids.push(new Boid(x, y));
	}


	/*
	* Stats
	*/

	var statsText;

	function createStats() {
		statsText = new createjs.Text("Loading...", '18px Montserrat', '#000');

		statsText.x = 10;
		statsText.y = 10;

		stage.addChild(statsText);
	}

	function updateStats() {
		var text = "";
		text += 'Click anywhere to spawn a Boid.\n\n';
		text += 'Boids in scene: ' + boids.length + '\n';
		text += 'FPS: ' + Math.round(createjs.Ticker.getMeasuredFPS()) + '\n';

		statsText.text = text;

		stage.setChildIndex(statsText, stage.numChildren - 1);
	}

}
