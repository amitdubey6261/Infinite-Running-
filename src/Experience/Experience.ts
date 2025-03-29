import { Scene } from "three";
import Camera from "./Camera";
import Renderer from "./Renderer";
import Sizes from "./Sizes";
import Time from "./Time";
import Environment from "./Envrionment";
import Eventlisteners from "./Eventlistners";
import Resources from "./Resources";
import World from "./World";

export default class Experience {
	static instance: Experience;
	canvas!: HTMLCanvasElement;
	time!: Time ; 
	sizes !: Sizes ; 
	eventlistners !: Eventlisteners ;
	camera !: Camera ;
	renderer !: Renderer ; 
	resources !: Resources ; 
	world!: World ; 

	scene !: Scene ;
	envrionment !: Environment ; 

	constructor(canvas?: HTMLCanvasElement) {

		if (Experience.instance) {
			return Experience.instance;
		}

		Experience.instance = this;

		this.scene = new Scene() ; 
		if( canvas) this.canvas = canvas;
		this.time = new Time(); 
		this.sizes = new Sizes(this.canvas); 
		this.eventlistners = new Eventlisteners() ;
		this.camera = new Camera() ; 
		this.renderer = new Renderer() ;
		this.envrionment = new Environment() ;
		this.resources = new Resources() ; 
		this.world = new World() ; 

		this.time.on('tick' , ()=>{
			this.update();
		})

		this.sizes.on('resize' , ()=>{
			this.resize();
		})

	}

	update(){ //game loop
		if( this.camera) this.camera.update();
		if(this.renderer) this.renderer.update();
		if( this.world ) this.world.update() ; 
	}

	resize(){
		if( this.camera) this.camera.resize();
		if( this.renderer) this.renderer.resize();
	}
}