declare module "rot" {
    import './extensions/raf';
    /**
     * @namespace Top-level ROT namespace
     */
    export const ROT: {
        isSupported(): boolean;
        DEFAULT_WIDTH: number;
        DEFAULT_HEIGHT: number;
        DIRS: {
            "4": number[][];
            "6": number[][];
            "8": number[][];
        };
        VK_CANCEL: number;
        VK_HELP: number;
        VK_BACK_SPACE: number;
        VK_TAB: number;
        VK_CLEAR: number;
        VK_RETURN: number;
        VK_ENTER: number;
        VK_SHIFT: number;
        VK_CONTROL: number;
        VK_ALT: number;
        VK_PAUSE: number;
        VK_CAPS_LOCK: number;
        VK_ESCAPE: number;
        VK_SPACE: number;
        VK_PAGE_UP: number;
        VK_PAGE_DOWN: number;
        VK_END: number;
        VK_HOME: number;
        VK_LEFT: number;
        VK_UP: number;
        VK_RIGHT: number;
        VK_DOWN: number;
        VK_PRINTSCREEN: number;
        VK_INSERT: number;
        VK_DELETE: number;
        VK_0: number;
        VK_1: number;
        VK_2: number;
        VK_3: number;
        VK_4: number;
        VK_5: number;
        VK_6: number;
        VK_7: number;
        VK_8: number;
        VK_9: number;
        VK_COLON: number;
        VK_SEMICOLON: number;
        VK_LESS_THAN: number;
        VK_EQUALS: number;
        VK_GREATER_THAN: number;
        VK_QUESTION_MARK: number;
        VK_AT: number;
        VK_A: number;
        VK_B: number;
        VK_C: number;
        VK_D: number;
        VK_E: number;
        VK_F: number;
        VK_G: number;
        VK_H: number;
        VK_I: number;
        VK_J: number;
        VK_K: number;
        VK_L: number;
        VK_M: number;
        VK_N: number;
        VK_O: number;
        VK_P: number;
        VK_Q: number;
        VK_R: number;
        VK_S: number;
        VK_T: number;
        VK_U: number;
        VK_V: number;
        VK_W: number;
        VK_X: number;
        VK_Y: number;
        VK_Z: number;
        VK_CONTEXT_MENU: number;
        VK_NUMPAD0: number;
        VK_NUMPAD1: number;
        VK_NUMPAD2: number;
        VK_NUMPAD3: number;
        VK_NUMPAD4: number;
        VK_NUMPAD5: number;
        VK_NUMPAD6: number;
        VK_NUMPAD7: number;
        VK_NUMPAD8: number;
        VK_NUMPAD9: number;
        VK_MULTIPLY: number;
        VK_ADD: number;
        VK_SEPARATOR: number;
        VK_SUBTRACT: number;
        VK_DECIMAL: number;
        VK_DIVIDE: number;
        VK_F1: number;
        VK_F2: number;
        VK_F3: number;
        VK_F4: number;
        VK_F5: number;
        VK_F6: number;
        VK_F7: number;
        VK_F8: number;
        VK_F9: number;
        VK_F10: number;
        VK_F11: number;
        VK_F12: number;
        VK_F13: number;
        VK_F14: number;
        VK_F15: number;
        VK_F16: number;
        VK_F17: number;
        VK_F18: number;
        VK_F19: number;
        VK_F20: number;
        VK_F21: number;
        VK_F22: number;
        VK_F23: number;
        VK_F24: number;
        VK_NUM_LOCK: number;
        VK_SCROLL_LOCK: number;
        VK_CIRCUMFLEX: number;
        VK_EXCLAMATION: number;
        VK_DOUBLE_QUOTE: number;
        VK_HASH: number;
        VK_DOLLAR: number;
        VK_PERCENT: number;
        VK_AMPERSAND: number;
        VK_UNDERSCORE: number;
        VK_OPEN_PAREN: number;
        VK_CLOSE_PAREN: number;
        VK_ASTERISK: number;
        VK_PLUS: number;
        VK_PIPE: number;
        VK_HYPHEN_MINUS: number;
        VK_OPEN_CURLY_BRACKET: number;
        VK_CLOSE_CURLY_BRACKET: number;
        VK_TILDE: number;
        VK_COMMA: number;
        VK_PERIOD: number;
        VK_SLASH: number;
        VK_BACK_QUOTE: number;
        VK_OPEN_BRACKET: number;
        VK_BACK_SLASH: number;
        VK_CLOSE_BRACKET: number;
        VK_QUOTE: number;
        VK_META: number;
        VK_ALTGR: number;
        VK_WIN: number;
        VK_KANA: number;
        VK_HANGUL: number;
        VK_EISU: number;
        VK_JUNJA: number;
        VK_FINAL: number;
        VK_HANJA: number;
        VK_KANJI: number;
        VK_CONVERT: number;
        VK_NONCONVERT: number;
        VK_ACCEPT: number;
        VK_MODECHANGE: number;
        VK_SELECT: number;
        VK_PRINT: number;
        VK_EXECUTE: number;
        VK_SLEEP: number;
    };
}
declare module "rot/rng" {
    /**
     * @namespace
     * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
     * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
     */
    export class RNG {
        private static _s0;
        private static _s1;
        private static _s2;
        private static _c;
        private static _frac;
        private static _seed;
        /**
         * @returns {number}
         */
        static getSeed(): number;
        /**
         * @param {number} seed Seed the number generator
         */
        static setSeed(seed: any): typeof RNG;
        /**
         * @returns {float} Pseudorandom value [0,1), uniformly distributed
         */
        static getUniform(): number;
        /**
         * @param {int} lowerBound The lower end of the range to return a value from, inclusive
         * @param {int} upperBound The upper end of the range to return a value from, inclusive
         * @returns {int} Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
         */
        static getUniformInt(lowerBound: any, upperBound: any): number;
        /**
         * @param {float} [mean=0] Mean value
         * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
         * @returns {float} A normally distributed pseudorandom value
         */
        static getNormal(mean: any, stddev: any): any;
        /**
         * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
         */
        static getPercentage(): number;
        /**
         * @param {object} data key=whatever, value=weight (relative probability)
         * @returns {string} whatever
         */
        static getWeightedValue(data: any): string;
        /**
         * Get RNG state. Useful for storing the state and re-setting it via setState.
         * @returns {?} Internal state
         */
        static getState(): number[];
        /**
         * Set a previously retrieved state.
         * @param {?} state
         */
        static setState(state: any): typeof RNG;
        /**
         * Returns a cloned RNG
         */
        static clone(): typeof RNG;
    }
}
interface String {
    capitalize(): string;
    lpad(character: string, count: number): string;
    rpad(character: string, count: number): string;
    format(): string;
}
declare type StringFormatter = ((template: any) => string) | any;
interface StringConstructor {
    format: StringFormatter;
}
declare module "rot/color" {
    import './extensions/string';
    /**
     * @namespace Color operations
     */
    export class Color {
        static fromString(str: any): any;
        /**
         * Add two or more colors
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        static add(color1: any, color2: any): any;
        /**
         * Add two or more colors, MODIFIES FIRST ARGUMENT
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        static add_(color1: any, color2: any): any;
        /**
         * Multiply (mix) two or more colors
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        static multiply(color1: any, color2: any): any;
        /**
         * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
         * @param {number[]} color1
         * @param {number[]} color2
         * @returns {number[]}
         */
        static multiply_(color1: any, color2: any): any;
        /**
         * Interpolate (blend) two colors with a given factor
         * @param {number[]} color1
         * @param {number[]} color2
         * @param {float} [factor=0.5] 0..1
         * @returns {number[]}
         */
        static interpolate(color1: any, color2: any, factor: any): any;
        /**
         * Interpolate (blend) two colors with a given factor in HSL mode
         * @param {number[]} color1
         * @param {number[]} color2
         * @param {float} [factor=0.5] 0..1
         * @returns {number[]}
         */
        static interpolateHSL(color1: any, color2: any, factor: any): any[];
        /**
         * Create a new random color based on this one
         * @param {number[]} color
         * @param {number[]} diff Set of standard deviations
         * @returns {number[]}
         */
        static randomize(color: any, diff: any): any;
        /**
         * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
         * @param {number[]} color
         * @returns {number[]}
         */
        static rgb2hsl(color: any): any[];
        /**
         * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
         * @param {number[]} color
         * @returns {number[]}
         */
        static hsl2rgb(color: any): any[];
        static toRGB(color: any): string;
        static toHex(color: any): string;
        private static _clamp(num);
        static _cache: {
            "black": [0, 0, 0];
            "navy": [0, 0, 128];
            "darkblue": [0, 0, 139];
            "mediumblue": [0, 0, 205];
            "blue": [0, 0, 255];
            "darkgreen": [0, 100, 0];
            "green": [0, 128, 0];
            "teal": [0, 128, 128];
            "darkcyan": [0, 139, 139];
            "deepskyblue": [0, 191, 255];
            "darkturquoise": [0, 206, 209];
            "mediumspringgreen": [0, 250, 154];
            "lime": [0, 255, 0];
            "springgreen": [0, 255, 127];
            "aqua": [0, 255, 255];
            "cyan": [0, 255, 255];
            "midnightblue": [25, 25, 112];
            "dodgerblue": [30, 144, 255];
            "forestgreen": [34, 139, 34];
            "seagreen": [46, 139, 87];
            "darkslategray": [47, 79, 79];
            "darkslategrey": [47, 79, 79];
            "limegreen": [50, 205, 50];
            "mediumseagreen": [60, 179, 113];
            "turquoise": [64, 224, 208];
            "royalblue": [65, 105, 225];
            "steelblue": [70, 130, 180];
            "darkslateblue": [72, 61, 139];
            "mediumturquoise": [72, 209, 204];
            "indigo": [75, 0, 130];
            "darkolivegreen": [85, 107, 47];
            "cadetblue": [95, 158, 160];
            "cornflowerblue": [100, 149, 237];
            "mediumaquamarine": [102, 205, 170];
            "dimgray": [105, 105, 105];
            "dimgrey": [105, 105, 105];
            "slateblue": [106, 90, 205];
            "olivedrab": [107, 142, 35];
            "slategray": [112, 128, 144];
            "slategrey": [112, 128, 144];
            "lightslategray": [119, 136, 153];
            "lightslategrey": [119, 136, 153];
            "mediumslateblue": [123, 104, 238];
            "lawngreen": [124, 252, 0];
            "chartreuse": [127, 255, 0];
            "aquamarine": [127, 255, 212];
            "maroon": [128, 0, 0];
            "purple": [128, 0, 128];
            "olive": [128, 128, 0];
            "gray": [128, 128, 128];
            "grey": [128, 128, 128];
            "skyblue": [135, 206, 235];
            "lightskyblue": [135, 206, 250];
            "blueviolet": [138, 43, 226];
            "darkred": [139, 0, 0];
            "darkmagenta": [139, 0, 139];
            "saddlebrown": [139, 69, 19];
            "darkseagreen": [143, 188, 143];
            "lightgreen": [144, 238, 144];
            "mediumpurple": [147, 112, 216];
            "darkviolet": [148, 0, 211];
            "palegreen": [152, 251, 152];
            "darkorchid": [153, 50, 204];
            "yellowgreen": [154, 205, 50];
            "sienna": [160, 82, 45];
            "brown": [165, 42, 42];
            "darkgray": [169, 169, 169];
            "darkgrey": [169, 169, 169];
            "lightblue": [173, 216, 230];
            "greenyellow": [173, 255, 47];
            "paleturquoise": [175, 238, 238];
            "lightsteelblue": [176, 196, 222];
            "powderblue": [176, 224, 230];
            "firebrick": [178, 34, 34];
            "darkgoldenrod": [184, 134, 11];
            "mediumorchid": [186, 85, 211];
            "rosybrown": [188, 143, 143];
            "darkkhaki": [189, 183, 107];
            "silver": [192, 192, 192];
            "mediumvioletred": [199, 21, 133];
            "indianred": [205, 92, 92];
            "peru": [205, 133, 63];
            "chocolate": [210, 105, 30];
            "tan": [210, 180, 140];
            "lightgray": [211, 211, 211];
            "lightgrey": [211, 211, 211];
            "palevioletred": [216, 112, 147];
            "thistle": [216, 191, 216];
            "orchid": [218, 112, 214];
            "goldenrod": [218, 165, 32];
            "crimson": [220, 20, 60];
            "gainsboro": [220, 220, 220];
            "plum": [221, 160, 221];
            "burlywood": [222, 184, 135];
            "lightcyan": [224, 255, 255];
            "lavender": [230, 230, 250];
            "darksalmon": [233, 150, 122];
            "violet": [238, 130, 238];
            "palegoldenrod": [238, 232, 170];
            "lightcoral": [240, 128, 128];
            "khaki": [240, 230, 140];
            "aliceblue": [240, 248, 255];
            "honeydew": [240, 255, 240];
            "azure": [240, 255, 255];
            "sandybrown": [244, 164, 96];
            "wheat": [245, 222, 179];
            "beige": [245, 245, 220];
            "whitesmoke": [245, 245, 245];
            "mintcream": [245, 255, 250];
            "ghostwhite": [248, 248, 255];
            "salmon": [250, 128, 114];
            "antiquewhite": [250, 235, 215];
            "linen": [250, 240, 230];
            "lightgoldenrodyellow": [250, 250, 210];
            "oldlace": [253, 245, 230];
            "red": [255, 0, 0];
            "fuchsia": [255, 0, 255];
            "magenta": [255, 0, 255];
            "deeppink": [255, 20, 147];
            "orangered": [255, 69, 0];
            "tomato": [255, 99, 71];
            "hotpink": [255, 105, 180];
            "coral": [255, 127, 80];
            "darkorange": [255, 140, 0];
            "lightsalmon": [255, 160, 122];
            "orange": [255, 165, 0];
            "lightpink": [255, 182, 193];
            "pink": [255, 192, 203];
            "gold": [255, 215, 0];
            "peachpuff": [255, 218, 185];
            "navajowhite": [255, 222, 173];
            "moccasin": [255, 228, 181];
            "bisque": [255, 228, 196];
            "mistyrose": [255, 228, 225];
            "blanchedalmond": [255, 235, 205];
            "papayawhip": [255, 239, 213];
            "lavenderblush": [255, 240, 245];
            "seashell": [255, 245, 238];
            "cornsilk": [255, 248, 220];
            "lemonchiffon": [255, 250, 205];
            "floralwhite": [255, 250, 240];
            "snow": [255, 250, 250];
            "yellow": [255, 255, 0];
            "lightyellow": [255, 255, 224];
            "ivory": [255, 255, 240];
            "white": [255, 255, 255];
        };
    }
}
declare module "rot/display/backend" {
    /**
     * @class Abstract display backend module
     * @private
     */
    export abstract class DisplayBackend {
        protected _context: CanvasRenderingContext2D;
        constructor(context: CanvasRenderingContext2D);
        compute(options: any): void;
        draw(data: any, clearBefore: any): void;
        computeSize(availWidth: any, availHeight: any): void;
        computeFontSize(availWidth: any, availHeight: any): void;
        eventToPosition(x: any, y: any): void;
    }
}
declare module "rot/text" {
    /**
     * @namespace
     * Contains text tokenization and breaking routines
     */
    export enum Tokens {
        TYPE_TEXT = 0,
        TYPE_NEWLINE = 1,
        TYPE_FG = 2,
        TYPE_BG = 3,
    }
    export class TextTokenizer {
        private RE_COLORS;
        /**
         * Measure size of a resulting text block
         */
        measure(str: any, maxWidth: any): {
            width: number;
            height: number;
        };
        /**
         * Convert string to a series of a formatting commands
         */
        tokenize(str: any, maxWidth: any): any;
        private _breakLines(tokens, maxWidth);
        /**
         * Create new tokens and insert them into the stream
         * @param {object[]} tokens
         * @param {int} tokenIndex Token being processed
         * @param {int} breakIndex Index within current token's value
         * @param {bool} removeBreakChar Do we want to remove the breaking character?
         * @returns {string} remaining unbroken token value
         */
        private _breakInsideToken(tokens, tokenIndex, breakIndex, removeBreakChar);
    }
}
interface Number {
    mod(n: number): number;
}
declare module "rot/display/hex" {
    import '../extensions/number';
    import { DisplayBackend } from "rot/display/backend";
    /**
     * @class Hexagonal backend
     * @private
     */
    export class HexDisplay extends DisplayBackend {
        private _spacingX;
        private _spacingY;
        private _hexSize;
        private _options;
        constructor(context: any);
        compute(options: any): void;
        draw(data: any, clearBefore: any): void;
        computeSize(availWidth: any, availHeight: any): number[];
        computeFontSize(availWidth: any, availHeight: any): number;
        eventToPosition(x: any, y: any): any[];
        /**
         * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
         */
        _fill(cx: any, cy: any): void;
    }
}
declare module "rot/display/rect" {
    import { DisplayBackend } from "rot/display/backend";
    /**
     * @class Rectangular backend
     * @private
     */
    export class RectDisplay extends DisplayBackend {
        static cache: boolean;
        private _spacingX;
        private _spacingY;
        private _canvasCache;
        private _options;
        constructor(context: any);
        compute(options: any): void;
        draw(data: any, clearBefore: any): void;
        _drawWithCache(data: any, clearBefore: any): void;
        _drawNoCache(data: any, clearBefore: any): void;
        computeSize(availWidth: any, availHeight: any): number[];
        computeFontSize(availWidth: any, availHeight: any): number;
        eventToPosition(x: any, y: any): number[];
    }
}
declare module "rot/display/tile" {
    import { DisplayBackend } from "rot/display/backend";
    /**
     * @class Tile backend
     * @private
     */
    export class TileDisplay extends DisplayBackend {
        private _options;
        private _colorCanvas;
        constructor(context: any);
        compute(options: any): void;
        draw(data: any, clearBefore: any): void;
        computeSize(availWidth: any, availHeight: any): number[];
        computeFontSize(availWidth: any, availHeight: any): number[];
        eventToPosition(x: any, y: any): number[];
    }
}
declare module "rot/display/display" {
    import './extensions/string';
    /**
     * @class Visual map display
     * @param {object} [options]
     * @param {int} [options.width=ROT.DEFAULT_WIDTH]
     * @param {int} [options.height=ROT.DEFAULT_HEIGHT]
     * @param {int} [options.fontSize=15]
     * @param {string} [options.fontFamily="monospace"]
     * @param {string} [options.fontStyle=""] bold/italic/none/both
     * @param {string} [options.fg="#ccc"]
     * @param {string} [options.bg="#000"]
     * @param {float} [options.spacing=1]
     * @param {float} [options.border=0]
     * @param {string} [options.layout="rect"]
     * @param {bool} [options.forceSquareRatio=false]
     * @param {int} [options.tileWidth=32]
     * @param {int} [options.tileHeight=32]
     * @param {object} [options.tileMap={}]
     * @param {image} [options.tileSet=null]
     * @param {image} [options.tileColorize=false]
     */
    export interface DisplayOptions {
        width?: number;
        height?: number;
        transpose?: boolean;
        layout?: string;
        fontSize?: number;
        spacing?: number;
        border?: number;
        forceSquareRatio?: boolean;
        fontFamily?: string;
        fontStyle?: string;
        fg?: string;
        bg?: string;
        tileWidth?: number;
        tileHeight?: number;
        tileMap?: any;
        tileSet?: any;
        tileColorize?: boolean;
        termColor?: string;
    }
    export class Display {
        private _context;
        private _data;
        private _dirty;
        private _options;
        private _backend;
        private _tokenizer;
        constructor(options?: DisplayOptions);
        /**
         * Debug helper, ideal as a map generator callback. Always bound to this.
         * @param {int} x
         * @param {int} y
         * @param {int} what
         */
        DEBUG(x: any, y: any, what: any): void;
        /**
         * Clear the whole display (cover it with background color)
         */
        clear(): void;
        /**
         * @see Display
         */
        setOptions(options: any): this;
        /**
         * Returns currently set options
         * @returns {object} Current options object
         */
        getOptions(): any;
        /**
         * Returns the DOM node of this display
         * @returns {node} DOM node
         */
        getContainer(): HTMLCanvasElement;
        /**
         * Compute the maximum width/height to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int[2]} cellWidth,cellHeight
         */
        computeSize(availWidth: any, availHeight: any): any;
        /**
         * Compute the maximum font size to fit into a set of given constraints
         * @param {int} availWidth Maximum allowed pixel width
         * @param {int} availHeight Maximum allowed pixel height
         * @returns {int} fontSize
         */
        computeFontSize(availWidth: any, availHeight: any): any;
        /**
         * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
         * @param {Event} e event
         * @returns {int[2]} -1 for values outside of the canvas
         */
        eventToPosition(e: any): any;
        /**
         * @param {int} x
         * @param {int} y
         * @param {string || string[]} ch One or more chars (will be overlapping themselves)
         * @param {string} [fg] foreground color
         * @param {string} [bg] background color
         */
        draw(x: any, y: any, ch: any, fg?: string, bg?: string): void;
        /**
         * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
         * @param {int} x
         * @param {int} y
         * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
         * @param {int} [maxWidth] wrap at what width?
         * @returns {int} lines drawn
         */
        drawText(x: any, y: any, text: any, maxWidth: any): number;
        /**
         * Timer tick: update dirty parts
         */
        private _tick();
        /**
         * @param {string} key What to draw
         * @param {bool} clearBefore Is it necessary to clean before?
         */
        private _draw(key, clearBefore);
    }
}
declare module "rot/eventqueue" {
    /**
     * @class Generic event queue: stores events and retrieves them based on their time
     */
    export class EventQueue {
        private _time;
        private _events;
        private _eventTimes;
        constructor();
        /**
         * @returns {number} Elapsed time
         */
        getTime(): number;
        /**
         * Clear all scheduled events
         */
        clear(): this;
        /**
         * @param {?} event
         * @param {number} time
         */
        add(event: any, time: any): void;
        /**
         * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
         * @returns {? || null} The event previously added by addEvent, null if no event available
         */
        get(): number;
        /**
         * Get the time associated with the given event
         * @param {?} event
         * @returns {number} time
         */
        getEventTime(event: any): number;
        /**
         * Remove an event from the queue
         * @param {?} event
         * @returns {bool} success?
         */
        remove(event: any): boolean;
        /**
         * Remove an event from the queue
         * @param {int} index
         */
        private _remove(index);
    }
}
declare module "rot/scheduler/scheduler" {
    import { EventQueue } from "rot/eventqueue";
    /**
     * @class Abstract scheduler
     */
    export class Scheduler {
        protected _queue: EventQueue;
        protected _repeat: any;
        protected _current: any;
        constructor();
        /**
         * @see ROT.EventQueue#getTime
         */
        getTime(): number;
        /**
         * @param {?} item
         * @param {bool} repeat
         */
        add(item: any, repeat: any): this;
        /**
         * Get the time the given item is scheduled for
         * @param {?} item
         * @returns {number} time
         */
        getTimeOf(item: any): number;
        /**
         * Clear all items
         */
        clear(): this;
        /**
         * Remove a previously added item
         * @param {?} item
         * @returns {bool} successful?
         */
        remove(item: any): boolean;
        /**
         * Schedule next item
         * @returns {?}
         */
        next(): any;
    }
}
declare module "rot/engine" {
    import { Scheduler } from "rot/scheduler/scheduler";
    /**
     * @class Asynchronous main loop
     * @param {ROT.Scheduler} scheduler
     */
    export class Engine {
        private _scheduler;
        private _lock;
        constructor(scheduler: Scheduler);
        /**
         * Start the main loop. When this call returns, the loop is locked.
         */
        start(): this;
        /**
         * Interrupt the engine by an asynchronous action
         */
        lock(): this;
        /**
         * Resume execution (paused by a previous lock)
         */
        unlock(): this;
    }
}
declare module "rot/extensions/array" {
    global  {
        interface Array<T> {
            random(): T;
            randomize(): T[];
        }
    }
}
interface Window {
    mozRequestAnimationFrame(func: FrameRequestCallback): number;
    oRequestAnimationFrame(func: FrameRequestCallback): number;
    msRequestAnimationFrame(func: FrameRequestCallback): number;
    mozCancelAnimationFrame(handle: number): void;
    oCancelAnimationFrame(handle: number): void;
    msCancelAnimationFrame(handle: number): void;
}
declare module "rot/fov/fov" {
    export interface FOVOptions {
        topology?: number;
    }
    /**
     * @class Abstract FOV algorithm
     * @param {function} lightPassesCallback Does the light pass through x,y?
     * @param {object} [options]
     * @param {int} [options.topology=8] 4/6/8
     */
    export class FOV {
        protected _lightPasses: any;
        protected _options: any;
        constructor(lightPassesCallback: any, options?: FOVOptions);
        /**
         * Compute visibility for a 360-degree circle
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        compute(x: any, y: any, R: any, callback: any): void;
        /**
         * Return all neighbors in a concentric ring
         * @param {int} cx center-x
         * @param {int} cy center-y
         * @param {int} r range
         */
        protected _getCircle(cx: any, cy: any, r: any): any[];
    }
}
declare module "rot/fov/discrete-shadowcasting" {
    import { FOV, FOVOptions } from "rot/fov/fov";
    /**
     * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
     * @augments ROT.FOV
     */
    export class DiscreteShadowcasting extends FOV {
        private _coords;
        private _map;
        constructor(lightPassesCallback: any, options?: FOVOptions);
        /**
         * @see ROT.FOV#compute
         */
        compute(x: any, y: any, R: any, callback: any): void;
        /**
         * @param {int} A start angle
         * @param {int} B end angle
         * @param {bool} blocks Does current cell block visibility?
         * @param {int[][]} DATA shadowed angle pairs
         */
        _visibleCoords(A: any, B: any, blocks: any, DATA: any): any;
    }
}
declare module "rot/fov/precise-shadowcasting" {
    import { FOV, FOVOptions } from "rot/fov/fov";
    /**
     * @class Precise shadowcasting algorithm
     * @augments ROT.FOV
     */
    export class PreciseShadowcasting extends FOV {
        constructor(lightPassesCallback: any, options?: FOVOptions);
        /**
         * @see ROT.FOV#compute
         */
        compute(x: any, y: any, R: any, callback: any): void;
        /**
         * @param {int[2]} A1 arc start
         * @param {int[2]} A2 arc end
         * @param {bool} blocks Does current arc block visibility?
         * @param {int[][]} SHADOWS list of active shadows
         */
        private _checkVisibility(A1, A2, blocks, SHADOWS);
    }
}
declare module "rot/fov/recursive-shadowcasting" {
    import { FOV, FOVOptions } from "rot/fov/fov";
    /**
     * @class Recursive shadowcasting algorithm
     * Currently only supports 4/8 topologies, not hexagonal.
     * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
     * @augments ROT.FOV
     */
    export class RecursiveShadowcasting extends FOV {
        constructor(lightPassesCallback: any, options?: FOVOptions);
        /**
         * Compute visibility for a 360-degree circle
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        compute(x: any, y: any, R: any, callback: any): void;
        /**
         * Compute visibility for a 180-degree arc
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
         * @param {function} callback
         */
        compute180(x: any, y: any, R: any, dir: any, callback: any): void;
        /**
         * Compute visibility for a 90-degree arc
         * @param {int} x
         * @param {int} y
         * @param {int} R Maximum visibility radius
         * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
         * @param {function} callback
         */
        compute90(x: any, y: any, R: any, dir: any, callback: any): void;
        /**
         * Render one octant (45-degree arc) of the viewshed
         * @param {int} x
         * @param {int} y
         * @param {int} octant Octant to be rendered
         * @param {int} R Maximum visibility radius
         * @param {function} callback
         */
        private _renderOctant(x, y, octant, R, callback);
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
        private _castVisibility(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback);
        /** Octants used for translating recursive shadowcasting offsets */
        static OCTANTS: number[][];
    }
}
declare module "rot/lighting" {
    /**
     * @class Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
     * @param {function} reflectivityCallback Callback to retrieve cell reflectivity (0..1)
     * @param {object} [options]
     * @param {int} [options.passes=1] Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm.
     * @param {int} [options.emissionThreshold=100] Cells with emissivity > threshold will be treated as light source in the next pass.
     * @param {int} [options.range=10] Max light range
     */
    export class Lighting {
        private _reflectivityCallback;
        private _options;
        private _fov;
        private _lights;
        private _reflectivityCache;
        private _fovCache;
        constructor(reflectivityCallback: any, options: any);
        /**
         * Adjust options at runtime
         * @see Lighting
         * @param {object} [options]
         */
        setOptions(options: any): this;
        /**
         * Set the used Field-Of-View algo
         * @param {ROT.FOV} fov
         */
        setFOV(fov: any): this;
        /**
         * Set (or remove) a light source
         * @param {int} x
         * @param {int} y
         * @param {null || string || number[3]} color
         */
        setLight(x: any, y: any, color: any): this;
        /**
         * Remove all light sources
         */
        clearLights(): void;
        /**
         * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
         */
        reset(): this;
        /**
         * Compute the lighting
         * @param {function} lightingCallback Will be called with (x, y, color) for every lit cell
         */
        compute(lightingCallback: any): this;
        /**
         * Compute one iteration from all emitting cells
         * @param {object} emittingCells These emit light
         * @param {object} litCells Add projected light to these
         * @param {object} doneCells These already emitted, forbid them from further calculations
         */
        private _emitLight(emittingCells, litCells, doneCells);
        /**
         * Prepare a list of emitters for next pass
         * @param {object} litCells
         * @param {object} doneCells
         * @returns {object}
         */
        private _computeEmitters(litCells, doneCells);
        /**
         * Compute one iteration from one cell
         * @param {int} x
         * @param {int} y
         * @param {number[]} color
         * @param {object} litCells Cell data to by updated
         */
        private _emitLightFromCell(x, y, color, litCells);
        /**
         * Compute FOV ("form factor") for a potential light source at [x,y]
         * @param {int} x
         * @param {int} y
         * @returns {object}
         */
        private _updateFOV(x, y);
    }
}
declare module "rot/map/map" {
    /**
     * @class Base map generator
     * @param {int} [width=ROT.DEFAULT_WIDTH]
     * @param {int} [height=ROT.DEFAULT_HEIGHT]
     */
    export class Map {
        protected _width: number;
        protected _height: number;
        constructor(width?: number, height?: number);
        create(callback: any): void;
        protected _fillMap(value: any): any[];
    }
}
declare module "rot/map/arena" {
    import { Map } from "rot/map/map";
    /**
     * @class Simple empty rectangular room
     * @augments ROT.Map
     */
    export class Arena extends Map {
        constructor(width?: number, height?: number);
        create(callback: any): this;
    }
}
declare module "rot/map/cellular" {
    import { Map } from "rot/map/map";
    export interface CellularOptions {
        born?: [number, number, number, number];
        survive?: [number, number, number, number, number];
        topology?: number;
    }
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
    export class Cellular extends Map {
        private _options;
        private _dirs;
        private _map;
        constructor(width?: number, height?: number, options?: CellularOptions);
        /**
         * Fill the map with random values
         * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
         */
        randomize(probability: any): this;
        /**
         * Change options.
         * @see Cellular
         */
        setOptions(options: any): void;
        set(x: any, y: any, value: any): void;
        create(callback: any): void;
        serviceCallback(callback: any): void;
        /**
         * Get neighbor count at [i,j] in this._map
         */
        _getNeighbors(cx: any, cy: any): number;
        /**
         * Make sure every non-wall space is accessible.
         * @param {function} callback to call to display map when do
         * @param {int} value to consider empty space - defaults to 0
         * @param {function} callback to call when a new connection is made
         */
        connect(callback: any, value: any, connectionCallback: any): void;
        /**
         * Find random points to connect. Search for the closest point in the larger space.
         * This is to minimize the length of the passage while maintaining good performance.
         */
        _getFromTo(connected: any, notConnected: any): any[];
        _getClosest(point: any, space: any): any;
        _findConnected(connected: any, notConnected: any, stack: any, keepNotConnected: any, value: any): void;
        _tunnelToConnected(to: any, from: any, connected: any, notConnected: any, value: any, connectionCallback: any): void;
        _freeSpace(x: any, y: any, value: any): boolean;
        _pointKey(p: any): string;
    }
}
declare module "rot/map/dungeon" {
    import { Map } from "rot/map/map";
    /**
     * @class Dungeon map: has rooms and corridors
     * @augments ROT.Map
     */
    export class Dungeon extends Map {
        protected _rooms: any;
        protected _corridors: any;
        constructor(width?: number, height?: number);
        /**
         * Get all generated rooms
         * @returns {ROT.Map.Feature.Room[]}
         */
        getRooms(): any;
        /**
         * Get all generated corridors
         * @returns {ROT.Map.Feature.Corridor[]}
         */
        getCorridors(): any;
    }
}
declare module "rot/map/features" {
    /**
     * @class Dungeon feature; has own .create() method
     */
    export class Feature {
        constructor();
        isValid(...params: any[]): boolean;
        create(digCallback: any): void;
        debug(): void;
        static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): void;
    }
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
    export class Room extends Feature {
        private _x1;
        private _y1;
        private _x2;
        private _y2;
        private _doors;
        constructor(x1: any, y1: any, x2: any, y2: any, doorX?: any, doorY?: any);
        /**
         * Room of random size, with a given doors and direction
         */
        static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): Room;
        /**
         * Room of random size, positioned around center coords
         */
        static createRandomCenter(cx: any, cy: any, options: any): Room;
        /**
         * Room of random size within a given dimensions
         */
        static createRandom(availWidth: any, availHeight: any, options: any): Room;
        addDoor(x: any, y: any): this;
        /**
         * @param {function}
         */
        getDoors(callback: any): this;
        clearDoors(): this;
        addDoors(isWallCallback: any): this;
        debug(): void;
        isValid(isWallCallback: any, canBeDugCallback: any): boolean;
        /**
         * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
         */
        create(digCallback: any): void;
        getCenter(): number[];
        getLeft(): any;
        getRight(): any;
        getTop(): any;
        getBottom(): any;
    }
    /**
     * @class Corridor
     * @augments Feature
     * @param {int} startX
     * @param {int} startY
     * @param {int} endX
     * @param {int} endY
     */
    export class Corridor extends Feature {
        private _startX;
        private _startY;
        private _endX;
        private _endY;
        private _endsWithAWall;
        constructor(startX: any, startY: any, endX: any, endY: any);
        static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): Corridor;
        debug(): void;
        isValid(isWallCallback: any, canBeDugCallback: any): boolean;
        /**
         * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
         */
        create(digCallback: any): boolean;
        createPriorityWalls(priorityWallCallback: any): void;
    }
}
declare module "rot/map/digger" {
    import { Dungeon } from "rot/map/dungeon";
    import "rot/extensions/array";
    /**
     * @class Random dungeon generator using human-like digging patterns.
     * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at
     * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
     * @augments ROT.Map.Dungeon
     */
    export interface DiggerOptions {
        roomWidth?: [number, number];
        roomHeight?: [number, number];
        corridorLength?: [number, number];
        dugPercentage?: number;
        timeLimit?: number;
    }
    export class Digger extends Dungeon {
        private _options;
        private _features;
        private _featureAttempts;
        private _walls;
        private _map;
        private _dug;
        constructor(width?: number, height?: number, options?: DiggerOptions);
        /**
         * Create a map
         * @see ROT.Map#create
         */
        create(callback: any): this;
        _digCallback(x: any, y: any, value: any): void;
        _isWallCallback(x: any, y: any): boolean;
        _canBeDugCallback(x: any, y: any): boolean;
        _priorityWallCallback(x: any, y: any): void;
        _firstRoom(): void;
        /**
         * Get a suitable wall
         */
        _findWall(): any;
        /**
         * Tries adding a feature
         * @returns {bool} was this a successful try?
         */
        _tryFeature(x: any, y: any, dx: any, dy: any): boolean;
        _removeSurroundingWalls(cx: any, cy: any): void;
        /**
         * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
         */
        _getDiggingDirection(cx: any, cy: any): number[];
        /**
         * Find empty spaces surrounding rooms, and apply doors.
         */
        _addDoors(): void;
    }
}
declare module "rot/map/dividedmaze" {
    import { Map } from "rot/map/map";
    import './extensions/array';
    /**
     * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
     * @augments ROT.Map
     */
    export class DividedMaze extends Map {
        private _map;
        private _stack;
        constructor(width?: number, height?: number);
        create(callback: any): this;
        private _process();
        private _partitionRoom(room);
    }
}
declare module "rot/map/ellermaze" {
    import { Map } from "rot/map/map";
    /**
     * @class Maze generator - Eller's algorithm
     * See http://homepages.cwi.nl/~tromp/maze.html for explanation
     * @augments ROT.Map
     */
    export class EllerMaze extends Map {
        constructor(width?: number, height?: number);
        create(callback: any): this;
        /**
         * Remove "i" from its list
         */
        _removeFromList(i: any, L: any, R: any): void;
        /**
         * Join lists with "i" and "i+1"
         */
        _addToList(i: any, L: any, R: any): void;
    }
}
declare module "rot/map/iceymaze" {
    import { Map } from "rot/map/map";
    /**
     * @class Icey's Maze generator
     * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
     * @augments ROT.Map
     */
    export class IceyMaze extends Map {
        private _regularity;
        private _map;
        constructor(width?: number, height?: number, regularity?: number);
        create(callback: any): this;
        private _randomize(dirs);
        private _isFree(map, x, y, width, height);
    }
}
declare module "rot/map/rogue" {
    import { Map } from "rot/map/map";
    import "rot/extensions/array";
    export interface RogueOptions {
        cellWidth?: number;
        cellHeight?: number;
    }
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
    export class Rogue extends Map {
        private _options;
        private map;
        private rooms;
        private connectedCells;
        constructor(width?: number, height?: number, options?: RogueOptions);
        /**
         * @see ROT.Map#create
         */
        create(callback: any): this;
        private _calculateRoomSize(size, cell);
        private _initRooms();
        private _connectRooms();
        private _connectUnconnectedRooms();
        private _createRandomRoomConnections(connections?);
        private _createRooms();
        private _getWallPosition(aRoom, aDirection);
        /***
        * @param startPosition a 2 element array
        * @param endPosition a 2 element array
        */
        private _drawCorridor(startPosition, endPosition);
        private _createCorridors();
    }
}
declare module "rot/map/uniform" {
    import { Map } from "rot/map/map";
    import "rot/extensions/array";
    export interface UniformOptions {
        roomWidth?: [number, number];
        roomHeight?: [number, number];
        roomDugPercentage?: number;
        timeLimit?: number;
    }
    /**
     * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
     * @augments ROT.Map.Dungeon
     */
    export class Uniform extends Map {
        private _options;
        private _roomAttempts;
        private _corridorAttempts;
        private _connected;
        private _unconnected;
        private _map;
        private _dug;
        private _rooms;
        private _corridors;
        constructor(width?: number, height?: number, options?: UniformOptions);
        /**
         * Create a map. If the time limit has been hit, returns null.
         * @see ROT.Map#create
         */
        create(callback: any): this;
        /**
         * Generates a suitable amount of rooms
         */
        private _generateRooms();
        /**
         * Try to generate one room
         */
        private _generateRoom();
        /**
         * Generates connectors beween rooms
         * @returns {bool} success Was this attempt successfull?
         */
        private _generateCorridors();
        /**
         * For a given room, find the closest one from the list
         */
        private _closestRoom(rooms, room);
        private _connectRooms(room1, room2);
        private _placeInWall(room, dirIndex);
        /**
         * Dig a polyline.
         */
        private _digLine(points);
        private _digCallback(x, y, value);
        private _isWallCallback(x, y);
        private _canBeDugCallback(x, y);
    }
}
declare module "rot/noise/noise" {
    /**
     * @class Base noise generator
     */
    export interface Noise {
        get(x: any, y: any): any;
    }
}
declare module "rot/noise/simplex" {
    import { Noise } from "rot/noise/noise";
    import '../extensions/number';
    import "rot/extensions/array";
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
    export class Simplex implements Noise {
        private _F2;
        private _G2;
        private _gradients;
        private _perms;
        private _indexes;
        constructor(gradients?: number);
        get(xin: any, yin: any): number;
    }
}
declare module "rot/path/path" {
    export interface PathOptions {
        topology?: number;
    }
    export type PassableCallback = (x: number, y: number) => boolean;
    /**
     * @class Abstract pathfinder
     * @param {int} toX Target X coord
     * @param {int} toY Target Y coord
     * @param {function} passableCallback Callback to determine map passability
     * @param {object} [options]
     * @param {int} [options.topology=8]
     */
    export class Path {
        protected _toX: any;
        protected _toY: any;
        protected _fromX: any;
        protected _fromY: any;
        protected _passableCallback: any;
        protected _options: any;
        private _dirs;
        constructor(toX: number, toY: number, passableCallback: PassableCallback, options?: PathOptions);
        /**
         * Compute a path from a given point
         * @param {int} fromX
         * @param {int} fromY
         * @param {function} callback Will be called for every path item with arguments "x" and "y"
         */
        compute(fromX: any, fromY: any, callback: any): void;
        _getNeighbors(cx: any, cy: any): any[];
    }
}
declare module "rot/path/astar" {
    import { Path, PassableCallback, PathOptions } from "rot/path/path";
    /**
     * @class Simplified A* algorithm: all edges have a value of 1
     * @augments ROT.Path
     * @see ROT.Path
     */
    export class AStar extends Path {
        private _todo;
        private _done;
        constructor(toX: number, toY: number, passableCallback: PassableCallback, options?: PathOptions);
        /**
         * Compute a path from a given point
         * @see ROT.Path#compute
         */
        compute(fromX: any, fromY: any, callback: any): void;
        _add(x: any, y: any, prev: any): void;
        _distance(x: any, y: any): number;
    }
}
declare module "rot/path/dijkstra" {
    import { Path, PassableCallback, PathOptions } from "rot/path/path";
    /**
     * @class Simplified Dijkstra's algorithm: all edges have a value of 1
     * @augments ROT.Path
     * @see ROT.Path
     */
    export class Dijkstra extends Path {
        private _computed;
        private _todo;
        constructor(toX: number, toY: number, passableCallback: PassableCallback, options?: PathOptions);
        /**
         * Compute a path from a given point
         * @see ROT.Path#compute
         */
        compute(fromX: any, fromY: any, callback: any): void;
        /**
         * Compute a non-cached value
         */
        private _compute(fromX, fromY);
        private _add(x, y, prev);
    }
}
declare module "rot/scheduler/scheduler-action" {
    import { Scheduler } from "rot/scheduler/scheduler";
    /**
     * @class Action-based scheduler
     * @augments ROT.Scheduler
     */
    export class Action extends Scheduler {
        private _defaultDuration;
        private _duration;
        constructor();
        /**
         * @param {object} item
         * @param {bool} repeat
         * @param {number} [time=1]
         * @see ROT.Scheduler#add
         */
        add(item: any, repeat: any, time?: number): any;
        clear(): any;
        remove(item: any): any;
        /**
         * @see ROT.Scheduler#next
         */
        next(): any;
        /**
         * Set duration for the active item
         */
        setDuration(time: any): this;
    }
}
declare module "rot/scheduler/scheduler-simple" {
    import { Scheduler } from "rot/scheduler/scheduler";
    /**
     * @class Simple fair scheduler (round-robin style)
     * @augments ROT.Scheduler
     */
    export class Simple extends Scheduler {
        constructor();
        /**
         * @see ROT.Scheduler#add
         */
        add(item: any, repeat: any): any;
        /**
         * @see ROT.Scheduler#next
         */
        next(): any;
    }
}
declare module "rot/scheduler/scheduler-speed" {
    import { Scheduler } from "rot/scheduler/scheduler";
    /**
     * @class Speed-based scheduler
     * @augments ROT.Scheduler
     */
    export class Speed extends Scheduler {
        constructor();
        /**
         * @param {object} item anything with "getSpeed" method
         * @param {bool} repeat
         * @param {number} [time=1/item.getSpeed()]
         * @see ROT.Scheduler#add
         */
        add(item: any, repeat: any, time?: number): any;
        /**
         * @see ROT.Scheduler#next
         */
        next(): any;
    }
}
declare module "rot/stringgenerator" {
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
        constructor(options: any);
        /**
         * Remove all learning data
         */
        clear(): void;
        /**
         * @returns {string} Generated string
         */
        generate(): any;
        /**
         * Observe (learn) a string from a training set
         */
        observe(string: any): void;
        getStats(): string;
        /**
         * @param {string}
         * @returns {string[]}
         */
        _split(str: any): any;
        /**
         * @param {string[]}
         * @returns {string}
         */
        _join(arr: any): any;
        /**
         * @param {string[]} context
         * @param {string} event
         */
        _observeEvent(context: any, event: any): void;
        /**
         * @param {string[]}
         * @returns {string}
         */
        _sample(context: any): string;
        /**
         * @param {string[]}
         * @returns {string[]}
         */
        _backoff(context: any): any;
    }
}
