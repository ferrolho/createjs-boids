/**
* Returns a random integer number between `min` and `max`.
*/
function randomBetween(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function deg2rad(deg) {
	return deg * Math.PI / 180.0;
}

function rad2deg(rad) {
	return rad * 180.0 / Math.PI;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}

/**
* The JavaScript Modulo Bug
* http://javascript.about.com/od/problemsolving/a/modulobug.htm
*/
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
};
