// import { SkyGeometry } from "three/examples/jsm/Addons.js";
import Character from "./Character";
import Experience from "./Experience";
import Ground from "./Ground";
import Sky from "./Sky";
import Trees from "./Tree";

export default class World{
    experience !: Experience ; 
    ground !: Ground ; 
    trees !: Trees ; 
    character !: Character ; 
    sky !: Sky ; 

    constructor(){
        this.experience = new Experience() ;
        this.createGround() ; 
    }

    createGround(){
        this.ground = new Ground() ; 
        this.character = new Character();
        this.sky = new Sky() ; 
        // SkyGeometry
    }

    update(){
        if( this.ground ) this.ground.update() ; 
        if( this.character ) this.character.update() ; 
        if ( this.sky) this.sky.update();
    }
}