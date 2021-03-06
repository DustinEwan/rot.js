
import { Map } from './map';

/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
export class Arena extends Map {
    constructor(width: number = null, height: number = null) {
        super(width, height);
    }

    create(callback) {
        const w = this._width - 1;
        const h = this._height - 1;
        for (let i = 0; i <= w; i++) {
            for (let j = 0; j <= h; j++) {
                const empty = (i && j && i < w && j < h);
                callback(i, j, empty ? 0 : 1);
            }
        }
        return this;
    }
}
