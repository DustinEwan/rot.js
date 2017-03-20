
import { Scheduler } from './scheduler';

/**
 * @class Speed-based scheduler
 * @augments ROT.Scheduler
 */
export class Speed extends Scheduler {
    constructor() {
        super();
    }

    /**
     * @param {object} item anything with "getSpeed" method
     * @param {bool} repeat
     * @param {number} [time=1/item.getSpeed()]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time = 1/item.getSpeed()) {
        this._queue.add(item, time);
        return super.add.call(this, item, repeat);
    }

    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 1/this._current.getSpeed());
        }
        return super.next.call(this);
    }
}
