import { AxesHelper, Color, PMREMGenerator } from "three";
import Experience from "./Experience";
import { RoomEnvironment } from "three/examples/jsm/Addons.js";


export default class Environment{
    experience !: Experience ;

    constructor(){
        this.experience = new Experience() ;


        // this.createHelpers();
        this.createLights();
    }

    createHelpers(){
        const axisHelper = new AxesHelper(100) ; 
        this.experience.scene.add(axisHelper)
    }

    createLights(){

        this.experience.scene.background = new Color(0x002244)

        const environment = new RoomEnvironment();
        const pmremGenerator = new PMREMGenerator( this.experience.renderer.instance );

        this.experience.scene.environment = pmremGenerator.fromScene( environment ).texture;

    }


}