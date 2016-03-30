var BOID_SIZE = 6;
var BOID_SPEED = 2;
var BOID_MAX_ROT = 2;

var VIEW_RADIUS = 20 * BOID_SIZE;
var CROWD_RADIUS = 6 * BOID_SIZE;

function Boid(x, y) {
	var rotation = randomBetween(0, 360);

	this.heading = new Victor(Math.cos(deg2rad(rotation)), Math.sin(deg2rad(rotation)));

	this.friends = [];
	this.closeFriends = [];

	this.initShape(x, y, rotation);
}

Boid.prototype.initShape = function(x, y, rotation) {
	this.shape = new createjs.Shape();
	
	this.shape.x = x;
	this.shape.y = y;

	this.shape.rotation = rotation;

	this.shape.graphics
	.beginFill('silver')
	.beginStroke('black')
	.moveTo(-1 * BOID_SIZE, -1 * BOID_SIZE)
	.lineTo(-1 * BOID_SIZE,  1 * BOID_SIZE)
	.lineTo( 2 * BOID_SIZE,  0 * BOID_SIZE)
	.lineTo(-1 * BOID_SIZE, -1 * BOID_SIZE);

	this.shape.cache(-1 * BOID_SIZE, -1 * BOID_SIZE, 3 * BOID_SIZE, 2 * BOID_SIZE);
	this.shape.snapToPixel = true;

	stage.addChild(this.shape);
}

Boid.prototype.update = function() {
	this.updateFriends();

	if (this.friends.length <= 0)
		this.heading.rotateDeg(randomBetween(-BOID_MAX_ROT, BOID_MAX_ROT));
	else {
		var alignment = this.calcAlignment();
		var cohesion = this.calcCohesion();
		var separation = this.calcSeparation();

		alignment.multiply(true ? new Victor(1, 1) : new Victor(0, 0));
		cohesion.multiply(true ? new Victor(1, 1) : new Victor(0, 0));
		separation.multiply(true ? new Victor(1.5, 1.5) : new Victor(0, 0));

		var desiredHeading = alignment.add(cohesion).add(separation).normalize();

		var headingsDiff = desiredHeading.horizontalAngleDeg() - this.heading.horizontalAngleDeg();

		if (Math.abs(headingsDiff) > BOID_MAX_ROT)
			this.heading.rotateDeg(headingsDiff > 0 ? BOID_MAX_ROT : -BOID_MAX_ROT);
		else
			this.heading = desiredHeading;
	}

	this.shape.x = (this.shape.x + this.heading.x * BOID_SPEED).mod(canvas.width);
	this.shape.y = (this.shape.y + this.heading.y * BOID_SPEED).mod(canvas.height);

	this.shape.rotation = this.heading.horizontalAngleDeg();
}

Boid.prototype.updateFriends = function() {
	this.friends.length = 0;
	this.closeFriends.length = 0;

	for (let other of boids) {
		if (this == other)
			continue;

		var dist = distance(this.shape.x, this.shape.y, other.shape.x, other.shape.y);

		if (dist <= VIEW_RADIUS) {
			this.friends.push(other);

			if (dist <= CROWD_RADIUS)
				this.closeFriends.push(other);
		}
	}
}

/*
* Behaviors
*/

Boid.prototype.calcAlignment = function() {
	if (this.friends.length == 0)
		return this.heading.clone();

	var alignment = this.friends[0].heading.clone();

	for (var i = 1; i < this.friends.length; i++)
		alignment.add(this.friends[i].heading);

	return alignment.normalize();
}

Boid.prototype.calcCohesion = function() {
	var xMean = 0, yMean = 0;

	for (let friend of this.friends) {
		xMean += friend.shape.x;
		yMean += friend.shape.y;
	}

	xMean /= this.friends.length;
	yMean /= this.friends.length;

	return new Victor(xMean - this.shape.x, yMean - this.shape.y).normalize();
}

Boid.prototype.calcSeparation = function() {
	if (this.closeFriends.length == 0)
		return this.heading.clone();

	var xMean = 0, yMean = 0;

	for (let friend of this.closeFriends) {
		xMean += friend.shape.x;
		yMean += friend.shape.y;
	}

	xMean /= this.closeFriends.length;
	yMean /= this.closeFriends.length;

	return new Victor(this.shape.x - xMean, this.shape.y - yMean).normalize();
}
