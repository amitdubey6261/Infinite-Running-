import Character from "./Character";
import Experience from "./Experience";
import Ground from "./Ground";
import Trees from "./Tree";

export default class World{
    experience !: Experience ; 
    ground !: Ground ; 
    trees !: Trees ; 
    character !: Character ; 

    constructor(){
        this.experience = new Experience() ;
        this.createGround() ; 
    }

    createGround(){
        this.ground = new Ground() ; 
        this.character = new Character();
    }

    update(){
        if( this.ground ) this.ground.update() ; 
        if( this.character ) this.character.update() ; 
    }
}