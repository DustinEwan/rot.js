
import { ROT } from '../../rot';

export interface PathOptions {
    topology?: number;
}

export type PassableCallback = (x: number, y: number) => boolean

/**
 * @class Abstract pathfinder
 * @param {int} toX Target X coord
 * @param {int} toY Target Y coord
 * @param {function} passableCallback Callback to determine map passability
 * @param {object} [options]
 * @param {int} [options.topology=8]
 */
export class Path {

	protected _toX;
	protected _toY;
	protected _fromX;
	protected _fromY;
	protected _passableCallback;
	protected _options;
	private _dirs;

    constructor(toX: number, toY: number, passableCallback: PassableCallback, options: PathOptions = {}) {
        this._toX = toX;
        this._toY = toY;
        this._fromX = null;
        this._fromY = null;
        this._passableCallback = passableCallback;
        this._options = {
            topology: 8
        };
        for (const p in options) { this._options[p] = options[p]; }

        this._dirs = ROT.DIRS[this._options.topology];
        if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
            this._dirs = [
                this._dirs[0],
                this._dirs[2],
                this._dirs[4],
                this._dirs[6],
                this._dirs[1],
                this._dirs[3],
                this._dirs[5],
                this._dirs[7]
            ]
        }
    }

    /**
     * Compute a path from a given point
     * @param {int} fromX
     * @param {int} fromY
     * @param {function} callback Will be called for every path item with arguments "x" and "y"
     */
    compute(fromX, fromY, callback) {
    }

    _getNeighbors(cx, cy) {
        const result = [];
        for (let i=0;i<this._dirs.length;i++) {
            const dir = this._dirs[i];
            const x = cx + dir[0];
            const y = cy + dir[1];
            
            if (!this._passableCallback(x, y)) { continue; }
            result.push([x, y]);
        }
        
        return result;
    }
}
