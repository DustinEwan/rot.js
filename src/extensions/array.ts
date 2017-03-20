
import * as RNG from '../rng';

declare global {
  interface Array<T> {
    random(): T;
    randomize(): T[];
  }
}

/**
 * @returns {any} Randomly picked item, null when length=0
 */
if (!Array.prototype.random) {
  Array.prototype.random = function () {
    if (!this.length) { return null; }
    return this[Math.floor(RNG.getUniform() * this.length)];
  };
}

/**
 * @returns {array} New array with randomized items
 */
if (!Array.prototype.randomize) {
  Array.prototype.randomize = function () {
    var result = [];
    var clone = this.slice();
    while (clone.length) {
      var index = clone.indexOf(clone.random());
      result.push(clone.splice(index, 1)[0]);
    }
    return result;
  };
}
