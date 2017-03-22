
import { Path, PassableCallback, PathOptions } from './path';

/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
export class AStar extends Path {

	private _todo;
	private _done;

	constructor(toX: number, toY: number, passableCallback: PassableCallback, options: PathOptions = {}) {
		super(toX, toY, passableCallback, options);

		this._todo = [];
		this._done = {};
		this._fromX = null;
		this._fromY = null;
	}

    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
	compute(fromX, fromY, callback) {
		this._todo = [];
		this._done = {};
		this._fromX = fromX;
		this._fromY = fromY;
		this._add(this._toX, this._toY, null);

		while (this._todo.length) {
			var item = this._todo.shift();
			if (item.x == fromX && item.y == fromY) { break; }
			const neighbors = this._getNeighbors(item.x, item.y);

			for (let i = 0; i < neighbors.length; i++) {
				const neighbor = neighbors[i];
				const x = neighbor[0];
				const y = neighbor[1];
				const id = x + "," + y;
				if (id in this._done) { continue; }
				this._add(x, y, item);
			}
		}

		var item = this._done[fromX + "," + fromY];
		if (!item) { return; }

		while (item) {
			callback(item.x, item.y);
			item = item.prev;
		}
	}

	_add(x, y, prev) {
		const h = this._distance(x, y);
		const obj = {
			x,
			y,
			prev,
			g: (prev ? prev.g + 1 : 0),
			h
		};
		this._done[x + "," + y] = obj;

		/* insert into priority queue */

		const f = obj.g + obj.h;
		for (let i = 0; i < this._todo.length; i++) {
			const item = this._todo[i];
			const itemF = item.g + item.h;
			if (f < itemF || (f == itemF && h < item.h)) {
				this._todo.splice(i, 0, obj);
				return;
			}
		}

		this._todo.push(obj);
	}

	_distance(x, y) {
		switch (this._options.topology) {
			case 4:
				return (Math.abs(x - this._fromX) + Math.abs(y - this._fromY));

			case 6:
				const dx = Math.abs(x - this._fromX);
				const dy = Math.abs(y - this._fromY);
				return dy + Math.max(0, (dx - dy) / 2);

			case 8:
				return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
		}

		throw new Error("Illegal topology");
	}
}
