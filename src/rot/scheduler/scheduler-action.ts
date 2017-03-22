
import { Scheduler } from './scheduler';

/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
export class Action extends Scheduler {

	private _defaultDuration: number;
	private _duration: number;

    constructor() {
        super();
        this._defaultDuration = 1; /* for newly added */
        this._duration = this._defaultDuration; /* for this._current */
    }

    /**
     * @param {object} item
     * @param {bool} repeat
     * @param {number} [time=1]
     * @see ROT.Scheduler#add
     */
    add(item, repeat, time = this._defaultDuration) {
        this._queue.add(item, time);
        return super.add.call(this, item, repeat);
    }

    clear() {
        this._duration = this._defaultDuration;
        return super.clear.call(this);
    }

    remove(item) {
        if (item == this._current) { this._duration = this._defaultDuration; }
        return super.remove.call(this, item);
    }

    /**
     * @see ROT.Scheduler#next
     */
    next() {
        if (this._current && this._repeat.indexOf(this._current) != -1) {
            this._queue.add(this._current, this._duration || this._defaultDuration);
            this._duration = this._defaultDuration;
        }
        return super.next.call(this);
    }

    /**
     * Set duration for the active item
     */
    setDuration(time) {
        if (this._current) { this._duration = time; }
        return this;
    }
}