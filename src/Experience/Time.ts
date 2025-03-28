import { EventEmitter } from "events";

export default class Time extends EventEmitter {
	start = Date.now();
	current = this.start;
	elapsed = 0;
	delta = 16;
	prevTime = this.start;

	constructor() {
		super();
		this.tick = this.tick.bind(this);
		requestAnimationFrame(this.tick);
	}

	tick() {
		requestAnimationFrame(this.tick);
		const current = Date.now();
		this.delta = Math.min(current - this.current, 60);
		this.elapsed = current - this.start;
		this.current = current;
		this.emit("tick");
	}
}