
import { RNG } from './rng';

/**
 * @class (Markov process)-based string generator. 
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>. 
 * Offers configurable order and prior.
 * @param {object} [options]
 * @param {bool} [options.words=false] Use word mode?
 * @param {int} [options.order=3]
 * @param {float} [options.prior=0.001]
 */
export class StringGenerator {

	private _options;
	private _boundary;
	private _suffix;
	private _prefix;
	private _data;
	private _priorValues;

    constructor(options) {
        this._options = {
            words: false,
            order: 3,
            prior: 0.001
        };
        for (const p in options) { this._options[p] = options[p]; }

        this._boundary = String.fromCharCode(0);
        this._suffix = this._boundary;
        this._prefix = [];
        for (let i=0;i<this._options.order;i++) { this._prefix.push(this._boundary); }

        this._priorValues = {};
        this._priorValues[this._boundary] = this._options.prior;

        this._data = {};
    }

    /**
     * Remove all learning data
     */
    clear() {
        this._data = {};
        this._priorValues = {};
    }

    /**
     * @returns {string} Generated string
     */
    generate() {
        const result = [this._sample(this._prefix)];
        while (result[result.length-1] != this._boundary) {
            result.push(this._sample(result));
        }
        return this._join(result.slice(0, -1));
    }

    /**
     * Observe (learn) a string from a training set
     */
    observe(string) {
        let tokens = this._split(string);

        for (let i=0; i<tokens.length; i++) {
            this._priorValues[tokens[i]] = this._options.prior;
        }

        tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */

        for (let i=this._options.order; i<tokens.length; i++) {
            const context = tokens.slice(i-this._options.order, i);
            const event = tokens[i];
            for (let j=0; j<context.length; j++) {
                const subcontext = context.slice(j);
                this._observeEvent(subcontext, event);
            }
        }
    }

    getStats() {
        const parts = [];

        let priorCount = 0;
        for (var p in this._priorValues) { priorCount++; }
        priorCount--; /* boundary */
        parts.push("distinct samples: " + priorCount);

        let dataCount = 0;
        let eventCount = 0;
        for (var p in this._data) { 
            dataCount++; 
            for (const key in this._data[p]) {
                eventCount++;
            }
        }
        parts.push("dictionary size (contexts): " + dataCount);
        parts.push("dictionary size (events): " + eventCount);

        return parts.join(", ");
    }

    /**
     * @param {string}
     * @returns {string[]}
     */
    _split(str) {
        return str.split(this._options.words ? /\s+/ : "");
    }

    /**
     * @param {string[]}
     * @returns {string} 
     */
    _join(arr) {
        return arr.join(this._options.words ? " " : "");
    }

    /**
     * @param {string[]} context
     * @param {string} event
     */
    _observeEvent(context, event) {
        const key = this._join(context);
        if (!(key in this._data)) { this._data[key] = {}; }
        const data = this._data[key];

        if (!(event in data)) { data[event] = 0; }
        data[event]++;
    }

    /**
     * @param {string[]}
     * @returns {string}
     */
    _sample(context) {
        context = this._backoff(context);
        const key = this._join(context);
        const data = this._data[key];

        let available = {};

        if (this._options.prior) {
            for (var event in this._priorValues) { available[event] = this._priorValues[event]; }
            for (var event in data) { available[event] += data[event]; }
        } else { 
            available = data;
        }

        return RNG.getWeightedValue(available);
    }

    /**
     * @param {string[]}
     * @returns {string[]}
     */
    _backoff(context) {
        if (context.length > this._options.order) {
            context = context.slice(-this._options.order);
        } else if (context.length < this._options.order) {
            context = this._prefix.slice(0, this._options.order - context.length).concat(context);
        }

        while (!(this._join(context) in this._data) && context.length > 0) { context = context.slice(1); }

        return context;
    }
}
