
import { Path, PassableCallback, PathOptions } from './path';

/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
export class Dijkstra extends Path {

	private _computed;
	private _todo;

    constructor(toX: number, toY: number, passableCallback: PassableCallback, options: PathOptions = {}) {
        super(toX, toY, passableCallback, options);
        this._computed = {};
        this._todo = [];
        this._add(toX, toY, null);
    }

    /**
     * Compute a path from a given point
     * @see ROT.Path#compute
     */
    compute(fromX, fromY, callback) {
        const key = fromX+","+fromY;
        if (!(key in this._computed)) { this._compute(fromX, fromY); }
        if (!(key in this._computed)) { return; }
        
        let item = this._computed[key];
        while (item) {
            callback(item.x, item.y);
            item = item.prev;
        }
    }

    /**
     * Compute a non-cached value
     */
    private _compute(fromX, fromY) {
        while (this._todo.length) {
            const item = this._todo.shift();
            if (item.x == fromX && item.y == fromY) { return; }
            
            const neighbors = this._getNeighbors(item.x, item.y);
            
            for (let i=0;i<neighbors.length;i++) {
                const neighbor = neighbors[i];
                const x = neighbor[0];
                const y = neighbor[1];
                const id = x+","+y;
                if (id in this._computed) { continue; } /* already done */	
                this._add(x, y, item); 
            }
        }
    }

    private _add(x, y, prev) {
        const obj = {
            x,
            y,
            prev
        };
        this._computed[x+","+y] = obj;
        this._todo.push(obj);
    }
}
