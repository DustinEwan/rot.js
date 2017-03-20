
import * as ROT from '../rot';
/**
 * @class Base map generator
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 */
export class Map {

	protected _width: number;
	protected _height: number;

    constructor(width, height) {
        this._width = width || ROT.DEFAULT_WIDTH;
        this._height = height || ROT.DEFAULT_HEIGHT;
    }

    create(callback) {}

    protected _fillMap(value) {
        const map = [];
        for (let i=0;i<this._width;i++) {
            map.push([]);
            for (let j=0;j<this._height;j++) { map[i].push(value); }
        }
        return map;
    }
}
