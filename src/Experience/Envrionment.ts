import { AxesHelper, Color, PMREMGenerator } from "three";
import Experience from "./Experience";
import { RoomEnvironment } from "three/examples/jsm/Addons.js";


export default class Environment {
    experience !: Experience;

    constructor() {
        this.experience = new Experience();


        // this.createHelpers();
        this.createLights();
    }

    createHelpers() {
        const axisHelper = new AxesHelper(100);
        this.experience.scene.add(axisHelper)
    }

    createLights() {

        const PARAMS = {
            background: { r: 0, g: 101, b: 191 }, // corresponds to #AAAAB4
        };

        this.experience.scene.background = new Color(PARAMS.background.r/255,  PARAMS.background.g/255, PARAMS.background.b/255);



        const environment = new RoomEnvironment();
        const pmremGenerator = new PMREMGenerator(this.experience.renderer.instance);

        this.experience.scene.environment = pmremGenerator.fromScene(environment).texture;

    }


}