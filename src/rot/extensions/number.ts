

interface Number {
	mod(n: number): number
}

/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */

if (!Number.prototype.mod) {
	Number.prototype.mod = function (n) {
		return ((this % n) + n) % n;
	};
}
