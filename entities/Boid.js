var BOID_SIZE = 6;
var BOID_SPEED = 2;

function Boid(x, y) {
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
	this.shape.rotation = (this.shape.rotation + randomBetween(-2, 2)).mod(360);

	this.shape.x += Math.cos(deg2rad(this.shape.rotation)) * BOID_SPEED;
	this.shape.y += Math.sin(deg2rad(this.shape.rotation)) * BOID_SPEED;

	this.shape.x = this.shape.x.mod(canvas.width);
	this.shape.y = this.shape.y.mod(canvas.height);
}

Boid.prototype.draw = function() {
}
