import { GLTFLoader, DRACOLoader } from "three/examples/jsm/Addons.js";
import Experience from "./Experience";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";

export default class Resources{
    experience: Experience ; 
    gltfloader!: GLTFLoader ; 

    constructor(){
        this.experience = new Experience(); 
        this.createLoader() ; 
    }

    createLoader(){
        this.gltfloader = new GLTFLoader() ; 
        const dracoLoader = new DRACOLoader(); 
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        this.gltfloader.setDRACOLoader(dracoLoader);
        this.gltfloader.setMeshoptDecoder(MeshoptDecoder);
    }

}