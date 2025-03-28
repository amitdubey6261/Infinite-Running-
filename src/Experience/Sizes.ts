import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
    width: number = 0;
    height: number = 0;
    aspectRatio: number = 0;
    pixelRatio: number = 0;
    canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        super();
        this.canvas = canvas;

        this.calculate();

        window.addEventListener("resize", this.calculate.bind(this));
    }

    calculate() {
        this.width = this.canvas.parentElement!.offsetWidth;
        this.height = this.canvas.parentElement!.offsetHeight;  
        this.aspectRatio = this.width / this.height;
        this.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);
        this.emit("resize");
    }
}