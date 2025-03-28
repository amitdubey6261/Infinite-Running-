import { WebGLRenderer } from "three";
import Camera from "./Camera";
import Experience from "./Experience";
import Stats from "three/examples/jsm/libs/stats.module.js";

export default class Renderer{
    experience : Experience ; 
    camera !: Camera ; 
    instance !: WebGLRenderer ;
    stats!: Stats ;  

    constructor(){
        this.experience = new Experience() ; 
        this.camera = this.experience.camera ;
        this.instance = new WebGLRenderer({
            canvas : this.experience.canvas ,
            antialias : true, 
            failIfMajorPerformanceCaveat : true, 
        }); 
        this.resize();

        this.stats = new Stats(); 
        document.body.appendChild(this.stats.dom)
    }

    update(){
        // this.instance.render(this.experience.scene , this.camera.perspectiveCamera);
        this.instance.render(this.experience.scene , this.camera.acctiveCamera);
        this.stats.update()
    }

    resize() {
		this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height);
        this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
	}
}