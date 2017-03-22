var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("rot", ["require", "exports", './extensions/raf'], function (require, exports) {
    "use strict";
    /**
     * @namespace Top-level ROT namespace
     */
    exports.ROT = {
        /**
         * @returns {bool} Is rot.js supported by this browser?
         */
        isSupported: function () {
            return !!(document.createElement("canvas").getContext && Function.prototype.bind);
        },
        /** Default with for display and map generators */
        DEFAULT_WIDTH: 80,
        /** Default height for display and map generators */
        DEFAULT_HEIGHT: 25,
        /** Directional constants. Ordering is important! */
        DIRS: {
            "4": [
                [0, -1],
                [1, 0],
                [0, 1],
                [-1, 0]
            ],
            "8": [
                [0, -1],
                [1, -1],
                [1, 0],
                [1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0],
                [-1, -1]
            ],
            "6": [
                [-1, -1],
                [1, -1],
                [2, 0],
                [1, 1],
                [-1, 1],
                [-2, 0]
            ]
        },
        /** Cancel key. */
        VK_CANCEL: 3,
        /** Help key. */
        VK_HELP: 6,
        /** Backspace key. */
        VK_BACK_SPACE: 8,
        /** Tab key. */
        VK_TAB: 9,
        /** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
        VK_CLEAR: 12,
        /** Return/enter key on the main keyboard. */
        VK_RETURN: 13,
        /** Reserved, but not used. */
        VK_ENTER: 14,
        /** Shift key. */
        VK_SHIFT: 16,
        /** Control key. */
        VK_CONTROL: 17,
        /** Alt (Option on Mac) key. */
        VK_ALT: 18,
        /** Pause key. */
        VK_PAUSE: 19,
        /** Caps lock. */
        VK_CAPS_LOCK: 20,
        /** Escape key. */
        VK_ESCAPE: 27,
        /** Space bar. */
        VK_SPACE: 32,
        /** Page Up key. */
        VK_PAGE_UP: 33,
        /** Page Down key. */
        VK_PAGE_DOWN: 34,
        /** End key. */
        VK_END: 35,
        /** Home key. */
        VK_HOME: 36,
        /** Left arrow. */
        VK_LEFT: 37,
        /** Up arrow. */
        VK_UP: 38,
        /** Right arrow. */
        VK_RIGHT: 39,
        /** Down arrow. */
        VK_DOWN: 40,
        /** Print Screen key. */
        VK_PRINTSCREEN: 44,
        /** Ins(ert) key. */
        VK_INSERT: 45,
        /** Del(ete) key. */
        VK_DELETE: 46,
        /***/
        VK_0: 48,
        /***/
        VK_1: 49,
        /***/
        VK_2: 50,
        /***/
        VK_3: 51,
        /***/
        VK_4: 52,
        /***/
        VK_5: 53,
        /***/
        VK_6: 54,
        /***/
        VK_7: 55,
        /***/
        VK_8: 56,
        /***/
        VK_9: 57,
        /** Colon (:) key. Requires Gecko 15.0 */
        VK_COLON: 58,
        /** Semicolon (;) key. */
        VK_SEMICOLON: 59,
        /** Less-than (<) key. Requires Gecko 15.0 */
        VK_LESS_THAN: 60,
        /** Equals (=) key. */
        VK_EQUALS: 61,
        /** Greater-than (>) key. Requires Gecko 15.0 */
        VK_GREATER_THAN: 62,
        /** Question mark (?) key. Requires Gecko 15.0 */
        VK_QUESTION_MARK: 63,
        /** Atmark (@) key. Requires Gecko 15.0 */
        VK_AT: 64,
        /***/
        VK_A: 65,
        /***/
        VK_B: 66,
        /***/
        VK_C: 67,
        /***/
        VK_D: 68,
        /***/
        VK_E: 69,
        /***/
        VK_F: 70,
        /***/
        VK_G: 71,
        /***/
        VK_H: 72,
        /***/
        VK_I: 73,
        /***/
        VK_J: 74,
        /***/
        VK_K: 75,
        /***/
        VK_L: 76,
        /***/
        VK_M: 77,
        /***/
        VK_N: 78,
        /***/
        VK_O: 79,
        /***/
        VK_P: 80,
        /***/
        VK_Q: 81,
        /***/
        VK_R: 82,
        /***/
        VK_S: 83,
        /***/
        VK_T: 84,
        /***/
        VK_U: 85,
        /***/
        VK_V: 86,
        /***/
        VK_W: 87,
        /***/
        VK_X: 88,
        /***/
        VK_Y: 89,
        /***/
        VK_Z: 90,
        /***/
        VK_CONTEXT_MENU: 93,
        /** 0 on the numeric keypad. */
        VK_NUMPAD0: 96,
        /** 1 on the numeric keypad. */
        VK_NUMPAD1: 97,
        /** 2 on the numeric keypad. */
        VK_NUMPAD2: 98,
        /** 3 on the numeric keypad. */
        VK_NUMPAD3: 99,
        /** 4 on the numeric keypad. */
        VK_NUMPAD4: 100,
        /** 5 on the numeric keypad. */
        VK_NUMPAD5: 101,
        /** 6 on the numeric keypad. */
        VK_NUMPAD6: 102,
        /** 7 on the numeric keypad. */
        VK_NUMPAD7: 103,
        /** 8 on the numeric keypad. */
        VK_NUMPAD8: 104,
        /** 9 on the numeric keypad. */
        VK_NUMPAD9: 105,
        /** * on the numeric keypad. */
        VK_MULTIPLY: 106,
        /** + on the numeric keypad. */
        VK_ADD: 107,
        /***/
        VK_SEPARATOR: 108,
        /** - on the numeric keypad. */
        VK_SUBTRACT: 109,
        /** Decimal point on the numeric keypad. */
        VK_DECIMAL: 110,
        /** / on the numeric keypad. */
        VK_DIVIDE: 111,
        /** F1 key. */
        VK_F1: 112,
        /** F2 key. */
        VK_F2: 113,
        /** F3 key. */
        VK_F3: 114,
        /** F4 key. */
        VK_F4: 115,
        /** F5 key. */
        VK_F5: 116,
        /** F6 key. */
        VK_F6: 117,
        /** F7 key. */
        VK_F7: 118,
        /** F8 key. */
        VK_F8: 119,
        /** F9 key. */
        VK_F9: 120,
        /** F10 key. */
        VK_F10: 121,
        /** F11 key. */
        VK_F11: 122,
        /** F12 key. */
        VK_F12: 123,
        /** F13 key. */
        VK_F13: 124,
        /** F14 key. */
        VK_F14: 125,
        /** F15 key. */
        VK_F15: 126,
        /** F16 key. */
        VK_F16: 127,
        /** F17 key. */
        VK_F17: 128,
        /** F18 key. */
        VK_F18: 129,
        /** F19 key. */
        VK_F19: 130,
        /** F20 key. */
        VK_F20: 131,
        /** F21 key. */
        VK_F21: 132,
        /** F22 key. */
        VK_F22: 133,
        /** F23 key. */
        VK_F23: 134,
        /** F24 key. */
        VK_F24: 135,
        /** Num Lock key. */
        VK_NUM_LOCK: 144,
        /** Scroll Lock key. */
        VK_SCROLL_LOCK: 145,
        /** Circumflex (^) key. Requires Gecko 15.0 */
        VK_CIRCUMFLEX: 160,
        /** Exclamation (!) key. Requires Gecko 15.0 */
        VK_EXCLAMATION: 161,
        /** Double quote () key. Requires Gecko 15.0 */
        VK_DOUBLE_QUOTE: 162,
        /** Hash (#) key. Requires Gecko 15.0 */
        VK_HASH: 163,
        /** Dollar sign ($) key. Requires Gecko 15.0 */
        VK_DOLLAR: 164,
        /** Percent (%) key. Requires Gecko 15.0 */
        VK_PERCENT: 165,
        /** Ampersand (&) key. Requires Gecko 15.0 */
        VK_AMPERSAND: 166,
        /** Underscore (_) key. Requires Gecko 15.0 */
        VK_UNDERSCORE: 167,
        /** Open parenthesis (() key. Requires Gecko 15.0 */
        VK_OPEN_PAREN: 168,
        /** Close parenthesis ()) key. Requires Gecko 15.0 */
        VK_CLOSE_PAREN: 169,
        /* Asterisk (*) key. Requires Gecko 15.0 */
        VK_ASTERISK: 170,
        /** Plus (+) key. Requires Gecko 15.0 */
        VK_PLUS: 171,
        /** Pipe (|) key. Requires Gecko 15.0 */
        VK_PIPE: 172,
        /** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
        VK_HYPHEN_MINUS: 173,
        /** Open curly bracket ({) key. Requires Gecko 15.0 */
        VK_OPEN_CURLY_BRACKET: 174,
        /** Close curly bracket (}) key. Requires Gecko 15.0 */
        VK_CLOSE_CURLY_BRACKET: 175,
        /** Tilde (~) key. Requires Gecko 15.0 */
        VK_TILDE: 176,
        /** Comma (,) key. */
        VK_COMMA: 188,
        /** Period (.) key. */
        VK_PERIOD: 190,
        /** Slash (/) key. */
        VK_SLASH: 191,
        /** Back tick (`) key. */
        VK_BACK_QUOTE: 192,
        /** Open square bracket ([) key. */
        VK_OPEN_BRACKET: 219,
        /** Back slash (\) key. */
        VK_BACK_SLASH: 220,
        /** Close square bracket (]) key. */
        VK_CLOSE_BRACKET: 221,
        /** Quote (''') key. */
        VK_QUOTE: 222,
        /** Meta key on Linux, Command key on Mac. */
        VK_META: 224,
        /** AltGr key on Linux. Requires Gecko 15.0 */
        VK_ALTGR: 225,
        /** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
        VK_WIN: 91,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_KANA: 21,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_HANGUL: 21,
        /** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
        VK_EISU: 22,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_JUNJA: 23,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_FINAL: 24,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_HANJA: 25,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_KANJI: 25,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_CONVERT: 28,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_NONCONVERT: 29,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_ACCEPT: 30,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_MODECHANGE: 31,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_SELECT: 41,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_PRINT: 42,
        /** Linux support for this keycode was added in Gecko 4.0. */
        VK_EXECUTE: 43,
        /** Linux support for this keycode was added in Gecko 4.0.	 */
        VK_SLEEP: 95,
    };
});
define("rot/rng", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * @namespace
     * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
     * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
     */
    var RNG = (function () {
        function RNG() {
        }
        /**
         * @returns {number}
         */
        RNG.getSeed = function () {
            return this._seed;
        };
        /**
         * @param {number} seed Seed the number generator
         */
        RNG.setSeed = function (seed) {
            seed = (seed < 1 ? 1 / seed : seed);
            this._seed = seed;
            this._s0 = (seed >>> 0) * this._frac;
            seed = (seed * 69069 + 1) >>> 0;
            this._s1 = seed * this._frac;
            seed = (seed * 69069 + 1) >>> 0;
            this._s2 = seed * this._frac;
            this._c = 1;
            return this;
        };
        /**
         * @returns {float} Pseudorandom value [0,1), uniformly distributed
         */
        RNG.getUniform = function () {
            var t = 2091639 * this._s0 + this._c * this._frac;
            this._s0 = this._s1;
            this._s1 = this._s2;
            this._c = t | 0;
            this._s2 = t - this._c;
            return this._s2;
        };
        /**
         * @param {int} lowerBound The lower end of the range to return a value from, inclusive
         * @param {int} upperBound The upper end of the range to return a value from, inclusive
         * @returns {int} Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
         */
        RNG.getUniformInt = function (lowerBound, upperBound) {
            var max = Math.max(lowerBound, upperBound);
            var min = Math.min(lowerBound, upperBound);
            return Math.floor(this.getUniform() * (max - min + 1)) + min;
        };
        /**
         * @param {float} [mean=0] Mean value
         * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
         * @returns {float} A normally distributed pseudorandom value
         */
        RNG.getNormal = function (mean, stddev) {
            do {
                var u = 2 * this.getUniform() - 1;
                var v = 2 * this.getUniform() - 1;
                var r = u * u + v * v;
            } while (r > 1 || r == 0);
            var gauss = u * Math.sqrt(-2 * Math.log(r) / r);
            return (mean || 0) + gauss * (stddev || 1);
        };
        /**
         * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
         */
        RNG.getPercentage = function () {
            return 1 + Math.floor(this.getUniform() * 100);
        };
        /**
         * @param {object} data key=whatever, value=weight (relative probability)
         * @returns {string} whatever
         */
        RNG.getWeightedValue = function (data) {
            var total = 0;
            for (var id in data) {
                total += data[id];
            }
            var random = this.getUniform() * total;
            var part = 0;
            for (var id in data) {
                part += data[id];
                if (random < part) {
                    return id;
                }
            }
            // If by some floating-point annoyance we have
            // random >= total, just return the last id.
            return id;
        };
        /**
         * Get RNG state. Useful for storing the state and re-setting it via setState.
         * @returns {?} Internal state
         */
        RNG.getState = function () {
            return [this._s0, this._s1, this._s2, this._c];
        };
        /**
         * Set a previously retrieved state.
         * @param {?} state
         */
        RNG.setState = function (state) {
            this._s0 = state[0];
            this._s1 = state[1];
            this._s2 = state[2];
            this._c = state[3];
            return this;
        };
        /**
         * Returns a cloned RNG
         */
        RNG.clone = function () {
            var clone = Object.create(this);
            clone.setState(this.getState());
            return clone;
        };
        RNG._s0 = 0;
        RNG._s1 = 0;
        RNG._s2 = 0;
        RNG._c = 0;
        RNG._frac = 2.3283064365386963e-10; /* 2^-32 */
        return RNG;
    }());
    exports.RNG = RNG;
    ;
    RNG.setSeed(Date.now());
});
/**
 * @returns {string} First letter capitalized
 */
String.prototype.capitalize = String.prototype.capitalize || function () {
    return this.charAt(0).toUpperCase() + this.substring(1);
};
/**
 * Left pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.lpad = String.prototype.lpad || function (character, count) {
    var ch = character || "0";
    var cnt = count || 2;
    var s = "";
    while (s.length < (cnt - this.length)) {
        s += ch;
    }
    s = s.substring(0, cnt - this.length);
    return s + this;
};
/**
 * Right pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.rpad = String.prototype.rpad || function (character, count) {
    var ch = character || "0";
    var cnt = count || 2;
    var s = "";
    while (s.length < (cnt - this.length)) {
        s += ch;
    }
    s = s.substring(0, cnt - this.length);
    return this + s;
};
/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
String.format = String.format || function (template) {
    var map = String.format.map;
    var args = Array.prototype.slice.call(arguments, 1);
    var replacer = function (match, group1, group2, index) {
        if (template.charAt(index - 1) == "%") {
            return match.substring(1);
        }
        if (!args.length) {
            return match;
        }
        var obj = args[0];
        var group = group1 || group2;
        var parts = group.split(",");
        var name = parts.shift();
        var method = map[name.toLowerCase()];
        if (!method) {
            return match;
        }
        var obj = args.shift();
        var replaced = obj[method].apply(obj, parts);
        var first = name.charAt(0);
        if (first != first.toLowerCase()) {
            replaced = replaced.capitalize();
        }
        return replaced;
    };
    return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
};
String.format.map = String.format.map || {
    "s": "toString"
};
/**
 * Convenience shortcut to String.format(this)
 */
String.prototype.format = String.prototype.format || function () {
    var args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    return String.format.apply(String, args);
};
define("rot/color", ["require", "exports", "rot/rng", './extensions/string'], function (require, exports, rng_1) {
    "use strict";
    /**
     * @namespace Color operations
     */
    var Color = (function () {
        function Color() {
        }
        Color.fromString = function (str) {
            var cached;
            var r;
            if (str in this._cache) {
                cached = this._cache[str];
            }
            else {
                if (str.charAt(0) == "#") {
                    var values = str.match(/[0-9a-f]/gi).map(function (x) { return parseInt(x, 16); });
                    if (values.length == 3) {
                        cached = values.map(function (x) { return x * 17; });
                    }
                    else {
                        for (var i = 0; i < 3; i++) {
                            values[i + 1] += 16 * values[i];
                            values.splice(i, 1);
                        }
                        cached = values;
                    }
                }
                else if ((r = str.match(/rgb\(([0-9, ]+)\)/i))) {
                    cached = r[1].split(/\s*,\s*/).map(function (x) { return parseInt(x); });
                }
                else {
                    cached = [0, 0, 0];
                }
                this._cache[str] = cached;
            }
            return cached.slice();
        };
        /**
         * Add two or more colors
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        Color.add = function (color1, color2) {
            var result = color1.slice();
            for (var i = 0; i < 3; i++) {
                for (var j = 1; j < arguments.length; j++) {
                    result[i] += arguments[j][i];
                }
            }
            return result;
        };
        /**
         * Add two or more colors, MODIFIES FIRST ARGUMENT
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        Color.add_ = function (color1, color2) {
            for (var i = 0; i < 3; i++) {
                for (var j = 1; j < arguments.length; j++) {
                    color1[i] += arguments[j][i];
                }
            }
            return color1;
        };
        /**
         * Multiply (mix) two or more colors
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        Color.multiply = function (color1, color2) {
            var result = color1.slice();
            for (var i = 0; i < 3; i++) {
                for (var j = 1; j < arguments.length; j++) {
                    result[i] *= arguments[j][i] / 255;
                }
                result[i] = Math.round(result[i]);
            }
            return result;
        };
        /**
         * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        Color.multiply_ = function (color1, color2) {
            for (var i = 0; i < 3; i++) {
                for (var j = 1; j < arguments.length; j++) {
                    color1[i] *= arguments[j][i] / 255;
                }
                color1[i] = Math.round(color1[i]);
            }
            return color1;
        };
        /**
         * Interpolate (blend) two colors with a given factor
         * @param {number[]} color1
         * @param {number[]} color2
         * @param {float} [factor=0.5] 0..1
         * @returns {number[]}
         */
        Color.interpolate = function (color1, color2, factor) {
            if (arguments.length < 3) {
                factor = 0.5;
            }
            var result = color1.slice();
            for (var i = 0; i < 3; i++) {
                result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
            }
            return result;
        };
        /**
         * Interpolate (blend) two colors with a given factor in HSL mode
         * @param {number[]} color1
         * @param {number[]} color2
         * @param {float} [factor=0.5] 0..1
         * @returns {number[]}
         */
        Color.interpolateHSL = function (color1, color2, factor) {
            if (arguments.length < 3) {
                factor = 0.5;
            }
            var hsl1 = this.rgb2hsl(color1);
            var hsl2 = this.rgb2hsl(color2);
            for (var i = 0; i < 3; i++) {
                hsl1[i] += factor * (hsl2[i] - hsl1[i]);
            }
            return this.hsl2rgb(hsl1);
        };
        /**
         * Create a new random color based on this one
         * @param {number[]} color
         * @param {number[]} diff Set of standard deviations
         * @returns {number[]}
         */
        Color.randomize = function (color, diff) {
            if (!(diff instanceof Array)) {
                diff = Math.round(rng_1.RNG.getNormal(0, diff));
            }
            var result = color.slice();
            for (var i = 0; i < 3; i++) {
                result[i] += (diff instanceof Array ? Math.round(rng_1.RNG.getNormal(0, diff[i])) : diff);
            }
            return result;
        };
        /**
         * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
         * @param {number[]} color
         * @returns {number[]}
         */
        Color.rgb2hsl = function (color) {
            var r = color[0] / 255;
            var g = color[1] / 255;
            var b = color[2] / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var h;
            var s;
            var l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            }
            else {
                var d = max - min;
                s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
                switch (max) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            return [h, s, l];
        };
        /**
         * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
         * @param {number[]} color
         * @returns {number[]}
         */
        Color.hsl2rgb = function (color) {
            var l = color[2];
            if (color[1] == 0) {
                l = Math.round(l * 255);
                return [l, l, l];
            }
            else {
                var hue2rgb = function (p, q, t) {
                    if (t < 0)
                        t += 1;
                    if (t > 1)
                        t -= 1;
                    if (t < 1 / 6)
                        return p + (q - p) * 6 * t;
                    if (t < 1 / 2)
                        return q;
                    if (t < 2 / 3)
                        return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var s = color[1];
                var q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
                var p = 2 * l - q;
                var r = hue2rgb(p, q, color[0] + 1 / 3);
                var g = hue2rgb(p, q, color[0]);
                var b = hue2rgb(p, q, color[0] - 1 / 3);
                return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
            }
        };
        Color.toRGB = function (color) {
            return "rgb(" + this._clamp(color[0]) + "," + this._clamp(color[1]) + "," + this._clamp(color[2]) + ")";
        };
        Color.toHex = function (color) {
            var parts = [];
            for (var i = 0; i < 3; i++) {
                parts.push(this._clamp(color[i]).toString(16).lpad("0", 2));
            }
            return "#" + parts.join("");
        };
        Color._clamp = function (num) {
            if (num < 0) {
                return 0;
            }
            else if (num > 255) {
                return 255;
            }
            else {
                return num;
            }
        };
        return Color;
    }());
    exports.Color = Color;
    ;
});
define("rot/display/backend", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * @class Abstract display backend module
     * @private
     */
    var DisplayBackend = (function () {
        function DisplayBackend(context) {
            this._context = context;
        }
        DisplayBackend.prototype.compute = function (options) {
        };
        DisplayBackend.prototype.draw = function (data, clearBefore) {
        };
        DisplayBackend.prototype.computeSize = function (availWidth, availHeight) {
        };
        DisplayBackend.prototype.computeFontSize = function (availWidth, availHeight) {
        };
        DisplayBackend.prototype.eventToPosition = function (x, y) {
        };
        return DisplayBackend;
    }());
    exports.DisplayBackend = DisplayBackend;
});
/**
 * @namespace
 * Contains text tokenization and breaking routines
 */
define("rot/text", ["require", "exports"], function (require, exports) {
    "use strict";
    (function (Tokens) {
        /* token types */
        Tokens[Tokens["TYPE_TEXT"] = 0] = "TYPE_TEXT";
        Tokens[Tokens["TYPE_NEWLINE"] = 1] = "TYPE_NEWLINE";
        Tokens[Tokens["TYPE_FG"] = 2] = "TYPE_FG";
        Tokens[Tokens["TYPE_BG"] = 3] = "TYPE_BG";
    })(exports.Tokens || (exports.Tokens = {}));
    var Tokens = exports.Tokens;
    var TextTokenizer = (function () {
        function TextTokenizer() {
            this.RE_COLORS = /%([bc]){([^}]*)}/g;
        }
        /**
         * Measure size of a resulting text block
         */
        TextTokenizer.prototype.measure = function (str, maxWidth) {
            var result = { width: 0, height: 1 };
            var tokens = this.tokenize(str, maxWidth);
            var lineWidth = 0;
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                switch (token.type) {
                    case Tokens.TYPE_TEXT:
                        lineWidth += token.value.length;
                        break;
                    case Tokens.TYPE_NEWLINE:
                        result.height++;
                        result.width = Math.max(result.width, lineWidth);
                        lineWidth = 0;
                        break;
                }
            }
            result.width = Math.max(result.width, lineWidth);
            return result;
        };
        /**
         * Convert string to a series of a formatting commands
         */
        TextTokenizer.prototype.tokenize = function (str, maxWidth) {
            var result = [];
            /* first tokenization pass - split texts and color formatting commands */
            var offset = 0;
            str.replace(this.RE_COLORS, function (match, type, name, index) {
                /* string before */
                var part = str.substring(offset, index);
                if (part.length) {
                    result.push({
                        type: Tokens.TYPE_TEXT,
                        value: part
                    });
                }
                /* color command */
                result.push({
                    type: (type == "c" ? Tokens.TYPE_FG : Tokens.TYPE_BG),
                    value: name.trim()
                });
                offset = index + match.length;
                return "";
            });
            /* last remaining part */
            var part = str.substring(offset);
            if (part.length) {
                result.push({
                    type: Tokens.TYPE_TEXT,
                    value: part
                });
            }
            return this._breakLines(result, maxWidth);
        };
        /* insert line breaks into first-pass tokenized data */
        TextTokenizer.prototype._breakLines = function (tokens, maxWidth) {
            if (!maxWidth) {
                maxWidth = Infinity;
            }
            var i = 0;
            var lineLength = 0;
            var lastTokenWithSpace = -1;
            while (i < tokens.length) {
                var token = tokens[i];
                if (token.type == Tokens.TYPE_NEWLINE) {
                    lineLength = 0;
                    lastTokenWithSpace = -1;
                }
                if (token.type != Tokens.TYPE_TEXT) {
                    i++;
                    continue;
                }
                /* remove spaces at the beginning of line */
                while (lineLength == 0 && token.value.charAt(0) == " ") {
                    token.value = token.value.substring(1);
                }
                /* forced newline? insert two new tokens after this one */
                var index = token.value.indexOf("\n");
                if (index != -1) {
                    token.value = this._breakInsideToken(tokens, i, index, true);
                    /* if there are spaces at the end, we must remove them (we do not want the line too long) */
                    var arr = token.value.split("");
                    while (arr.length && arr[arr.length - 1] == " ") {
                        arr.pop();
                    }
                    token.value = arr.join("");
                }
                /* token degenerated? */
                if (!token.value.length) {
                    tokens.splice(i, 1);
                    continue;
                }
                if (lineLength + token.value.length > maxWidth) {
                    /* is it possible to break within this token? */
                    index = -1;
                    while (1) {
                        var nextIndex = token.value.indexOf(" ", index + 1);
                        if (nextIndex == -1) {
                            break;
                        }
                        if (lineLength + nextIndex > maxWidth) {
                            break;
                        }
                        index = nextIndex;
                    }
                    if (index != -1) {
                        token.value = this._breakInsideToken(tokens, i, index, true);
                    }
                    else if (lastTokenWithSpace != -1) {
                        var token = tokens[lastTokenWithSpace];
                        var breakIndex = token.value.lastIndexOf(" ");
                        token.value = this._breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
                        i = lastTokenWithSpace;
                    }
                    else {
                        token.value = this._breakInsideToken(tokens, i, maxWidth - lineLength, false);
                    }
                }
                else {
                    lineLength += token.value.length;
                    if (token.value.indexOf(" ") != -1) {
                        lastTokenWithSpace = i;
                    }
                }
                i++; /* advance to next token */
            }
            tokens.push({ type: Tokens.TYPE_NEWLINE }); /* insert fake newline to fix the last text line */
            /* remove trailing space from text tokens before newlines */
            var lastTextToken = null;
            for (var i = 0; i < tokens.length; i++) {
                var token = tokens[i];
                switch (token.type) {
                    case Tokens.TYPE_TEXT:
                        lastTextToken = token;
                        break;
                    case Tokens.TYPE_NEWLINE:
                        if (lastTextToken) {
                            var arr = lastTextToken.value.split("");
                            while (arr.length && arr[arr.length - 1] == " ") {
                                arr.pop();
                            }
                            lastTextToken.value = arr.join("");
                        }
                        lastTextToken = null;
                        break;
                }
            }
            tokens.pop(); /* remove fake token */
            return tokens;
        };
        /**
         * Create new tokens and insert them into the stream
         * @param {object[]} tokens
         * @param {int} tokenIndex Token being processed
         * @param {int} breakIndex Index within current token's value
         * @param {bool} removeBreakChar Do we want to remove the breaking character?
         * @returns {string} remaining unbroken token value
         */
        TextTokenizer.prototype._breakInsideToken = function (tokens, tokenIndex, breakIndex, removeBreakChar) {
            var newBreakToken = {
                type: Tokens.TYPE_NEWLINE
            };
            var newTextToken = {
                type: Tokens.TYPE_TEXT,
                value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
            };
            tokens.splice(tokenIndex + 1, 0, newBreakToken, newTextToken);
            return tokens[tokenIndex].value.substring(0, breakIndex);
        };
        return TextTokenizer;
    }());
    exports.TextTokenizer = TextTokenizer;
    ;
});
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
if (!Number.prototype.mod) {
    Number.prototype.mod = function (n) {
        return ((this % n) + n) % n;
    };
}
define("rot/display/hex", ["require", "exports", "rot/display/backend", '../extensions/number'], function (require, exports, backend_1) {
    "use strict";
    /**
     * @class Hexagonal backend
     * @private
     */
    var HexDisplay = (function (_super) {
        __extends(HexDisplay, _super);
        function HexDisplay(context) {
            _super.call(this, context);
            this._spacingX = 0;
            this._spacingY = 0;
            this._hexSize = 0;
            this._options = {};
        }
        HexDisplay.prototype.compute = function (options) {
            this._options = options;
            /* FIXME char size computation does not respect transposed hexes */
            var charWidth = Math.ceil(this._context.measureText("W").width);
            this._hexSize = Math.floor(options.spacing * (options.fontSize + charWidth / Math.sqrt(3)) / 2);
            this._spacingX = this._hexSize * Math.sqrt(3) / 2;
            this._spacingY = this._hexSize * 1.5;
            if (options.transpose) {
                var xprop = "height";
                var yprop = "width";
            }
            else {
                var xprop = "width";
                var yprop = "height";
            }
            this._context.canvas[xprop] = Math.ceil((options.width + 1) * this._spacingX);
            this._context.canvas[yprop] = Math.ceil((options.height - 1) * this._spacingY + 2 * this._hexSize);
        };
        HexDisplay.prototype.draw = function (data, clearBefore) {
            var x = data[0];
            var y = data[1];
            var ch = data[2];
            var fg = data[3];
            var bg = data[4];
            var px = [
                (x + 1) * this._spacingX,
                y * this._spacingY + this._hexSize
            ];
            if (this._options.transpose) {
                px.reverse();
            }
            if (clearBefore) {
                this._context.fillStyle = bg;
                this._fill(px[0], px[1]);
            }
            if (!ch) {
                return;
            }
            this._context.fillStyle = fg;
            var chars = [].concat(ch);
            for (var i = 0; i < chars.length; i++) {
                this._context.fillText(chars[i], px[0], Math.ceil(px[1]));
            }
        };
        HexDisplay.prototype.computeSize = function (availWidth, availHeight) {
            if (this._options.transpose) {
                availWidth += availHeight;
                availHeight = availWidth - availHeight;
                availWidth -= availHeight;
            }
            var width = Math.floor(availWidth / this._spacingX) - 1;
            var height = Math.floor((availHeight - 2 * this._hexSize) / this._spacingY + 1);
            return [width, height];
        };
        HexDisplay.prototype.computeFontSize = function (availWidth, availHeight) {
            if (this._options.transpose) {
                availWidth += availHeight;
                availHeight = availWidth - availHeight;
                availWidth -= availHeight;
            }
            var hexSizeWidth = 2 * availWidth / ((this._options.width + 1) * Math.sqrt(3)) - 1;
            var hexSizeHeight = availHeight / (2 + 1.5 * (this._options.height - 1));
            var hexSize = Math.min(hexSizeWidth, hexSizeHeight);
            /* compute char ratio */
            var oldFont = this._context.font;
            this._context.font = "100px " + this._options.fontFamily;
            var width = Math.ceil(this._context.measureText("W").width);
            this._context.font = oldFont;
            var ratio = width / 100;
            hexSize = Math.floor(hexSize) + 1; /* closest larger hexSize */
            /* FIXME char size computation does not respect transposed hexes */
            var fontSize = 2 * hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));
            /* closest smaller fontSize */
            return Math.ceil(fontSize) - 1;
        };
        HexDisplay.prototype.eventToPosition = function (x, y) {
            if (this._options.transpose) {
                x += y;
                y = x - y;
                x -= y;
                var nodeSize = this._context.canvas.width;
            }
            else {
                var nodeSize = this._context.canvas.height;
            }
            var size = nodeSize / this._options.height;
            y = Math.floor(y / size);
            if (y.mod(2)) {
                x -= this._spacingX;
                x = 1 + 2 * Math.floor(x / (2 * this._spacingX));
            }
            else {
                x = 2 * Math.floor(x / (2 * this._spacingX));
            }
            return [x, y];
        };
        /**
         * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
         */
        HexDisplay.prototype._fill = function (cx, cy) {
            var a = this._hexSize;
            var b = this._options.border;
            this._context.beginPath();
            if (this._options.transpose) {
                this._context.moveTo(cx - a + b, cy);
                this._context.lineTo(cx - a / 2 + b, cy + this._spacingX - b);
                this._context.lineTo(cx + a / 2 - b, cy + this._spacingX - b);
                this._context.lineTo(cx + a - b, cy);
                this._context.lineTo(cx + a / 2 - b, cy - this._spacingX + b);
                this._context.lineTo(cx - a / 2 + b, cy - this._spacingX + b);
                this._context.lineTo(cx - a + b, cy);
            }
            else {
                this._context.moveTo(cx, cy - a + b);
                this._context.lineTo(cx + this._spacingX - b, cy - a / 2 + b);
                this._context.lineTo(cx + this._spacingX - b, cy + a / 2 - b);
                this._context.lineTo(cx, cy + a - b);
                this._context.lineTo(cx - this._spacingX + b, cy + a / 2 - b);
                this._context.lineTo(cx - this._spacingX + b, cy - a / 2 + b);
                this._context.lineTo(cx, cy - a + b);
            }
            this._context.fill();
        };
        return HexDisplay;
    }(backend_1.DisplayBackend));
    exports.HexDisplay = HexDisplay;
});
define("rot/display/rect", ["require", "exports", "rot/display/backend"], function (require, exports, backend_2) {
    "use strict";
    /**
     * @class Rectangular backend
     * @private
     */
    var RectDisplay = (function (_super) {
        __extends(RectDisplay, _super);
        function RectDisplay(context) {
            _super.call(this, context);
            this._spacingX = 0;
            this._spacingY = 0;
            this._canvasCache = {};
            this._options = {};
        }
        RectDisplay.prototype.compute = function (options) {
            this._canvasCache = {};
            this._options = options;
            var charWidth = Math.ceil(this._context.measureText("W").width);
            this._spacingX = Math.ceil(options.spacing * charWidth);
            this._spacingY = Math.ceil(options.spacing * options.fontSize);
            if (this._options.forceSquareRatio) {
                this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
            }
            this._context.canvas.width = options.width * this._spacingX;
            this._context.canvas.height = options.height * this._spacingY;
        };
        RectDisplay.prototype.draw = function (data, clearBefore) {
            if (RectDisplay.cache) {
                this._drawWithCache(data, clearBefore);
            }
            else {
                this._drawNoCache(data, clearBefore);
            }
        };
        RectDisplay.prototype._drawWithCache = function (data, clearBefore) {
            var x = data[0];
            var y = data[1];
            var ch = data[2];
            var fg = data[3];
            var bg = data[4];
            var hash = "" + ch + fg + bg;
            var canvas;
            if (hash in this._canvasCache) {
                canvas = this._canvasCache[hash];
            }
            else {
                var b = this._options.border;
                canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = this._spacingX;
                canvas.height = this._spacingY;
                ctx.fillStyle = bg;
                ctx.fillRect(b, b, canvas.width - b, canvas.height - b);
                if (ch) {
                    ctx.fillStyle = fg;
                    ctx.font = this._context.font;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    var chars = [].concat(ch);
                    for (var i = 0; i < chars.length; i++) {
                        ctx.fillText(chars[i], this._spacingX / 2, Math.ceil(this._spacingY / 2));
                    }
                }
                this._canvasCache[hash] = canvas;
            }
            this._context.drawImage(canvas, x * this._spacingX, y * this._spacingY);
        };
        RectDisplay.prototype._drawNoCache = function (data, clearBefore) {
            var x = data[0];
            var y = data[1];
            var ch = data[2];
            var fg = data[3];
            var bg = data[4];
            if (clearBefore) {
                var b = this._options.border;
                this._context.fillStyle = bg;
                this._context.fillRect(x * this._spacingX + b, y * this._spacingY + b, this._spacingX - b, this._spacingY - b);
            }
            if (!ch) {
                return;
            }
            this._context.fillStyle = fg;
            var chars = [].concat(ch);
            for (var i = 0; i < chars.length; i++) {
                this._context.fillText(chars[i], (x + 0.5) * this._spacingX, Math.ceil((y + 0.5) * this._spacingY));
            }
        };
        RectDisplay.prototype.computeSize = function (availWidth, availHeight) {
            var width = Math.floor(availWidth / this._spacingX);
            var height = Math.floor(availHeight / this._spacingY);
            return [width, height];
        };
        RectDisplay.prototype.computeFontSize = function (availWidth, availHeight) {
            var boxWidth = Math.floor(availWidth / this._options.width);
            var boxHeight = Math.floor(availHeight / this._options.height);
            /* compute char ratio */
            var oldFont = this._context.font;
            this._context.font = "100px " + this._options.fontFamily;
            var width = Math.ceil(this._context.measureText("W").width);
            this._context.font = oldFont;
            var ratio = width / 100;
            var widthFraction = ratio * boxHeight / boxWidth;
            if (widthFraction > 1) {
                boxHeight = Math.floor(boxHeight / widthFraction);
            }
            return Math.floor(boxHeight / this._options.spacing);
        };
        RectDisplay.prototype.eventToPosition = function (x, y) {
            return [Math.floor(x / this._spacingX), Math.floor(y / this._spacingY)];
        };
        return RectDisplay;
    }(backend_2.DisplayBackend));
    exports.RectDisplay = RectDisplay;
    RectDisplay.cache = false;
});
define("rot/display/tile", ["require", "exports", "rot/display/backend"], function (require, exports, backend_3) {
    "use strict";
    /**
     * @class Tile backend
     * @private
     */
    var TileDisplay = (function (_super) {
        __extends(TileDisplay, _super);
        function TileDisplay(context) {
            _super.call(this, context);
            this._options = {};
            this._colorCanvas = document.createElement("canvas");
        }
        TileDisplay.prototype.compute = function (options) {
            this._options = options;
            this._context.canvas.width = options.width * options.tileWidth;
            this._context.canvas.height = options.height * options.tileHeight;
            this._colorCanvas.width = options.tileWidth;
            this._colorCanvas.height = options.tileHeight;
        };
        TileDisplay.prototype.draw = function (data, clearBefore) {
            var x = data[0];
            var y = data[1];
            var ch = data[2];
            var fg = data[3];
            var bg = data[4];
            var tileWidth = this._options.tileWidth;
            var tileHeight = this._options.tileHeight;
            if (clearBefore) {
                if (this._options.tileColorize) {
                    this._context.clearRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
                else {
                    this._context.fillStyle = bg;
                    this._context.fillRect(x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
            }
            if (!ch) {
                return;
            }
            var chars = [].concat(ch);
            for (var i = 0; i < chars.length; i++) {
                var tile = this._options.tileMap[chars[i]];
                if (!tile) {
                    throw new Error("Char '" + chars[i] + "' not found in tileMap");
                }
                if (this._options.tileColorize) {
                    var canvas = this._colorCanvas;
                    var context = canvas.getContext("2d");
                    context.clearRect(0, 0, tileWidth, tileHeight);
                    context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, 0, 0, tileWidth, tileHeight);
                    if (fg != "transparent") {
                        context.fillStyle = fg;
                        context.globalCompositeOperation = "source-atop";
                        context.fillRect(0, 0, tileWidth, tileHeight);
                    }
                    if (bg != "transparent") {
                        context.fillStyle = bg;
                        context.globalCompositeOperation = "destination-over";
                        context.fillRect(0, 0, tileWidth, tileHeight);
                    }
                    this._context.drawImage(canvas, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
                else {
                    this._context.drawImage(this._options.tileSet, tile[0], tile[1], tileWidth, tileHeight, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
                }
            }
        };
        TileDisplay.prototype.computeSize = function (availWidth, availHeight) {
            var width = Math.floor(availWidth / this._options.tileWidth);
            var height = Math.floor(availHeight / this._options.tileHeight);
            return [width, height];
        };
        TileDisplay.prototype.computeFontSize = function (availWidth, availHeight) {
            var width = Math.floor(availWidth / this._options.width);
            var height = Math.floor(availHeight / this._options.height);
            return [width, height];
        };
        TileDisplay.prototype.eventToPosition = function (x, y) {
            return [Math.floor(x / this._options.tileWidth), Math.floor(y / this._options.tileHeight)];
        };
        return TileDisplay;
    }(backend_3.DisplayBackend));
    exports.TileDisplay = TileDisplay;
});
define("rot/display/display", ["require", "exports", "rot", "rot/text", "rot/display/hex", "rot/display/rect", "rot/display/tile", './extensions/string'], function (require, exports, rot_1, text_1, hex_1, rect_1, tile_1) {
    "use strict";
    var DisplayBackends = {
        'Hex': hex_1.HexDisplay,
        'Rect': rect_1.RectDisplay,
        'Tile': tile_1.TileDisplay
    };
    var Display = (function () {
        function Display(options) {
            if (options === void 0) { options = {}; }
            var canvas = document.createElement("canvas");
            this._context = canvas.getContext("2d");
            this._data = {};
            this._dirty = false; /* false = nothing, true = all, object = dirty cells */
            this._options = {};
            this._backend = null;
            this._tokenizer = new text_1.TextTokenizer();
            var defaultOptions = {
                width: rot_1.ROT.DEFAULT_WIDTH,
                height: rot_1.ROT.DEFAULT_HEIGHT,
                transpose: false,
                layout: "rect",
                fontSize: 15,
                spacing: 1,
                border: 0,
                forceSquareRatio: false,
                fontFamily: "monospace",
                fontStyle: "",
                fg: "#ccc",
                bg: "#000",
                tileWidth: 32,
                tileHeight: 32,
                tileMap: {},
                tileSet: null,
                tileColorize: false,
                termColor: "xterm"
            };
            for (var p in options) {
                defaultOptions[p] = options[p];
            }
            this.setOptions(defaultOptions);
            this.DEBUG = this.DEBUG.bind(this);
            this._tick = this._tick.bind(this);
            requestAnimationFrame(this._tick);
        }
        /**
         * Debug helper, ideal as a map generator callback. Always bound to this.
         * @param {int} x
         * @param {int} y
         * @param {int} what
         */
        Display.prototype.DEBUG = function (x, y, what) {
            var colors = [this._options.bg, this._options.fg];
            this.draw(x, y, null, null, colors[what % colors.length]);
        };
        /**
         * Clear the whole display (cover it with background color)
         */
        Display.prototype.clear = function () {
            this._data = {};
            this._dirty = true;
        };
        /**
         * @see Display
         */
        Display.prototype.setOptions = function (options) {
            for (var p in options) {
                this._options[p] = options[p];
            }
            if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
                if (options.layout) {
                    this._backend = new (DisplayBackends[options.layout.capitalize()])(this._context);
                }
                var font = (this._options.fontStyle ? this._options.fontStyle + " " : "") + this._options.fontSize + "px " + this._options.fontFamily;
                this._context.font = font;
                this._backend.compute(this._options);
                this._context.font = font;
                this._context.textAlign = "center";
                this._context.textBaseline = "middle";
                this._dirty = true;
            }
            return this;
        };
        /**
         * Returns currently set options
         * @returns {object} Current options object
         */
        Display.prototype.getOptions = function () {
            return this._options;
        };
        /**
         * Returns the DOM node of this display
         * @returns {node} DOM node
         */
        Display.prototype.getContainer = function () {
            return this._context.canvas;
        };
        /**
         * Compute the maximum width/height to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int[2]} cellWidth,cellHeight
         */
        Display.prototype.computeSize = function (availWidth, availHeight) {
            return this._backend.computeSize(availWidth, availHeight, this._options);
        };
        /**
         * Compute the maximum font size to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int} fontSize
         */
        Display.prototype.computeFontSize = function (availWidth, availHeight) {
            return this._backend.computeFontSize(availWidth, availHeight, this._options);
        };
        /**
         * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
         * @param {Event} e event
         * @returns {int[2]} -1 for values outside of the canvas
         */
        Display.prototype.eventToPosition = function (e) {
            if (e.touches) {
                var x = e.touches[0].clientX;
                var y = e.touches[0].clientY;
            }
            else {
                var x = e.clientX;
                var y = e.clientY;
            }
            var rect = this._context.canvas.getBoundingClientRect();
            x -= rect.left;
            y -= rect.top;
            x *= this._context.canvas.width / this._context.canvas.clientWidth;
            y *= this._context.canvas.height / this._context.canvas.clientHeight;
            if (x < 0 || y < 0 || x >= this._context.canvas.width || y >= this._context.canvas.height) {
                return [-1, -1];
            }
            return this._backend.eventToPosition(x, y);
        };
        /**
         * @param {int} x
         * @param {int} y
         * @param {string || string[]} ch One or more chars (will be overlapping themselves)
         * @param {string} [fg] foreground color
         * @param {string} [bg] background color
         */
        Display.prototype.draw = function (x, y, ch, fg, bg) {
            if (fg === void 0) { fg = null; }
            if (bg === void 0) { bg = null; }
            if (!fg) {
                fg = this._options.fg;
            }
            if (!bg) {
                bg = this._options.bg;
            }
            this._data[x + "," + y] = [x, y, ch, fg, bg];
            if (this._dirty === true) {
                return;
            } /* will already redraw everything */
            if (!this._dirty) {
                this._dirty = {};
            } /* first! */
            this._dirty[x + "," + y] = true;
        };
        /**
         * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
         * @param {int} x
         * @param {int} y
         * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
         * @param {int} [maxWidth] wrap at what width?
         * @returns {int} lines drawn
         */
        Display.prototype.drawText = function (x, y, text, maxWidth) {
            var fg = null;
            var bg = null;
            var cx = x;
            var cy = y;
            var lines = 1;
            if (!maxWidth) {
                maxWidth = this._options.width - x;
            }
            var tokens = this._tokenizer.tokenize(text, maxWidth);
            while (tokens.length) {
                var token = tokens.shift();
                switch (token.type) {
                    case text_1.Tokens.TYPE_TEXT:
                        var isSpace = false;
                        var isPrevSpace = false;
                        var isFullWidth = false;
                        var isPrevFullWidth = false;
                        for (var i = 0; i < token.value.length; i++) {
                            var cc = token.value.charCodeAt(i);
                            var c = token.value.charAt(i);
                            // Assign to `true` when the current char is full-width.
                            isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
                            // Current char is space, whatever full-width or half-width both are OK.
                            isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
                            // The previous char is full-width and
                            // current char is nether half-width nor a space.
                            if (isPrevFullWidth && !isFullWidth && !isSpace) {
                                cx++;
                            } // add an extra position
                            // The current char is full-width and
                            // the previous char is not a space.
                            if (isFullWidth && !isPrevSpace) {
                                cx++;
                            } // add an extra position
                            this.draw(cx++, cy, c, fg, bg);
                            isPrevSpace = isSpace;
                            isPrevFullWidth = isFullWidth;
                        }
                        break;
                    case text_1.Tokens.TYPE_FG:
                        fg = token.value || null;
                        break;
                    case text_1.Tokens.TYPE_BG:
                        bg = token.value || null;
                        break;
                    case text_1.Tokens.TYPE_NEWLINE:
                        cx = x;
                        cy++;
                        lines++;
                        break;
                }
            }
            return lines;
        };
        /**
         * Timer tick: update dirty parts
         */
        Display.prototype._tick = function () {
            requestAnimationFrame(this._tick);
            if (!this._dirty) {
                return;
            }
            if (this._dirty === true) {
                this._context.fillStyle = this._options.bg;
                this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);
                for (var id in this._data) {
                    this._draw(id, false);
                }
            }
            else {
                for (var key in this._dirty) {
                    this._draw(key, true);
                }
            }
            this._dirty = false;
        };
        /**
         * @param {string} key What to draw
         * @param {bool} clearBefore Is it necessary to clean before?
         */
        Display.prototype._draw = function (key, clearBefore) {
            var data = this._data[key];
            if (data[4] != this._options.bg) {
                clearBefore = true;
            }
            this._backend.draw(data, clearBefore);
        };
        return Display;
    }());
    exports.Display = Display;
});
define("rot/eventqueue", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * @class Generic event queue: stores events and retrieves them based on their time
     */
    var EventQueue = (function () {
        function EventQueue() {
            this._time = 0;
            this._events = [];
            this._eventTimes = [];
        }
        /**
         * @returns {number} Elapsed time
         */
        EventQueue.prototype.getTime = function () {
            return this._time;
        };
        /**
         * Clear all scheduled events
         */
        EventQueue.prototype.clear = function () {
            this._events = [];
            this._eventTimes = [];
            return this;
        };
        /**
         * @param {?} event
         * @param {number} time
         */
        EventQueue.prototype.add = function (event, time) {
            var index = this._events.length;
            for (var i = 0; i < this._eventTimes.length; i++) {
                if (this._eventTimes[i] > time) {
                    index = i;
                    break;
                }
            }
            this._events.splice(index, 0, event);
            this._eventTimes.splice(index, 0, time);
        };
        /**
         * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
         * @returns {? || null} The event previously added by addEvent, null if no event available
         */
        EventQueue.prototype.get = function () {
            if (!this._events.length) {
                return null;
            }
            var time = this._eventTimes.splice(0, 1)[0];
            if (time > 0) {
                this._time += time;
                for (var i = 0; i < this._eventTimes.length; i++) {
                    this._eventTimes[i] -= time;
                }
            }
            return this._events.splice(0, 1)[0];
        };
        /**
         * Get the time associated with the given event
         * @param {?} event
         * @returns {number} time
         */
        EventQueue.prototype.getEventTime = function (event) {
            var index = this._events.indexOf(event);
            if (index == -1) {
                return undefined;
            }
            return this._eventTimes[index];
        };
        /**
         * Remove an event from the queue
         * @param {?} event
         * @returns {bool} success?
         */
        EventQueue.prototype.remove = function (event) {
            var index = this._events.indexOf(event);
            if (index == -1) {
                return false;
            }
            this._remove(index);
            return true;
        };
        /**
         * Remove an event from the queue
         * @param {int} index
         */
        EventQueue.prototype._remove = function (index) {
            this._events.splice(index, 1);
            this._eventTimes.splice(index, 1);
        };
        return EventQueue;
    }());
    exports.EventQueue = EventQueue;
});
define("rot/scheduler/scheduler", ["require", "exports", "rot/eventqueue"], function (require, exports, eventqueue_1) {
    "use strict";
    /**
     * @class Abstract scheduler
     */
    var Scheduler = (function () {
        function Scheduler() {
            this._queue = new eventqueue_1.EventQueue();
            this._repeat = [];
            this._current = null;
        }
        /**
         * @see ROT.EventQueue#getTime
         */
        Scheduler.prototype.getTime = function () {
            return this._queue.getTime();
        };
        /**
         * @param {?} item
         * @param {bool} repeat
         */
        Scheduler.prototype.add = function (item, repeat) {
            if (repeat) {
                this._repeat.push(item);
            }
            return this;
        };
        /**
         * Get the time the given item is scheduled for
         * @param {?} item
         * @returns {number} time
         */
        Scheduler.prototype.getTimeOf = function (item) {
            return this._queue.getEventTime(item);
        };
        /**
         * Clear all items
         */
        Scheduler.prototype.clear = function () {
            this._queue.clear();
            this._repeat = [];
            this._current = null;
            return this;
        };
        /**
         * Remove a previously added item
         * @param {?} item
         * @returns {bool} successful?
         */
        Scheduler.prototype.remove = function (item) {
            var result = this._queue.remove(item);
            var index = this._repeat.indexOf(item);
            if (index != -1) {
                this._repeat.splice(index, 1);
            }
            if (this._current == item) {
                this._current = null;
            }
            return result;
        };
        /**
         * Schedule next item
         * @returns {?}
         */
        Scheduler.prototype.next = function () {
            this._current = this._queue.get();
            return this._current;
        };
        return Scheduler;
    }());
    exports.Scheduler = Scheduler;
});
define("rot/engine", ["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * @class Asynchronous main loop
     * @param {ROT.Scheduler} scheduler
     */
    var Engine = (function () {
        function Engine(scheduler) {
            this._scheduler = scheduler;
            this._lock = 1;
        }
        /**
         * Start the main loop. When this call returns, the loop is locked.
         */
        Engine.prototype.start = function () {
            return this.unlock();
        };
        /**
         * Interrupt the engine by an asynchronous action
         */
        Engine.prototype.lock = function () {
            this._lock++;
            return this;
        };
        /**
         * Resume execution (paused by a previous lock)
         */
        Engine.prototype.unlock = function () {
            if (!this._lock) {
                throw new Error("Cannot unlock unlocked engine");
            }
            this._lock--;
            while (!this._lock) {
                var actor = this._scheduler.next();
                if (!actor) {
                    return this.lock();
                } /* no actors */
                var result = actor.act();
                if (result && result.then) {
                    this.lock();
                    result.then(this.unlock.bind(this));
                }
            }
            return this;
        };
        return Engine;
    }());
    exports.Engine = Engine;
});
define("rot/extensions/array", ["require", "exports", "rot/rng"], function (require, exports, rng_2) {
    "use strict";
    /**
     * @returns {any} Randomly picked item, null when length=0
     */
    if (!Array.prototype.random) {
        Array.prototype.random = function () {
            if (!this.length) {
                return null;
            }
            return this[Math.floor(rng_2.RNG.getUniform() * this.length)];
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
});
if (typeof window != "undefined") {
    window.requestAnimationFrame =
        window.requestAnimationFrame
            || window.mozRequestAnimationFrame
            || window.webkitRequestAnimationFrame
            || window.oRequestAnimationFrame
            || window.msRequestAnimationFrame
            || function (cb) { return setTimeout(cb, 1000 / 60); };
    window.cancelAnimationFrame =
        window.cancelAnimationFrame
            || window.mozCancelAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.oCancelAnimationFrame
            || window.msCancelAnimationFrame
            || function (id) { return clearTimeout(id); };
}
define("rot/fov/fov", ["require", "exports", "rot"], function (require, exports, rot_2) {
    "use strict";
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    var FOV = (function () {
        function FOV(lightPassesCallback, options) {
            if (options === void 0) { options = {}; }
            this._lightPasses = lightPassesCallback;
            this._options = {
                topology: 8
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
        }
        /**
         * Compute visibility for a 360-degree circle
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        FOV.prototype.compute = function (x, y, R, callback) { };
        /**
         * Return all neighbors in a concentric ring
         * @param {int} cx center-x
         * @param {int} cy center-y
         * @param {int} r range
         */
        FOV.prototype._getCircle = function (cx, cy, r) {
            var result = [];
            var dirs;
            var countFactor;
            var startOffset;
            switch (this._options.topology) {
                case 4:
                    countFactor = 1;
                    startOffset = [0, 1];
                    dirs = [
                        rot_2.ROT.DIRS[8][7],
                        rot_2.ROT.DIRS[8][1],
                        rot_2.ROT.DIRS[8][3],
                        rot_2.ROT.DIRS[8][5]
                    ];
                    break;
                case 6:
                    dirs = rot_2.ROT.DIRS[6];
                    countFactor = 1;
                    startOffset = [-1, 1];
                    break;
                case 8:
                    dirs = rot_2.ROT.DIRS[4];
                    countFactor = 2;
                    startOffset = [-1, 1];
                    break;
            }
            /* starting neighbor */
            var x = cx + startOffset[0] * r;
            var y = cy + startOffset[1] * r;
            /* circle */
            for (var i = 0; i < dirs.length; i++) {
                for (var j = 0; j < r * countFactor; j++) {
                    result.push([x, y]);
                    x += dirs[i][0];
                    y += dirs[i][1];
                }
            }
            return result;
        };
        return FOV;
    }());
    exports.FOV = FOV;
});
define("rot/fov/discrete-shadowcasting", ["require", "exports", "rot/fov/fov"], function (require, exports, fov_1) {
    "use strict";
    /**
     * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
     * @augments ROT.FOV
     */
    var DiscreteShadowcasting = (function (_super) {
        __extends(DiscreteShadowcasting, _super);
        function DiscreteShadowcasting(lightPassesCallback, options) {
            if (options === void 0) { options = {}; }
            _super.call(this, lightPassesCallback, options);
        }
        /**
         * @see ROT.FOV#compute
         */
        DiscreteShadowcasting.prototype.compute = function (x, y, R, callback) {
            var center = this._coords;
            var map = this._map;
            /* this place is always visible */
            callback(x, y, 0, 1);
            /* standing in a dark place. FIXME is this a good idea?  */
            if (!this._lightPasses(x, y)) {
                return;
            }
            /* start and end angles */
            var DATA = [];
            var A;
            var B;
            var cx;
            var cy;
            var blocks;
            /* analyze surrounding cells in concentric rings, starting from the center */
            for (var r = 1; r <= R; r++) {
                var neighbors = this._getCircle(x, y, r);
                var angle = 360 / neighbors.length;
                for (var i = 0; i < neighbors.length; i++) {
                    cx = neighbors[i][0];
                    cy = neighbors[i][1];
                    A = angle * (i - 0.5);
                    B = A + angle;
                    blocks = !this._lightPasses(cx, cy);
                    if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) {
                        callback(cx, cy, r, 1);
                    }
                    if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) {
                        return;
                    } /* cutoff? */
                } /* for all cells in this ring */
            } /* for all rings */
        };
        /**
         * @param {int} A start angle
         * @param {int} B end angle
         * @param {bool} blocks Does current cell block visibility?
         * @param {int[][]} DATA shadowed angle pairs
         */
        DiscreteShadowcasting.prototype._visibleCoords = function (A, B, blocks, DATA) {
            if (A < 0) {
                var v1 = arguments.callee(0, B, blocks, DATA);
                var v2 = arguments.callee(360 + A, 360, blocks, DATA);
                return v1 || v2;
            }
            var index = 0;
            while (index < DATA.length && DATA[index] < A) {
                index++;
            }
            if (index == DATA.length) {
                if (blocks) {
                    DATA.push(A, B);
                }
                return true;
            }
            var count = 0;
            if (index % 2) {
                while (index < DATA.length && DATA[index] < B) {
                    index++;
                    count++;
                }
                if (count == 0) {
                    return false;
                }
                if (blocks) {
                    if (count % 2) {
                        DATA.splice(index - count, count, B);
                    }
                    else {
                        DATA.splice(index - count, count);
                    }
                }
                return true;
            }
            else {
                while (index < DATA.length && DATA[index] < B) {
                    index++;
                    count++;
                }
                /* visible when outside an existing shadow, or when overlapping */
                if (A == DATA[index - count] && count == 1) {
                    return false;
                }
                if (blocks) {
                    if (count % 2) {
                        DATA.splice(index - count, count, A);
                    }
                    else {
                        DATA.splice(index - count, count, A, B);
                    }
                }
                return true;
            }
        };
        return DiscreteShadowcasting;
    }(fov_1.FOV));
    exports.DiscreteShadowcasting = DiscreteShadowcasting;
});
define("rot/fov/precise-shadowcasting", ["require", "exports", "rot/fov/fov"], function (require, exports, fov_2) {
    "use strict";
    /**
     * @class Precise shadowcasting algorithm
     * @augments ROT.FOV
     */
    var PreciseShadowcasting = (function (_super) {
        __extends(PreciseShadowcasting, _super);
        function PreciseShadowcasting(lightPassesCallback, options) {
            if (options === void 0) { options = {}; }
            _super.call(this, lightPassesCallback, options);
        }
        /**
         * @see ROT.FOV#compute
         */
        PreciseShadowcasting.prototype.compute = function (x, y, R, callback) {
            /* this place is always visible */
            callback(x, y, 0, 1);
            /* standing in a dark place. FIXME is this a good idea?  */
            if (!this._lightPasses(x, y)) {
                return;
            }
            /* list of all shadows */
            var SHADOWS = [];
            var cx;
            var cy;
            var blocks;
            var A1;
            var A2;
            var visibility;
            /* analyze surrounding cells in concentric rings, starting from the center */
            for (var r = 1; r <= R; r++) {
                var neighbors = this._getCircle(x, y, r);
                var neighborCount = neighbors.length;
                for (var i = 0; i < neighborCount; i++) {
                    cx = neighbors[i][0];
                    cy = neighbors[i][1];
                    /* shift half-an-angle backwards to maintain consistency of 0-th cells */
                    A1 = [i ? 2 * i - 1 : 2 * neighborCount - 1, 2 * neighborCount];
                    A2 = [2 * i + 1, 2 * neighborCount];
                    blocks = !this._lightPasses(cx, cy);
                    visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
                    if (visibility) {
                        callback(cx, cy, r, visibility);
                    }
                    if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) {
                        return;
                    } /* cutoff? */
                } /* for all cells in this ring */
            } /* for all rings */
        };
        /**
         * @param {int[2]} A1 arc start
         * @param {int[2]} A2 arc end
         * @param {bool} blocks Does current arc block visibility?
         * @param {int[][]} SHADOWS list of active shadows
         */
        PreciseShadowcasting.prototype._checkVisibility = function (A1, A2, blocks, SHADOWS) {
            if (A1[0] > A2[0]) {
                var v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
                var v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
                return (v1 + v2) / 2;
            }
            /* index1: first shadow >= A1 */
            var index1 = 0;
            var edge1 = false;
            while (index1 < SHADOWS.length) {
                var old = SHADOWS[index1];
                var diff = old[0] * A1[1] - A1[0] * old[1];
                if (diff >= 0) {
                    if (diff == 0 && !(index1 % 2)) {
                        edge1 = true;
                    }
                    break;
                }
                index1++;
            }
            /* index2: last shadow <= A2 */
            var index2 = SHADOWS.length;
            var edge2 = false;
            while (index2--) {
                var old = SHADOWS[index2];
                var diff = A2[0] * old[1] - old[0] * A2[1];
                if (diff >= 0) {
                    if (diff == 0 && (index2 % 2)) {
                        edge2 = true;
                    }
                    break;
                }
            }
            var visible = true;
            if (index1 == index2 && (edge1 || edge2)) {
                visible = false;
            }
            else if (edge1 && edge2 && index1 + 1 == index2 && (index2 % 2)) {
                visible = false;
            }
            else if (index1 > index2 && (index1 % 2)) {
                visible = false;
            }
            if (!visible) {
                return 0;
            }
            /* fast case: not visible */
            var visibleLength;
            var P;
            /* compute the length of visible arc, adjust list of shadows (if blocking) */
            var remove = index2 - index1 + 1;
            if (remove % 2) {
                if (index1 % 2) {
                    var P = SHADOWS[index1];
                    visibleLength = (A2[0] * P[1] - P[0] * A2[1]) / (P[1] * A2[1]);
                    if (blocks) {
                        SHADOWS.splice(index1, remove, A2);
                    }
                }
                else {
                    var P = SHADOWS[index2];
                    visibleLength = (P[0] * A1[1] - A1[0] * P[1]) / (A1[1] * P[1]);
                    if (blocks) {
                        SHADOWS.splice(index1, remove, A1);
                    }
                }
            }
            else {
                if (index1 % 2) {
                    var P1 = SHADOWS[index1];
                    var P2 = SHADOWS[index2];
                    visibleLength = (P2[0] * P1[1] - P1[0] * P2[1]) / (P1[1] * P2[1]);
                    if (blocks) {
                        SHADOWS.splice(index1, remove);
                    }
                }
                else {
                    if (blocks) {
                        SHADOWS.splice(index1, remove, A1, A2);
                    }
                    return 1; /* whole arc visible! */
                }
            }
            var arcLength = (A2[0] * A1[1] - A1[0] * A2[1]) / (A1[1] * A2[1]);
            return visibleLength / arcLength;
        };
        return PreciseShadowcasting;
    }(fov_2.FOV));
    exports.PreciseShadowcasting = PreciseShadowcasting;
});
define("rot/fov/recursive-shadowcasting", ["require", "exports", "rot/fov/fov"], function (require, exports, fov_3) {
    "use strict";
    /**
     * @class Recursive shadowcasting algorithm
     * Currently only supports 4/8 topologies, not hexagonal.
     * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
     * @augments ROT.FOV
     */
    var RecursiveShadowcasting = (function (_super) {
        __extends(RecursiveShadowcasting, _super);
        function RecursiveShadowcasting(lightPassesCallback, options) {
            if (options === void 0) { options = {}; }
            _super.call(this, lightPassesCallback, options);
        }
        /**
         * Compute visibility for a 360-degree circle
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        RecursiveShadowcasting.prototype.compute = function (x, y, R, callback) {
            //You can always see your own tile
            callback(x, y, 0, 1);
            for (var i = 0; i < RecursiveShadowcasting.OCTANTS.length; i++) {
                this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[i], R, callback);
            }
        };
        /**
         * Compute visibility for a 180-degree arc
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
         * @param {function} callback
         */
        RecursiveShadowcasting.prototype.compute180 = function (x, y, R, dir, callback) {
            //You can always see your own tile
            callback(x, y, 0, 1);
            var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
            var nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
            var nextOctant = (dir + 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[nextPreviousOctant], R, callback);
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[dir], R, callback);
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[nextOctant], R, callback);
        };
        /**
         * Compute visibility for a 90-degree arc
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
         * @param {function} callback
         */
        RecursiveShadowcasting.prototype.compute90 = function (x, y, R, dir, callback) {
            //You can always see your own tile
            callback(x, y, 0, 1);
            var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[dir], R, callback);
            this._renderOctant(x, y, RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
        };
        /**
         * Render one octant (45-degree arc) of the viewshed
         * @param {int} x
         * @param {int} y
         * @param {int} octant Octant to be rendered
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        RecursiveShadowcasting.prototype._renderOctant = function (x, y, octant, R, callback) {
            //Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
            this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
        };
        /**
         * Actually calculates the visibility
         * @param {int} startX The starting X coordinate
         * @param {int} startY The starting Y coordinate
         * @param {int} row The row to render
         * @param {float} visSlopeStart The slope to start at
         * @param {float} visSlopeEnd The slope to end at
         * @param {int} radius The radius to reach out to
         * @param {int} xx
         * @param {int} xy
         * @param {int} yx
         * @param {int} yy
         * @param {function} callback The callback to use when we hit a block that is visible
         */
        RecursiveShadowcasting.prototype._castVisibility = function (startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
            if (visSlopeStart < visSlopeEnd) {
                return;
            }
            for (var i = row; i <= radius; i++) {
                var dx = -i - 1;
                var dy = -i;
                var blocked = false;
                var newStart = 0;
                //'Row' could be column, names here assume octant 0 and would be flipped for half the octants
                while (dx <= 0) {
                    dx += 1;
                    //Translate from relative coordinates to map coordinates
                    var mapX = startX + dx * xx + dy * xy;
                    var mapY = startY + dx * yx + dy * yy;
                    //Range of the row
                    var slopeStart = (dx - 0.5) / (dy + 0.5);
                    var slopeEnd = (dx + 0.5) / (dy - 0.5);
                    //Ignore if not yet at left edge of Octant
                    if (slopeEnd > visSlopeStart) {
                        continue;
                    }
                    //Done if past right edge
                    if (slopeStart < visSlopeEnd) {
                        break;
                    }
                    //If it's in range, it's visible
                    if ((dx * dx + dy * dy) < (radius * radius)) {
                        callback(mapX, mapY, i, 1);
                    }
                    if (!blocked) {
                        //If tile is a blocking tile, cast around it
                        if (!this._lightPasses(mapX, mapY) && i < radius) {
                            blocked = true;
                            this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
                            newStart = slopeEnd;
                        }
                    }
                    else {
                        //Keep narrowing if scanning across a block
                        if (!this._lightPasses(mapX, mapY)) {
                            newStart = slopeEnd;
                            continue;
                        }
                        //Block has ended
                        blocked = false;
                        visSlopeStart = newStart;
                    }
                }
                if (blocked) {
                    break;
                }
            }
        };
        /** Octants used for translating recursive shadowcasting offsets */
        RecursiveShadowcasting.OCTANTS = [
            [-1, 0, 0, 1],
            [0, -1, 1, 0],
            [0, -1, -1, 0],
            [-1, 0, 0, -1],
            [1, 0, 0, -1],
            [0, 1, -1, 0],
            [0, 1, 1, 0],
            [1, 0, 0, 1]
        ];
        return RecursiveShadowcasting;
    }(fov_3.FOV));
    exports.RecursiveShadowcasting = RecursiveShadowcasting;
});
define("rot/lighting", ["require", "exports", "rot/color"], function (require, exports, color_1) {
    "use strict";
    /**
     * @class Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
     * @param {function} reflectivityCallback Callback to retrieve cell reflectivity (0..1)
     * @param {object} [options]
     * @param {int} [options.passes=1] Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm.
     * @param {int} [options.emissionThreshold=100] Cells with emissivity > threshold will be treated as light source in the next pass.
     * @param {int} [options.range=10] Max light range
     */
    var Lighting = (function () {
        function Lighting(reflectivityCallback, options) {
            this._reflectivityCallback = reflectivityCallback;
            this._options = {
                passes: 1,
                emissionThreshold: 100,
                range: 10
            };
            this._fov = null;
            this._lights = {};
            this._reflectivityCache = {};
            this._fovCache = {};
            this.setOptions(options);
        }
        /**
         * Adjust options at runtime
         * @see Lighting
         * @param {object} [options]
         */
        Lighting.prototype.setOptions = function (options) {
            for (var p in options) {
                this._options[p] = options[p];
            }
            if (options && options.range) {
                this.reset();
            }
            return this;
        };
        /**
         * Set the used Field-Of-View algo
         * @param {ROT.FOV} fov
         */
        Lighting.prototype.setFOV = function (fov) {
            this._fov = fov;
            this._fovCache = {};
            return this;
        };
        /**
         * Set (or remove) a light source
         * @param {int} x
         * @param {int} y
         * @param {null || string || number[3]} color
         */
        Lighting.prototype.setLight = function (x, y, color) {
            var key = x + "," + y;
            if (color) {
                this._lights[key] = (typeof (color) == "string" ? color_1.Color.fromString(color) : color);
            }
            else {
                delete this._lights[key];
            }
            return this;
        };
        /**
         * Remove all light sources
         */
        Lighting.prototype.clearLights = function () {
            this._lights = {};
        };
        /**
         * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
         */
        Lighting.prototype.reset = function () {
            this._reflectivityCache = {};
            this._fovCache = {};
            return this;
        };
        /**
         * Compute the lighting
         * @param {function} lightingCallback Will be called with (x, y, color) for every lit cell
         */
        Lighting.prototype.compute = function (lightingCallback) {
            var doneCells = {};
            var emittingCells = {};
            var litCells = {};
            for (var key in this._lights) {
                var light = this._lights[key];
                emittingCells[key] = [0, 0, 0];
                color_1.Color.add_(emittingCells[key], light);
            }
            for (var i = 0; i < this._options.passes; i++) {
                this._emitLight(emittingCells, litCells, doneCells);
                if (i + 1 == this._options.passes) {
                    continue;
                } /* not for the last pass */
                emittingCells = this._computeEmitters(litCells, doneCells);
            }
            for (var litKey in litCells) {
                var parts = litKey.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                lightingCallback(x, y, litCells[litKey]);
            }
            return this;
        };
        /**
         * Compute one iteration from all emitting cells
         * @param {object} emittingCells These emit light
         * @param {object} litCells Add projected light to these
         * @param {object} doneCells These already emitted, forbid them from further calculations
         */
        Lighting.prototype._emitLight = function (emittingCells, litCells, doneCells) {
            for (var key in emittingCells) {
                var parts = key.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                this._emitLightFromCell(x, y, emittingCells[key], litCells);
                doneCells[key] = 1;
            }
            return this;
        };
        /**
         * Prepare a list of emitters for next pass
         * @param {object} litCells
         * @param {object} doneCells
         * @returns {object}
         */
        Lighting.prototype._computeEmitters = function (litCells, doneCells) {
            var result = {};
            for (var key in litCells) {
                if (key in doneCells) {
                    continue;
                } /* already emitted */
                var color = litCells[key];
                if (key in this._reflectivityCache) {
                    var reflectivity = this._reflectivityCache[key];
                }
                else {
                    var parts = key.split(",");
                    var x = parseInt(parts[0]);
                    var y = parseInt(parts[1]);
                    var reflectivity = this._reflectivityCallback(x, y);
                    this._reflectivityCache[key] = reflectivity;
                }
                if (reflectivity == 0) {
                    continue;
                } /* will not reflect at all */
                /* compute emission color */
                var emission = [];
                var intensity = 0;
                for (var i = 0; i < 3; i++) {
                    var part = Math.round(color[i] * reflectivity);
                    emission[i] = part;
                    intensity += part;
                }
                if (intensity > this._options.emissionThreshold) {
                    result[key] = emission;
                }
            }
            return result;
        };
        /**
         * Compute one iteration from one cell
         * @param {int} x
         * @param {int} y
         * @param {number[]} color
         * @param {object} litCells Cell data to by updated
         */
        Lighting.prototype._emitLightFromCell = function (x, y, color, litCells) {
            var key = x + "," + y;
            var fov = {};
            if (key in this._fovCache) {
                fov = this._fovCache[key];
            }
            else {
                fov = this._updateFOV(x, y);
            }
            for (var fovKey in fov) {
                var formFactor = fov[fovKey];
                var result = [];
                if (fovKey in litCells) {
                    result = litCells[fovKey];
                }
                else {
                    result = [0, 0, 0];
                    litCells[fovKey] = result;
                }
                for (var i = 0; i < 3; i++) {
                    result[i] += Math.round(color[i] * formFactor);
                } /* add light color */
            }
            return this;
        };
        /**
         * Compute FOV ("form factor") for a potential light source at [x,y]
         * @param {int} x
         * @param {int} y
         * @returns {object}
         */
        Lighting.prototype._updateFOV = function (x, y) {
            var key1 = x + "," + y;
            var cache = {};
            this._fovCache[key1] = cache;
            var range = this._options.range;
            var cb = function (x, y, r, vis) {
                var key2 = x + "," + y;
                var formFactor = vis * (1 - r / range);
                if (formFactor == 0) {
                    return;
                }
                cache[key2] = formFactor;
            };
            this._fov.compute(x, y, range, cb.bind(this));
            return cache;
        };
        return Lighting;
    }());
    exports.Lighting = Lighting;
});
define("rot/map/map", ["require", "exports", "rot"], function (require, exports, rot_3) {
    "use strict";
    /**
     * @class Base map generator
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     */
    var Map = (function () {
        function Map(width, height) {
            if (width === void 0) { width = rot_3.ROT.DEFAULT_WIDTH; }
            if (height === void 0) { height = rot_3.ROT.DEFAULT_HEIGHT; }
            this._width = width;
            this._height = height;
        }
        Map.prototype.create = function (callback) { };
        Map.prototype._fillMap = function (value) {
            var map = [];
            for (var i = 0; i < this._width; i++) {
                map.push([]);
                for (var j = 0; j < this._height; j++) {
                    map[i].push(value);
                }
            }
            return map;
        };
        return Map;
    }());
    exports.Map = Map;
});
define("rot/map/arena", ["require", "exports", "rot/map/map"], function (require, exports, map_1) {
    "use strict";
    /**
     * @class Simple empty rectangular room
     * @augments ROT.Map
     */
    var Arena = (function (_super) {
        __extends(Arena, _super);
        function Arena(width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            _super.call(this, width, height);
        }
        Arena.prototype.create = function (callback) {
            var w = this._width - 1;
            var h = this._height - 1;
            for (var i = 0; i <= w; i++) {
                for (var j = 0; j <= h; j++) {
                    var empty = (i && j && i < w && j < h);
                    callback(i, j, empty ? 0 : 1);
                }
            }
            return this;
        };
        return Arena;
    }(map_1.Map));
    exports.Arena = Arena;
});
define("rot/map/cellular", ["require", "exports", "rot", "rot/map/map", "rot/rng"], function (require, exports, rot_4, map_2, rng_3) {
    "use strict";
    /**
     * @class Cellular automaton map generator
     * @augments ROT.Map
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     * @param {object} [options] Options
     * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
     * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
     * @param {int} [options.topology] Topology 4 or 6 or 8
     */
    var Cellular = (function (_super) {
        __extends(Cellular, _super);
        function Cellular(width, height, options) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (options === void 0) { options = {}; }
            _super.call(this, width, height);
            this._options = {
                born: [5, 6, 7, 8],
                survive: [4, 5, 6, 7, 8],
                topology: 8
            };
            this.setOptions(options);
            this._dirs = rot_4.ROT.DIRS[this._options.topology];
            this._map = this._fillMap(0);
        }
        /**
         * Fill the map with random values
         * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
         */
        Cellular.prototype.randomize = function (probability) {
            for (var i = 0; i < this._width; i++) {
                for (var j = 0; j < this._height; j++) {
                    this._map[i][j] = (rng_3.RNG.getUniform() < probability ? 1 : 0);
                }
            }
            return this;
        };
        /**
         * Change options.
         * @see Cellular
         */
        Cellular.prototype.setOptions = function (options) {
            for (var p in options) {
                this._options[p] = options[p];
            }
        };
        Cellular.prototype.set = function (x, y, value) {
            this._map[x][y] = value;
        };
        Cellular.prototype.create = function (callback) {
            var newMap = this._fillMap(0);
            var born = this._options.born;
            var survive = this._options.survive;
            for (var j = 0; j < this._height; j++) {
                var widthStep = 1;
                var widthStart = 0;
                if (this._options.topology == 6) {
                    widthStep = 2;
                    widthStart = j % 2;
                }
                for (var i = widthStart; i < this._width; i += widthStep) {
                    var cur = this._map[i][j];
                    var ncount = this._getNeighbors(i, j);
                    if (cur && survive.indexOf(ncount) != -1) {
                        newMap[i][j] = 1;
                    }
                    else if (!cur && born.indexOf(ncount) != -1) {
                        newMap[i][j] = 1;
                    }
                }
            }
            this._map = newMap;
            this.serviceCallback(callback);
        };
        Cellular.prototype.serviceCallback = function (callback) {
            if (!callback) {
                return;
            }
            for (var j = 0; j < this._height; j++) {
                var widthStep = 1;
                var widthStart = 0;
                if (this._options.topology == 6) {
                    widthStep = 2;
                    widthStart = j % 2;
                }
                for (var i = widthStart; i < this._width; i += widthStep) {
                    callback(i, j, this._map[i][j]);
                }
            }
        };
        /**
         * Get neighbor count at [i,j] in this._map
         */
        Cellular.prototype._getNeighbors = function (cx, cy) {
            var result = 0;
            for (var i = 0; i < this._dirs.length; i++) {
                var dir = this._dirs[i];
                var x = cx + dir[0];
                var y = cy + dir[1];
                if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
                    continue;
                }
                result += (this._map[x][y] == 1 ? 1 : 0);
            }
            return result;
        };
        /**
         * Make sure every non-wall space is accessible.
         * @param {function} callback to call to display map when do
         * @param {int} value to consider empty space - defaults to 0
         * @param {function} callback to call when a new connection is made
         */
        Cellular.prototype.connect = function (callback, value, connectionCallback) {
            if (!value)
                value = 0;
            var allFreeSpace = [];
            var notConnected = {};
            var p = [];
            // find all free space
            for (var x = 0; x < this._width; x++) {
                for (var y = 0; y < this._height; y++) {
                    if (this._freeSpace(x, y, value)) {
                        p = [x, y];
                        notConnected[this._pointKey(p)] = p;
                        allFreeSpace.push([x, y]);
                    }
                }
            }
            var start = allFreeSpace[rng_3.RNG.getUniformInt(0, allFreeSpace.length - 1)];
            var key = this._pointKey(start);
            var connected = {};
            connected[key] = start;
            delete notConnected[key];
            // find what's connected to the starting point
            this._findConnected(connected, notConnected, [start], false, value);
            while (Object.keys(notConnected).length > 0) {
                // find two points from notConnected to connected
                p = this._getFromTo(connected, notConnected);
                var from = p[0]; // notConnected
                var to = p[1]; // connected
                // find everything connected to the starting point
                var local = {};
                local[this._pointKey(from)] = from;
                this._findConnected(local, notConnected, [from], true, value);
                // connect to a connected square
                this._tunnelToConnected(to, from, connected, notConnected, value, connectionCallback);
                // now all of local is connected
                for (var k in local) {
                    var pp = local[k];
                    this._map[pp[0]][pp[1]] = value;
                    connected[k] = pp;
                    delete notConnected[k];
                }
            }
            this.serviceCallback(callback);
        };
        /**
         * Find random points to connect. Search for the closest point in the larger space.
         * This is to minimize the length of the passage while maintaining good performance.
         */
        Cellular.prototype._getFromTo = function (connected, notConnected) {
            var from;
            var to;
            var d;
            var connectedKeys = Object.keys(connected);
            var notConnectedKeys = Object.keys(notConnected);
            for (var i = 0; i < 5; i++) {
                if (connectedKeys.length < notConnectedKeys.length) {
                    var keys = connectedKeys;
                    to = connected[keys[rng_3.RNG.getUniformInt(0, keys.length - 1)]];
                    from = this._getClosest(to, notConnected);
                }
                else {
                    var keys = notConnectedKeys;
                    from = notConnected[keys[rng_3.RNG.getUniformInt(0, keys.length - 1)]];
                    to = this._getClosest(from, connected);
                }
                d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
                if (d < 64) {
                    break;
                }
            }
            // console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
            return [from, to];
        };
        Cellular.prototype._getClosest = function (point, space) {
            var minPoint = null;
            var minDist = null;
            for (var k in space) {
                var p = space[k];
                var d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
                if (minDist == null || d < minDist) {
                    minDist = d;
                    minPoint = p;
                }
            }
            return minPoint;
        };
        Cellular.prototype._findConnected = function (connected, notConnected, stack, keepNotConnected, value) {
            while (stack.length > 0) {
                var p = stack.splice(0, 1)[0];
                var tests = [
                    [p[0] + 1, p[1]],
                    [p[0] - 1, p[1]],
                    [p[0], p[1] + 1],
                    [p[0], p[1] - 1]
                ];
                for (var i = 0; i < tests.length; i++) {
                    var key = this._pointKey(tests[i]);
                    if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
                        connected[key] = tests[i];
                        if (!keepNotConnected) {
                            delete notConnected[key];
                        }
                        stack.push(tests[i]);
                    }
                }
            }
        };
        Cellular.prototype._tunnelToConnected = function (to, from, connected, notConnected, value, connectionCallback) {
            var key = this._pointKey(from);
            var a;
            var b;
            if (from[0] < to[0]) {
                a = from;
                b = to;
            }
            else {
                a = to;
                b = from;
            }
            for (var xx = a[0]; xx <= b[0]; xx++) {
                this._map[xx][a[1]] = value;
                var p = [xx, a[1]];
                var pkey = this._pointKey(p);
                connected[pkey] = p;
                delete notConnected[pkey];
            }
            if (connectionCallback && a[0] < b[0]) {
                connectionCallback(a, [b[0], a[1]]);
            }
            // x is now fixed
            var x = b[0];
            if (from[1] < to[1]) {
                a = from;
                b = to;
            }
            else {
                a = to;
                b = from;
            }
            for (var yy = a[1]; yy < b[1]; yy++) {
                this._map[x][yy] = value;
                var p = [x, yy];
                var pkey = this._pointKey(p);
                connected[pkey] = p;
                delete notConnected[pkey];
            }
            if (connectionCallback && a[1] < b[1]) {
                connectionCallback([b[0], a[1]], [b[0], b[1]]);
            }
        };
        Cellular.prototype._freeSpace = function (x, y, value) {
            return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
        };
        Cellular.prototype._pointKey = function (p) {
            return p[0] + "." + p[1];
        };
        return Cellular;
    }(map_2.Map));
    exports.Cellular = Cellular;
});
define("rot/map/dungeon", ["require", "exports", "rot/map/map"], function (require, exports, map_3) {
    "use strict";
    /**
     * @class Dungeon map: has rooms and corridors
     * @augments ROT.Map
     */
    var Dungeon = (function (_super) {
        __extends(Dungeon, _super);
        function Dungeon(width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            _super.call(this, width, height);
            this._rooms = []; /* list of all rooms */
            this._corridors = [];
        }
        /**
         * Get all generated rooms
         * @returns {ROT.Map.Feature.Room[]}
         */
        Dungeon.prototype.getRooms = function () {
            return this._rooms;
        };
        /**
         * Get all generated corridors
         * @returns {ROT.Map.Feature.Corridor[]}
         */
        Dungeon.prototype.getCorridors = function () {
            return this._corridors;
        };
        return Dungeon;
    }(map_3.Map));
    exports.Dungeon = Dungeon;
});
define("rot/map/features", ["require", "exports", "rot/rng"], function (require, exports, rng_4) {
    "use strict";
    /**
     * @class Dungeon feature; has own .create() method
     */
    var Feature = (function () {
        function Feature() {
        }
        Feature.prototype.isValid = function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i - 0] = arguments[_i];
            }
            return true;
        };
        Feature.prototype.create = function (digCallback) { };
        ;
        Feature.prototype.debug = function () { };
        ;
        Feature.createRandomAt = function (x, y, dx, dy, options) { };
        ;
        return Feature;
    }());
    exports.Feature = Feature;
    /**
     * @class Room
     * @augments Feature
     * @param {int} x1
     * @param {int} y1
     * @param {int} x2
     * @param {int} y2
     * @param {int} [doorX]
     * @param {int} [doorY]
     */
    var Room = (function (_super) {
        __extends(Room, _super);
        function Room(x1, y1, x2, y2, doorX, doorY) {
            if (doorX === void 0) { doorX = null; }
            if (doorY === void 0) { doorY = null; }
            _super.call(this);
            this._x1 = x1;
            this._y1 = y1;
            this._x2 = x2;
            this._y2 = y2;
            this._doors = {};
            if (doorX && doorY) {
                this.addDoor(doorX, doorY);
            }
        }
        /**
         * Room of random size, with a given doors and direction
         */
        Room.createRandomAt = function (x, y, dx, dy, options) {
            var min = options.roomWidth[0];
            var max = options.roomWidth[1];
            var width = rng_4.RNG.getUniformInt(min, max);
            var min = options.roomHeight[0];
            var max = options.roomHeight[1];
            var height = rng_4.RNG.getUniformInt(min, max);
            if (dx == 1) {
                var y2 = y - Math.floor(rng_4.RNG.getUniform() * height);
                return new this(x + 1, y2, x + width, y2 + height - 1, x, y);
            }
            if (dx == -1) {
                var y2 = y - Math.floor(rng_4.RNG.getUniform() * height);
                return new this(x - width, y2, x - 1, y2 + height - 1, x, y);
            }
            if (dy == 1) {
                var x2 = x - Math.floor(rng_4.RNG.getUniform() * width);
                return new this(x2, y + 1, x2 + width - 1, y + height, x, y);
            }
            if (dy == -1) {
                var x2 = x - Math.floor(rng_4.RNG.getUniform() * width);
                return new this(x2, y - height, x2 + width - 1, y - 1, x, y);
            }
            throw new Error("dx or dy must be 1 or -1");
        };
        /**
         * Room of random size, positioned around center coords
         */
        Room.createRandomCenter = function (cx, cy, options) {
            var min = options.roomWidth[0];
            var max = options.roomWidth[1];
            var width = rng_4.RNG.getUniformInt(min, max);
            var min = options.roomHeight[0];
            var max = options.roomHeight[1];
            var height = rng_4.RNG.getUniformInt(min, max);
            var x1 = cx - Math.floor(rng_4.RNG.getUniform() * width);
            var y1 = cy - Math.floor(rng_4.RNG.getUniform() * height);
            var x2 = x1 + width - 1;
            var y2 = y1 + height - 1;
            return new this(x1, y1, x2, y2);
        };
        /**
         * Room of random size within a given dimensions
         */
        Room.createRandom = function (availWidth, availHeight, options) {
            var min = options.roomWidth[0];
            var max = options.roomWidth[1];
            var width = rng_4.RNG.getUniformInt(min, max);
            var min = options.roomHeight[0];
            var max = options.roomHeight[1];
            var height = rng_4.RNG.getUniformInt(min, max);
            var left = availWidth - width - 1;
            var top = availHeight - height - 1;
            var x1 = 1 + Math.floor(rng_4.RNG.getUniform() * left);
            var y1 = 1 + Math.floor(rng_4.RNG.getUniform() * top);
            var x2 = x1 + width - 1;
            var y2 = y1 + height - 1;
            return new this(x1, y1, x2, y2);
        };
        Room.prototype.addDoor = function (x, y) {
            this._doors[x + "," + y] = 1;
            return this;
        };
        /**
         * @param {function}
         */
        Room.prototype.getDoors = function (callback) {
            for (var key in this._doors) {
                var parts = key.split(",");
                callback(parseInt(parts[0]), parseInt(parts[1]));
            }
            return this;
        };
        Room.prototype.clearDoors = function () {
            this._doors = {};
            return this;
        };
        Room.prototype.addDoors = function (isWallCallback) {
            var left = this._x1 - 1;
            var right = this._x2 + 1;
            var top = this._y1 - 1;
            var bottom = this._y2 + 1;
            for (var x = left; x <= right; x++) {
                for (var y = top; y <= bottom; y++) {
                    if (x != left && x != right && y != top && y != bottom) {
                        continue;
                    }
                    if (isWallCallback(x, y)) {
                        continue;
                    }
                    this.addDoor(x, y);
                }
            }
            return this;
        };
        Room.prototype.debug = function () {
            console.log("room", this._x1, this._y1, this._x2, this._y2);
        };
        Room.prototype.isValid = function (isWallCallback, canBeDugCallback) {
            var left = this._x1 - 1;
            var right = this._x2 + 1;
            var top = this._y1 - 1;
            var bottom = this._y2 + 1;
            for (var x = left; x <= right; x++) {
                for (var y = top; y <= bottom; y++) {
                    if (x == left || x == right || y == top || y == bottom) {
                        if (!isWallCallback(x, y)) {
                            return false;
                        }
                    }
                    else {
                        if (!canBeDugCallback(x, y)) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        /**
         * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
         */
        Room.prototype.create = function (digCallback) {
            var left = this._x1 - 1;
            var right = this._x2 + 1;
            var top = this._y1 - 1;
            var bottom = this._y2 + 1;
            var value = 0;
            for (var x = left; x <= right; x++) {
                for (var y = top; y <= bottom; y++) {
                    if (x + "," + y in this._doors) {
                        value = 2;
                    }
                    else if (x == left || x == right || y == top || y == bottom) {
                        value = 1;
                    }
                    else {
                        value = 0;
                    }
                    digCallback(x, y, value);
                }
            }
        };
        Room.prototype.getCenter = function () {
            return [Math.round((this._x1 + this._x2) / 2), Math.round((this._y1 + this._y2) / 2)];
        };
        Room.prototype.getLeft = function () {
            return this._x1;
        };
        Room.prototype.getRight = function () {
            return this._x2;
        };
        Room.prototype.getTop = function () {
            return this._y1;
        };
        Room.prototype.getBottom = function () {
            return this._y2;
        };
        return Room;
    }(Feature));
    exports.Room = Room;
    /**
     * @class Corridor
     * @augments Feature
     * @param {int} startX
     * @param {int} startY
     * @param {int} endX
     * @param {int} endY
     */
    var Corridor = (function (_super) {
        __extends(Corridor, _super);
        function Corridor(startX, startY, endX, endY) {
            _super.call(this);
            this._startX = startX;
            this._startY = startY;
            this._endX = endX;
            this._endY = endY;
            this._endsWithAWall = true;
        }
        Corridor.createRandomAt = function (x, y, dx, dy, options) {
            var min = options.corridorLength[0];
            var max = options.corridorLength[1];
            var length = rng_4.RNG.getUniformInt(min, max);
            return new this(x, y, x + dx * length, y + dy * length);
        };
        Corridor.prototype.debug = function () {
            console.log("corridor", this._startX, this._startY, this._endX, this._endY);
        };
        Corridor.prototype.isValid = function (isWallCallback, canBeDugCallback) {
            var sx = this._startX;
            var sy = this._startY;
            var dx = this._endX - sx;
            var dy = this._endY - sy;
            var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
            if (dx) {
                dx = dx / Math.abs(dx);
            }
            if (dy) {
                dy = dy / Math.abs(dy);
            }
            var nx = dy;
            var ny = -dx;
            var ok = true;
            for (var i = 0; i < length; i++) {
                var x = sx + i * dx;
                var y = sy + i * dy;
                if (!canBeDugCallback(x, y)) {
                    ok = false;
                }
                if (!isWallCallback(x + nx, y + ny)) {
                    ok = false;
                }
                if (!isWallCallback(x - nx, y - ny)) {
                    ok = false;
                }
                if (!ok) {
                    length = i;
                    this._endX = x - dx;
                    this._endY = y - dy;
                    break;
                }
            }
            /**
             * If the length degenerated, this corridor might be invalid
             */
            /* not supported */
            if (length == 0) {
                return false;
            }
            /* length 1 allowed only if the next space is empty */
            if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) {
                return false;
            }
            /**
             * We do not want the corridor to crash into a corner of a room;
             * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
             *
             * Situation:
             * #######1
             * .......?
             * #######2
             *
             * The corridor was dug from left to right.
             * 1, 2 - problematic corners, ? = N+1th cell (not dug)
             */
            var firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
            var secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
            this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
            if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) {
                return false;
            }
            return true;
        };
        /**
         * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
         */
        Corridor.prototype.create = function (digCallback) {
            var sx = this._startX;
            var sy = this._startY;
            var dx = this._endX - sx;
            var dy = this._endY - sy;
            var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
            if (dx) {
                dx = dx / Math.abs(dx);
            }
            if (dy) {
                dy = dy / Math.abs(dy);
            }
            var nx = dy;
            var ny = -dx;
            for (var i = 0; i < length; i++) {
                var x = sx + i * dx;
                var y = sy + i * dy;
                digCallback(x, y, 0);
            }
            return true;
        };
        Corridor.prototype.createPriorityWalls = function (priorityWallCallback) {
            if (!this._endsWithAWall) {
                return;
            }
            var sx = this._startX;
            var sy = this._startY;
            var dx = this._endX - sx;
            var dy = this._endY - sy;
            if (dx) {
                dx = dx / Math.abs(dx);
            }
            if (dy) {
                dy = dy / Math.abs(dy);
            }
            var nx = dy;
            var ny = -dx;
            priorityWallCallback(this._endX + dx, this._endY + dy);
            priorityWallCallback(this._endX + nx, this._endY + ny);
            priorityWallCallback(this._endX - nx, this._endY - ny);
        };
        return Corridor;
    }(Feature));
    exports.Corridor = Corridor;
});
define("rot/map/digger", ["require", "exports", "rot/map/dungeon", "rot/rng", "rot", "rot/map/features", "rot/extensions/array"], function (require, exports, dungeon_1, rng_5, rot_5, features_1) {
    "use strict";
    var Digger = (function (_super) {
        __extends(Digger, _super);
        function Digger(width, height, options) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (options === void 0) { options = {}; }
            _super.call(this, width, height);
            this._options = {
                roomWidth: [3, 9],
                roomHeight: [3, 5],
                corridorLength: [3, 10],
                dugPercentage: 0.2,
                timeLimit: 1000 /* we stop after this much time has passed (msec) */
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
            this._features = {
                "Room": 4,
                "Corridor": 4
            };
            this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
            this._walls = {}; /* these are available for digging */
            this._digCallback = this._digCallback.bind(this);
            this._canBeDugCallback = this._canBeDugCallback.bind(this);
            this._isWallCallback = this._isWallCallback.bind(this);
            this._priorityWallCallback = this._priorityWallCallback.bind(this);
        }
        /**
         * Create a map
         * @see ROT.Map#create
         */
        Digger.prototype.create = function (callback) {
            this._rooms = [];
            this._corridors = [];
            this._map = this._fillMap(1);
            this._walls = {};
            this._dug = 0;
            var area = (this._width - 2) * (this._height - 2);
            this._firstRoom();
            var t1 = Date.now();
            do {
                var t2 = Date.now();
                if (t2 - t1 > this._options.timeLimit) {
                    break;
                }
                /* find a good wall */
                var wall = this._findWall();
                if (!wall) {
                    break;
                } /* no more walls */
                var parts = wall.split(",");
                var x = parseInt(parts[0]);
                var y = parseInt(parts[1]);
                var dir = this._getDiggingDirection(x, y);
                if (!dir) {
                    continue;
                } /* this wall is not suitable */
                //		console.log("wall", x, y);
                /* try adding a feature */
                var featureAttempts = 0;
                do {
                    featureAttempts++;
                    if (this._tryFeature(x, y, dir[0], dir[1])) {
                        //if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
                        this._removeSurroundingWalls(x, y);
                        this._removeSurroundingWalls(x - dir[0], y - dir[1]);
                        break;
                    }
                } while (featureAttempts < this._featureAttempts);
                var priorityWalls = 0;
                for (var id in this._walls) {
                    if (this._walls[id] > 1) {
                        priorityWalls++;
                    }
                }
            } while (this._dug / area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */
            this._addDoors();
            if (callback) {
                for (var i = 0; i < this._width; i++) {
                    for (var j = 0; j < this._height; j++) {
                        callback(i, j, this._map[i][j]);
                    }
                }
            }
            this._walls = {};
            this._map = null;
            return this;
        };
        Digger.prototype._digCallback = function (x, y, value) {
            if (value == 0 || value == 2) {
                this._map[x][y] = 0;
                this._dug++;
            }
            else {
                this._walls[x + "," + y] = 1;
            }
        };
        Digger.prototype._isWallCallback = function (x, y) {
            if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
                return false;
            }
            return (this._map[x][y] == 1);
        };
        Digger.prototype._canBeDugCallback = function (x, y) {
            if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
                return false;
            }
            return (this._map[x][y] == 1);
        };
        Digger.prototype._priorityWallCallback = function (x, y) {
            this._walls[x + "," + y] = 2;
        };
        Digger.prototype._firstRoom = function () {
            var cx = Math.floor(this._width / 2);
            var cy = Math.floor(this._height / 2);
            var room = features_1.Room.createRandomCenter(cx, cy, this._options);
            this._rooms.push(room);
            room.create(this._digCallback);
        };
        /**
         * Get a suitable wall
         */
        Digger.prototype._findWall = function () {
            var prio1 = [];
            var prio2 = [];
            for (var id_1 in this._walls) {
                var prio = this._walls[id_1];
                if (prio == 2) {
                    prio2.push(id_1);
                }
                else {
                    prio1.push(id_1);
                }
            }
            var arr = (prio2.length ? prio2 : prio1);
            if (!arr.length) {
                return null;
            } /* no walls :/ */
            var id = arr.random();
            delete this._walls[id];
            return id;
        };
        /**
         * Tries adding a feature
         * @returns {bool} was this a successful try?
         */
        Digger.prototype._tryFeature = function (x, y, dx, dy) {
            var featureType = rng_5.RNG.getWeightedValue(this._features);
            var feature = features_1.Feature[featureType].createRandomAt(x, y, dx, dy, this._options);
            if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
                //		console.log("not valid");
                //		feature.debug();
                return false;
            }
            feature.create(this._digCallback);
            //	feature.debug();
            if (feature instanceof features_1.Room) {
                this._rooms.push(feature);
            }
            if (feature instanceof features_1.Corridor) {
                feature.createPriorityWalls(this._priorityWallCallback);
                this._corridors.push(feature);
            }
            return true;
        };
        Digger.prototype._removeSurroundingWalls = function (cx, cy) {
            var deltas = rot_5.ROT.DIRS[4];
            for (var i = 0; i < deltas.length; i++) {
                var delta = deltas[i];
                var x = cx + delta[0];
                var y = cy + delta[1];
                delete this._walls[x + "," + y];
                var x = cx + 2 * delta[0];
                var y = cy + 2 * delta[1];
                delete this._walls[x + "," + y];
            }
        };
        /**
         * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
         */
        Digger.prototype._getDiggingDirection = function (cx, cy) {
            if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) {
                return null;
            }
            var result = null;
            var deltas = rot_5.ROT.DIRS[4];
            for (var i = 0; i < deltas.length; i++) {
                var delta = deltas[i];
                var x = cx + delta[0];
                var y = cy + delta[1];
                if (!this._map[x][y]) {
                    if (result) {
                        return null;
                    }
                    result = delta;
                }
            }
            /* no empty neighbor */
            if (!result) {
                return null;
            }
            return [-result[0], -result[1]];
        };
        /**
         * Find empty spaces surrounding rooms, and apply doors.
         */
        Digger.prototype._addDoors = function () {
            var data = this._map;
            var isWallCallback = function (x, y) { return data[x][y] == 1; };
            for (var i = 0; i < this._rooms.length; i++) {
                var room = this._rooms[i];
                room.clearDoors();
                room.addDoors(isWallCallback);
            }
        };
        return Digger;
    }(dungeon_1.Dungeon));
    exports.Digger = Digger;
});
define("rot/map/dividedmaze", ["require", "exports", "rot/map/map", './extensions/array'], function (require, exports, map_4) {
    "use strict";
    /**
     * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
     * @augments ROT.Map
     */
    var DividedMaze = (function (_super) {
        __extends(DividedMaze, _super);
        function DividedMaze(width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            _super.call(this, width, height);
            this._stack = [];
        }
        DividedMaze.prototype.create = function (callback) {
            var w = this._width;
            var h = this._height;
            this._map = [];
            for (var i = 0; i < w; i++) {
                this._map.push([]);
                for (var j = 0; j < h; j++) {
                    var border = (i == 0 || j == 0 || i + 1 == w || j + 1 == h);
                    this._map[i].push(border ? 1 : 0);
                }
            }
            this._stack = [
                [1, 1, w - 2, h - 2]
            ];
            this._process();
            for (var i = 0; i < w; i++) {
                for (var j = 0; j < h; j++) {
                    callback(i, j, this._map[i][j]);
                }
            }
            this._map = null;
            return this;
        };
        DividedMaze.prototype._process = function () {
            while (this._stack.length) {
                var room = this._stack.shift(); /* [left, top, right, bottom] */
                this._partitionRoom(room);
            }
        };
        DividedMaze.prototype._partitionRoom = function (room) {
            var availX = [];
            var availY = [];
            for (var i = room[0] + 1; i < room[2]; i++) {
                var top_1 = this._map[i][room[1] - 1];
                var bottom = this._map[i][room[3] + 1];
                if (top_1 && bottom && !(i % 2)) {
                    availX.push(i);
                }
            }
            for (var j = room[1] + 1; j < room[3]; j++) {
                var left = this._map[room[0] - 1][j];
                var right = this._map[room[2] + 1][j];
                if (left && right && !(j % 2)) {
                    availY.push(j);
                }
            }
            if (!availX.length || !availY.length) {
                return;
            }
            var x = availX.random();
            var y = availY.random();
            this._map[x][y] = 1;
            var walls = [];
            var w = [];
            w = [];
            walls.push(w); /* left part */
            for (var i = room[0]; i < x; i++) {
                this._map[i][y] = 1;
                w.push([i, y]);
            }
            w = [];
            walls.push(w); /* right part */
            for (var i = x + 1; i <= room[2]; i++) {
                this._map[i][y] = 1;
                w.push([i, y]);
            }
            w = [];
            walls.push(w); /* top part */
            for (var j = room[1]; j < y; j++) {
                this._map[x][j] = 1;
                w.push([x, j]);
            }
            w = [];
            walls.push(w); /* bottom part */
            for (var j = y + 1; j <= room[3]; j++) {
                this._map[x][j] = 1;
                w.push([x, j]);
            }
            var solid = walls.random();
            for (var i = 0; i < walls.length; i++) {
                var w_1 = walls[i];
                if (w_1 == solid) {
                    continue;
                }
                var hole = w_1.random();
                this._map[hole[0]][hole[1]] = 0;
            }
            this._stack.push([room[0], room[1], x - 1, y - 1]); /* left top */
            this._stack.push([x + 1, room[1], room[2], y - 1]); /* right top */
            this._stack.push([room[0], y + 1, x - 1, room[3]]); /* left bottom */
            this._stack.push([x + 1, y + 1, room[2], room[3]]); /* right bottom */
        };
        return DividedMaze;
    }(map_4.Map));
    exports.DividedMaze = DividedMaze;
});
define("rot/map/ellermaze", ["require", "exports", "rot/map/map", "rot/rng"], function (require, exports, map_5, rng_6) {
    "use strict";
    /**
     * @class Maze generator - Eller's algorithm
     * See http://homepages.cwi.nl/~tromp/maze.html for explanation
     * @augments ROT.Map
     */
    var EllerMaze = (function (_super) {
        __extends(EllerMaze, _super);
        function EllerMaze(width, height) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            _super.call(this, width, height);
        }
        EllerMaze.prototype.create = function (callback) {
            var map = this._fillMap(1);
            var w = Math.ceil((this._width - 2) / 2);
            var rand = 9 / 24;
            var L = [];
            var R = [];
            for (var i = 0; i < w; i++) {
                L.push(i);
                R.push(i);
            }
            L.push(w - 1); /* fake stop-block at the right side */
            for (var j = 1; j + 3 < this._height; j += 2) {
                /* one row */
                for (var i = 0; i < w; i++) {
                    /* cell coords (will be always empty) */
                    var x = 2 * i + 1;
                    var y = j;
                    map[x][y] = 0;
                    /* right connection */
                    if (i != L[i + 1] && rng_6.RNG.getUniform() > rand) {
                        this._addToList(i, L, R);
                        map[x + 1][y] = 0;
                    }
                    /* bottom connection */
                    if (i != L[i] && rng_6.RNG.getUniform() > rand) {
                        /* remove connection */
                        this._removeFromList(i, L, R);
                    }
                    else {
                        /* create connection */
                        map[x][y + 1] = 0;
                    }
                }
            }
            /* last row */
            for (var i = 0; i < w; i++) {
                /* cell coords (will be always empty) */
                var x = 2 * i + 1;
                var y = j;
                map[x][y] = 0;
                /* right connection */
                if (i != L[i + 1] && (i == L[i] || rng_6.RNG.getUniform() > rand)) {
                    /* dig right also if the cell is separated, so it gets connected to the rest of maze */
                    this._addToList(i, L, R);
                    map[x + 1][y] = 0;
                }
                this._removeFromList(i, L, R);
            }
            for (var i = 0; i < this._width; i++) {
                for (var j = 0; j < this._height; j++) {
                    callback(i, j, map[i][j]);
                }
            }
            return this;
        };
        /**
         * Remove "i" from its list
         */
        EllerMaze.prototype._removeFromList = function (i, L, R) {
            R[L[i]] = R[i];
            L[R[i]] = L[i];
            R[i] = i;
            L[i] = i;
        };
        /**
         * Join lists with "i" and "i+1"
         */
        EllerMaze.prototype._addToList = function (i, L, R) {
            R[L[i + 1]] = R[i];
            L[R[i]] = L[i + 1];
            R[i] = i + 1;
            L[i + 1] = i;
        };
        return EllerMaze;
    }(map_5.Map));
    exports.EllerMaze = EllerMaze;
});
define("rot/map/iceymaze", ["require", "exports", "rot/map/map", "rot/rng"], function (require, exports, map_6, rng_7) {
    "use strict";
    /**
     * @class Icey's Maze generator
     * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
     * @augments ROT.Map
     */
    var IceyMaze = (function (_super) {
        __extends(IceyMaze, _super);
        function IceyMaze(width, height, regularity) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (regularity === void 0) { regularity = 0; }
            _super.call(this, width, height);
            this._regularity = regularity;
        }
        IceyMaze.prototype.create = function (callback) {
            var width = this._width;
            var height = this._height;
            var map = this._fillMap(1);
            width -= (width % 2 ? 1 : 2);
            height -= (height % 2 ? 1 : 2);
            var cx = 0;
            var cy = 0;
            var nx = 0;
            var ny = 0;
            var done = 0;
            var blocked = false;
            var dirs = [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ];
            do {
                cx = 1 + 2 * Math.floor(rng_7.RNG.getUniform() * (width - 1) / 2);
                cy = 1 + 2 * Math.floor(rng_7.RNG.getUniform() * (height - 1) / 2);
                if (!done) {
                    map[cx][cy] = 0;
                }
                if (!map[cx][cy]) {
                    this._randomize(dirs);
                    do {
                        if (Math.floor(rng_7.RNG.getUniform() * (this._regularity + 1)) == 0) {
                            this._randomize(dirs);
                        }
                        blocked = true;
                        for (var i = 0; i < 4; i++) {
                            nx = cx + dirs[i][0] * 2;
                            ny = cy + dirs[i][1] * 2;
                            if (this._isFree(map, nx, ny, width, height)) {
                                map[nx][ny] = 0;
                                map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
                                cx = nx;
                                cy = ny;
                                blocked = false;
                                done++;
                                break;
                            }
                        }
                    } while (!blocked);
                }
            } while (done + 1 < width * height / 4);
            for (var i = 0; i < this._width; i++) {
                for (var j = 0; j < this._height; j++) {
                    callback(i, j, map[i][j]);
                }
            }
            this._map = null;
            return this;
        };
        IceyMaze.prototype._randomize = function (dirs) {
            for (var i = 0; i < 4; i++) {
                dirs[i][0] = 0;
                dirs[i][1] = 0;
            }
            switch (Math.floor(rng_7.RNG.getUniform() * 4)) {
                case 0:
                    dirs[0][0] = -1;
                    dirs[1][0] = 1;
                    dirs[2][1] = -1;
                    dirs[3][1] = 1;
                    break;
                case 1:
                    dirs[3][0] = -1;
                    dirs[2][0] = 1;
                    dirs[1][1] = -1;
                    dirs[0][1] = 1;
                    break;
                case 2:
                    dirs[2][0] = -1;
                    dirs[3][0] = 1;
                    dirs[0][1] = -1;
                    dirs[1][1] = 1;
                    break;
                case 3:
                    dirs[1][0] = -1;
                    dirs[0][0] = 1;
                    dirs[3][1] = -1;
                    dirs[2][1] = 1;
                    break;
            }
        };
        IceyMaze.prototype._isFree = function (map, x, y, width, height) {
            if (x < 1 || y < 1 || x >= width || y >= height) {
                return false;
            }
            return map[x][y];
        };
        return IceyMaze;
    }(map_6.Map));
    exports.IceyMaze = IceyMaze;
});
define("rot/map/rogue", ["require", "exports", "rot/map/map", "rot/rng", "rot", "rot/extensions/array"], function (require, exports, map_7, rng_8, rot_6) {
    "use strict";
    /**
     * @author hyakugei
     * @class Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
     * @augments ROT.Map
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     * @param {object} [options] Options
     * @param {int[]} [options.cellWidth=3] Number of cells to create on the horizontal (number of rooms horizontally)
     * @param {int[]} [options.cellHeight=3] Number of cells to create on the vertical (number of rooms vertically)
     * @param {int} [options.roomWidth] Room min and max width - normally set auto-magically via the constructor.
     * @param {int} [options.roomHeight] Room min and max height - normally set auto-magically via the constructor.
     */
    var Rogue = (function (_super) {
        __extends(Rogue, _super);
        function Rogue(width, height, options) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (options === void 0) { options = {}; }
            _super.call(this, width, height);
            this._options = {
                cellWidth: 3,
                cellHeight: 3 //     ie. as an array with min-max values for each direction....
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
            /*
            Set the room sizes according to the over-all width of the map,
            and the cell sizes.
            */
            if (!this._options.hasOwnProperty("roomWidth")) {
                this._options["roomWidth"] = this._calculateRoomSize(this._width, this._options["cellWidth"]);
            }
            if (!this._options.hasOwnProperty("roomHeight")) {
                this._options["roomHeight"] = this._calculateRoomSize(this._height, this._options["cellHeight"]);
            }
        }
        /**
         * @see ROT.Map#create
         */
        Rogue.prototype.create = function (callback) {
            this.map = this._fillMap(1);
            this.rooms = [];
            this.connectedCells = [];
            this._initRooms();
            this._connectRooms();
            this._connectUnconnectedRooms();
            this._createRandomRoomConnections();
            this._createRooms();
            this._createCorridors();
            if (callback) {
                for (var i = 0; i < this._width; i++) {
                    for (var j = 0; j < this._height; j++) {
                        callback(i, j, this.map[i][j]);
                    }
                }
            }
            return this;
        };
        Rogue.prototype._calculateRoomSize = function (size, cell) {
            var max = Math.floor((size / cell) * 0.8);
            var min = Math.floor((size / cell) * 0.25);
            if (min < 2) {
                min = 2;
            }
            if (max < 2) {
                max = 2;
            }
            return [min, max];
        };
        Rogue.prototype._initRooms = function () {
            // create rooms array. This is the "grid" list from the algo.
            for (var i = 0; i < this._options.cellWidth; i++) {
                this.rooms.push([]);
                for (var j = 0; j < this._options.cellHeight; j++) {
                    this.rooms[i].push({ "x": 0, "y": 0, "width": 0, "height": 0, "connections": [], "cellx": i, "celly": j });
                }
            }
        };
        Rogue.prototype._connectRooms = function () {
            //pick random starting grid
            var cgx = rng_8.RNG.getUniformInt(0, this._options.cellWidth - 1);
            var cgy = rng_8.RNG.getUniformInt(0, this._options.cellHeight - 1);
            var idx;
            var ncgx;
            var ncgy;
            var found = false;
            var room;
            var otherRoom;
            // find  unconnected neighbour cells
            do {
                //var dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
                var dirToCheck = [0, 2, 4, 6];
                dirToCheck = dirToCheck.randomize();
                do {
                    found = false;
                    idx = dirToCheck.pop();
                    ncgx = cgx + rot_6.ROT.DIRS[8][idx][0];
                    ncgy = cgy + rot_6.ROT.DIRS[8][idx][1];
                    if (ncgx < 0 || ncgx >= this._options.cellWidth) {
                        continue;
                    }
                    if (ncgy < 0 || ncgy >= this._options.cellHeight) {
                        continue;
                    }
                    room = this.rooms[cgx][cgy];
                    if (room["connections"].length > 0) {
                        // as long as this room doesn't already coonect to me, we are ok with it.
                        if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
                            break;
                        }
                    }
                    otherRoom = this.rooms[ncgx][ncgy];
                    if (otherRoom["connections"].length == 0) {
                        otherRoom["connections"].push([cgx, cgy]);
                        this.connectedCells.push([ncgx, ncgy]);
                        cgx = ncgx;
                        cgy = ncgy;
                        found = true;
                    }
                } while (dirToCheck.length > 0 && found == false);
            } while (dirToCheck.length > 0);
        };
        Rogue.prototype._connectUnconnectedRooms = function () {
            //While there are unconnected rooms, try to connect them to a random connected neighbor
            //(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
            var cw = this._options.cellWidth;
            var ch = this._options.cellHeight;
            this.connectedCells = this.connectedCells.randomize();
            var room;
            var otherRoom;
            var validRoom;
            for (var i = 0; i < this._options.cellWidth; i++) {
                for (var j = 0; j < this._options.cellHeight; j++) {
                    room = this.rooms[i][j];
                    if (room["connections"].length == 0) {
                        var directions = [0, 2, 4, 6];
                        directions = directions.randomize();
                        validRoom = false;
                        do {
                            var dirIdx = directions.pop();
                            var newI = i + rot_6.ROT.DIRS[8][dirIdx][0];
                            var newJ = j + rot_6.ROT.DIRS[8][dirIdx][1];
                            if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) {
                                continue;
                            }
                            otherRoom = this.rooms[newI][newJ];
                            validRoom = true;
                            if (otherRoom["connections"].length == 0) {
                                break;
                            }
                            for (var k = 0; k < otherRoom["connections"].length; k++) {
                                if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
                                    validRoom = false;
                                    break;
                                }
                            }
                            if (validRoom) {
                                break;
                            }
                        } while (directions.length);
                        if (validRoom) {
                            room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
                        }
                        else {
                            console.log("-- Unable to connect room.");
                        }
                    }
                }
            }
        };
        Rogue.prototype._createRandomRoomConnections = function (connections) {
            // Empty for now.
        };
        Rogue.prototype._createRooms = function () {
            // Create Rooms
            var w = this._width;
            var h = this._height;
            var cw = this._options.cellWidth;
            var ch = this._options.cellHeight;
            var cwp = Math.floor(this._width / cw);
            var chp = Math.floor(this._height / ch);
            var roomw;
            var roomh;
            var roomWidth = this._options["roomWidth"];
            var roomHeight = this._options["roomHeight"];
            var sx;
            var sy;
            var otherRoom;
            for (var i = 0; i < cw; i++) {
                for (var j = 0; j < ch; j++) {
                    sx = cwp * i;
                    sy = chp * j;
                    if (sx == 0) {
                        sx = 1;
                    }
                    if (sy == 0) {
                        sy = 1;
                    }
                    roomw = rng_8.RNG.getUniformInt(roomWidth[0], roomWidth[1]);
                    roomh = rng_8.RNG.getUniformInt(roomHeight[0], roomHeight[1]);
                    if (j > 0) {
                        otherRoom = this.rooms[i][j - 1];
                        while (sy - (otherRoom["y"] + otherRoom["height"]) < 3) {
                            sy++;
                        }
                    }
                    if (i > 0) {
                        otherRoom = this.rooms[i - 1][j];
                        while (sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
                            sx++;
                        }
                    }
                    var sxOffset = Math.round(rng_8.RNG.getUniformInt(0, cwp - roomw) / 2);
                    var syOffset = Math.round(rng_8.RNG.getUniformInt(0, chp - roomh) / 2);
                    while (sx + sxOffset + roomw >= w) {
                        if (sxOffset) {
                            sxOffset--;
                        }
                        else {
                            roomw--;
                        }
                    }
                    while (sy + syOffset + roomh >= h) {
                        if (syOffset) {
                            syOffset--;
                        }
                        else {
                            roomh--;
                        }
                    }
                    sx = sx + sxOffset;
                    sy = sy + syOffset;
                    this.rooms[i][j]["x"] = sx;
                    this.rooms[i][j]["y"] = sy;
                    this.rooms[i][j]["width"] = roomw;
                    this.rooms[i][j]["height"] = roomh;
                    for (var ii = sx; ii < sx + roomw; ii++) {
                        for (var jj = sy; jj < sy + roomh; jj++) {
                            this.map[ii][jj] = 0;
                        }
                    }
                }
            }
        };
        Rogue.prototype._getWallPosition = function (aRoom, aDirection) {
            var rx;
            var ry;
            var door;
            if (aDirection == 1 || aDirection == 3) {
                rx = rng_8.RNG.getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
                if (aDirection == 1) {
                    ry = aRoom["y"] - 2;
                    door = ry + 1;
                }
                else {
                    ry = aRoom["y"] + aRoom["height"] + 1;
                    door = ry - 1;
                }
                this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
            }
            else if (aDirection == 2 || aDirection == 4) {
                ry = rng_8.RNG.getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
                if (aDirection == 2) {
                    rx = aRoom["x"] + aRoom["width"] + 1;
                    door = rx - 1;
                }
                else {
                    rx = aRoom["x"] - 2;
                    door = rx + 1;
                }
                this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.
            }
            return [rx, ry];
        };
        /***
        * @param startPosition a 2 element array
        * @param endPosition a 2 element array
        */
        Rogue.prototype._drawCorridor = function (startPosition, endPosition) {
            var xOffset = endPosition[0] - startPosition[0];
            var yOffset = endPosition[1] - startPosition[1];
            var xpos = startPosition[0];
            var ypos = startPosition[1];
            var tempDist;
            var xDir;
            var yDir;
            var move; // 2 element array, element 0 is the direction, element 1 is the total value to move.
            var moves = []; // a list of 2 element arrays
            var xAbs = Math.abs(xOffset);
            var yAbs = Math.abs(yOffset);
            var percent = rng_8.RNG.getUniform(); // used to split the move at different places along the long axis
            var firstHalf = percent;
            var secondHalf = 1 - percent;
            xDir = xOffset > 0 ? 2 : 6;
            yDir = yOffset > 0 ? 4 : 0;
            if (xAbs < yAbs) {
                // move firstHalf of the y offset
                tempDist = Math.ceil(yAbs * firstHalf);
                moves.push([yDir, tempDist]);
                // move all the x offset
                moves.push([xDir, xAbs]);
                // move sendHalf of the  y offset
                tempDist = Math.floor(yAbs * secondHalf);
                moves.push([yDir, tempDist]);
            }
            else {
                //  move firstHalf of the x offset
                tempDist = Math.ceil(xAbs * firstHalf);
                moves.push([xDir, tempDist]);
                // move all the y offset
                moves.push([yDir, yAbs]);
                // move secondHalf of the x offset.
                tempDist = Math.floor(xAbs * secondHalf);
                moves.push([xDir, tempDist]);
            }
            this.map[xpos][ypos] = 0;
            while (moves.length > 0) {
                move = moves.pop();
                while (move[1] > 0) {
                    xpos += rot_6.ROT.DIRS[8][move[0]][0];
                    ypos += rot_6.ROT.DIRS[8][move[0]][1];
                    this.map[xpos][ypos] = 0;
                    move[1] = move[1] - 1;
                }
            }
        };
        Rogue.prototype._createCorridors = function () {
            // Draw Corridors between connected rooms
            var cw = this._options.cellWidth;
            var ch = this._options.cellHeight;
            var room;
            var connection;
            var otherRoom;
            var wall;
            var otherWall;
            for (var i = 0; i < cw; i++) {
                for (var j = 0; j < ch; j++) {
                    room = this.rooms[i][j];
                    for (var k = 0; k < room["connections"].length; k++) {
                        connection = room["connections"][k];
                        otherRoom = this.rooms[connection[0]][connection[1]];
                        // figure out what wall our corridor will start one.
                        // figure out what wall our corridor will end on.
                        if (otherRoom["cellx"] > room["cellx"]) {
                            wall = 2;
                            otherWall = 4;
                        }
                        else if (otherRoom["cellx"] < room["cellx"]) {
                            wall = 4;
                            otherWall = 2;
                        }
                        else if (otherRoom["celly"] > room["celly"]) {
                            wall = 3;
                            otherWall = 1;
                        }
                        else if (otherRoom["celly"] < room["celly"]) {
                            wall = 1;
                            otherWall = 3;
                        }
                        this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
                    }
                }
            }
        };
        return Rogue;
    }(map_7.Map));
    exports.Rogue = Rogue;
});
define("rot/map/uniform", ["require", "exports", "rot/map/map", "rot/map/features", "rot/extensions/array"], function (require, exports, map_8, features_2) {
    "use strict";
    /**
     * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
     * @augments ROT.Map.Dungeon
     */
    var Uniform = (function (_super) {
        __extends(Uniform, _super);
        function Uniform(width, height, options) {
            if (width === void 0) { width = null; }
            if (height === void 0) { height = null; }
            if (options === void 0) { options = {}; }
            _super.call(this, width, height);
            this._options = {
                roomWidth: [3, 9],
                roomHeight: [3, 5],
                roomDugPercentage: 0.1,
                timeLimit: 1000 /* we stop after this much time has passed (msec) */
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
            this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
            this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */
            this._connected = []; /* list of already connected rooms */
            this._unconnected = []; /* list of remaining unconnected rooms */
            this._digCallback = this._digCallback.bind(this);
            this._canBeDugCallback = this._canBeDugCallback.bind(this);
            this._isWallCallback = this._isWallCallback.bind(this);
        }
        /**
         * Create a map. If the time limit has been hit, returns null.
         * @see ROT.Map#create
         */
        Uniform.prototype.create = function (callback) {
            var t1 = Date.now();
            while (1) {
                var t2 = Date.now();
                if (t2 - t1 > this._options.timeLimit) {
                    return null;
                } /* time limit! */
                this._map = this._fillMap(1);
                this._dug = 0;
                this._rooms = [];
                this._unconnected = [];
                this._generateRooms();
                if (this._rooms.length < 2) {
                    continue;
                }
                if (this._generateCorridors()) {
                    break;
                }
            }
            if (callback) {
                for (var i = 0; i < this._width; i++) {
                    for (var j = 0; j < this._height; j++) {
                        callback(i, j, this._map[i][j]);
                    }
                }
            }
            return this;
        };
        /**
         * Generates a suitable amount of rooms
         */
        Uniform.prototype._generateRooms = function () {
            var w = this._width - 2;
            var h = this._height - 2;
            do {
                var room = this._generateRoom();
                if (this._dug / (w * h) > this._options.roomDugPercentage) {
                    break;
                } /* achieved requested amount of free space */
            } while (room);
            /* either enough rooms, or not able to generate more of them :) */
        };
        /**
         * Try to generate one room
         */
        Uniform.prototype._generateRoom = function () {
            var count = 0;
            while (count < this._roomAttempts) {
                count++;
                var room = features_2.Room.createRandom(this._width, this._height, this._options);
                if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) {
                    continue;
                }
                room.create(this._digCallback);
                this._rooms.push(room);
                return room;
            }
            /* no room was generated in a given number of attempts */
            return null;
        };
        /**
         * Generates connectors beween rooms
         * @returns {bool} success Was this attempt successfull?
         */
        Uniform.prototype._generateCorridors = function () {
            var cnt = 0;
            while (cnt < this._corridorAttempts) {
                cnt++;
                this._corridors = [];
                /* dig rooms into a clear map */
                this._map = this._fillMap(1);
                for (var i = 0; i < this._rooms.length; i++) {
                    var room = this._rooms[i];
                    room.clearDoors();
                    room.create(this._digCallback);
                }
                this._unconnected = this._rooms.slice().randomize();
                this._connected = [];
                if (this._unconnected.length) {
                    this._connected.push(this._unconnected.pop());
                } /* first one is always connected */
                while (1) {
                    /* 1. pick random connected room */
                    var connected = this._connected.random();
                    /* 2. find closest unconnected */
                    var room1 = this._closestRoom(this._unconnected, connected);
                    /* 3. connect it to closest connected */
                    var room2 = this._closestRoom(this._connected, room1);
                    var ok = this._connectRooms(room1, room2);
                    if (!ok) {
                        break;
                    } /* stop connecting, re-shuffle */
                    if (!this._unconnected.length) {
                        return true;
                    } /* done; no rooms remain */
                }
            }
            return false;
        };
        /**
         * For a given room, find the closest one from the list
         */
        Uniform.prototype._closestRoom = function (rooms, room) {
            var dist = Infinity;
            var center = room.getCenter();
            var result = null;
            for (var i = 0; i < rooms.length; i++) {
                var r = rooms[i];
                var c = r.getCenter();
                var dx = c[0] - center[0];
                var dy = c[1] - center[1];
                var d = dx * dx + dy * dy;
                if (d < dist) {
                    dist = d;
                    result = r;
                }
            }
            return result;
        };
        Uniform.prototype._connectRooms = function (room1, room2) {
            /*
                room1.debug();
                room2.debug();
            */
            var center1 = room1.getCenter();
            var center2 = room2.getCenter();
            var diffX = center2[0] - center1[0];
            var diffY = center2[1] - center1[1];
            var end;
            var index;
            var dirIndex1;
            var dirIndex2;
            var min;
            var max;
            if (Math.abs(diffX) < Math.abs(diffY)) {
                dirIndex1 = (diffY > 0 ? 2 : 0);
                dirIndex2 = (dirIndex1 + 2) % 4;
                min = room2.getLeft();
                max = room2.getRight();
                index = 0;
            }
            else {
                dirIndex1 = (diffX > 0 ? 1 : 3);
                dirIndex2 = (dirIndex1 + 2) % 4;
                min = room2.getTop();
                max = room2.getBottom();
                index = 1;
            }
            var start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
            if (!start) {
                return false;
            }
            if (start[index] >= min && start[index] <= max) {
                end = start.slice();
                var value = null;
                switch (dirIndex2) {
                    case 0:
                        value = room2.getTop() - 1;
                        break;
                    case 1:
                        value = room2.getRight() + 1;
                        break;
                    case 2:
                        value = room2.getBottom() + 1;
                        break;
                    case 3:
                        value = room2.getLeft() - 1;
                        break;
                }
                end[(index + 1) % 2] = value;
                this._digLine([start, end]);
            }
            else if (start[index] < min - 1 || start[index] > max + 1) {
                var diff = start[index] - center2[index];
                switch (dirIndex2) {
                    case 0:
                    case 1:
                        var rotation = (diff < 0 ? 3 : 1);
                        break;
                    case 2:
                    case 3:
                        var rotation = (diff < 0 ? 1 : 3);
                        break;
                }
                dirIndex2 = (dirIndex2 + rotation) % 4;
                end = this._placeInWall(room2, dirIndex2);
                if (!end) {
                    return false;
                }
                var mid = [0, 0];
                mid[index] = start[index];
                var index2 = (index + 1) % 2;
                mid[index2] = end[index2];
                this._digLine([start, mid, end]);
            }
            else {
                var index2 = (index + 1) % 2;
                end = this._placeInWall(room2, dirIndex2);
                if (!end) {
                    return false;
                }
                var mid = Math.round((end[index2] + start[index2]) / 2);
                var mid1 = [0, 0];
                var mid2 = [0, 0];
                mid1[index] = start[index];
                mid1[index2] = mid;
                mid2[index] = end[index];
                mid2[index2] = mid;
                this._digLine([start, mid1, mid2, end]);
            }
            room1.addDoor(start[0], start[1]);
            room2.addDoor(end[0], end[1]);
            index = this._unconnected.indexOf(room1);
            if (index != -1) {
                this._unconnected.splice(index, 1);
                this._connected.push(room1);
            }
            index = this._unconnected.indexOf(room2);
            if (index != -1) {
                this._unconnected.splice(index, 1);
                this._connected.push(room2);
            }
            return true;
        };
        Uniform.prototype._placeInWall = function (room, dirIndex) {
            var start = [0, 0];
            var dir = [0, 0];
            var length = 0;
            switch (dirIndex) {
                case 0:
                    dir = [1, 0];
                    start = [room.getLeft(), room.getTop() - 1];
                    length = room.getRight() - room.getLeft() + 1;
                    break;
                case 1:
                    dir = [0, 1];
                    start = [room.getRight() + 1, room.getTop()];
                    length = room.getBottom() - room.getTop() + 1;
                    break;
                case 2:
                    dir = [1, 0];
                    start = [room.getLeft(), room.getBottom() + 1];
                    length = room.getRight() - room.getLeft() + 1;
                    break;
                case 3:
                    dir = [0, 1];
                    start = [room.getLeft() - 1, room.getTop()];
                    length = room.getBottom() - room.getTop() + 1;
                    break;
            }
            var avail = [];
            var lastBadIndex = -2;
            for (var i = 0; i < length; i++) {
                var x = start[0] + i * dir[0];
                var y = start[1] + i * dir[1];
                avail.push(null);
                var isWall = (this._map[x][y] == 1);
                if (isWall) {
                    if (lastBadIndex != i - 1) {
                        avail[i] = [x, y];
                    }
                }
                else {
                    lastBadIndex = i;
                    if (i) {
                        avail[i - 1] = null;
                    }
                }
            }
            for (var i = avail.length - 1; i >= 0; i--) {
                if (!avail[i]) {
                    avail.splice(i, 1);
                }
            }
            return (avail.length ? avail.random() : null);
        };
        /**
         * Dig a polyline.
         */
        Uniform.prototype._digLine = function (points) {
            for (var i = 1; i < points.length; i++) {
                var start = points[i - 1];
                var end = points[i];
                var corridor = new features_2.Corridor(start[0], start[1], end[0], end[1]);
                corridor.create(this._digCallback);
                this._corridors.push(corridor);
            }
        };
        Uniform.prototype._digCallback = function (x, y, value) {
            this._map[x][y] = value;
            if (value == 0) {
                this._dug++;
            }
        };
        Uniform.prototype._isWallCallback = function (x, y) {
            if (x < 0 || y < 0 || x >= this._width || y >= this._height) {
                return false;
            }
            return (this._map[x][y] == 1);
        };
        Uniform.prototype._canBeDugCallback = function (x, y) {
            if (x < 1 || y < 1 || x + 1 >= this._width || y + 1 >= this._height) {
                return false;
            }
            return (this._map[x][y] == 1);
        };
        return Uniform;
    }(map_8.Map));
    exports.Uniform = Uniform;
});
/**
 * @class Base noise generator
 */
define("rot/noise/noise", ["require", "exports"], function (require, exports) {
    "use strict";
});
define("rot/noise/simplex", ["require", "exports", '../extensions/number', "rot/extensions/array"], function (require, exports) {
    "use strict";
    /**
     * A simple 2d implementation of simplex noise by Ondrej Zara
     *
     * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
     * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
     * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
     * Better rank ordering method by Stefan Gustavson in 2012.
     */
    /**
     * @class 2D simplex noise generator
     * @param {int} [gradients=256] Random gradients
     */
    var Simplex = (function () {
        function Simplex(gradients) {
            if (gradients === void 0) { gradients = 256; }
            this._F2 = 0.5 * (Math.sqrt(3) - 1);
            this._G2 = (3 - Math.sqrt(3)) / 6;
            this._gradients = [
                [0, -1],
                [1, -1],
                [1, 0],
                [1, 1],
                [0, 1],
                [-1, 1],
                [-1, 0],
                [-1, -1]
            ];
            var permutations = [];
            var count = gradients;
            for (var i = 0; i < count; i++) {
                permutations.push(i);
            }
            permutations = permutations.randomize();
            this._perms = [];
            this._indexes = [];
            for (var i = 0; i < 2 * count; i++) {
                this._perms.push(permutations[i % count]);
                this._indexes.push(this._perms[i] % this._gradients.length);
            }
        }
        Simplex.prototype.get = function (xin, yin) {
            var perms = this._perms;
            var indexes = this._indexes;
            var count = perms.length / 2;
            var G2 = this._G2;
            var n0 = 0; // Noise contributions from the three corners
            var n1 = 0;
            var n2 = 0;
            var gi;
            // Skew the input space to determine which simplex cell we're in
            var s = (xin + yin) * this._F2; // Hairy factor for 2D
            var i = Math.floor(xin + s);
            var j = Math.floor(yin + s);
            var t = (i + j) * G2;
            var X0 = i - t; // Unskew the cell origin back to (x,y) space
            var Y0 = j - t;
            var x0 = xin - X0; // The x,y distances from the cell origin
            var y0 = yin - Y0;
            // For the 2D case, the simplex shape is an equilateral triangle.
            // Determine which simplex we are in.
            var i1; // Offsets for second (middle) corner of simplex in (i,j) coords
            var j1;
            if (x0 > y0) {
                i1 = 1;
                j1 = 0;
            }
            else {
                i1 = 0;
                j1 = 1;
            } // upper triangle, YX order: (0,0)->(0,1)->(1,1)
            // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
            // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
            // c = (3-sqrt(3))/6
            var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
            var y1 = y0 - j1 + G2;
            var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords
            var y2 = y0 - 1 + 2 * G2;
            // Work out the hashed gradient indices of the three simplex corners
            var ii = i.mod(count);
            var jj = j.mod(count);
            // Calculate the contribution from the three corners
            var t0 = 0.5 - x0 * x0 - y0 * y0;
            if (t0 >= 0) {
                t0 *= t0;
                gi = indexes[ii + perms[jj]];
                var grad = this._gradients[gi];
                n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
            }
            var t1 = 0.5 - x1 * x1 - y1 * y1;
            if (t1 >= 0) {
                t1 *= t1;
                gi = indexes[ii + i1 + perms[jj + j1]];
                var grad = this._gradients[gi];
                n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
            }
            var t2 = 0.5 - x2 * x2 - y2 * y2;
            if (t2 >= 0) {
                t2 *= t2;
                gi = indexes[ii + 1 + perms[jj + 1]];
                var grad = this._gradients[gi];
                n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
            }
            // Add contributions from each corner to get the final noise value.
            // The result is scaled to return values in the interval [-1,1].
            return 70 * (n0 + n1 + n2);
        };
        return Simplex;
    }());
    exports.Simplex = Simplex;
});
define("rot/path/path", ["require", "exports", "rot"], function (require, exports, rot_7) {
    "use strict";
    /**
     * @class Abstract pathfinder
     * @param {int} toX Target X coord
     * @param {int} toY Target Y coord
     * @param {function} passableCallback Callback to determine map passability
     * @param {object} [options]
     * @param {int} [options.topology=8]
     */
    var Path = (function () {
        function Path(toX, toY, passableCallback, options) {
            if (options === void 0) { options = {}; }
            this._toX = toX;
            this._toY = toY;
            this._fromX = null;
            this._fromY = null;
            this._passableCallback = passableCallback;
            this._options = {
                topology: 8
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
            this._dirs = rot_7.ROT.DIRS[this._options.topology];
            if (this._options.topology == 8) {
                this._dirs = [
                    this._dirs[0],
                    this._dirs[2],
                    this._dirs[4],
                    this._dirs[6],
                    this._dirs[1],
                    this._dirs[3],
                    this._dirs[5],
                    this._dirs[7]
                ];
            }
        }
        /**
         * Compute a path from a given point
         * @param {int} fromX
         * @param {int} fromY
         * @param {function} callback Will be called for every path item with arguments "x" and "y"
         */
        Path.prototype.compute = function (fromX, fromY, callback) {
        };
        Path.prototype._getNeighbors = function (cx, cy) {
            var result = [];
            for (var i = 0; i < this._dirs.length; i++) {
                var dir = this._dirs[i];
                var x = cx + dir[0];
                var y = cy + dir[1];
                if (!this._passableCallback(x, y)) {
                    continue;
                }
                result.push([x, y]);
            }
            return result;
        };
        return Path;
    }());
    exports.Path = Path;
});
define("rot/path/astar", ["require", "exports", "rot/path/path"], function (require, exports, path_1) {
    "use strict";
    /**
     * @class Simplified A* algorithm: all edges have a value of 1
     * @augments ROT.Path
     * @see ROT.Path
     */
    var AStar = (function (_super) {
        __extends(AStar, _super);
        function AStar(toX, toY, passableCallback, options) {
            if (options === void 0) { options = {}; }
            _super.call(this, toX, toY, passableCallback, options);
            this._todo = [];
            this._done = {};
            this._fromX = null;
            this._fromY = null;
        }
        /**
         * Compute a path from a given point
         * @see ROT.Path#compute
         */
        AStar.prototype.compute = function (fromX, fromY, callback) {
            this._todo = [];
            this._done = {};
            this._fromX = fromX;
            this._fromY = fromY;
            this._add(this._toX, this._toY, null);
            while (this._todo.length) {
                var item = this._todo.shift();
                if (item.x == fromX && item.y == fromY) {
                    break;
                }
                var neighbors = this._getNeighbors(item.x, item.y);
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    var x = neighbor[0];
                    var y = neighbor[1];
                    var id = x + "," + y;
                    if (id in this._done) {
                        continue;
                    }
                    this._add(x, y, item);
                }
            }
            var item = this._done[fromX + "," + fromY];
            if (!item) {
                return;
            }
            while (item) {
                callback(item.x, item.y);
                item = item.prev;
            }
        };
        AStar.prototype._add = function (x, y, prev) {
            var h = this._distance(x, y);
            var obj = {
                x: x,
                y: y,
                prev: prev,
                g: (prev ? prev.g + 1 : 0),
                h: h
            };
            this._done[x + "," + y] = obj;
            /* insert into priority queue */
            var f = obj.g + obj.h;
            for (var i = 0; i < this._todo.length; i++) {
                var item = this._todo[i];
                var itemF = item.g + item.h;
                if (f < itemF || (f == itemF && h < item.h)) {
                    this._todo.splice(i, 0, obj);
                    return;
                }
            }
            this._todo.push(obj);
        };
        AStar.prototype._distance = function (x, y) {
            switch (this._options.topology) {
                case 4:
                    return (Math.abs(x - this._fromX) + Math.abs(y - this._fromY));
                case 6:
                    var dx = Math.abs(x - this._fromX);
                    var dy = Math.abs(y - this._fromY);
                    return dy + Math.max(0, (dx - dy) / 2);
                case 8:
                    return Math.max(Math.abs(x - this._fromX), Math.abs(y - this._fromY));
            }
            throw new Error("Illegal topology");
        };
        return AStar;
    }(path_1.Path));
    exports.AStar = AStar;
});
define("rot/path/dijkstra", ["require", "exports", "rot/path/path"], function (require, exports, path_2) {
    "use strict";
    /**
     * @class Simplified Dijkstra's algorithm: all edges have a value of 1
     * @augments ROT.Path
     * @see ROT.Path
     */
    var Dijkstra = (function (_super) {
        __extends(Dijkstra, _super);
        function Dijkstra(toX, toY, passableCallback, options) {
            if (options === void 0) { options = {}; }
            _super.call(this, toX, toY, passableCallback, options);
            this._computed = {};
            this._todo = [];
            this._add(toX, toY, null);
        }
        /**
         * Compute a path from a given point
         * @see ROT.Path#compute
         */
        Dijkstra.prototype.compute = function (fromX, fromY, callback) {
            var key = fromX + "," + fromY;
            if (!(key in this._computed)) {
                this._compute(fromX, fromY);
            }
            if (!(key in this._computed)) {
                return;
            }
            var item = this._computed[key];
            while (item) {
                callback(item.x, item.y);
                item = item.prev;
            }
        };
        /**
         * Compute a non-cached value
         */
        Dijkstra.prototype._compute = function (fromX, fromY) {
            while (this._todo.length) {
                var item = this._todo.shift();
                if (item.x == fromX && item.y == fromY) {
                    return;
                }
                var neighbors = this._getNeighbors(item.x, item.y);
                for (var i = 0; i < neighbors.length; i++) {
                    var neighbor = neighbors[i];
                    var x = neighbor[0];
                    var y = neighbor[1];
                    var id = x + "," + y;
                    if (id in this._computed) {
                        continue;
                    } /* already done */
                    this._add(x, y, item);
                }
            }
        };
        Dijkstra.prototype._add = function (x, y, prev) {
            var obj = {
                x: x,
                y: y,
                prev: prev
            };
            this._computed[x + "," + y] = obj;
            this._todo.push(obj);
        };
        return Dijkstra;
    }(path_2.Path));
    exports.Dijkstra = Dijkstra;
});
define("rot/scheduler/scheduler-action", ["require", "exports", "rot/scheduler/scheduler"], function (require, exports, scheduler_1) {
    "use strict";
    /**
     * @class Action-based scheduler
     * @augments ROT.Scheduler
     */
    var Action = (function (_super) {
        __extends(Action, _super);
        function Action() {
            _super.call(this);
            this._defaultDuration = 1; /* for newly added */
            this._duration = this._defaultDuration; /* for this._current */
        }
        /**
         * @param {object} item
         * @param {bool} repeat
         * @param {number} [time=1]
         * @see ROT.Scheduler#add
         */
        Action.prototype.add = function (item, repeat, time) {
            if (time === void 0) { time = this._defaultDuration; }
            this._queue.add(item, time);
            return _super.prototype.add.call(this, item, repeat);
        };
        Action.prototype.clear = function () {
            this._duration = this._defaultDuration;
            return _super.prototype.clear.call(this);
        };
        Action.prototype.remove = function (item) {
            if (item == this._current) {
                this._duration = this._defaultDuration;
            }
            return _super.prototype.remove.call(this, item);
        };
        /**
         * @see ROT.Scheduler#next
         */
        Action.prototype.next = function () {
            if (this._current && this._repeat.indexOf(this._current) != -1) {
                this._queue.add(this._current, this._duration || this._defaultDuration);
                this._duration = this._defaultDuration;
            }
            return _super.prototype.next.call(this);
        };
        /**
         * Set duration for the active item
         */
        Action.prototype.setDuration = function (time) {
            if (this._current) {
                this._duration = time;
            }
            return this;
        };
        return Action;
    }(scheduler_1.Scheduler));
    exports.Action = Action;
});
define("rot/scheduler/scheduler-simple", ["require", "exports", "rot/scheduler/scheduler"], function (require, exports, scheduler_2) {
    "use strict";
    /**
     * @class Simple fair scheduler (round-robin style)
     * @augments ROT.Scheduler
     */
    var Simple = (function (_super) {
        __extends(Simple, _super);
        function Simple() {
            _super.call(this);
        }
        /**
         * @see ROT.Scheduler#add
         */
        Simple.prototype.add = function (item, repeat) {
            this._queue.add(item, 0);
            return _super.prototype.add.call(this, item, repeat);
        };
        /**
         * @see ROT.Scheduler#next
         */
        Simple.prototype.next = function () {
            if (this._current && this._repeat.indexOf(this._current) != -1) {
                this._queue.add(this._current, 0);
            }
            return _super.prototype.next.call(this);
        };
        return Simple;
    }(scheduler_2.Scheduler));
    exports.Simple = Simple;
});
define("rot/scheduler/scheduler-speed", ["require", "exports", "rot/scheduler/scheduler"], function (require, exports, scheduler_3) {
    "use strict";
    /**
     * @class Speed-based scheduler
     * @augments ROT.Scheduler
     */
    var Speed = (function (_super) {
        __extends(Speed, _super);
        function Speed() {
            _super.call(this);
        }
        /**
         * @param {object} item anything with "getSpeed" method
         * @param {bool} repeat
         * @param {number} [time=1/item.getSpeed()]
         * @see ROT.Scheduler#add
         */
        Speed.prototype.add = function (item, repeat, time) {
            if (time === void 0) { time = 1 / item.getSpeed(); }
            this._queue.add(item, time);
            return _super.prototype.add.call(this, item, repeat);
        };
        /**
         * @see ROT.Scheduler#next
         */
        Speed.prototype.next = function () {
            if (this._current && this._repeat.indexOf(this._current) != -1) {
                this._queue.add(this._current, 1 / this._current.getSpeed());
            }
            return _super.prototype.next.call(this);
        };
        return Speed;
    }(scheduler_3.Scheduler));
    exports.Speed = Speed;
});
define("rot/stringgenerator", ["require", "exports", "rot/rng"], function (require, exports, rng_9) {
    "use strict";
    /**
     * @class (Markov process)-based string generator.
     * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>.
     * Offers configurable order and prior.
     * @param {object} [options]
     * @param {bool} [options.words=false] Use word mode?
     * @param {int} [options.order=3]
     * @param {float} [options.prior=0.001]
     */
    var StringGenerator = (function () {
        function StringGenerator(options) {
            this._options = {
                words: false,
                order: 3,
                prior: 0.001
            };
            for (var p in options) {
                this._options[p] = options[p];
            }
            this._boundary = String.fromCharCode(0);
            this._suffix = this._boundary;
            this._prefix = [];
            for (var i = 0; i < this._options.order; i++) {
                this._prefix.push(this._boundary);
            }
            this._priorValues = {};
            this._priorValues[this._boundary] = this._options.prior;
            this._data = {};
        }
        /**
         * Remove all learning data
         */
        StringGenerator.prototype.clear = function () {
            this._data = {};
            this._priorValues = {};
        };
        /**
         * @returns {string} Generated string
         */
        StringGenerator.prototype.generate = function () {
            var result = [this._sample(this._prefix)];
            while (result[result.length - 1] != this._boundary) {
                result.push(this._sample(result));
            }
            return this._join(result.slice(0, -1));
        };
        /**
         * Observe (learn) a string from a training set
         */
        StringGenerator.prototype.observe = function (string) {
            var tokens = this._split(string);
            for (var i = 0; i < tokens.length; i++) {
                this._priorValues[tokens[i]] = this._options.prior;
            }
            tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */
            for (var i = this._options.order; i < tokens.length; i++) {
                var context = tokens.slice(i - this._options.order, i);
                var event_1 = tokens[i];
                for (var j = 0; j < context.length; j++) {
                    var subcontext = context.slice(j);
                    this._observeEvent(subcontext, event_1);
                }
            }
        };
        StringGenerator.prototype.getStats = function () {
            var parts = [];
            var priorCount = 0;
            for (var p in this._priorValues) {
                priorCount++;
            }
            priorCount--; /* boundary */
            parts.push("distinct samples: " + priorCount);
            var dataCount = 0;
            var eventCount = 0;
            for (var p in this._data) {
                dataCount++;
                for (var key in this._data[p]) {
                    eventCount++;
                }
            }
            parts.push("dictionary size (contexts): " + dataCount);
            parts.push("dictionary size (events): " + eventCount);
            return parts.join(", ");
        };
        /**
         * @param {string}
         * @returns {string[]}
         */
        StringGenerator.prototype._split = function (str) {
            return str.split(this._options.words ? /\s+/ : "");
        };
        /**
         * @param {string[]}
         * @returns {string}
         */
        StringGenerator.prototype._join = function (arr) {
            return arr.join(this._options.words ? " " : "");
        };
        /**
         * @param {string[]} context
         * @param {string} event
         */
        StringGenerator.prototype._observeEvent = function (context, event) {
            var key = this._join(context);
            if (!(key in this._data)) {
                this._data[key] = {};
            }
            var data = this._data[key];
            if (!(event in data)) {
                data[event] = 0;
            }
            data[event]++;
        };
        /**
         * @param {string[]}
         * @returns {string}
         */
        StringGenerator.prototype._sample = function (context) {
            context = this._backoff(context);
            var key = this._join(context);
            var data = this._data[key];
            var available = {};
            if (this._options.prior) {
                for (var event in this._priorValues) {
                    available[event] = this._priorValues[event];
                }
                for (var event in data) {
                    available[event] += data[event];
                }
            }
            else {
                available = data;
            }
            return rng_9.RNG.getWeightedValue(available);
        };
        /**
         * @param {string[]}
         * @returns {string[]}
         */
        StringGenerator.prototype._backoff = function (context) {
            if (context.length > this._options.order) {
                context = context.slice(-this._options.order);
            }
            else if (context.length < this._options.order) {
                context = this._prefix.slice(0, this._options.order - context.length).concat(context);
            }
            while (!(this._join(context) in this._data) && context.length > 0) {
                context = context.slice(1);
            }
            return context;
        };
        return StringGenerator;
    }());
    exports.StringGenerator = StringGenerator;
});
//# sourceMappingURL=rot.js.map