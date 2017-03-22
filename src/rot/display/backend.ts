/**
 * @class Abstract display backend module
 * @private
 */
export abstract class DisplayBackend {

	protected _context: CanvasRenderingContext2D;

	constructor(context: CanvasRenderingContext2D) {
		this._context = context;
	}

	compute(options) {
	}

	draw(data, clearBefore) {
	}

	computeSize(availWidth, availHeight) {
	}

	computeFontSize(availWidth, availHeight) {
	}

	eventToPosition(x, y) {
	}
}
