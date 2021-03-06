
import { Scheduler } from './scheduler';

/**
 * @class Simple fair scheduler (round-robin style)
 * @augments ROT.Scheduler
 */
export class Simple extends Scheduler {
    constructor() {
        super();
    }

    /**
     * @see ROT.Scheduler#add
     */
    add(item, repeat) {
        this._queue.add(item, 0);
        return super.add.call(this, item, repeat);
    }

    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, 0);
        }
        return super.next.call(this);
    }
}