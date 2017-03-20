
interface Window {
	mozRequestAnimationFrame(func: FrameRequestCallback): number
	oRequestAnimationFrame(func: FrameRequestCallback): number
	msRequestAnimationFrame(func: FrameRequestCallback): number
	mozCancelAnimationFrame(handle: number): void
	oCancelAnimationFrame(handle: number): void
	msCancelAnimationFrame(handle: number): void
}

if (typeof window != "undefined") {
	window.requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function(cb) { return setTimeout(cb, 1000/60); };

	window.cancelAnimationFrame =
		window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| function(id) { return clearTimeout(id); };
}
