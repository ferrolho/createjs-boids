/**
* Returns a random number between `min` and `max`.
*/
function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function deg2rad(deg) {
	return deg * Math.PI / 180.0;
}

function rad2deg(rad) {
	return rad * 180.0 / Math.PI;
}

/**
* The JavaScript Modulo Bug
* http://javascript.about.com/od/problemsolving/a/modulobug.htm
*/
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
};
