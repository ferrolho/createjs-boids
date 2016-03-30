var BOID_SIZE = 6;
var BOID_SPEED = 2;
var BOID_MAX_ROT = 2;
var BOID_RADIUS = 100;

function Boid(x, y) {
	this.friends = [];

	this.shape = new createjs.Shape();
	
	this.shape.graphics
	.beginFill('gray')
	.moveTo(0, -1 * BOID_SIZE)
	.lineTo(3 * BOID_SIZE, 0)
	.lineTo(0, 1 * BOID_SIZE)
	.lineTo(0, -1 * BOID_SIZE);

	this.shape.cache(0, -1 * BOID_SIZE, 3 * BOID_SIZE, 2 * BOID_SIZE);
	this.shape.snapToPixel = true;

	this.shape.rotation = randomBetween(0, 360);

	this.shape.x = x;
	this.shape.y = y;

	stage.addChild(this.shape);
}

Boid.prototype.update = function() {
	this.friends.length = 0;

	for (let other of boids) {
		if (this == other)
			continue;

		if (distance(this.shape.x, this.shape.y, other.shape.x, other.shape.y) <= BOID_RADIUS)
			this.friends.push(other);
	}

	if (this.friends.length > 0) {
		var rotationsMean = 0;

		for (let friend of this.friends)
			rotationsMean += friend.shape.rotation;

		rotationsMean /= this.friends.length;

		this.shape.rotation += rotationsMean > 0 ? Math.min(rotationsMean, BOID_MAX_ROT) : Math.max(rotationsMean, -BOID_MAX_ROT);
	} else {
		this.shape.rotation += randomBetween(-BOID_MAX_ROT, BOID_MAX_ROT);
	}

	this.shape.rotation = this.shape.rotation.mod(360);

	this.shape.x += Math.cos(deg2rad(this.shape.rotation)) * BOID_SPEED;
	this.shape.y += Math.sin(deg2rad(this.shape.rotation)) * BOID_SPEED;

	this.shape.x = this.shape.x.mod(canvas.width);
	this.shape.y = this.shape.y.mod(canvas.height);
}

Boid.prototype.draw = function() {
}
