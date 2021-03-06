
import { DisplayBackend } from './backend';

/**
 * @class Rectangular backend
 * @private
 */
export class RectDisplay extends DisplayBackend {

	public static cache: boolean;

	private _spacingX: number;
	private _spacingY: number;
	private _canvasCache: { [key: string]: HTMLCanvasElement };
	private _options: any;

    constructor(context) {
        super(context);
        
        this._spacingX = 0;
        this._spacingY = 0;
        this._canvasCache = {};
        this._options = {};
    }

    compute(options) {
        this._canvasCache = {};
        this._options = options;

        const charWidth = Math.ceil(this._context.measureText("W").width);
        this._spacingX = Math.ceil(options.spacing * charWidth);
        this._spacingY = Math.ceil(options.spacing * options.fontSize);

        if (this._options.forceSquareRatio) {
            this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
        }

        this._context.canvas.width = options.width * this._spacingX;
        this._context.canvas.height = options.height * this._spacingY;
    }

    draw(data, clearBefore) {
        if (RectDisplay.cache) {
            this._drawWithCache(data, clearBefore);
        } else {
            this._drawNoCache(data, clearBefore);
        }
    }

    _drawWithCache(data, clearBefore) {
        const x = data[0];
        const y = data[1];
        const ch = data[2];
        const fg = data[3];
        const bg = data[4];

        const hash = ""+ch+fg+bg;
		let canvas: HTMLCanvasElement;
        if (hash in this._canvasCache) {
            canvas = this._canvasCache[hash];
        } else {
            const b = this._options.border;
            canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = this._spacingX;
            canvas.height = this._spacingY;
            ctx.fillStyle = bg;
            ctx.fillRect(b, b, canvas.width-b, canvas.height-b);
            
            if (ch) {
                ctx.fillStyle = fg;
                ctx.font = this._context.font;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";

                const chars = [].concat(ch);
                for (let i=0;i<chars.length;i++) {
                    ctx.fillText(chars[i], this._spacingX/2, Math.ceil(this._spacingY/2));
                }
            }
            this._canvasCache[hash] = canvas;
        }
        
        this._context.drawImage(canvas, x*this._spacingX, y*this._spacingY);
    }

    _drawNoCache(data, clearBefore) {
        const x = data[0];
        const y = data[1];
        const ch = data[2];
        const fg = data[3];
        const bg = data[4];

        if (clearBefore) { 
            const b = this._options.border;
            this._context.fillStyle = bg;
            this._context.fillRect(x*this._spacingX + b, y*this._spacingY + b, this._spacingX - b, this._spacingY - b);
        }
        
        if (!ch) { return; }

        this._context.fillStyle = fg;

        const chars = [].concat(ch);
        for (let i=0;i<chars.length;i++) {
            this._context.fillText(chars[i], (x+0.5) * this._spacingX, Math.ceil((y+0.5) * this._spacingY));
        }
    }

    computeSize(availWidth, availHeight) {
        const width = Math.floor(availWidth / this._spacingX);
        const height = Math.floor(availHeight / this._spacingY);
        return [width, height];
    }

    computeFontSize(availWidth, availHeight) {
        const boxWidth = Math.floor(availWidth / this._options.width);
        let boxHeight = Math.floor(availHeight / this._options.height);

        /* compute char ratio */
        const oldFont = this._context.font;
        this._context.font = "100px " + this._options.fontFamily;
        const width = Math.ceil(this._context.measureText("W").width);
        this._context.font = oldFont;
        const ratio = width / 100;
            
        const widthFraction = ratio * boxHeight / boxWidth;
        if (widthFraction > 1) { /* too wide with current aspect ratio */
            boxHeight = Math.floor(boxHeight / widthFraction);
        }
        return Math.floor(boxHeight / this._options.spacing);
    }

    eventToPosition(x, y) {
        return [Math.floor(x/this._spacingX), Math.floor(y/this._spacingY)];
    }
}

RectDisplay.cache = false;
